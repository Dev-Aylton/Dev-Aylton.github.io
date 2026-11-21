# Casos de uso — Portfólio

## Interface principal

| ID | Cenário | Pré-condição | Resultado esperado |
|---|---|---|---|
| UC01 | Navegar pelas seções | Página carregada em desktop | Links levam às seções correspondentes |
| UC02 | Alternar tema | Página carregada | Tema claro/escuro aplica-se e é persistido |
| UC03 | Abrir menu móvel | Viewport menor que 768 px | Menu abre e fecha corretamente |
| UC04 | Voltar ao topo | Usuário percorreu a página | Botão flutuante aparece e retorna ao início |

## Galeria de projetos

| ID | Cenário | Pré-condição | Resultado esperado |
|---|---|---|---|
| UC05 | Ampliar captura | Usuário clica em uma imagem | Modal abre com a imagem ampliada |
| UC06 | Navegar no modal | Modal aberto | Setas, teclado e toque avançam ou retrocedem |
| UC07 | Fechar modal | Modal aberto | Fechamento por botão, Escape ou fundo restaura rolagem e foco |
| UC08 | Navegar sem sair do projeto | Galeria de um projeto aberta | Modal percorre apenas imagens desse projeto |

## Projetos e contato

| ID | Cenário | Pré-condição | Resultado esperado |
|---|---|---|---|
| UC09 | Abrir GastoPro | Link visível | App publicado é aberto em nova aba |
| UC10 | Abrir OSS Timer | Link visível | App mobile publicado é aberto em nova aba |
| UC11 | Abrir Tatame | Link visível | App publicado é aberto em nova aba |
| UC12 | Copiar e-mail | API de área de transferência disponível | Endereço é copiado e status é exibido |
| UC13 | Visualizar currículo | Arquivo PDF disponível | PDF abre para visualização |
| UC14 | Navegar em 360 px | Site carregado em viewport estreita | Não há overflow horizontal |

## Executar testes estáticos

```powershell
python -m unittest discover -s tests -p "test_*.py" -v
```
