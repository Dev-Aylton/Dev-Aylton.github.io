from html.parser import HTMLParser
from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


class PortfolioParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.local_assets = []
        self.external_links = []
        self.gallery_buttons = 0
        self.project_articles = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if "id" in attributes:
            self.ids.add(attributes["id"])
        if tag == "article" and "project-card" in attributes.get("class", "").split():
            self.project_articles += 1
        if tag == "button" and "gallery-open" in attributes.get("class", "").split():
            self.gallery_buttons += 1
        for attribute in ("src", "href"):
            value = attributes.get(attribute)
            if not value:
                continue
            if value.startswith(("http://", "https://", "mailto:", "#")):
                if value.startswith("http"):
                    self.external_links.append(value)
            else:
                self.local_assets.append(value)


class PortfolioQualityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.css = (ROOT / "css" / "style.css").read_text(encoding="utf-8")
        cls.js = (ROOT / "js" / "main.js").read_text(encoding="utf-8")
        cls.readme = (ROOT / "README.md").read_text(encoding="utf-8")
        cls.parser = PortfolioParser()
        cls.parser.feed(cls.html)

    def test_document_metadata_and_skip_link(self):
        self.assertIn('<html lang="pt-BR">', self.html)
        self.assertIn('name="viewport"', self.html)
        self.assertIn('class="skip-link"', self.html)
        self.assertIn("#conteudo", self.html)
        self.assertIn("Desenvolvedor full stack com foco em front-end", self.html)
        self.assertIn("Disponível para oportunidades", self.html)
        self.assertIn("74 testes", self.html)
        self.assertIn("47 migrations", self.html)

    def test_required_sections_exist(self):
        self.assertEqual(
            {"inicio", "sobre", "formacao", "projeto", "experiencia", "contato"},
            {"inicio", "sobre", "formacao", "projeto", "experiencia", "contato"} & self.parser.ids,
        )

    def test_three_projects_and_gallery_controls_exist(self):
        self.assertEqual(4, self.parser.project_articles)
        self.assertGreaterEqual(self.parser.gallery_buttons, 26)
        for name in ("GastoPro", "OSS Timer", "Tatame", "Controle-App"):
            self.assertIn(name, self.html)

    def test_project_and_local_asset_links_resolve(self):
        missing = []
        for value in set(self.parser.local_assets):
            path = ROOT / value.split("?", 1)[0].split("#", 1)[0]
            if not path.exists():
                missing.append(value)
        self.assertEqual([], missing)

    def test_controle_app_is_the_first_project(self):
        controle_position = self.html.index("<h3>Controle-App</h3>")
        gastopro_position = self.html.index("<h3>GastoPro</h3>")
        oss_position = self.html.index("<h3>OSS Timer</h3>")
        tatame_position = self.html.index("<h3>Tatame</h3>")
        self.assertLess(controle_position, gastopro_position)
        self.assertLess(controle_position, tatame_position)
        self.assertLess(gastopro_position, tatame_position)
        self.assertLess(tatame_position, oss_position)

    def test_project_app_links_exist(self):
        for url in (
            "https://dev-aylton.github.io/gastopro-app/",
            "https://dev-aylton.github.io/oss-timer/",
            "https://dev-aylton.github.io/tatame-app/",
        ):
            self.assertIn(url, self.html)

    def test_project_repository_links_exist(self):
        for url in (
            "https://github.com/Dev-Aylton/gastopro-app",
            "https://github.com/Dev-Aylton/oss-timer",
            "https://github.com/Dev-Aylton/tatame-app",
            "https://github.com/Dev-Aylton/Controle-App",
        ):
            self.assertIn(url, self.html)

    def test_controle_app_links_and_gallery_exist(self):
        for url in (
            "https://dev-aylton.github.io/Controle-App/",
            "https://dev-aylton.github.io/Controle-App/#/demo",
        ):
            self.assertIn(url, self.html)
        for relative in (
            "assets/projects/Controle-App/01-notebook-inicio.png",
            "assets/projects/Controle-App/02-notebook-movimentacoes.png",
            "assets/projects/Controle-App/03-notebook-vendas.png",
            "assets/projects/Controle-App/04-notebook-inventario.png",
            "assets/projects/Controle-App/05-iphone-inicio.png",
            "assets/projects/Controle-App/06-iphone-movimentacoes.png",
        ):
            self.assertTrue((ROOT / relative).is_file(), relative)

    def test_oss_timer_mobile_note_is_present(self):
        self.assertIn("exclusivamente para uso mobile", self.html)

    def test_lightbox_has_accessible_controls_and_keyboard_navigation(self):
        self.assertIn('class="project-lightbox"', self.html)
        self.assertIn('aria-label="Fechar imagem ampliada"', self.html)
        self.assertIn('aria-label="Imagem anterior"', self.html)
        self.assertIn('aria-label="Próxima imagem"', self.html)
        self.assertIn("ArrowLeft", self.js)
        self.assertIn("ArrowRight", self.js)
        self.assertIn("touchstart", self.js)

    def test_responsive_styles_cover_mobile_and_reduced_motion(self):
        self.assertIn("@media (max-width: 767px)", self.css)
        self.assertIn("prefers-reduced-motion: reduce", self.css)
        self.assertIn("project-lightbox", self.css)
        self.assertIn(".project-section.reveal:not(.is-visible)", self.css)
        self.assertIn("clamp(1.65rem, 2.5vw, 2.75rem)", self.css)
        self.assertIn("threshold: 0.02", self.js)
        self.assertIn('section.id !== "projeto"', self.js)

    def test_project_filters_exist(self):
        for filter_name in ("todos", "full-stack", "front-end", "mobile"):
            self.assertIn(f'data-project-filter="{filter_name}"', self.html)
        self.assertIn("projectFilterStatus.textContent", self.js)

    def test_no_placeholder_text_remains(self):
        for placeholder in ("Lorem ipsum", "TODO", "FIXME", "Projeto próprio em desenvolvimento"):
            self.assertNotIn(placeholder, self.html)

    def test_key_files_and_social_assets_exist(self):
        for relative in (
            "assets/curriculo-aylton-alberto.pdf",
            "assets/portfolio-social.jpg",
            "assets/aylton-sobre.webp",
            "assets/favicon.svg",
        ):
            self.assertTrue((ROOT / relative).is_file(), relative)

    def test_readme_documents_live_projects(self):
        for project in ("GastoPro", "OSS Timer", "Tatame"):
            self.assertIn(project, self.readme)
        self.assertIn("projetos publicados", self.readme.lower())


if __name__ == "__main__":
    unittest.main(verbosity=2)
