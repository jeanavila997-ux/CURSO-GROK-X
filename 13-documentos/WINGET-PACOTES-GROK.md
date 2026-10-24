# Guia dos pacotes “Grok” encontrados no WinGet

> **Módulo 13 — Curso GROK** · Consolidado em 24/10/2026  
> Reorganiza a saída de `winget find "grok"`: pacotes **xAI**, **terceiros relacionados**, **tag grok** e **coincidências textuais**.  
> Comandos pensados para **PowerShell 7** (máquina do Jean: pwsh 7.6.x).

**Analogia:** o `winget find` é uma busca no catálogo da loja. Digitar “grok” também puxa quem tem *tag* grok, quem tem *ngrok* no nome e até *Sigrok* (porque “grok” está no meio). Por isso separamos as prateleiras antes de instalar.

**Nota desta máquina (AGENTS.md):** o Grok Build CLI já existe via npm (`@xai-official/grok`) e binário em `~\.grok\bin\grok.exe`. Antes de `winget install xAI.GrokBuild`, rode `winget show` e compare a versão com `grok --version` — evitar duas instalações competindo no PATH.

---

## 1. Comando pesquisado

No PowerShell 7.6.8:

```powershell
winget find "grok"
```

Resultado apresentado:

```text
Nome                                ID                         Versão  Correspondência   Origem
------------------------------------------------------------------------------------------------
Grok App                            RongleCat.GrokApp          0.2.42  ProductCode: grok winget
Grok Build                          xAI.GrokBuild              1.0.70  Command: grok     winget
Ullage                              Dualface.Ullage            0.3.5   Tag: grok         winget
Wrok                                NASS.Wrok                  1.6.3   Tag: grok         winget
Pane                                Pane.Pane                  0.9.1   Tag: grok         winget
Agent Island                        TristanTang.AgentIsland    2.1.2   Tag: grok         winget
Grox                                dandandujie.Grox           0.3.5   Tag: grok         winget
hellogrok                           hellowind777.hellogrok     0.1.41  Tag: grok         winget
hellogrok-cli                       hellowind777.hellogrok.CLI 0.1.41  Tag: grok         winget
AI Usage Dashboard                  neyham.AIUsageDashboard    0.9.4   Tag: grok         winget
Ceiling                             tsouth89.Ceiling           1.5.45  Tag: grok         winget
Grok Bot                            xAI.GrokBot                0.75.5  Tag: grok         winget
Gengchou                            ynjmxn.Gengchou            2.5.3   Tag: grok         winget
Ngrok                               Ngrok.Ngrok                3.3.1                     winget
PulseView                           Sigrok.PulseView           0.4.2                     winget
PulseView (Nightly)                 Sigrok.PulseView.Nightly   nightly                   winget
GX.AI for [Grok AI]                 9PBQT008TRLG               Unknown                   msstore
WSDD - WebStack Deployer for Docker wnunezc.WSDD               2.1.0   Tag: ngrok        winget
OrbCue                              QZYH123.OrbCue             0.2.9   Tag: grok-build   winget
```

