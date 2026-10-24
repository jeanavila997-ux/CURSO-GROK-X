# Análise: skills, ferramentas e funções disponíveis para o Grok

> **Modo professor** · Verificado em 24/10/2026 (America/Rio_Branco, UTC-5) · Só leitura remota (nada foi baixado para esta pasta).
> Legenda de evidência: **[OBSERVADO]** = li na página oficial citada · **[INFERÊNCIA]** = conclusão minha a partir do que li · **[NÃO VERIFICADO]** = não consegui confirmar.

---

## 0. Nota sobre o nome da empresa

- **[OBSERVADO]** A documentação oficial (docs.x.ai) e o site (x.ai) hoje chamam a empresa de **"SpaceXSI"**; o handle `x.com/xai` redireciona para `@SpaceXSI`; os repositórios no GitHub continuam em `github.com/xai-org` e falam em "SpaceXAI API" / "xAI". Os domínios (`x.ai`, `docs.x.ai`, `api.x.ai`, `console.x.ai`) continuam os mesmos. Fontes: https://docs.x.ai/llms.txt · https://x.com/xai · https://github.com/xai-org
- **[INFERÊNCIA]** No curso, dá para tratar "xAI" e "SpaceXSI" como o mesmo fornecedor; os nomes técnicos (`xai_sdk`, `XAI_API_KEY`) não mudaram.

---

## 1. O mapa geral (a "foto da sala de aula")

Existem **quatro lugares** onde o Grok ganha "superpoderes", e cada um tem seu próprio jeito de usar ferramentas:

| Onde | Para quem | Como as ferramentas aparecem | Fonte |
|---|---|---|---|
| **API (api.x.ai)** | Desenvolvedores | Campo `tools` na requisição: ferramentas de servidor (web, X, código, imagem, coleções, MCP) + function calling | https://docs.x.ai/developers/tools/overview |
| **App Grok (grok.com / iOS / Android)** | Usuário final | Skills, Connectors, Automations, Projects, Imagine, Voz, Build Mode | https://docs.x.ai/grok/overview · https://x.ai/news/grok-skills |
| **Grok Build (CLI/TUI)** | Programadores | Skills (`SKILL.md`), Plugins, MCP servers, Hooks, Subagents, Workflows, `/goal` | https://docs.x.ai/build/features/skills-plugins-marketplaces |
| **Grok Bot** | Times/empresas | Skills, Routines (agendadas ou por evento), computador na nuvem, apps conectados | https://docs.x.ai/grok-bot/skills-routines-and-automations |

**Analogia:** pense no Grok como um profissional. A **API** é contratá-lo por tarefa e entregar a caixa de ferramentas você mesmo; o **app** é ele já trabalhando no escritório dele; o **Grok Build** é ele sentado no seu terminal; o **Grok Bot** é ele virando um funcionário com computador próprio.

---

## 2. API — os dois tipos de ferramenta

**[OBSERVADO]** A doc divide em duas categorias: **Built-in Tools** ("server-side tools managed by SpaceXSI that execute automatically") e **Function Calling** ("custom functions you define that the model can invoke"). Fonte: https://docs.x.ai/developers/tools/overview

**[OBSERVADO]** O ciclo é: o modelo analisa a pergunta → decide chamar ferramenta ou responder → executa (built-in) ou devolve o pedido de chamada (function calling) → processa resultados → responde com citações. Fonte: mesma página.

**Analogia:** ferramenta *built-in* é como pedir ao garçom e a cozinha do restaurante faz tudo; *function calling* é o garçom vir até você e dizer "preciso que *você* pegue isso na sua despensa".

### 2.1 Tabela das ferramentas de servidor (built-in)

