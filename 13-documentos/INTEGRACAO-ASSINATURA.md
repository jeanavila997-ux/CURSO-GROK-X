# Integração da assinatura Grok — mapa local (Jean)

> Atualizado em **24/10/2026** após instalar **Grok Bot 0.75.5** (`xAI.GrokBot`).  
> Objetivo: fundir o uso da assinatura nas **quatro superfícies** oficiais, com permissões claras.

---

## 1. As quatro superfícies (mesma assinatura, papéis diferentes)

| Superfície | Onde | O que faz | Auth |
|---|---|---|---|
| **App / SuperGrok** | grok.com + PWA Chrome já instalada | Chat, Imagine, Skills do app | Conta xAI / X |
| **Grok Build (CLI)** | `~\.grok\bin\grok.exe` **1.0.70** | Código, shell, MCP, skills locais | Login CLI (`~\.grok\auth.json`) |
| **Grok Bot** | `%LOCALAPPDATA%\Programs\Grok Bot\` **0.75.5** | Agente 24/7 com PC na nuvem + opcional PC local | **Conta Cursor** + link SuperGrok |
| **API** | `api.x.ai` + Console | Apps seus, SDKs, tools cobradas | `XAI_API_KEY` (não versionar) |

**Analogia:** a assinatura é um passe de clube. O app é a academia; o Build é a oficina; o Bot é o funcionário com notebook na nuvem; a API é alugar o time por hora.

Elas **não compartilham automaticamente** login entre si. O elo da assinatura SuperGrok ↔ Bot é o passo **Link Grok Account** / **Get Access with Grok** dentro do Bot.

---

## 2. O que já está nesta máquina

| Item | Estado |
|---|---|
| Grok Build CLI 1.0.70 | ✅ `~\.grok\bin\grok.exe` (PATH) |
| npm `@xai-official/grok` 1.0.70 | ✅ global |
| Permissões Build | ✅ `permission_mode = "always-approve"` + `yolo = true` em `~\.grok\config.toml` |
| Grok Bot 0.75.5 | ✅ winget `xAI.GrokBot` · Start Menu · exe em Programs |
| WebView2 Runtime | ✅ (dependência típica de apps Electron) |
| PWA Grok (Chrome) | ✅ atalho “Apps do Chrome\Grok” (não é o Bot) |
| Cursor IDE | ❌ não obrigatório; o Bot abre login no **navegador** |
| `XAI_API_KEY` no shell | ⚪ use só quando for API; prefira `.env` de projeto |

**Não instalamos** os pacotes WinGet de coincidência (Ngrok, Sigrok, hellogrok de terceiros, etc.) — ver `WINGET-PACOTES-GROK.md`.

---

## 3. Checklist humano (5 minutos) — fundir a assinatura no Bot

1. Abrir **Grok Bot** (já pode estar na tela).
2. **Sign in with Cursor** → concluir no navegador.
3. Se o acesso vem do **SuperGrok**:  
   **Settings → Usage & Billing → Get Access with Grok** (desktop)  
   ou no mobile: **Link Grok Account** → **Finished Linking? Refresh My Status**.
4. Conferir que **não** está em Legacy Privacy Mode da conta Cursor (a doc exige storage em nuvem suportado):  
   https://cursor.com/dashboard/settings?openPrivacy=true
5. Criar o primeiro Bot com **um** trabalho claro (ver módulo 11).

Fonte oficial: https://docs.x.ai/grok-bot/get-started

---

## 4. Permissões locais — Build vs Bot

### Grok Build (já alinhado ao seu pedido “permita tudo nesta máquina”)

```toml
# ~/.grok/config.toml  [ui]
yolo = true
permission_mode = "always-approve"
```

Sessão aberta: `/always-approve` ou `Ctrl+O`.  
`deny` rules e hooks PreToolUse **continuam** valendo.

### Grok Bot — execução neste PC

Na UI: **Settings → Computer → Your computer → Execution on this computer**

| Opção | Efeito |
|---|---|
| Ask every time (padrão) | Pede a cada comando |
| Always allow | Todos os Bots podem rodar comandos **neste** PC |
| Never allow | Só usa o computador **na nuvem** do Bot |

⚠️ A própria doc recomenda **Never allow** por padrão. **Always allow** vale para **todos** os Bots — não use Bots separados como fronteira de segurança.  
Fonte: https://docs.x.ai/grok-bot/approvals-security-and-privacy

**Decisão do Jean (24/10/2026):** **Always allow** neste PC — alinhado ao Build (`always-approve`).

Como aplicar (a preferência só grava **depois do login**, na UI do app; não há chave estável pré-auth no perfil):

1. Faça Sign in with Cursor + link SuperGrok.
2. Na primeira pergunta “Allow Grok Bot and all Bots to run commands on your local computer?”, escolha **Always allow**.
3. Ou depois: **Settings → Computer → Your computer → Execution on this computer → Always allow**.
4. Senhas / 2FA: use **Take over** → digite você → **I'm done** (o Bot não vê a senha).

---

## 5. Como “fundir” o dia a dia (roteiro prático)

| Quero… | Use |
|---|---|
| Codar / editar repo / MCP local / `/learn` | **Grok Build** |
| Tarefa longa 24/7, rotina, apps na nuvem | **Grok Bot** |
| Chat rápido / Imagine / X | **App grok.com** (PWA) |
| Integrar Grok num app seu | **API** + `XAI_API_KEY` |

Mesma assinatura paga o “cérebro”; a superfície escolhe as **mãos**.

---

## 6. Comandos úteis (PowerShell)

```powershell
# Conferir versões
grok --version
winget list --id xAI.GrokBot --exact

# Reabrir o Bot
Start-Process "$env:LOCALAPPDATA\Programs\Grok Bot\Grok Bot.exe"

# Atualizar Bot (quando sair versão nova)
winget upgrade --id xAI.GrokBot --exact

# Atualizar CLI (npm; binário nativo também atualiza pelo próprio grok)
npm install -g --allow-scripts=@xai-official/grok @xai-official/grok
```

---

## 7. Instalação feita nesta sessão

```powershell
winget install --id xAI.GrokBot --exact --accept-package-agreements --accept-source-agreements
# → Grok Bot 0.75.5 · SpaceXAI · %LOCALAPPDATA%\Programs\Grok Bot\
npm install -g --allow-scripts=@xai-official/grok @xai-official/grok@1.0.70
```

Dependências de sistema verificadas: **WebView2** presente; arquitetura **AMD64** (instalador win32-x64).
