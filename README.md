# Curso GROK

Portal de aprendizagem completo sobre **Grok**, **Grok Bot**, **MCP**, workflows e o ecossistema das empresas de Elon Musk.

## Como abrir (faça funcionar)

1. Dê dois cliques em **`iniciar-curso.cmd`**
2. O navegador abre em `http://127.0.0.1:8765/`
3. Marque aulas, anote ideias, exporte o progresso

> **Por quê servidor local?** O portal carrega `data/modulos.json` via `fetch`. Em `file://` alguns navegadores bloqueiam. O `iniciar-curso.cmd` sobe um servidor Node (ou Python) em `127.0.0.1`.

**Analogia:** a pasta é a biblioteca; o `iniciar-curso.cmd` é a chave da porta; o portal é o bibliotecário que te guia.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `01-plano-inicial` | Objetivo e mapa de 4 semanas |
| `02-estrutura-do-curso` | Trilhas e níveis |
| `03-workflow` | Ciclo PEDRA |
| `04-desenvolvimento` | Codar com Grok |
| `05-metas` | OKRs |
| `06-banco-de-dados` | Progresso localStorage |
| `07-ferramentas` | Tools do Grok Build |
| `08-mcp` | Model Context Protocol |
| `09-conexoes-livre` | X, Grok, SpaceX, empresas Elon |
| `10-comandos-slash` | Menu `/` com 100+ opções |
| `11-grok-bot` | Bot no X vs CLI |
| `assets/` | CSS + JS do portal |
| `data/` | JSON dos módulos |

## Sobre a lista enorme do `/`

Ao digitar `/` no Grok CLI, aparece um cardápio grande: comandos nativos + skills + workflows. **Não leia tudo** — filtre digitando 2–3 letras. Treine no módulo 10 (simulador no portal).

## Banco de dados

Progresso fica em `localStorage` (`curso-grok-db-v1`). Exportar/importar JSON pelos botões do início.