| Ferramenta | Nome no `tools` | O que é | Quando usar | Custo [OBSERVADO] |
|---|---|---|---|---|
| **Web Search** | `web_search` | Busca na web e navega em páginas | Fatos atuais, notícias, documentação pública | US$ 5 / 1k chamadas |
| **X Search** | `x_search` | Busca por palavra-chave, semântica, usuários e threads no X | Opinião pública, tendências, posts de uma conta | US$ 5 / 1k posts e US$ 10 / 1k perfis |
| **Code Execution** | `code_execution` (SDK xAI) / `code_interpreter` (Responses API) | Roda Python em sandbox | Contas exatas, análise de dados, gráficos | US$ 5 / 1k chamadas |
| **Image Generation** | `image_generation` | Gera/edita imagens (Imagine) dentro da conversa | Imagem como um passo de um fluxo maior | Preço da API Imagine |
| **Collections Search** | `collections_search` (SDK) / `file_search` (Responses API) | RAG nos seus documentos enviados | Base de conhecimento, contratos, relatórios | US$ 2,50 / 1k chamadas |
| **File Attachments** | `attachment_search` (ativado sozinho ao anexar arquivo) | Busca dentro de arquivos anexados à mensagem | "Leia este PDF e responda" | US$ 5 / 1k chamadas |
| **Remote MCP** | `mcp` | Conecta a servidores MCP externos | Ferramentas de terceiros ou suas, sem código de loop | Baseado em tokens |
| **Image/Video Understanding** | `view_image`, `view_x_video` (via flags das buscas) | Analisa imagens/vídeos encontrados nas buscas | Quando o conteúdo visual importa | Baseado em tokens |

Fontes: https://docs.x.ai/developers/pricing (tabela "Tool Invocation Costs") · https://docs.x.ai/developers/model-capabilities/files/chat-with-files

**[OBSERVADO]** Só chamadas **bem-sucedidas** são cobradas (`server_side_tool_usage`); X Search é cobrado por item buscado desde 21/09/2026. Fonte: https://docs.x.ai/developers/tools/tool-usage-details

### 2.2 Cada ferramenta em detalhe

#### Web Search
- **O que é [OBSERVADO]:** "enables Grok to search the web in real-time and browse web pages". Parâmetros: `allowed_domains` (máx. 5), `excluded_domains` (máx. 5), `enable_image_understanding`, `enable_image_search`. Fonte: https://docs.x.ai/developers/tools/web-search
- **Por dentro [OBSERVADO]:** as funções internas contadas como Web Search incluem `web_search`, `web_search_with_snippets`, `browse_page`, `open_page`, `open_page_with_find`. Fonte: https://docs.x.ai/developers/tools/tool-usage-details
- **Exemplo (curl, Responses API) [OBSERVADO na doc de overview]:**
  ```json
  {"model":"grok-4.7","input":[{"role":"user","content":"Quais as novidades da SpaceXSI?"}],
   "tools":[{"type":"web_search"}]}
  ```
- **Analogia:** um estagiário com navegador que você pode restringir a "só pesquise no site do governo" (`allowed_domains`).

#### X Search
- **O que é [OBSERVADO]:** busca por palavra-chave (`x_keyword_search`), semântica (`x_semantic_search`), usuários (`x_user_search`) e thread (`x_thread_fetch`). Filtros: `allowed_x_handles` / `excluded_x_handles` (máx. 20), `from_date` / `to_date` (`YYYY-MM-DD`), entendimento de imagem e **vídeo** (vídeo só existe no X Search). Fonte: https://docs.x.ai/developers/tools/x-search
- **Quando usar:** "o que estão falando sobre X hoje?", monitorar contas, checagem de fatos. Cookbook: https://docs.x.ai/cookbook/examples/x-sentiment-tracker
- **Analogia:** um repórter que só lê o X, e você escolhe quais fontes ele pode citar.

#### Code Execution
- **O que é [OBSERVADO]:** Grok escreve e executa Python em um sandbox com bibliotecas comuns (NumPy, Pandas, Matplotlib, SciPy); há limites de tempo, memória e acesso a arquivos. Fonte: https://docs.x.ai/developers/tools/code-execution
- **Quando usar:** cálculo exato, estatística, análise de CSV. Cookbook: https://docs.x.ai/cookbook/examples/csv-to-answers
- **Exemplo (SDK Python) [OBSERVADO no overview]:** `tools=[code_execution()]` importando `from xai_sdk.tools import code_execution`.
- **Analogia:** em vez de "fazer conta de cabeça", o Grok pega a calculadora científica.
- **[OBSERVADO]** No SDK xAI (gRPC) o nome `code_interpreter` **não** é suportado — use `code_execution`. Fonte: https://docs.x.ai/developers/pricing

#### Image Generation (como ferramenta)
- **O que é [OBSERVADO]:** o modelo decide quando gerar, escreve o prompt, escolhe proporção e pode encadear gerar→editar numa só requisição; usa `grok-imagine-image-2.0`. Se você já tem o prompt exato, use os endpoints diretos. O Vercel AI SDK ainda não expõe essa ferramenta. Fonte: https://docs.x.ai/developers/tools/image-generation
- **Analogia:** o redator que, no meio do texto, chama o ilustrador sozinho.

