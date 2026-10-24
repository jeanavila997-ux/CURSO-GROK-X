# COMANDOS — instalação, autenticação, permissões e integrações (Grok API, Grok Build, app Grok, Grok Bot)

> **Modo professor** · Compilado em 24/10/2026, manhã (America/Rio_Branco, UTC-5), a partir das páginas oficiais (docs.x.ai, x.ai, github.com/xai-org).
> Conferi uma amostra das páginas ao vivo (`/build/cli/reference`, `/build/features/permissions`, `/build/overview`) contra o `llms-full.txt` oficial: o conteúdo é idêntico.
>
> **Regra deste arquivo:** todo bloco marcado **[OBSERVADO]** foi copiado *literalmente* da fonte indicada. Blocos **[INFERÊNCIA]** são adaptações minhas (por exemplo, a versão em PowerShell de um `export`) e **não aparecem na doc**. **[NÃO VERIFICADO]** = não consegui confirmar.
>
> **Legenda de risco:** ⚠️ = comando com risco de segurança (instalador `curl | bash`/`irm | iex`, modo sem aprovação, confiança automática em código de terceiros, segredo em texto puro).

**Perfil do Jean (para as notas de Windows):** Windows · PowerShell 7.6 · Node 24 · Python 3.13.

---

## Índice
1. [Instalação](#1-instalação)
2. [Autenticação](#2-autenticação)
3. [Permissões](#3-permissões)
4. [Integrações / MCP](#4-integrações--mcp)
5. [Skills / Plugins / Hooks / Regras](#5-skills--plugins--hooks--regras)
6. [Verificação](#6-verificação)
7. [Notas específicas de Windows (pwsh 7.6)](#7-notas-específicas-de-windows-pwsh-76)
8. [Lacunas](#8-lacunas)

---

## 1. Instalação

### 1A. API / SDKs

**[OBSERVADO]** Fonte: https://docs.x.ai/developers/quickstart (Passo 3)
```bash
npm install ai @ai-sdk/xai zod
```
```bash
pip install openai
```
```bash
npm install openai
```
```bash
pip install xai-sdk
```

**[OBSERVADO]** SDK Python oficial. Fonte: https://github.com/xai-org/xai-sdk-python (README → Installation)
```bash
pip install xai-sdk
```
```bash
uv add xai-sdk
```
Extras de telemetria (mesmo README):
```bash
pip install xai-sdk[telemetry-http]
```
```bash
pip install xai-sdk[telemetry-grpc]
```
- **[OBSERVADO]** "Python 3.10 or higher is required" (README). O PyPI mostra `xai-sdk` 1.21.0 com `requires_python >=3.10`. ✅ O Python 3.13 do Jean atende.
- **[INFERÊNCIA]** No PowerShell, coloque aspas no extra: `pip install "xai-sdk[telemetry-http]"`. Os colchetes não costumam dar problema no pwsh, mas as aspas evitam surpresas.

**[OBSERVADO]** SDK TypeScript oficial. Fonte: https://github.com/xai-org/xai-sdk-ts (README → Installation)
```bash
npm install @xai-official/sdk
```
```bash
pnpm add @xai-official/sdk
```
- **[OBSERVADO]** No registro npm, `@xai-official/sdk` está com `latest` = 0.2.5 (versão 0.x, ou seja, ainda jovem).

**[OBSERVADO]** Dependência para os exemplos de voz em WebSocket. Fonte: https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech
> "Install the WebSocket client library — `pip install websockets` (Python) or `npm install ws` (Node.js)."

### 1B. Grok Build (CLI / TUI)

**[OBSERVADO]** Instalador oficial. Fonte: https://docs.x.ai/build/overview (Install)
```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```
```powershell
irm https://x.ai/cli/install.ps1 | iex
```
⚠️ **Nota de segurança:** os dois comandos baixam um script da internet e o executam **sem você ler antes** (`curl | bash` no macOS/Linux, `irm | iex` no PowerShell, que é o equivalente). Isso **fere a política do Jean**. Use uma das alternativas abaixo.

**[OBSERVADO]** O README do código aberto acrescenta que o `install.sh` também roda no **Git Bash** do Windows. Fonte: https://github.com/xai-org/grok-build (README → Installing the released binary)
```sh
curl -fsSL https://x.ai/cli/install.sh | bash   # macOS / Linux / Git Bash
irm https://x.ai/cli/install.ps1 | iex          # Windows PowerShell
grok --version
```

#### ✅ Alternativa 1 — via npm (documentada oficialmente)
**[OBSERVADO]** Fonte: https://docs.x.ai/build/enterprise (Network requirements)
> "Use `npm install -g @xai-official/grok` as an alternative that doesn't require this host"
```bash
npm install -g @xai-official/grok
```
- **[OBSERVADO]** No registro npm, `@xai-official/grok` existe (`latest` 1.0.70, descrição "Bring Grok into your terminal").
- **[INFERÊNCIA]** Funciona com o Node 24 do Jean. Antes de instalar, dá para inspecionar o pacote sem executar nada: `npm view @xai-official/grok` e `npm pack @xai-official/grok` (baixa o `.tgz` para leitura). Um `npm install` pode rodar scripts de instalação do pacote; quem quiser bloqueá-los pode usar `--ignore-scripts`, mas não testei se o CLI funciona assim [NÃO VERIFICADO].

#### ✅ Alternativa 2 — baixar, ler e só então executar [INFERÊNCIA]
Esse passo a passo **não está na doc**; ele decorre do próprio instalador oficial. Li o `install.ps1` em 24/10/2026 (somente leitura) e confirmei:
- **[OBSERVADO no script]** Ele aceita `param([string]$Version)` e as variáveis `GROK_VERSION`, `GROK_CHANNEL` (stable|alpha|enterprise), `GROK_BIN_DIR`, `GROK_PROXY_URL` e `GROK_DEPLOYMENT_KEY`.
- **[OBSERVADO no script]** Baixa de `https://x.ai/cli`, com reserva em `https://storage.googleapis.com/grok-build-public-artifacts/cli`.
- **[OBSERVADO no script]** Instala em `%USERPROFILE%\.grok\bin` e acrescenta essa pasta ao **PATH do usuário**.
- **[OBSERVADO no script]** Recusa rodar fora do Windows.
- **[OBSERVADO no script]** Só encontrei verificação SHA-256 para o pacote auxiliar MinGit; **não encontrei verificação de hash do binário principal**. Ler o script garante *o que ele faz*, mas não a integridade do binário baixado.

PowerShell 7.6:
```powershell
# [INFERÊNCIA] — não é comando da doc
Invoke-WebRequest https://x.ai/cli/install.ps1 -OutFile .\install-grok.ps1
code .\install-grok.ps1            # ou notepad: LEIA o script inteiro
Get-FileHash .\install-grok.ps1 -Algorithm SHA256   # anote o hash do que você revisou
Unblock-File .\install-grok.ps1    # só depois de revisar (remove a marca "baixado da internet")
pwsh -NoProfile -File .\install-grok.ps1
# versão específica (o script declara param -Version):
# pwsh -NoProfile -File .\install-grok.ps1 -Version 0.1.42
```
macOS/Linux/Git Bash:
```bash
# [INFERÊNCIA] — não é comando da doc
curl -fsSL https://x.ai/cli/install.sh -o install-grok.sh
less install-grok.sh
bash install-grok.sh
```
- **[OBSERVADO]** O cabeçalho do `install.sh` documenta a sintaxe de versão `curl -fsSL https://x.ai/cli/install.sh | bash -s 0.1.42`. No modo seguro, isso equivale a `bash install-grok.sh 0.1.42` [INFERÊNCIA].

#### Atualização e versão
**[OBSERVADO]** Fonte: https://docs.x.ai/build/cli/reference
| Comando | O que faz (texto da doc) |
|---|---|
| `grok update` | "Check for updates or install a specific version (`--check`, `--version <V>`, `--alpha`, `--stable`)" |
| `grok version` | "Print version information" |
| `grok completions <shell>` | "Generate shell completion scripts" |
| `grok setup` | "Fetch and install managed configuration" |

**[OBSERVADO]** Para scripts/CI. Fonte: https://docs.x.ai/build/cli/headless-scripting
> "pass `--no-auto-update` (e.g. `grok --no-auto-update -p "..."`) … You can also persistently disable them by setting `auto_update = false` under the `[cli]` section in `~/.grok/config.toml`."

#### Compilar do código-fonte (opcional)
**[OBSERVADO]** Fonte: https://github.com/xai-org/grok-build (README → Building from source)
```sh
cargo install dotslash
```
```sh
cargo run -p xai-grok-pager-bin              # build + launch the TUI
cargo build -p xai-grok-pager-bin --release  # release binary: target/release/xai-grok-pager
cargo check -p xai-grok-pager-bin            # fast validation
```
> "macOS and Linux are supported build hosts; Windows builds are best-effort and not currently tested from this tree."

### 1C. App Grok (grok.com / iOS / Android)
- **[OBSERVADO]** Não há comando de instalação: o Grok roda "on the web at grok.com and in the iOS and Android apps". Fonte: https://docs.x.ai/grok/overview

### 1D. Grok Bot (app desktop)
**[OBSERVADO]** Fonte: https://docs.x.ai/grok-bot/get-started (1. Install the desktop app)
- Download em https://x.ai/bot.
- **Windows:** "Choose the x64 or Arm64 download. Run the installer. Open Grok Bot from the Start menu." Para saber a arquitetura: **Settings → System → About → System type**.
- **macOS:** `.dmg` para Apple silicon ou Intel.
- **Linux:** `.deb`, `.rpm` ou AppImage; para saber a arquitetura, rode `uname -m`.

**[OBSERVADO]** Implantação em empresa / instalação por script. Fonte: https://docs.x.ai/grok-bot/deployment
```bash
curl -s https://api2.cursor.sh/updates/api/download/stable/darwin-arm64/sand
```
(feed JSON da versão atual; troque `darwin-arm64` por `win32-x64-user`, `win32-arm64-user`, `darwin-x64`, `linux-x64` ou `linux-arm64`)
```text
# Windows x64
https://downloads.cursor.com/grokbot/stable/win32-x64/{version}/Grok_Bot_{version}_Setup.exe

# Windows Arm64
https://downloads.cursor.com/grokbot/stable/win32-arm64/{version}/Grok_Bot_{version}_Setup.exe
```
- **[OBSERVADO]** Instalação silenciosa no Windows: `Grok_Bot_{version}_Setup.exe /S`. "The installer installs per user, into the member's profile under `%LOCALAPPDATA%\Programs`, so deploy it in user context, not as SYSTEM."
- **[OBSERVADO]** Linux: `apt-mark hold grok-bot` segura a versão. O `.deb` cria `/etc/apt/sources.list.d/grok-bot.sources` e o `.rpm` cria `/etc/yum.repos.d/grok-bot.repo`.
- **[OBSERVADO]** Celular: iOS 18+ (App Store) e Android 9+ (Google Play).
- **[INFERÊNCIA]** No PowerShell, o `curl` acima vira `Invoke-RestMethod https://api2.cursor.sh/updates/api/download/stable/win32-x64-user/sand`. O campo `downloadUrl` da resposta aponta o instalador; baixar e executar o `.exe` diretamente é uma alternativa segura ao `|`.

---

## 2. Autenticação

### 2A. API
**[OBSERVADO]** Fonte: https://docs.x.ai/developers/quickstart (Passo 2). A chave é criada no Console (API Keys).
```bash
export XAI_API_KEY="your_api_key"
```
Ou em um arquivo `.env`:
```bash
XAI_API_KEY=your_api_key
```
⚠️ **Nota:** nunca versione o `.env`; coloque-o no `.gitignore`.

**[INFERÊNCIA] Equivalentes no PowerShell 7.6** (não estão na doc):
```powershell
$env:XAI_API_KEY = "xai-..."     # vale só para a sessão atual
[Environment]::SetEnvironmentVariable('XAI_API_KEY','xai-...','User')   # persistente (usuário)
```
⚠️ A versão persistente grava a chave em **texto puro** no perfil do usuário do Windows. Prefira a variável de sessão ou um cofre de segredos.

**[OBSERVADO] curl com autenticação Bearer.** Fonte: https://docs.x.ai/developers/quickstart
```bash
curl https://api.x.ai/v1/responses \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-4.7",
    "input": "Fix this function and explain the bug: function median(a){a.sort();return a[a.length/2]}"
  }'
```

**[OBSERVADO] Base URLs e compatibilidade:**
| Uso | URL (literal) | Fonte |
|---|---|---|
| Global, compatível com o SDK da OpenAI | `base_url="https://api.x.ai/v1"` | https://docs.x.ai/developers/quickstart |
| Região EUA | `https://us.api.x.ai/v1` ("the Python SDK (`xai_sdk`) takes the bare host, `us.api.x.ai`") | https://docs.x.ai/developers/advanced-api-usage/regions |
| mTLS | "Use `https://mtls.api.x.ai` instead of `https://api.x.ai`" | https://docs.x.ai/developers/advanced-api-usage/mtls |
| Voz em tempo real (WebSocket) | `wss://api.x.ai/v1/realtime?model=grok-voice-latest` | https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech |
| Compatível com Anthropic | `POST /v1/messages`, **"The Anthropic SDK compatibility is fully deprecated"** | https://docs.x.ai/developers/rest-api-reference/inference/legacy |
| Vertex AI (Google) | `export OPENAI_BASE_URL="https://YOUR_VERTEX_ENDPOINT"` | https://docs.x.ai/developers/community/google-cloud-vertex-ai |

- **[OBSERVADO]** O SDK oficial TypeScript lê o `XAI_API_KEY` sozinho: "The client reads `XAI_API_KEY` automatically." Fonte: https://github.com/xai-org/xai-sdk-ts
- **[INFERÊNCIA]** Para Anthropic, a doc só diz que a compatibilidade está **descontinuada**; não ensine `/v1/messages` no curso. Use a Responses API.

**[OBSERVADO] Token efêmero (voz no navegador/celular).** Fonte: https://docs.x.ai/developers/model-capabilities/audio/ephemeral-tokens
> "**Never expose your API key in client-side code.** Always use ephemeral tokens for browser and mobile applications."
```bash
curl --url https://api.x.ai/v1/realtime/client_secrets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  --data '{
    "expires_after": {
      "seconds": 300
    }
  }'
```

**[OBSERVADO] mTLS.** Fonte: https://docs.x.ai/developers/advanced-api-usage/mtls
```bash
curl -v https://mtls.api.x.ai/v1/api-key \
  --cert /path/to/client-cert.pem \
  --key /path/to/client-key.pem \
  -H "Authorization: Bearer $XAI_API_KEY"
```

### 2B. Grok Build
**[OBSERVADO]** Fonte: https://docs.x.ai/build/overview
> "On first launch, Grok opens a browser for authentication. In non-browser environments, use an API key:"
```bash
export XAI_API_KEY="xai-..."
grok
```
**[OBSERVADO]** Fonte: https://docs.x.ai/build/cli/reference
| Comando | Texto da doc |
|---|---|
| `grok login` | "Sign in. `--device-auth` uses device-code authentication for headless or remote environments" |
| `grok logout` | "Sign out and clear cached credentials" |
| `--oauth` | "Use OAuth when the welcome screen starts authentication" |
| `/login`, `/logout` (dentro da TUI) | "Sign in, or sign out of the current account" (https://docs.x.ai/build/modes-and-commands) |

**[OBSERVADO]** Os quatro métodos de autenticação. Fonte: https://docs.x.ai/build/enterprise
| Método | Gatilho |
|---|---|
| Browser OIDC | `grok login` (default) |
| Device code | `grok login --device-auth` |
| External auth provider | `auth_provider_command` in config |
| API key | `XAI_API_KEY` env var or `model.api_key` in config |

> "When multiple credentials are available, Grok resolves them per model: `model.api_key` > `model.env_key` > active session token > `XAI_API_KEY`."
```text
[model.grok-build]
api_key = "xai-..."

[models]
default = "grok-build"
```
⚠️ Isso grava a chave em texto puro no `config.toml`. A própria doc prefere `env_key`: "Prefer `env_key` over hardcoding `api_key`" (https://docs.x.ai/build/settings/reference).

OIDC corporativo e travas de login (empresas):
```text
[auth.oidc]
issuer = "https://login.yourcompany.com"
client_id = "your-client-id"
```
```text
[grok_com_config]
disable_api_key_auth = true
```
```text
[grok_com_config]
force_login_team_uuid = "<your-team-uuid>"
```

### 2C. App Grok
- **[OBSERVADO]** Login pelo próprio site/app; os connectors usam OAuth: "Each one authenticates via OAuth, so you connect once". Fonte: https://docs.x.ai/grok/connectors

### 2D. Grok Bot
- **[OBSERVADO]** "Choose **Sign in** on the welcome screen… Finish authentication in the browser window that opens." "Grok Bot uses your Cursor account." Assinantes SuperGrok vinculam a conta em **Settings → Usage & Billing → Get Access with Grok**. Fonte: https://docs.x.ai/grok-bot/get-started
- **[OBSERVADO]** Senhas e códigos de verificação: use **Take over** → digite você mesmo → **I'm done**. "The Bot doesn't see your password." Fonte: mesma página.

---

## 3. Permissões

### 3A. Grok Build — modos
**[OBSERVADO]** Fonte: https://docs.x.ai/build/features/permissions
| Modo | Comportamento (doc) | Como entrar |
|---|---|---|
| Ask (default) | "Prompt for anything not already allowed" | — |
| Auto | "Classifier auto-approves safe tools; dangerous ones may still prompt" | `/auto`, `Shift+Tab` |
| Always-approve ⚠️ | "Auto-approve tool calls (`deny` rules and PreToolUse hooks still apply)" | `/always-approve`, `Ctrl+O`, `Shift+Tab`, `grok --always-approve` |

```text
[ui]
permission_mode = "auto" # or "ask" | "always-approve"
```
> "Default in user config only (`~/.grok/config.toml` or managed/requirements — not project `.grok/config.toml`)". "Legacy keys `approval_mode` and `yolo = true` still work".

**[OBSERVADO] Flags.** Fonte: https://docs.x.ai/build/cli/reference
| Flag | Texto da doc |
|---|---|
| ⚠️ `--always-approve` | "Auto-approve all tool executions (alias `--yolo`)" |
| `--allow <RULE>`, `--deny <RULE>` | "Permission rules" |
| `--sandbox <PROFILE>` | "Sandbox profile" |
| `--tools <LIST>`, `--disallowed-tools <LIST>` | "Allow or remove built-in tools" |
| `--max-turns <N>` | "Maximum number of agent turns" |
| `--no-plan`, `--no-subagents`, `--no-memory`, `--disable-web-search` | "Disable a feature for this session" |
| ⚠️ aliases do Claude Code | "`--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt`, and `--dangerously-skip-permissions`" |

⚠️ **Nota de segurança:** `--always-approve`, `--yolo`, `--dangerously-skip-permissions` e `--permission-mode bypassPermissions` deixam o agente rodar comandos **sem perguntar**. Só use em sandbox/VM descartável, nunca no PC principal com credenciais.

**[OBSERVADO] Regras allow/deny.** Fonte: https://docs.x.ai/build/features/permissions
```text
[permission]
rules = [
  { action = "allow", tool = "bash", pattern = "git *" },
  { action = "allow", tool = "read" },
  { action = "deny",  tool = "bash", pattern = "rm -rf *" },
]
```
> "Supported filters include `Bash`, `Edit`, `Read`, `Grep`, `MCPTool`, `WebFetch`, and `WebSearch`. `deny` always wins over `allow`."

**[OBSERVADO] Headless/CI seguro.** Fonte: https://docs.x.ai/build/enterprise
| Modo | Comportamento |
|---|---|
| `dontAsk` | "Silently deny anything without an explicit allow rule" |
| `acceptEdits` | "Auto-approve file edits; prompt for shell commands" |
```bash
grok -p "Review the API changes" \
  --permission-mode dontAsk \
  --allow 'Bash(git *)' \
  --allow 'Bash(gh *)' \
  --allow 'Read' \
  --allow 'Grep' \
  --deny 'Bash(rm -rf *)' \
  --sandbox strict
```
⚠️ A doc também mostra `--always-approve` em CI (`grok -p "Review this diff" --output-format json --always-approve`). Prefira o exemplo `dontAsk` acima.

Bloquear o modo sem aprovação para toda a organização:
```text
[ui]
disable_bypass_permissions_mode = true
```
> "the lock is honored only from root-owned sources (`/etc/grok/requirements.toml` or the system layer)"

**[OBSERVADO] Sandbox.** Fonte: https://docs.x.ai/build/features/sandbox
> "(Landlock on Linux, Seatbelt on macOS). Off by default."

Perfis: `off`, `workspace`, `devbox`, `read-only`, `strict`.
| Mecanismo | Exemplo |
|---|---|
| CLI | `grok --sandbox workspace` |
| Config | `[sandbox] profile = "workspace"` in `~/.grok/config.toml` |
| Env | `GROK_SANDBOX=workspace` |
```text
[profiles.my-profile]
extends = "workspace"
restrict_network = true
deny = ["/secrets", "**/.env", "**/*.pem"]
```
> "Built-ins do not permanently protect paths such as `~/.ssh`; use a custom `deny` list"
- **[NÃO VERIFICADO] / [INFERÊNCIA] Windows:** a doc só cita Landlock (Linux) e Seatbelt (macOS). Não encontrei menção a sandbox no Windows, então **não conte com o sandbox no PC do Jean**; dependa das regras de permissão (`ask`/`dontAsk` + `--allow` estreito).

**[OBSERVADO] Variáveis sensíveis.** Fonte: https://docs.x.ai/build/settings/reference
| Variável | Padrão | Texto da doc |
|---|---|---|
| `GROK_WEB_FETCH` | `0` | "Enable the `web_fetch` tool (`1`/`0`). Off by default for security." |
| ⚠️ `GROK_SANDBOX_AUTO_ALLOW_BASH` | `0` | "Auto-allow bash inside an active sandbox" |
| `GROK_WRITE_FILE` | `1` | "Disable the `write` tool with `0` (read-only sessions)." |
| `GROK_GOAL` | `1` | "Set `0` to remove `/goal`, for example to block long, open-ended runs on shared machines." |
| `GROK_SUBAGENTS` | `1` | "Enable subagents / the task tool" |
| `GROK_MEMORY` | `0` | "Enable cross-session memory" |

### 3B. Grok Bot — execução no seu computador local
**[OBSERVADO]** Fonte: https://docs.x.ai/grok-bot/approvals-security-and-privacy
> "In **Settings → Computer → Your computer**, choose **Ask every time**, **Always allow**, or **Never allow** in **Execution on this computer**." "The default is **Ask every time**. Use **Never allow** unless a Bot has a specific reason to work on your local files."
- **[OBSERVADO]** Na primeira vez, aparece "**Allow Grok Bot and all Bots to run commands on your local computer?**" com **Always allow**, **Allow once**, **Never** e **Deny once**.
- ⚠️ **Always allow** vale para **todos** os Bots. Recomendação da própria doc: **Never allow** por padrão.
- **[OBSERVADO]** "Do not use separate Bots as a security boundary." Todos os Bots compartilham o mesmo computador na nuvem (https://docs.x.ai/grok-bot/computer-and-apps).

### 3C. API — MCP remoto com escopo mínimo
**[OBSERVADO]** Fonte: https://docs.x.ai/developers/tools/remote-mcp
```python
# Enable only specific tools from a server with many available tools
mcp(
    server_url="https://comprehensive-tools.example.com/mcp",
    allowed_tool_names=["search_database", "format_data"]
)
```
> "The `require_approval` and `connector_id` parameters in the OpenAI Responses API are not currently supported."
- **[INFERÊNCIA]** Como não existe `require_approval`, o MCP remoto **não pede aprovação humana** antes de cada chamada. Limite o acesso com `allowed_tools` e use um servidor somente leitura.

---

## 4. Integrações / MCP

### 4A. API — Remote MCP
**[OBSERVADO]** Fonte: https://docs.x.ai/developers/tools/remote-mcp

Parâmetros: `server_url` (obrigatório; "Only Streaming HTTP and SSE transports are supported"), `server_label` (obrigatório), `server_description`, `allowed_tools` (no SDK: `allowed_tool_names`), `authorization`, `headers` (no SDK: `extra_headers`).
```bash
curl https://api.x.ai/v1/responses \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $XAI_API_KEY" \\
  -d '{
  "model": "grok-4.7",
  "input": [
    {
      "role": "user",
      "content": "What can you do with https://github.com/xai-org/xai-sdk-python?"
    }
  ],
  "tools": [
    {
        "type": "mcp",
        "server_url": "https://mcp.deepwiki.com/mcp",
        "server_label": "deepwiki"
    }
  ]
}'
```
*(Na página, as barras de continuação aparecem duplicadas (`\\`), e foram copiadas assim. No bash, use uma barra só (`\`) [INFERÊNCIA].)*
```python
mcp(server_url="https://mcp.deepwiki.com/mcp", server_label="deepwiki"),
```

### 4B. MCP da documentação oficial
**[OBSERVADO]** Fonte: https://docs.x.ai/developers/docs-mcp
```bash
grok mcp add --transport http xai-docs https://docs.x.ai/api/mcp
```
```toml
[mcp_servers.xai-docs]
url = "https://docs.x.ai/api/mcp"
```
> "Run `grok mcp doctor xai-docs` to verify the connection."

No Cursor: **Settings → MCP**, tipo `url`, URL `https://docs.x.ai/api/mcp`. A página também traz configurações para Zed, Windsurf e OpenCode, além de exemplos com curl JSON-RPC (`initialize`, `tools/list`, `tools/call`).

### 4C. Grok Build — `grok mcp`
**[OBSERVADO]** Fonte: https://docs.x.ai/build/features/mcp-servers
```bash
# Local stdio server; everything after -- is the server command
grok mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir

# Remote server over HTTP (OAuth handled automatically)
grok mcp add --transport http linear https://mcp.linear.app/mcp

# Remote server with a static auth header (--header is repeatable)
grok mcp add --transport http api https://mcp.example.com/mcp --header "Authorization: Bearer ${API_TOKEN}"
```
> "`grok mcp list` shows configured servers, `grok mcp remove <name>` deletes one, and `grok mcp doctor [name]` diagnoses configuration and connectivity. `list` and `doctor` take `--json` for machine-readable output."
> "Pass `--scope project` to `grok mcp add` (it writes `.grok/config.toml` in the current directory)"
```toml
[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
env = { API_KEY = "${MY_API_KEY}" }   # ${VAR} expands at load time
startup_timeout_sec = 30              # default 30
tool_timeout_sec = 6000               # default 6000

[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"
headers = { "x-mcp-session-id" = "{{session_id}}" }
```
- **[OBSERVADO]** Os tokens OAuth ficam em `~/.grok/mcp_credentials.json`. O Grok Build também lê `~/.claude.json`, `.cursor/mcp.json` e `.mcp.json`; para desligar: `[compat.claude] mcps = false` ou `[compat.cursor] mcps = false`.
- ⚠️ **Nota:** `npx -y` baixa e executa um pacote sem confirmar. Fixe a versão (por exemplo `@modelcontextprotocol/server-filesystem@<versão>`) e limite o diretório [INFERÊNCIA].
- **[INFERÊNCIA] Windows:** escreva caminhos como `C:/Users/jean/curso` ou com `\\` escapado dentro do TOML.
- Na TUI: `/mcps` (Space liga/desliga, `r` recarrega, `i` faz OAuth, `a`/`x` adiciona/remove).

### 4D. App Grok — Connectors e MCP customizado
**[OBSERVADO]** Fonte: https://docs.x.ai/grok/connectors

Built-in: Gmail & Google Calendar, Google Drive, OneDrive, Outlook Mail & Calendar, Microsoft Teams, SharePoint, Salesforce.
1. "Go to grok.com/connectors."
2. "Click **New Connector** and select the service you want to connect." Para MCP próprio: "**New Connector**, then select **Custom**" → "Enter the MCP server URL and complete any required authentication."

> "Your MCP server must be reachable over the public internet."

Business/Enterprise: "a team admin must first provision a connector in the cloud console".

**[OBSERVADO] Túnel para MCP local.** Fonte: https://docs.x.ai/grok/connectors/custom-mcp-tunneling (ngrok e Cloudflare são de terceiros)
```bash
# Windows
winget install ngrok -s msstore

# Authenticate (free account required)
ngrok config add-authtoken YOUR_AUTH_TOKEN
```
```bash
ngrok http 3001
```
```bash
# Windows
winget install --id Cloudflare.cloudflared

# Start a quick tunnel
cloudflared tunnel --url http://localhost:3001
```
> "Cloudflare quick tunnels do not support Server-Sent Events (SSE). If your MCP server uses the SSE transport, use ngrok instead."
- ⚠️ **Nota:** o túnel expõe seu servidor local **na internet pública**. Exija autenticação no servidor MCP e desligue o túnel ao terminar.

**[OBSERVADO] HubSpot.** Fonte: https://docs.x.ai/integrations/hubspot-mcp-setup. Instale o app "xAI MCP" no HubSpot Marketplace; depois, em `grok.com/manage-connectors` → **+ Add connector** → HubSpot → **Connect** (OAuth). A integração é somente leitura.

### 4E. Grok Bot — apps
**[OBSERVADO]** Fonte: https://docs.x.ai/grok-bot/computer-and-apps
> "Open **Connect apps** from the sidebar… Browse or search for the app. Choose **Add**. Finish the provider login in your browser if requested. In chat, type `@` to attach the app to the task. Type `/` to reference a saved skill."
> "OAuth tokens are held on Cursor's connector backend, and the Bot invokes tools without receiving them."
- **[OBSERVADO]** A leitura pública do X não exige conectar conta; para DMs e favoritos, adicione o plugin X em **Connect apps**.

### 4F. Outras integrações de ferramentas
**[OBSERVADO] ACP (IDEs).** Fonte: https://docs.x.ai/build/cli/headless-scripting
```bash
grok agent stdio
```
**[OBSERVADO] Plugin para Claude Code.** Fonte: https://github.com/xai-org/grok-build-plugin-cc
```bash
claude plugin marketplace add "$(pwd)"
```
```bash
claude plugin install grok-build@xai-grok-build
```
**[OBSERVADO] Importar sessões do Claude Code:** `grok import [targets...]` (https://docs.x.ai/build/cli/reference).

---

## 5. Skills / Plugins / Hooks / Regras

### 5A. Grok Build — Skills
**[OBSERVADO]** Fonte: https://docs.x.ai/build/features/skills-plugins-marketplaces
- Onde ficam: `./.grok/skills/`, `~/.grok/skills/`, pasta `skills/` de plugins e `[skills] paths` no `~/.grok/config.toml`. Também lê `~/.agents/skills/` e as skills do Claude Code.
- O `SKILL.md` começa com frontmatter YAML; campos: `name`, `description`, `when-to-use`, `paths`, `allowed-tools`, `argument-hint`, `user-invocable`, `disable-model-invocation`, `metadata`.
- **[OBSERVADO]** `allowed-tools`: "Does not grant or restrict tools." ⚠️ Esse campo **não** é uma barreira de segurança.
- As skills viram comandos `/<skill-name>` (em caso de conflito de nomes: `/local:commit`, segundo https://docs.x.ai/build/modes-and-commands).
- Na TUI, `/skills` abre a aba de skills.

### 5B. Grok Build — Plugins e Marketplace
**[OBSERVADO]** Fonte: https://docs.x.ai/build/cli/reference
| Comando |
|---|
| `grok plugin <list\|install\|uninstall\|update\|enable\|disable\|details\|validate>` |
| `grok plugin marketplace <list\|add\|remove\|update>` |

**[OBSERVADO]** Fonte: https://x.ai/news/grok-plugin-marketplace
```bash
grok plugin marketplace list
grok plugin install <name> --trust
```
> "Every remote plugin in the catalog is pinned to a specific commit SHA, and Grok Build verifies the pin at install time."

- Na TUI: `/marketplace` → `i` instala; `/plugins` abre a aba de plugins.
- Plugins também vêm de `./.grok/plugins/`, `~/.grok/plugins/` e `--plugin-dir <PATH>`. As fontes do marketplace ficam em `[[marketplace.sources]]` (`~/.grok/config.toml`).
- ⚠️ **Nota:** o próprio repositório oficial avisa: "plugins or materials may execute code and access data on your system — install and use them at your own risk" (https://github.com/xai-org/plugin-marketplace). O `--trust` aceita esse risco. Leia o plugin antes (`grok plugin details …`).

**[OBSERVADO] Para quem publica plugins.** Fonte: https://github.com/xai-org/plugin-marketplace
```bash
git ls-remote https://github.com/my-org/my-plugin.git HEAD
```
```bash
python3 scripts/generate-plugin-index.py
```
*(No Windows, `python3` normalmente se chama `python` ou `py` [INFERÊNCIA].)*

### 5C. Grok Build — Hooks
**[OBSERVADO]** Fonte: https://docs.x.ai/build/features/hooks
- Ficam em `~/.grok/hooks/*.json` (pessoais) e `<project>/.grok/hooks/*.json` (do projeto). Também lê `.claude/settings.json` e `.cursor/hooks.json`.
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bin/safety-check.sh", "timeout": 10 }]
      }
    ]
  }
}
```
> "Project hooks require trust before they run: the first time you open a repo with hooks, grant it with `/hooks-trust` or by launching with `--trust`. The decision is stored in `~/.grok/trusted_folders.toml` and covers project MCP and LSP servers too."
- ⚠️ **Nota:** dar `--trust` a um repositório de terceiros permite que hooks, MCP e LSP do projeto **executem código**.
- ⚠️ **[OBSERVADO]** "Everything else — timeouts, crashes, malformed output — is fail-open". Um hook de segurança com defeito **não bloqueia** nada.

### 5D. Regras de projeto, workflows e `/goal`
**[OBSERVADO]** Fonte: https://docs.x.ai/build/features/project-rules
```bash
grok --rules "Always use TypeScript. Prefer functional components."
```
Arquivos lidos: `AGENTS.md`, `Agents.md`, `AGENT.md`, `CLAUDE.md`, `Claude.md`, `CLAUDE.local.md` e `.grok/rules/*.md`.

**[OBSERVADO]** Fonte: https://docs.x.ai/build/modes-and-commands
```text
/create-workflow Review the current branch for bugs, then verify each finding
```
```text
/workflow review-changes {"target":"origin/main...HEAD"}
/workflow pause review-changes
/workflow resume review-changes
/workflow stop review-changes-2
```
```text
/goal Migrate the auth module to the new API, verified by the auth test suite passing, without changing public endpoints.
```
- `/goal` aceita `--budget <tokens>` e os subcomandos `/goal status`, `pause`, `resume` e `clear`.
- Para desligar: `[workflows] enabled = false` ou `GROK_WORKFLOWS=0`; `GROK_GOAL=0` remove o `/goal`.
- Subagentes: tipos `general-purpose`, `explore` e `plan`; gerencie com `/config-agents` (https://docs.x.ai/build/features/subagents).

### 5E. App Grok — Skills e Automations
- **[OBSERVADO]** Não há comandos: as skills são criadas descrevendo, enviando arquivo ou escrevendo do zero (https://x.ai/news/grok-skills). As automations são agendadas ou disparadas por e-mail (https://x.ai/news/grok-automations; página: https://grok.com/automations).

### 5F. Grok Bot — Skills e Routines (por linguagem natural)
**[OBSERVADO]** Fonte: https://docs.x.ai/grok-bot/skills-routines-and-automations. Os "comandos" são pedidos no chat; exemplos literais da doc:
> "Save the process we just used as a skill called “Weekly account health.” Include the source systems, risk definitions, output format, and the rule that customer contact always requires approval."

> "Every weekday at 8:00 AM, run the Daily customer-risk skill against the current account list. Post a linked watch list in this conversation. Do not contact customers. If the source data is unavailable, report the failure instead of using old data."
- Digite `/` para citar uma skill e `@` para citar Bots, grupos, rotinas ou apps.
- Limites: até 50 rotinas por Bot e intervalo mínimo de 5 minutos.
- ⚠️ **[OBSERVADO]** "A test run performs real work." e "Deleting a routine is immediate and has no undo."

---

## 6. Verificação

| O quê | Comando literal | Fonte |
|---|---|---|
| Versão do Grok Build | `grok --version` | https://github.com/xai-org/grok-build |
| Configuração carregada (regras, skills, plugins, hooks, MCP) | `grok inspect` / `grok inspect [--json]` | https://docs.x.ai/build/settings · https://docs.x.ai/build/cli/reference |
| Modelos disponíveis | `grok models` | https://docs.x.ai/build/cli/reference |
| Diagnóstico de MCP | `grok mcp doctor [name]` (`--json`) | https://docs.x.ai/build/features/mcp-servers |
| MCP da doc | `grok mcp doctor xai-docs` | https://docs.x.ai/developers/docs-mcp |
| Validar plugin | `grok plugin validate` (subcomando listado) | https://docs.x.ai/build/cli/reference |
| Terminal | `/terminal-setup` (aliases `/terminal-check`, `/terminal-info`) | https://docs.x.ai/build/cli/terminal-support |
| Primeiro teste headless | `grok -p "Explain this codebase"` | https://docs.x.ai/build/overview |
| SDK Python instalado | `pip show xai-sdk` / `uv pip show xai-sdk` | https://github.com/xai-org/xai-sdk-python |
| Chave da API (mTLS) | `curl -v https://mtls.api.x.ai/v1/api-key --cert … --key … -H "Authorization: Bearer $XAI_API_KEY"` | https://docs.x.ai/developers/advanced-api-usage/mtls |
| Status do serviço | https://status.x.ai/ | — |
| Versão do Grok Bot | conta → **Support** → **About** → **Copy version info** | https://docs.x.ai/grok-bot/deployment |

**[INFERÊNCIA]** Teste da chave fora do mTLS. A referência REST documenta `GET /v1/api-key` e `GET /v1/models` (https://docs.x.ai/developers/rest-api-reference/inference/other · https://docs.x.ai/developers/rest-api-reference/inference/models), mas a página não traz um curl pronto. Montado por mim:
```powershell
# [INFERÊNCIA] PowerShell 7.6
Invoke-RestMethod https://api.x.ai/v1/api-key -Headers @{ Authorization = "Bearer $env:XAI_API_KEY" }
Invoke-RestMethod https://api.x.ai/v1/models  -Headers @{ Authorization = "Bearer $env:XAI_API_KEY" }
```

---

## 7. Notas específicas de Windows (pwsh 7.6)

| Tema | O que a doc diz | Nota |
|---|---|---|
| Instalar o Grok Build | `irm https://x.ai/cli/install.ps1 \| iex` [OBSERVADO] | ⚠️ É o `curl\|bash` do Windows. Use `npm install -g @xai-official/grok` [OBSERVADO] ou baixe e leia primeiro [INFERÊNCIA] (seção 1B) |
| Git Bash | `install.sh` funciona em "macOS / Linux / Git Bash" [OBSERVADO README] | — |
| Arquivo de config | "`~/.grok/config.toml` (on Windows, `%USERPROFILE%\.grok\config.toml`)" [OBSERVADO] (https://docs.x.ai/build/settings) | `$GROK_HOME` muda a pasta |
| Onde o binário fica | `%USERPROFILE%\.grok\bin` + PATH do usuário [OBSERVADO no script] | Abra um terminal novo depois de instalar |
| `export VAR=...` | Só a forma bash aparece na doc | Use `$env:XAI_API_KEY = "..."` [INFERÊNCIA] |
| curl multilinha `\` | A doc usa `\` (bash) | No pwsh, a continuação é a crase (`` ` ``) ou uma linha só; o JSON entre aspas simples pode quebrar. Prefira `Invoke-RestMethod -Body (… \| ConvertTo-Json)` [INFERÊNCIA] |
| Sandbox | Só Landlock (Linux) e Seatbelt (macOS) [OBSERVADO] | Sem menção a Windows [NÃO VERIFICADO]; use `ask`/`dontAsk` + regras |
| Terminal do VS Code/Cursor | "cannot distinguish `Shift+Enter` from `Enter`; use `Alt+Enter` for newlines" [OBSERVADO] (https://docs.x.ai/build/cli/terminal-support) | — |
| Túneis | `winget install ngrok -s msstore` / `winget install --id Cloudflare.cloudflared` [OBSERVADO] | — |
| Grok Bot | Setup `.exe` x64/Arm64; silencioso `/S`; por usuário em `%LOCALAPPDATA%\Programs` [OBSERVADO] | Não instale como SYSTEM |
| Python 3.13 | `xai-sdk` exige ≥3.10 [OBSERVADO] | ✅ |
| Node 24 | `npm install -g @xai-official/grok` / `npm install @xai-official/sdk` [OBSERVADO] | Versão mínima de Node não verificada [NÃO VERIFICADO] |

---

## 8. Lacunas
- **[NÃO VERIFICADO]** Nenhum comando foi **executado** (só leitura; sem chave de API nem login).
- **[NÃO VERIFICADO]** A doc não descreve a sintaxe dos argumentos de `grok plugin marketplace add` e de `grok plugin install` além de `<name> --trust`. Use `grok plugin --help` / `grok <subcommand> --help` (a doc manda: "run `grok --help` or `grok <subcommand> --help` for the complete set").
- **[NÃO VERIFICADO]** Sandbox no Windows; versão mínima de Node para `@xai-official/grok`/`@xai-official/sdk`; o que acontece com `npm install --ignore-scripts`.
- **[NÃO VERIFICADO]** Não há checksum/assinatura publicada para o binário do Grok Build; o instalador que li só verifica o hash do MinGit.
- **[NÃO VERIFICADO]** O Grok Bot não tem CLI documentada: instalação, connectors, skills e rotinas são feitos pela interface ou pelo chat.
- A compatibilidade com a API da Anthropic (`/v1/messages`) está documentada como **descontinuada**; não incluí exemplo de uso.
- O app Grok (grok.com) não tem comandos: é tudo interface; os passos foram listados na seção 4D.
