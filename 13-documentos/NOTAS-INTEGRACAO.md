# Notas de integração — 24/10/2026

## De onde veio
| Arquivo | Tamanho | Conteúdo |
|---|---|---|
| `D:\Downloads\documentos grok\grok-documentos.zip` | ~59 KB | Base: README, ANALISE, index, CSV, 12 categorias de links |
| `D:\Downloads\documentos grok\grok-documentos 02.zip` | ~74 KB | **Mesma base + `COMANDOS.md`** + README/index levemente maiores |

Extração local (histórico): `D:\Downloads\documentos grok\_extraido\`  
No curso ficou só a versão **02** (completa), em `13-documentos\`.

## O que o pacote contém (análise)

1. **Catálogo de 333 links oficiais** (testados HTTP em 24/10/2026), em 12 categorias:
   - site, API, modelos/Imagine, tools, skills/MCP, SDKs, cookbook, app/bot, Grok Build CLI, preços, changelog, terceiros
2. **`ANALISE-FERRAMENTAS.md`** — modo professor: mapa API × App × Build × Bot; built-in tools vs function calling; custos; evidência `[OBSERVADO]` / `[INFERÊNCIA]`
3. **`COMANDOS.md`** — instalação (npm/`xai-sdk`/CLI), auth, permissões, MCP, skills/plugins/hooks, notas **Windows/pwsh** alinhadas ao perfil do Jean; alerta contra `irm | iex` sem ler
4. **`index.html`** — navegador com filtro de busca nos links
5. **`links.csv`** — planilha (categoria, título, url, status, descrição)

## Extra — guia WinGet (mesmo dia)
- Arquivo: `WINGET-PACOTES-GROK.md`
- Origem: consolidação da análise de `winget find "grok"` (pwsh 7.6.8) com `show`/`install` por ID
- Separação: `xAI.*` · terceiros · tag grok · coincidências (Ngrok, Sigrok, WSDD)

## Como usar no dia a dia
- Portal do curso → módulo **13**
- Ou abra direto: `13-documentos\index.html` (pelo `iniciar-curso.cmd` / `http://127.0.0.1:8765/13-documentos/index.html`)
- Para “como instalar / autenticar” (docs oficiais): `COMANDOS.md`
- Para “o que é skill vs tool”: `ANALISE-FERRAMENTAS.md`
- Para “o que o WinGet acha quando digito grok”: `WINGET-PACOTES-GROK.md`

## Observação de nomenclatura
A doc oficial usa **SpaceXSI** no site; domínios técnicos seguem `x.ai` / `xai-org` / `XAI_API_KEY`. No curso, trate SpaceXSI e xAI como o mesmo fornecedor.
