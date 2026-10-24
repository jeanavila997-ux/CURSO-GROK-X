# Plano de execução — `/learn` (1ª rodada)

> Gerado em **2026-10-24** a partir do `/learn` nesta sessão.  
> Destino: nova sessão do Grok Build (contexto limpo).  
> Pasta do curso: `Curso GROK\12-learn\`

---

## 1. O que o `/learn` faz (visão de professor)

O skill lê as sessões em que **você** digitou, procura frases repetidas e skills pouco usadas, e propõe mudanças no *harness* (skills, plugins, MCP, workflows).

```
Você (agente top-level)
│
├── 0. state.py get + estimate          → preço e retomada
├── 1. collect_sessions.py              → sessions/, usage, phrases
├── 2. workflow learn-traces.rhai       → map → reduce → verify → report
├── 3. Resumo curto no chat             → Overview + tabelas
└── 4. Curadoria com você               → apply / defer / reject
```

**Analogia:** o collector é a câmera do estádio; o workflow é a comissão técnica; o relatório é o scouting report; a curadoria é você assinando a escalação.

---

## 2. Medição já feita (esta máquina)

| Campo | Valor |
|---|---|
| `PYTHON` | `C:\Users\Jean\AppData\Local\Programs\Python\Python313\python.exe` |
| `GROK_HOME` | `C:\Users\Jean\.grok` |
| Skill dir | `C:\Users\Jean\.grok\bundled\skills\learn` |
| Sessões vistas | 7 |
| Mantidas (kept) | **6** |
| Descartadas | 1 headless |
| Escopos all / 14d / 30d / quick | **iguais** (só existem 6 sessões) |
| Agentes estimados | ~11 |
| Tokens estimados | **~7,7M** (±50%) |
| Tempo de parede | **~16–51 min** |
| `last_completed_at` | `null` → **primeira execução** |
| Escopo recomendado | `all` |

Comandos usados:

```powershell
& "C:\Users\Jean\AppData\Local\Programs\Python\Python313\python.exe" `
  "C:\Users\Jean\.grok\bundled\skills\learn\state.py" get

& "C:\Users\Jean\AppData\Local\Programs\Python\Python313\python.exe" `
  "C:\Users\Jean\.grok\bundled\skills\learn\collect_sessions.py" --estimate --batch 1
```

---

## 3. Decisões desta rodada

| Pergunta | Resposta do Jean | O que vale na prática |
|---|---|---|
| Modo | pediu `auto` | **Forçado para `step`** — regra do skill na 1ª execução (auto aposentaria skills sem relatório visto) |
| Escopo | “Other” + pedido de pasta no curso | Documentar o plano aqui; na execução usar **`all`** (mesmo corpus que 14d/30d/quick) |
| Contexto | “vamos para um novo contexto” | **Não lançar o workflow nesta sessão** — abrir sessão nova e seguir este plano |

Sessões headless ficam de fora (padrão). Só incluir com `--include-headless` se você pedir.

---

## 4. Passo a passo na sessão nova

### Passo 0 — Retomar ou estimar
1. Rodar `state.py get` (python → `py -3` → `python3`).
2. Se `exit 3` e status `report_ready` / `curating`: retomar curadoria, **não** coletar de novo.
3. Se status `running` sem `report.md`: ler parcial ou recomeçar.
4. Se status `collected`: só lançar o workflow.
5. Senão: `--estimate` e confirmar preço em uma linha.

### Passo 1 — Coletar
```powershell
& "C:\Users\Jean\AppData\Local\Programs\Python\Python313\python.exe" `
  "C:\Users\Jean\.grok\bundled\skills\learn\collect_sessions.py"
```
(escopo `all` = sem `--days` / sem `--limit`; ou `--days 30` — mesmo resultado hoje.)

Antes de lançar o workflow, anunciar:
- cobertura (`seen` / `kept` / `dropped`);
- preço do `manifest.json` → `estimate`;
- prompts das N sessões vão para o modelo;
- fechar o TUI **mata** o run; deixar idle é ok.

Se `kept` &lt; 5: **não** lançar (custo fixo ~5M tokens não vale). Hoje temos 6 → ok.

### Passo 2 — Map-reduce
1. `state.py set --run-dir <RUN> --status running --mode step --scope all`
2. Lançar workflow `learn-traces` com `args` como **objeto JSON** (não string):
   - `run_dir`, `count`, `skill_dir`, `grok_home`, `python`, `batch` (10), `fan` (10), `today`, `user_label` (“Jean”)
3. Em seguida, **bloquear** com:
```powershell
& "C:\Users\Jean\AppData\Local\Programs\Python\Python313\python.exe" `
  "C:\Users\Jean\.grok\bundled\skills\learn\state.py" wait `
  --run-dir "<RUN>" --timeout-min 81
```
(`51 + 30` minutos de folga.)

### Passo 3 — Apresentar
Ler `report.md`. Mostrar Overview + top das 3 tabelas + Coverage + caminho do relatório. **Terminar o turno aí** (sem picker ainda).

### Passo 4 — Curar (`step`)
Uma pergunta por grupo:
1. Frases → create/edit  
2. Updates  
3. Deletes/disables — **nesta rodada provavelmente pular**: `disuse_evidence.sufficient` exige ≥20 sessões ou ≥7 dias em janela larga; com 6 sessões, zero hits **não** prova desuso  
4. Gaps (só discussão)

Registrar cada decisão com `state.py decide`. Fechar com `status done`.

---

## 5. Prompt pronto para a sessão nova

Cole isto no Grok Build:

```text
/learn — continuar o plano em Curso GROK\12-learn\plano-execucao.md

Modo: step (1ª execução; ignore auto)
Escopo: all (6 sessões, ~7.7M tokens, ~16–51 min)
Já medido: PYTHON e GROK_HOME no plano. Sem pending esperado.
Siga steps 1→4 do skill learn. Não apague skills antes do report.
```

---

## 6. Onde ficam os artefatos

| Artefato | Caminho |
|---|---|
| Runs | `%USERPROFILE%\.grok\learn\runs\<UTC>\` |
| Relatório | `...\report.md` + `actions.json` |
| Lixeira / undo | `%USERPROFILE%\.grok\learn\trash\<run>\` |
| Ledger de decisões | `%USERPROFILE%\.grok\learn\decisions.jsonl` |
| Estado | `%USERPROFILE%\.grok\learn\state.json` |

---

## 7. Regras de ouro (não negociar)

1. Nada é aposentado/editado **antes** do `report_ready` e do relatório na tela.
2. Primeira execução = modo **step**.
3. Janela estreita (&lt;20 sessões) → **não** deletar/disable por “zero uso”.
4. Fechar o TUI no meio do workflow interrompe o run.
5. Nunca imprimir segredos (tokens, chaves, headers).

---

## 8. Depois desta rodada

- Anotar abaixo o `run_dir` e o link do `report.md`.
- Próximo `/learn` deve preferir `--since-last` (só sessões novas).
- Se `since_last` = 0 sessões: parar; não reprocessar o mesmo corpus.

### Registro pós-execução
- [ ] `run_dir`: _______________________________
- [ ] `report.md`: _______________________________
- [ ] Ações aplicadas: _________________________
- [ ] Ações adiadas / rejeitadas: _______________
