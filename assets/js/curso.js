/**
 * Curso GROK — motor do portal
 * Banco local = localStorage (chave curso-grok-db-v1)
 * Analogia: o localStorage é a gaveta do navegador — cada site tem a sua.
 */

const DB_KEY = "curso-grok-db-v1";

const SLASH_COMMANDS = [
  { cmd: "/help", desc: "Ajuda geral do Grok Build" },
  { cmd: "/model", desc: "Trocar ou ver o modelo" },
  { cmd: "/plan", desc: "Entrar em modo plano" },
  { cmd: "/review", desc: "Revisão de código" },
  { cmd: "/design", desc: "Documento de design" },
  { cmd: "/execute-plan", desc: "Executar plano aprovado" },
  { cmd: "/create-skill", desc: "Criar skill nova" },
  { cmd: "/create-workflow", desc: "Criar workflow Rhai" },
  { cmd: "/learn", desc: "Aprender com sessões anteriores" },
  { cmd: "/deep-research", desc: "Pesquisa profunda citada" },
  { cmd: "/novidades", desc: "Radar de novidades de IA" },
  { cmd: "/docs", desc: "Buscar docs oficiais" },
  { cmd: "/memoria", desc: "Ler/atualizar memória Obsidian" },
  { cmd: "/cyber", desc: "Agente de cibersegurança" },
  { cmd: "/controle-pc", desc: "Controle do PC" },
  { cmd: "/agente", desc: "Criar agentes CLI" },
  { cmd: "/prompts-novos", desc: "Extrair prompts novos" },
  { cmd: "/build-with-ai", desc: "Construir features de IA" },
  { cmd: "/game-assets", desc: "Arte e assets de jogo" },
  { cmd: "/statusline", desc: "Configurar status line" },
  { cmd: "/resume-claude", desc: "Retomar sessão Claude" },
  { cmd: "/resume-codex", desc: "Retomar sessão Codex" },
  { cmd: "/resume-cursor", desc: "Retomar sessão Cursor" },
  { cmd: "/always-approve", desc: "Modo always-approve / yolo" },
  { cmd: "/feedback", desc: "Enviar feedback do produto" },
  { cmd: "/skills", desc: "Listar skills" },
  { cmd: "/mcp", desc: "Ferramentas MCP" },
  { cmd: "/compact", desc: "Compactar contexto" },
  { cmd: "/clear", desc: "Limpar conversa" },
  { cmd: "/cost", desc: "Ver uso / custo" },
  { cmd: "/init", desc: "Inicializar projeto" },
  { cmd: "/diff", desc: "Ver diferenças" },
  { cmd: "/commit", desc: "Ajuda a commitar" },
  { cmd: "/pr", desc: "Criar pull request" },
  { cmd: "/test", desc: "Rodar testes" },
  { cmd: "/doctor", desc: "Diagnóstico do ambiente" }
];

