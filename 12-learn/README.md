# 12 — Learn (afinar o harness)

## Objetivo
Entender o comando `/learn` do Grok Build: ler suas sessões, achar o que você repete, e ajustar skills/plugins/MCP para a próxima sessão precisar de menos digitação.

## Por quê
O Grok “aprende” o seu jeito de trabalhar só se alguém olhar as traces. O `/learn` faz isso em pipeline (coleta → map-reduce → relatório → curadoria). Sem curadoria humana, nada é apagado ou criado à toa.

## Analogia
É a revisão de temporada do time: o scout (collector) filma os jogos; os analistas (mappers/reducers) marcam padrões; o técnico (você) decide o que entra no treino da semana seguinte.

## Aulas desta pasta
1. `plano-execucao.md` — plano concreto da **1ª execução** nesta máquina (preço, modo, passos)
2. Este README — mapa rápido do skill

## Como rodar (contexto novo)
Abra uma **nova sessão** do Grok Build e digite:

```text
/learn
```

Ou, se quiser pular a pergunta inicial (depois de ler o plano):

```text
/learn --mode step --days 30
```

Na **primeira execução** o skill força modo `step` (mesmo se você pedir `auto`), porque `auto` pode aposentar skills sem você ter visto um relatório antes.

## Checklist
- [ ] Ler `plano-execucao.md`
- [ ] Abrir sessão nova do Grok
- [ ] Rodar `/learn` e deixar o workflow terminar (não feche o TUI)
- [ ] Curar o relatório (grupo a grupo)
- [ ] Anotar aqui o caminho do `report.md` gerado