#### Collections Search (RAG)
- **O que é [OBSERVADO]:** busca nas suas *collections* (bases de conhecimento) com busca semântica; suporta PDFs, texto, CSV etc. Fonte: https://docs.x.ai/developers/tools/collections-search
- **[OBSERVADO]** A Collections API oferece busca semântica, por palavra-chave e híbrida, com OCR e parsing de layout. Fonte: https://x.ai/news/grok-collections-api
- **Exemplo (Responses API) [OBSERVADO]:** `{"type":"file_search","vector_store_ids":["<collection_id>"],"max_num_results":10}`.
- **Quando usar:** chatbot sobre a apostila do curso, contratos, manuais. Cookbook: https://docs.x.ai/cookbook/examples/docs-to-cited-answers
- **Analogia:** um bibliotecário que conhece só a *sua* estante.

#### Remote MCP Tools
- **O que é [OBSERVADO]:** Grok se conecta a servidores **MCP** externos; a SpaceXSI gerencia a conexão. Parâmetros: `server_url` (obrigatório; só Streaming HTTP e SSE), `server_label` (obrigatório), `server_description`, `allowed_tools` (no SDK: `allowed_tool_names`), `authorization`, `headers` (no SDK: `extra_headers`). `require_approval` e `connector_id` da OpenAI **não** são suportados. Fonte: https://docs.x.ai/developers/tools/remote-mcp
- **Exemplo [OBSERVADO]:**
  ```json
  "tools":[{"type":"mcp","server_url":"https://mcp.deepwiki.com/mcp","server_label":"deepwiki"}]
  ```
- **Quando usar:** quando a ferramenta já existe como servidor MCP (GitHub, banco de dados, CRM). Cookbook: https://docs.x.ai/cookbook/examples/database-over-mcp
- **Analogia:** MCP é a "tomada universal": qualquer aparelho com esse plugue funciona no Grok.

### 2.3 Function Calling (ferramentas do lado do cliente)
- **O que é [OBSERVADO]:** você define funções (JSON Schema/Pydantic); o modelo pede a chamada; **você executa** e devolve o resultado. `tool_choice`: `auto` (padrão), `required`, `none` ou forçar uma função. Chamadas paralelas vêm ligadas por padrão (desligue com `parallel_tool_calls: false`). Até **350 ferramentas por requisição**. Fonte: https://docs.x.ai/developers/tools/function-calling
- **[OBSERVADO]** Os argumentos de tool call sempre seguem o schema da ferramenta (`strict` implícito sempre `true`). Fonte: https://docs.x.ai/developers/model-capabilities/text/structured-outputs
- **Exemplo (esquema da ferramenta):**
  ```json
  {"type":"function","name":"buscar_aluno","description":"Busca aluno por e-mail",
   "parameters":{"type":"object","properties":{"email":{"type":"string"}},"required":["email"]}}
  ```
  **[INFERÊNCIA]** formato no estilo Responses API/OpenAI, que a doc diz ser compatível; confira a sintaxe exata no Quickstart da página antes de usar em aula.
- **Quando usar:** acessar *seu* banco, *sua* API interna, ou ações que exigem aprovação humana. Cookbooks: https://docs.x.ai/cookbook/examples/company-to-call-brief · https://docs.x.ai/cookbook/examples/refund-agent-human-approval
- **Analogia:** o Grok é o gerente que decide *o que* fazer; sua aplicação é o braço que *faz*.

### 2.4 Misturando servidor + cliente, turnos e citações
- **[OBSERVADO]** Dá para misturar ferramentas de servidor e de cliente; quando o modelo chama uma função de cliente, a execução **pausa** e volta para sua aplicação; `max_turns` limita os turnos de raciocínio/ferramenta dentro de uma requisição (e reinicia a cada nova requisição após a função de cliente). Fonte: https://docs.x.ai/developers/tools/advanced-usage · https://docs.x.ai/developers/tools/tool-usage-details
- **[OBSERVADO]** Sugestão da doc para `max_turns`: 1–2 (consulta rápida), 3–5 (equilibrado), 10+ ou sem limite (pesquisa profunda). Fonte: tool-usage-details.
- **[OBSERVADO]** Identificar o tipo de chamada: no SDK use `get_tool_call_type` (`client_side_tool`, `web_search_tool`, `mcp_tool`…); na Responses API olhe `output[].type` (`function_call`, `web_search_call`, `code_interpreter_call`, `file_search_call`, `mcp_call`…). Fonte: tool-usage-details.
- **[OBSERVADO]** Citações: a lista `citations` vem sempre; citações inline `[[N]](url)` vêm ligadas por padrão na Responses API e desligadas por padrão no SDK Python (`include=["inline_citations"]`). Fonte: https://docs.x.ai/developers/tools/citations

