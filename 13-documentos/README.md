# 13 — Documentos oficiais (links SpaceXSI / xAI)

> **Módulo do Curso GROK** · pasta `13-documentos`  
> Fonte: `D:\Downloads\documentos grok\grok-documentos 02.zip` (versão completa com `COMANDOS.md`; o zip 01 era a mesma base sem comandos).

Pasta de referência do **curso Grok**. Aqui ficam **apenas listas de links** (acesso remoto): nenhuma documentação oficial foi espelhada em PDF/HTML offline — só índices, análise e comandos.

**Data da verificação:** 24/10/2026, manhã (America/Rio_Branco, UTC-5).
**Total:** 333 links, todos testados um a um (HTTP) nesta data.

## 🚀 Comece por aqui

| O quê | Link |
|---|---|
| Site oficial | https://x.ai/ |
| Documentação (início) | https://docs.x.ai/overview |
| Quickstart da API | https://docs.x.ai/developers/quickstart |
| Ferramentas (tools) — visão geral | https://docs.x.ai/developers/tools/overview |
| Modelos | https://docs.x.ai/developers/models |
| Preços da API | https://docs.x.ai/developers/pricing |
| App Grok | https://grok.com/ |
| Console de desenvolvedor | https://console.x.ai/ |
| GitHub oficial | https://github.com/xai-org |
| Cookbook | https://docs.x.ai/cookbook |
| Comandos (este repositório) | [COMANDOS.md](COMANDOS.md) |
| Índice da doc para IA (llms.txt) | https://docs.x.ai/llms.txt |

👉 Abra **[index.html](index.html)** no navegador para ver todos os links clicáveis, com filtro de busca.
👉 Veja **[COMANDOS.md](COMANDOS.md)** para todos os comandos oficiais de instalação, autenticação, permissões, MCP e skills, com notas de segurança e de Windows (adicionado em 24/10/2026).
👉 Leia **[ANALISE-FERRAMENTAS.md](ANALISE-FERRAMENTAS.md)** para a explicação (modo professor) de skills, ferramentas e funções.
👉 Consulte **[WINGET-PACOTES-GROK.md](WINGET-PACOTES-GROK.md)** para o mapa de `winget find "grok"` (xAI vs terceiros vs coincidências como ngrok/Sigrok).
👉 Depois de instalar o Bot: **[INTEGRACAO-ASSINATURA.md](INTEGRACAO-ASSINATURA.md)** — mapa Build + Bot + App + API e permissões locais.

## Organização

```
13-documentos/
├── README.md                 ← este arquivo
├── ANALISE-FERRAMENTAS.md    ← análise de skills/ferramentas/funções com fontes
├── COMANDOS.md               ← comandos oficiais (instalação, auth, permissões, MCP, skills)
├── WINGET-PACOTES-GROK.md    ← guia WinGet: find "grok" + show/install por ID
├── NOTAS-INTEGRACAO.md       ← de onde veio o pacote no curso
├── index.html                ← página com todos os links por categoria
├── links.csv                 ← categoria,titulo,url,status,descricao
└── links/                    ← um .md por categoria
```

| Arquivo | Conteúdo | Links |
|---|---|---|
| [01-site-oficial](links/01-site-oficial.md) | Site x.ai, páginas de produto, console, status, contas no X | 34 |
| [02-documentacao-api](links/02-documentacao-api.md) | Guias da API, arquivos/coleções, uso avançado, referência REST, FAQ, llms.txt/OpenAPI | 71 |
| [03-modelos-e-multimodal](links/03-modelos-e-multimodal.md) | Modelos, migrações, Imagine (imagem/vídeo) e Voz | 32 |
| [04-ferramentas-e-function-calling](links/04-ferramentas-e-function-calling.md) | Ferramentas da API e function calling | 13 |
| [05-skills-agentes-mcp](links/05-skills-agentes-mcp.md) | Skills, agentes, MCP, connectors e automações (foco do curso) | 35 |
| [06-sdks-e-github](links/06-sdks-e-github.md) | GitHub xai-org, SDKs, integrações Vertex/Foundry | 21 |
| [07-cookbook-exemplos](links/07-cookbook-exemplos.md) | Cookbook oficial (28 exemplos + índice) | 29 |
| [08-produto-grok-app-e-grok-bot](links/08-produto-grok-app-e-grok-bot.md) | App Grok (grok.com) e documentação do Grok Bot | 33 |
| [09-grok-build-cli](links/09-grok-build-cli.md) | Grok Build (CLI/TUI) | 17 |
| [10-precos-e-limites](links/10-precos-e-limites.md) | Preços, rate limits, planos e assinatura X | 15 |
| [11-noticias-e-changelog](links/11-noticias-e-changelog.md) | Release notes, changelogs e notícias | 29 |
| [12-comunidade-e-terceiros-nao-oficial](links/12-comunidade-e-terceiros-nao-oficial.md) | ⚠️ Terceiros/padrões abertos/não oficial | 4 |

## Como ler o status
- `200 ✅` — página abriu normalmente.
- `200 ✅ (redireciona → …)` — abriu após redirecionamento (destino indicado).
- `200 ⚠️ (desafio anti-bot)` — o site respondeu, mas com uma página de verificação; o conteúdo real não foi lido.
- `403 ⚠️` — o site bloqueou a verificação automática; o link foi **mantido** porque é real (aparece em buscas/na doc), mas não foi lido.
- `406 ℹ️` — endpoint técnico (servidor MCP), não é página para navegador.
- Links 404 foram descartados (nenhum apareceu na lista final).

## Regras usadas
- Só URLs reais encontradas no sitemap/llms.txt da doc, no sitemap do x.ai, na API do GitHub ou na própria documentação.
- **Títulos** = texto da tag `<title>` da página (sem o sufixo do site). Quando a página não devolveu título legível, aparece `[rótulo]` descritivo.
- Fontes não oficiais ficam só na categoria 12, marcadas.
- Evidência na análise: **[OBSERVADO]**, **[INFERÊNCIA]**, **[NÃO VERIFICADO]**.

## Observação sobre o nome
A empresa aparece hoje como **SpaceXSI** no site e na documentação (antes **xAI**). Domínios e nomes técnicos (`x.ai`, `docs.x.ai`, `xai-org`, `xai_sdk`, `XAI_API_KEY`) continuam iguais.
