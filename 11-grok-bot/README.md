# 11 — Grok Bot

## Três “Groks” no dia a dia (mais a API)

| | App grok.com | Grok Build CLI | Grok Bot desktop |
|---|---|---|---|
| Onde | Web / PWA Chrome | Terminal | App local + PC na nuvem |
| Força | Chat, Imagine, X | Arquivos, shell, MCP | Rotinas 24/7, apps conectados |
| Nesta máquina | Atalho Chrome “Grok” | `grok` 1.0.70 | **0.75.5** instalado 24/10/2026 |

**API** (`api.x.ai`) é a quarta superfície — para apps seus com `XAI_API_KEY`.

Mapa completo da assinatura: [`../13-documentos/INTEGRACAO-ASSINATURA.md`](../13-documentos/INTEGRACAO-ASSINATURA.md)

## Instalação (já feita)

```powershell
winget install --id xAI.GrokBot --exact --accept-package-agreements --accept-source-agreements
Start-Process "$env:LOCALAPPDATA\Programs\Grok Bot\Grok Bot.exe"
```

## Login (você precisa fazer na UI)

1. **Sign in with Cursor** (abre o navegador)
2. Se usa SuperGrok: **Settings → Usage & Billing → Get Access with Grok**
3. Revisar privacy da conta Cursor (sem Legacy Privacy Mode)
4. Permissão neste PC: **Settings → Computer → Your computer**

## Ideias de bot (Jean)

1. Resumo diário Grok/xAI no Obsidian  
2. Manutenção do PC via Mestre do PC  
3. Assistente da `vitrine-de-apps`  
4. Radar de lançamentos SpaceX  
5. Bot de prompts (pasta 11-prompts)

## Próximo passo

1. Concluir o login + link da assinatura  
2. Escolher **1** ideia → primeiro Bot com um único trabalho  
3. Salvar protótipo / rotina em `11-grok-bot/prototipos/`