### 2.5 Funções "irmãs" das ferramentas
| Recurso | O que é [OBSERVADO] | Fonte |
|---|---|---|
| **Structured Outputs** | `response_format` com `json_schema` (subconjunto do JSON Schema, Draft 2020-12 recomendado) | https://docs.x.ai/developers/model-capabilities/text/structured-outputs |
| **Multi Agent** | Modelo `grok-4.20-multi-agent`; vários agentes + um "líder" que sintetiza; 4 agentes (`effort` low/medium) ou 16 (high/xhigh); aceita web_search, x_search, code_execution, collections_search | https://docs.x.ai/developers/model-capabilities/text/multi-agent |
| **Reasoning** | `grok-4.7` aceita effort low, medium, high (padrão) e xhigh; devolve sempre `reasoning.encrypted_content` na Responses API | https://docs.x.ai/developers/release-notes · https://docs.x.ai/developers/models |
| **Context Compaction** | Encolhe conversas longas para loops de agentes | https://docs.x.ai/developers/advanced-api-usage/context-compaction |
| **Prompt Caching** | Reaproveita prefixos; importante em agentes (prompt cresce a cada passo) | https://docs.x.ai/developers/advanced-api-usage/prompt-caching |
| **Voice (speech-to-speech)** | Agentes de voz em tempo real; aceita Remote MCP tools | https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech |
| **Docs MCP** | Servidor MCP oficial da documentação em `https://docs.x.ai/api/mcp` (Streamable HTTP, sem estado) | https://docs.x.ai/developers/docs-mcp |

---

## 3. App Grok (grok.com / iOS / Android)

| Recurso | O que é [OBSERVADO] | Fonte |
|---|---|---|
| **Skills** | "Teach Grok something once and it remembers across every conversation"; skills nativas geram Word, PowerPoint, Excel e PDF; você cria as suas (descrevendo, enviando arquivo ou escrevendo); as suas têm prioridade | https://x.ai/news/grok-skills |
| **Connectors** | 3 tipos: built-in (Gmail & Google Calendar, Google Drive, OneDrive, Outlook, Microsoft Teams, SharePoint, Salesforce), catálogo OAuth e **MCP customizado** (servidor precisa ser público; local exige túnel) | https://docs.x.ai/grok/connectors · https://docs.x.ai/grok/connectors/custom-mcp-tunneling |
| **Automations** | Tarefas que rodam sozinhas por agenda (uma vez, diário, dias úteis, semanal, mensal, anual) ou gatilho de e-mail; usam connectors e skills | https://x.ai/news/grok-automations |
| **Build Mode** | Cria sites/apps/jogos no chat e publica em link; beta para SuperGrok Heavy | https://x.ai/news/grok-build-mode |
| **Projects** | Existe a página `grok.com/project`; a FAQ cita Projects | https://grok.com/project · https://docs.x.ai/grok/faq |
| **Imagine / Voz / arquivos** | Criar imagem e vídeo, conversar por voz, enviar PDFs/planilhas/código/áudio | https://docs.x.ai/grok/overview |
| **Companions** | A FAQ diz que estão **só no app iOS**, sem planos para web/Android | https://docs.x.ai/grok/faq |