const CONTENT = {
  plano: {
    titulo: "Plano Inicial",
    html: `
      <h3>O que vamos fazer</h3>
      <p>Transformar o Grok (CLI, bot no X e ecossistema Elon) em uma <strong>ferramenta diária</strong>, com método, pastas e progresso medido.</p>
      <div class="analogy"><strong>Analogia:</strong> sem plano, o Grok é um supermercado gigante. Com plano, você entra com lista de compras.</div>
      <h3>Mapa de 4 semanas</h3>
      <ul>
        <li><strong>Semana 1</strong> — CLI básico, slash (/), memória, modo professor</li>
        <li><strong>Semana 2</strong> — Skills, MCP, workflow PEDRA</li>
        <li><strong>Semana 3</strong> — Projetos reais (vitrine, CattleGen, Mestre do PC)</li>
        <li><strong>Semana 4</strong> — Conexões X/SpaceX/Tesla + ideias de bots</li>
      </ul>
      <h3>Setup rápido (sua máquina)</h3>
      <pre>grok --version
# Grok Build CLI já instalado (~1.0.67)
# Desktop → pasta "Curso GROK" → abrir index.html</pre>
    `
  },
  estrutura: {
    titulo: "Estrutura do Curso",
    html: `
      <h3>Quatro trilhas</h3>
      <ul>
        <li><strong>CLI</strong> — Grok Build no terminal</li>
        <li><strong>Bot</strong> — Grok no X e automações</li>
        <li><strong>MCP</strong> — conectores (GitHub, Gmail, REA…)</li>
        <li><strong>Ecossistema</strong> — empresas Elon e ideias de produto</li>
      </ul>
      <div class="analogy"><strong>Analogia:</strong> a pasta do curso é o caderno; o portal é o sumário clicável; o localStorage é o carimbo de “já li”.</div>
    `
  },
  workflow: {
    titulo: "Workflow PEDRA",
    html: `
      <h3>Ciclo PEDRA</h3>
      <ol>
        <li><strong>P</strong>edir — objetivo claro em 1 frase</li>
        <li><strong>E</strong>sboçar — /plan quando a tarefa for grande</li>
        <li><strong>D</strong>esenvolver — Grok edita e explica</li>
        <li><strong>R</strong>evisar — /review ou subagent revisor</li>
        <li><strong>A</strong>notar — memória Obsidian + InfoMaquina</li>
      </ol>
      <pre># Exemplo de pedido bom
"Crie um script pwsh que liste portas em 127.0.0.1 e explique cada linha."</pre>
      <div class="analogy"><strong>Analogia:</strong> PEDRA é a receita do bolo. Pular o “esboçar” em tarefa grande é misturar ingredientes sem medida.</div>
    `
  },
  dev: {
    titulo: "Desenvolvimento",
    html: `
      <h3>Prompt de engenharia</h3>
      <ul>
        <li>Contexto: pasta do projeto + AGENTS.md</li>
        <li>Objetivo: o que deve existir ao final</li>
        <li>Restrições: ESM, pt-BR, não inventar testes</li>
        <li>Verificação: como provar que funcionou</li>
      </ul>
      <h3>Projetos seus para praticar</h3>
      <ul>
        <li><code>vitrine-de-apps</code></li>
        <li><code>app-cruzamento-bovinos</code> (CattleGen)</li>
        <li><code>Mestre-do-PC-V10</code></li>
        <li><code>chat-ia</code></li>
      </ul>
    `
  },
  metas: {
    titulo: "Metas (OKRs)",
    html: `
      <h3>Objetivo</h3>
      <p>Usar Grok com fluência em CLI, MCP e conexões do ecossistema Elon.</p>
      <h3>Resultados-chave</h3>
      <ul>
        <li>Completar 100% das aulas neste portal</li>
        <li>Dominar 10 comandos slash do dia a dia</li>
        <li>Criar 1 skill + 1 workflow úteis</li>
        <li>Publicar 3 ideias de melhoria ligadas a empresas Elon</li>
      </ul>
    `
  },
  db: {
    titulo: "Banco de Dados do Curso",
    html: `
      <h3>Onde fica o progresso?</h3>
      <p>No <strong>localStorage</strong> do navegador, chave <code>curso-grok-db-v1</code>.</p>
      <div class="analogy"><strong>Analogia:</strong> não é SQL no servidor — é um caderninho que o Chrome/Edge guarda só neste PC e nesta origem (file:// ou localhost).</div>
      <h3>Exportar / importar</h3>
      <p>Use os botões da barra de ferramentas. O JSON vai para Downloads e pode voltar com Importar.</p>
    `
  },
  ferramentas: {
    titulo: "Ferramentas",
    html: `
      <h3>Famílias principais</h3>
      <ul>
        <li>Arquivos: read / write / search_replace / grep</li>
        <li>Shell: run_terminal_command (pwsh)</li>
        <li>Web: web_search, open_page</li>
        <li>X: x_keyword_search, x_thread_fetch…</li>
        <li>Imagine: image_gen, image_edit, vídeo</li>
        <li>MCP: search_tool + use_tool</li>
      </ul>
    `
  },
  mcp: {
    titulo: "MCP",
    html: `
      <h3>O que é MCP?</h3>
      <p><strong>Model Context Protocol</strong> — um padrão para o agente “plugar” ferramentas externas.</p>
      <div class="analogy"><strong>Analogia:</strong> MCP é a tomada universal. O Grok é o aparelho; GitHub/Gmail/REA são os eletrodomésticos.</div>
      <h3>Servidores que você já tem</h3>
      <ul>
        <li>github, gmail, google_drive, notion</li>
        <li>mestre_do_pc, rea, cursor, exa, tasks</li>
      </ul>
      <pre>1) search_tool com a palavra-chave
2) use_tool com o schema correto</pre>
    `
  },
  conexoes: {
    titulo: "Conexões Livres",
    html: `
      <h3>Por que “conexões livres”?</h3>
      <p>Aqui você cruza Grok com o ecossistema Elon: X, SpaceX, Tesla, Neuralink… e inventa funções úteis.</p>
      <p>Role até o mapa de empresas abaixo — cada card traz ideias de melhoria aplicáveis no Grok.</p>
    `
  },
  slash: {
    titulo: "Comandos Slash (/)",
    html: `
      <h3>Por que a lista tem 100+ opções?</h3>
      <p>O menu <code>/</code> junta: comandos nativos do Grok Build + skills instaladas + workflows + comandos seus (Claude skills sincronizadas).</p>
      <div class="analogy"><strong>Analogia:</strong> é o cardápio do restaurante inteiro. Você não lê tudo — digita 2–3 letras e filtra.</div>
      <h3>Como usar bem</h3>
      <ul>
        <li>Digite <code>/</code> e já comece a filtrar: <code>/rev</code> → review</li>
        <li>Memorize 8–12 do dia a dia (veja o simulador abaixo)</li>
        <li>Skills raras ficam no menu, mas não poluem se você filtrar</li>
      </ul>
    `
  },
  bot: {
    titulo: "Grok Bot",
    html: `
      <h3>Dois “Groks”</h3>
      <ul>
        <li><strong>Grok no X</strong> — chat na rede, tempo real, cultura da plataforma</li>
        <li><strong>Grok Build CLI</strong> — engenharia no PC: arquivos, shell, MCP, skills</li>
      </ul>
      <h3>Ideias de bot para você</h3>
      <ul>
        <li>Resumo diário de posts sobre Grok/xAI</li>
        <li>Bot de manutenção do PC (via Mestre do PC)</li>
        <li>Assistente da vitrine-de-apps</li>
        <li>Radar de lançamentos SpaceX</li>
      </ul>
    `
  }
};