O WinGet pode encontrar um aplicativo pelo nome, ID, moniker e outros campos. Na instalação, `--id` restringe a pesquisa ao identificador e `--exact` exige correspondência exata.  
Fonte: [install Command | Microsoft Learn](https://learn.microsoft.com/windows/package-manager/winget/install)

---

## 2. Grok / xAI

Os dois resultados com ID no namespace **`xAI.`**:

### Grok Build

| Campo | Valor |
|---|---|
| Nome | Grok Build |
| ID | `xAI.GrokBuild` |
| Versão (na busca) | 1.0.70 |
| Encontro | Command: `grok` |
| Origem | winget |

```powershell
winget show --id xAI.GrokBuild --exact
winget install --id xAI.GrokBuild --exact
```

### Grok Bot

| Campo | Valor |
|---|---|
| Nome | Grok Bot |
| ID | `xAI.GrokBot` |
| Versão (na busca) | 0.75.5 |
| Encontro | Tag: grok |
| Origem | winget |

```powershell
winget show --id xAI.GrokBot --exact
winget install --id xAI.GrokBot --exact
```

---

## 3. Terceiros associados à pesquisa por Grok

IDs **fora** do namespace `xAI` — examine com `show` antes de instalar.

### Grok App — `RongleCat.GrokApp` 0.2.42

Correspondência: ProductCode: grok

```powershell
winget show --id RongleCat.GrokApp --exact
winget install --id RongleCat.GrokApp --exact
```

### Grox — `dandandujie.Grox` 0.3.5

Correspondência: Tag: grok

```powershell
winget install --id dandandujie.Grox --exact
```

### hellogrok — `hellowind777.hellogrok` 0.1.41

```powershell
winget install --id hellowind777.hellogrok --exact
```

### hellogrok-cli — `hellowind777.hellogrok.CLI` 0.1.41

CLI de terceiros: merece `show` se a intenção é terminal.

```powershell
winget show --id hellowind777.hellogrok.CLI --exact
winget install --id hellowind777.hellogrok.CLI --exact
```

### GX.AI for [Grok AI] — `9PBQT008TRLG` (msstore)

```powershell
winget show --id 9PBQT008TRLG --source msstore --exact
winget install --id 9PBQT008TRLG --source msstore --exact
```

### OrbCue — `QZYH123.OrbCue` 0.2.9

Correspondência: Tag: grok-build

```powershell
winget install --id QZYH123.OrbCue --exact
```

---

## 4. Outros programas com tag `grok`

Apareceram por metadados. Só a lista do WinGet **não** prova a relação com o Grok da xAI — use `show`.

```powershell
winget show --id neyham.AIUsageDashboard --exact
winget install --id neyham.AIUsageDashboard --exact

winget show --id TristanTang.AgentIsland --exact
winget install --id TristanTang.AgentIsland --exact

winget show --id tsouth89.Ceiling --exact
winget install --id tsouth89.Ceiling --exact

winget show --id Dualface.Ullage --exact
winget install --id Dualface.Ullage --exact

winget show --id NASS.Wrok --exact
winget install --id NASS.Wrok --exact

winget show --id Pane.Pane --exact
winget install --id Pane.Pane --exact

winget show --id ynjmxn.Gengchou --exact
winget install --id ynjmxn.Gengchou --exact
```

| Nome | ID |
|---|---|
| AI Usage Dashboard | `neyham.AIUsageDashboard` |
| Agent Island | `TristanTang.AgentIsland` |
| Ceiling | `tsouth89.Ceiling` |
| Ullage | `Dualface.Ullage` |
| Wrok | `NASS.Wrok` |
| Pane | `Pane.Pane` |
| Gengchou | `ynjmxn.Gengchou` |

---

## 5. Resultados que **não** devem ser confundidos com Grok

### Ngrok — `Ngrok.Ngrok`

**ngrok** ≠ **Grok**. Túnel de rede; nome parecido.

```powershell
winget show --id Ngrok.Ngrok --exact
winget install --id Ngrok.Ngrok --exact   # só se você quiser o ngrok de verdade
```

### PulseView / Sigrok

IDs: `Sigrok.PulseView` e `Sigrok.PulseView.Nightly`.

```text
sigrok
   └─ grok   ← substring, não o produto xAI
```

```powershell
winget install --id Sigrok.PulseView --exact
winget install --id Sigrok.PulseView.Nightly --exact
```

### WSDD — `wnunezc.WSDD`

Correspondência: Tag: **ngrok** (indireta: grok → ngrok → WSDD).

```powershell
winget install --id wnunezc.WSDD --exact
```

---

## 6. Lista completa dos comandos de instalação

```powershell
# ==========================================
# GROK / xAI
# ==========================================

winget install --id xAI.GrokBuild --exact
winget install --id xAI.GrokBot --exact


# ==========================================
# CLIENTES / FERRAMENTAS RELACIONADAS
# ==========================================

winget install --id RongleCat.GrokApp --exact
winget install --id dandandujie.Grox --exact
winget install --id hellowind777.hellogrok --exact
winget install --id hellowind777.hellogrok.CLI --exact
winget install --id QZYH123.OrbCue --exact


# ==========================================
# MICROSOFT STORE
# ==========================================

winget install --id 9PBQT008TRLG --source msstore --exact


# ==========================================
# OUTROS PACOTES COM TAG GROK
# ==========================================

winget install --id neyham.AIUsageDashboard --exact
winget install --id TristanTang.AgentIsland --exact
winget install --id tsouth89.Ceiling --exact
winget install --id Dualface.Ullage --exact
winget install --id NASS.Wrok --exact
winget install --id Pane.Pane --exact
winget install --id ynjmxn.Gengchou --exact


# ==========================================
# NÃO CONFUNDIR COM GROK
# ==========================================

winget install --id Ngrok.Ngrok --exact
winget install --id Sigrok.PulseView --exact
winget install --id Sigrok.PulseView.Nightly --exact
winget install --id wnunezc.WSDD --exact
```

---

## 7. Recomendação antes de instalar

Não instale todos de uma vez. Use `winget show` para ver descrição, publisher e instalador.

```powershell
winget show --id xAI.GrokBuild --exact
winget show --id xAI.GrokBot --exact
winget show --id RongleCat.GrokApp --exact
winget show --id hellowind777.hellogrok.CLI --exact
```

Depois:

```powershell
winget install --id ID.DO.PACOTE --exact
```

`--id` + `--exact` evitam que uma busca por `grok` escolha `ngrok` ou `Sigrok` por engano.

---

## Resumo da organização

```text
GROK / xAI
├── xAI.GrokBuild
└── xAI.GrokBot

RELACIONADOS À PESQUISA POR GROK
├── RongleCat.GrokApp
├── dandandujie.Grox
├── hellowind777.hellogrok
├── hellowind777.hellogrok.CLI
├── 9PBQT008TRLG          (msstore)
└── QZYH123.OrbCue

PACOTES COM TAG "GROK"
├── neyham.AIUsageDashboard
├── TristanTang.AgentIsland
├── tsouth89.Ceiling
├── Dualface.Ullage
├── NASS.Wrok
├── Pane.Pane
└── ynjmxn.Gengchou

OUTRAS CORRESPONDÊNCIAS (não são o Grok xAI)
├── Ngrok.Ngrok
├── Sigrok.PulseView
├── Sigrok.PulseView.Nightly
└── wnunezc.WSDD
```

---

## Checklist do curso

- [ ] Rodar `winget find "grok"` e comparar com esta tabela (versões mudam)
- [ ] `winget show` só nos IDs `xAI.*` que interessam
- [ ] Confirmar se o CLI atual já cobre o Grok Build antes de reinstalar
- [ ] Nunca instalar a seção 5 por engano pensando que é xAI
