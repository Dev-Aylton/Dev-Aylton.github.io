# Portfólio profissional — Aylton Alberto

Site estático e responsivo de currículo e portfólio, desenvolvido com HTML5, CSS3 e JavaScript puro.

O posicionamento profissional destaca desenvolvimento full stack com foco em front-end, React, TypeScript, PWAs e aplicações com Supabase.

## Visão geral

O site apresenta a formação, experiência profissional, contatos e os projetos:

- **Controle-App** — projeto principal, PWA multiempresa para controle de estoque, compras, vendas, inventário, equipe e auditoria.
- **GastoPro** — aplicativo PWA de gestão financeira pessoal, versão 4.81.
- **OSS Timer** — timer PWA para treinos de jiu-jitsu e exercícios intervalados, versão 0.9.56.
- **Tatame** — PWA de gestão de academias de jiu-jitsu, versão 5.26.

## Projetos publicados

1. [Controle-App](https://dev-aylton.github.io/Controle-App/) — projeto principal · [Demonstração](https://dev-aylton.github.io/Controle-App/#/demo) · [Código-fonte](https://github.com/Dev-Aylton/Controle-App)

2. [GastoPro](https://dev-aylton.github.io/gastopro-app/) · versão 4.81 · [Código-fonte](https://github.com/Dev-Aylton/gastopro-app)
3. [Tatame](https://dev-aylton.github.io/tatame-app/) · versão 5.26 · [Código-fonte](https://github.com/Dev-Aylton/tatame-app)
4. [OSS Timer](https://dev-aylton.github.io/oss-timer/) · versão 0.9.56 · [Código-fonte](https://github.com/Dev-Aylton/oss-timer)

## Recursos

- Tema claro e escuro com preferência persistida no navegador.
- Respeito à preferência de tema claro ou escuro do sistema na primeira visita.
- Filtros de projetos por Full stack, Front-end e Mobile.
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
    Controle-App/
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