function defaultDb(modulos) {
  const lessons = {};
  for (const m of modulos) {
    for (const a of m.aulas) lessons[a.id] = false;
  }
  return {
    version: 1,
    completedLessons: lessons,
    notes: {},
    lastModuleId: "plano",
    updatedAt: new Date().toISOString()
  };
}

function loadDb(modulos) {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return defaultDb(modulos);
    const parsed = JSON.parse(raw);
    const base = defaultDb(modulos);
    return {
      ...base,
      ...parsed,
      completedLessons: { ...base.completedLessons, ...(parsed.completedLessons || {}) },
      notes: { ...(parsed.notes || {}) }
    };
  } catch {
    return defaultDb(modulos);
  }
}

function saveDb(db) {
  db.updatedAt = new Date().toISOString();
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

async function boot() {
  const res = await fetch("./data/modulos.json");
  const data = await res.json();
  const state = {
    data,
    db: loadDb(data.modulos),
    view: "home",
    moduleId: null,
    filter: ""
  };

  const els = {
    nav: document.getElementById("nav-modules"),
    search: document.getElementById("search"),
    bar: document.getElementById("progress-bar"),
    progressText: document.getElementById("progress-text"),
    home: document.getElementById("view-home"),
    module: document.getElementById("view-module"),
    cards: document.getElementById("module-cards"),
    moduleBody: document.getElementById("module-body"),
    statsAulas: document.getElementById("stat-aulas"),
    statsMods: document.getElementById("stat-mods"),
    statsDone: document.getElementById("stat-done"),
    statsEmp: document.getElementById("stat-emp"),
    slashInput: document.getElementById("slash-filter"),
    slashList: document.getElementById("slash-list")
  };

  function totals() {
    const aulas = state.data.modulos.reduce((n, m) => n + m.aulas.length, 0);
    const done = Object.values(state.db.completedLessons).filter(Boolean).length;
    return { aulas, done, mods: state.data.modulos.length, emp: state.data.empresasElon.length };
  }

  function moduleDone(m) {
    return m.aulas.every((a) => state.db.completedLessons[a.id]);
  }

  function renderProgress() {
    const t = totals();
    const pct = t.aulas ? Math.round((t.done / t.aulas) * 100) : 0;
    els.bar.style.width = pct + "%";
    els.progressText.textContent = `${t.done}/${t.aulas} aulas · ${pct}%`;
    els.statsAulas.textContent = String(t.aulas);
    els.statsMods.textContent = String(t.mods);
    els.statsDone.textContent = String(t.done);
    els.statsEmp.textContent = String(t.emp);
  }

  function renderNav() {
    const q = state.filter.trim().toLowerCase();
    els.nav.innerHTML = "";
    for (const m of state.data.modulos) {
      if (q && !(`${m.titulo} ${m.resumo}`.toLowerCase().includes(q))) continue;
      const btn = document.createElement("button");
      btn.className = "nav-item" + (moduleDone(m) ? " done" : "") + (state.moduleId === m.id ? " active" : "");
      btn.innerHTML = `
        <span class="dot" style="background:${moduleDone(m) ? "var(--ok)" : m.cor}"></span>
        <span class="meta">
          <strong>${m.numero} · ${m.titulo}</strong>
          <span>${m.resumo}</span>
        </span>`;
      btn.onclick = () => openModule(m.id);
      els.nav.appendChild(btn);
    }
  }

  function renderHome() {
    state.view = "home";
    state.moduleId = null;
    els.home.classList.remove("hidden");
    els.module.classList.add("hidden");
    const q = state.filter.trim().toLowerCase();
    els.cards.innerHTML = "";
    for (const m of state.data.modulos) {
      if (q && !(`${m.titulo} ${m.resumo}`.toLowerCase().includes(q))) continue;
      const done = moduleDone(m);
      const card = document.createElement("article");
      card.className = "card mod-card";
      card.innerHTML = `
        <div class="top">
          <div class="icon" style="box-shadow: inset 0 0 0 1px ${m.cor}55">${m.icone}</div>
          <span class="badge ${done ? "ok" : "wait"}">${done ? "Concluído" : "Em aberto"}</span>
        </div>
        <h3>${m.numero}. ${m.titulo}</h3>
        <p>${m.resumo}</p>
        <div class="foot">
          <span>${m.aulas.length} aulas</span>
          <span style="color:${m.cor}">abrir →</span>
        </div>`;
      card.onclick = () => openModule(m.id);
      els.cards.appendChild(card);
    }
    renderNav();
    renderProgress();
  }

  function openModule(id) {
    const m = state.data.modulos.find((x) => x.id === id);
    if (!m) return;
    state.view = "module";
    state.moduleId = id;
    state.db.lastModuleId = id;
    saveDb(state.db);
    els.home.classList.add("hidden");
    els.module.classList.remove("hidden");

    const content = CONTENT[id] || { titulo: m.titulo, html: `<p>${m.resumo}</p>` };
    const note = state.db.notes[id] || "";

    let empresasHtml = "";
    if (id === "conexoes") {
      empresasHtml = `<h3>Mapa de empresas Elon + ideias no Grok</h3><div class="empresa-grid">` +
        state.data.empresasElon.map((e) => `
          <article class="empresa">
            <h4>${e.nome}</h4>
            <div class="prod">${e.produto}</div>
            <ul>${e.melhoriasGrok.map((i) => `<li>${i}</li>`).join("")}</ul>
          </article>`).join("") + `</div>`;
    }

    let slashHtml = "";
    if (id === "slash") {
      slashHtml = `
        <div class="slash-demo">
          <label for="slash-filter"><strong>Simulador do menu /</strong> — digite para filtrar</label>
          <input id="slash-filter" placeholder="ex: rev, plan, mcp, novid..." />
          <div class="slash-list" id="slash-list"></div>
        </div>`;
    }

    els.moduleBody.innerHTML = `
      <div class="panel-title">
        <div>
          <h2>${m.icone} ${m.numero}. ${m.titulo}</h2>
          <p style="color:var(--muted);margin:6px 0 0">${m.resumo}</p>
        </div>
        <button class="btn ghost" id="btn-back">← Início</button>
      </div>
      <div class="lesson-list" id="lesson-list"></div>
      <div class="content-block">${content.html}${empresasHtml}${slashHtml}</div>
      <div class="content-block notes">
        <h3>Anotações deste módulo</h3>
        <textarea id="module-notes" placeholder="Escreva ideias, dúvidas, comandos úteis...">${note.replace(/</g, "&lt;")}</textarea>
        <div style="margin-top:10px">
          <button class="btn primary" id="btn-save-note">Salvar anotação</button>
          <button class="btn" id="btn-open-md">Abrir pasta do módulo</button>
        </div>
      </div>`;

    const list = document.getElementById("lesson-list");
    for (const a of m.aulas) {
      const row = document.createElement("label");
      row.className = "lesson";
      row.innerHTML = `
        <input type="checkbox" data-lesson="${a.id}" ${state.db.completedLessons[a.id] ? "checked" : ""} />
        <div>
          <strong>${a.titulo}</strong>
          <span>~${a.minutos} min · id ${a.id}</span>
        </div>
        <span class="badge ${state.db.completedLessons[a.id] ? "ok" : "wait"}">${state.db.completedLessons[a.id] ? "ok" : "todo"}</span>`;
      list.appendChild(row);
    }

    list.querySelectorAll("input[type=checkbox]").forEach((input) => {
      input.addEventListener("change", () => {
        state.db.completedLessons[input.dataset.lesson] = input.checked;
        saveDb(state.db);
        openModule(id);
        toast(input.checked ? "Aula marcada como feita ✓" : "Aula reaberta");
      });
    });

    document.getElementById("btn-back").onclick = renderHome;
    document.getElementById("btn-save-note").onclick = () => {
      state.db.notes[id] = document.getElementById("module-notes").value;
      saveDb(state.db);
      toast("Anotação salva no banco local");
    };
    document.getElementById("btn-open-md").onclick = () => {
      toast(`Pasta: ${m.pasta} (veja no Explorer ao lado do index.html)`);
    };

    if (id === "slash") {
      const input = document.getElementById("slash-filter");
      const box = document.getElementById("slash-list");
      const paint = () => {
        const qq = (input.value || "").replace(/^\//, "").toLowerCase();
        const items = SLASH_COMMANDS.filter((s) =>
          !qq || s.cmd.toLowerCase().includes(qq) || s.desc.toLowerCase().includes(qq)
        );
        box.innerHTML = items.map((s) =>
          `<div class="slash-item"><span>${s.cmd}</span><small>${s.desc}</small></div>`
        ).join("") || `<div class="slash-item"><span>nenhum comando</span><small>tente outra busca</small></div>`;
      };
      input.addEventListener("input", paint);
      paint();
    }

    renderNav();
    renderProgress();
  }

  els.search.addEventListener("input", () => {
    state.filter = els.search.value;
    if (state.view === "home") renderHome();
    else renderNav();
  });

  document.getElementById("btn-home").onclick = renderHome;
  document.getElementById("btn-continue").onclick = () => {
    openModule(state.db.lastModuleId || "plano");
  };
  document.getElementById("btn-export").onclick = () => {
    const blob = new Blob([JSON.stringify(state.db, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `curso-grok-progresso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Progresso exportado (JSON)");
  };
  document.getElementById("btn-import").onclick = () => {
    document.getElementById("import-file").click();
  };
  document.getElementById("import-file").addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      state.db = {
        ...defaultDb(state.data.modulos),
        ...parsed,
        completedLessons: {
          ...defaultDb(state.data.modulos).completedLessons,
          ...(parsed.completedLessons || {})
        }
      };
      saveDb(state.db);
      renderHome();
      toast("Progresso importado");
    } catch {
      toast("JSON inválido");
    }
    ev.target.value = "";
  });
  document.getElementById("btn-reset").onclick = () => {
    if (!confirm("Zerar todo o progresso deste curso neste navegador?")) return;
    state.db = defaultDb(state.data.modulos);
    saveDb(state.db);
    renderHome();
    toast("Progresso zerado");
  };

  renderHome();
}

boot().catch((err) => {
  console.error(err);
  document.body.innerHTML = `<div style="padding:40px;font-family:sans-serif;color:#fff;background:#111">
    <h1>Curso GROK</h1>
    <p>Não foi possível carregar <code>data/modulos.json</code>.</p>
    <p>Se abriu via <code>file://</code> e o navegador bloqueou o fetch, use o atalho <strong>iniciar-curso.cmd</strong> (sobe um servidor local).</p>
    <pre>${String(err)}</pre>
  </div>`;
});