- **[NÃO VERIFICADO]** "Tasks" e "Workspaces" como recursos com esses nomes no app: não encontrei páginas oficiais dedicadas nesta varredura (o termo "Workspace" aparece como "team workspaces" e no complemento "Grok for Google Workspace": https://x.ai/grok/workspace).
- **[NÃO VERIFICADO]** Central de ajuda do X sobre Grok (https://help.x.com/en/using-x/about-grok): o link existe em buscas, mas a página bloqueou a verificação automática (403); não li o conteúdo.

---

## 4. Grok Build (agente de programação)

| Recurso | O que é [OBSERVADO] | Fonte |
|---|---|---|
| **Skills** | Pastas reutilizáveis com `SKILL.md` (frontmatter YAML: `name`, `description`, `when-to-use`, `paths`, `user-invocable`, `disable-model-invocation`…); descobertas em `./.grok/skills/`, `~/.grok/skills/`, plugins; viram comandos `/<skill>` | https://docs.x.ai/build/features/skills-plugins-marketplaces |
| **Plugins & Marketplace** | Plugin agrupa skills, comandos, agentes, hooks, MCP e LSP; marketplace dentro da TUI (`/marketplace`); plugins remotos fixados por SHA de commit | mesma página · https://x.ai/news/grok-plugin-marketplace · https://github.com/xai-org/plugin-marketplace |
| **MCP Servers** | `grok mcp add …` (stdio ou HTTP com OAuth), `grok mcp list/remove/doctor`, ou `~/.grok/config.toml`; ferramentas ficam como `<server>__<tool>` | https://docs.x.ai/build/features/mcp-servers |
| **Subagents** | Sessões filhas com contexto próprio; tipos `general-purpose`, `explore` (só leitura), `plan` | https://docs.x.ai/build/features/subagents |
| **Hooks** | Scripts disparados em eventos de ferramenta/sessão | https://docs.x.ai/build/features/hooks |
| **AGENTS.md** | Arquivo de regras do projeto | https://docs.x.ai/build/features/project-rules |
| **Workflows** | Scripts de orquestração que espalham uma tarefa por centenas de agentes em paralelo | https://x.ai/news/workflows |
| **/goal** | Execução autônoma longa até a tarefa estar concluída e verificada | https://x.ai/news/introducing-goal |
| **Compatibilidade** | Lê automaticamente skills/plugins/MCPs/hooks do Claude Code e `AGENTS.md`; também `.cursor/mcp.json` e `.mcp.json` | skills-plugins-marketplaces · mcp-servers |

**Exemplo [OBSERVADO]:** adicionar o MCP da própria documentação ao Grok Build:
```bash
grok mcp add --transport http xai-docs https://docs.x.ai/api/mcp
```
Fonte: https://docs.x.ai/developers/docs-mcp

**Analogia:** *skill* = receita escrita; *plugin* = kit com receitas + utensílios; *MCP* = eletrodoméstico ligado na tomada universal; *subagente* = ajudante de cozinha que volta com o prato pronto.

---

## 5. Grok Bot

- **[OBSERVADO]** Dois blocos: **skill** ("a reusable set of instructions for how to do a task") e **routine** (quando rodar: agenda ou evento). Recomenda-se: tarefa única → tornar confiável → salvar como skill → só então automatizar. Uma skill boa diz quando usar, entradas/acessos, sequência, validação, retorno e o que exige aprovação. Até 50 rotinas por Bot; intervalo mínimo de 5 minutos; "Teach a task" grava até 10 minutos de demonstração. Fonte: https://docs.x.ai/grok-bot/skills-routines-and-automations
- **[INFERÊNCIA]** Para o curso, o roteiro "tarefa → skill → rotina" do Grok Bot é um ótimo fio condutor didático também para o app Grok (Skills + Automations).

---

## 6. Principais conclusões (para o curso)

1. **[OBSERVADO]** Na API, ferramenta de servidor = a SpaceXSI executa; function calling = você executa. Esse é o conceito nº 1 a ensinar.
2. **[OBSERVADO]** **MCP** aparece em todos os produtos: API (Remote MCP), app (Custom MCP connector), Grok Build (MCP servers) e na própria doc (Docs MCP).
3. **[OBSERVADO]** "Skills" significa coisas parecidas mas não idênticas: no app (preferências/fluxos e geração de documentos), no Grok Build (`SKILL.md` em pastas) e no Grok Bot (instruções reutilizáveis + rotinas).
4. **[OBSERVADO]** Nomes mudam conforme o SDK: `code_execution` ↔ `code_interpreter`, `collections_search` ↔ `file_search`, `allowed_tools` ↔ `allowed_tool_names`.
5. **[INFERÊNCIA]** Custos de agentes crescem com o número de turnos; ensinar `max_turns` + prompt caching evita surpresa na fatura.

## 7. Lacunas desta análise
- **[NÃO VERIFICADO]** help.x.com (403) e npm (403) não foram lidos.
- **[NÃO VERIFICADO]** Tasks/Workspaces como recursos nomeados do app Grok.
- **[NÃO VERIFICADO]** Exemplos de código desta análise não foram executados (só leitura; sem chave de API).
- Não li todas as 236 páginas da doc por completo — li integralmente as de ferramentas, MCP, skills, modelos e preços.
