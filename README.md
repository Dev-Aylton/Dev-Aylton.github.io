# Portfólio profissional — Aylton Alberto

Site estático e responsivo de currículo e portfólio, desenvolvido com HTML5, CSS3 e JavaScript puro.

## Visão geral

O site apresenta a formação, experiência profissional, contatos e os projetos:

- **GastoPro** — aplicativo PWA de gestão financeira pessoal.
- **OSS Timer** — timer PWA para treinos de jiu-jitsu e exercícios intervalados.
- **Tatame** — PWA para gestão de academias de jiu-jitsu.

## Projetos publicados

- [GastoPro](https://dev-aylton.github.io/gastopro-app/) · [Código-fonte](https://github.com/Dev-Aylton/gastopro-app)
- [OSS Timer](https://dev-aylton.github.io/oss-timer/) · [Código-fonte](https://github.com/Dev-Aylton/oss-timer)
- [Tatame](https://dev-aylton.github.io/tatame-app/) · [Código-fonte](https://github.com/Dev-Aylton/tatame-app)

## Recursos

- Tema claro e escuro com preferência persistida no navegador.
- Navegação responsiva com menu móvel e indicação da seção ativa.
- Galerias de projetos para desktop e dispositivos móveis.
- Modal acessível para ampliar imagens, navegar por setas, teclado e toque.
- Botão para copiar e-mail e voltar ao início.
- Metadados de compartilhamento e currículo em PDF.

## Executar localmente

Não há dependências ou etapa de compilação.

1. Abra `index.html` diretamente no navegador.
2. Para testes mais próximos da publicação, use um servidor HTTP local, como a extensão Live Server do VS Code.

## Estrutura

```text
index.html
css/style.css
js/main.js
assets/
  projects/
    GastoPro/
    Oss_Timer/
    Tatame/
  aylton-perfil.webp
  aylton-sobre.webp
  curriculo-aylton-alberto.pdf
  favicon.svg
  portfolio-social.jpg
  uninter-logo.png
```

## Atualização de conteúdo

Ao alterar informações profissionais:

- Atualize o currículo em `assets/curriculo-aylton-alberto.pdf`.
- Atualize a prévia social em `assets/portfolio-social.jpg`.
- Revise a descrição e o título em `index.html`.
- Revise também os textos em português da seção **Sobre**, **Formação**, **Experiência** e **Contato**.
- Ao adicionar imagens, mantenha os arquivos em `assets/projects/<nome-do-projeto>/` e registre novas entradas no HTML.

## Publicação

O projeto pode ser publicado diretamente no GitHub Pages. A configuração atual usa URLs relativas para arquivos locais e a URL pública `https://dev-aylton.github.io/` nos metadados.
