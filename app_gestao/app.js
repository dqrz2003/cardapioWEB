/* =====================================================
   EMPORIO GOURMET · PAINEL DE GESTÃO
   ===================================================== */

window.__painelOk = true;

const CONFIG = {
  pin: '1234',                          // TROQUE o PIN. É só uma trava simples (veja o aviso no README/conversa)
  chave: 'emporio-cardapio-dados',      // chave de armazenamento no navegador
  chaveSessao: 'emporio-painel-ok'
};

const CATEGORIAS = [
  { id: 'entradas',   nome: 'Entradas' },
  { id: 'principais', nome: 'Pratos Principais' },
  { id: 'vinhos',     nome: 'Vinhos & Grelhados' },
  { id: 'sobremesas', nome: 'Sobremesas' }
];

const IMG = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;

/* ====== CONFIGURAÇÕES PADRÃO ====== */
function configPadrao() {
  return {
    restaurante: { nome: 'Emporio Gourmet', telefone: '', endereco: '', horario: 'Ter a Dom, 18h às 23h' },
    delivery: { ativo: true, whatsapp: '5588999999999', taxaEntrega: 8, pedidoMinimo: 40, tempoEstimado: '40 a 60 min', freteGratisAcima: 0, pagPix: true, pagCartao: true, pagDinheiro: true },
    mesa: { aviso: 'Cardápio para consulta no salão. Consulte o garçom para fazer seu pedido.', mostrarDestaques: true, mostrarFotos: true },
    sistema: { pin: CONFIG.pin, urlMesa: '../cardapio-mesa.html', urlDelivery: '../cardapio delivery/index.html', notas: '' }
  };
}
function mesclar(d) {   // garante que dados antigos ganhem as novas configurações
  const p = configPadrao();
  d.config = d.config || {};
  Object.keys(p).forEach(s => { d.config[s] = { ...p[s], ...(d.config[s] || {}) }; });
  return d;
}
const pinAtual = () => carregar().config.sistema.pin || CONFIG.pin;
const configPublica = () => { const { restaurante, delivery, mesa } = dados.config; return { restaurante, delivery, mesa }; };

/* ====== DADOS INICIAIS (cardápio padrão) ====== */
function dadosPadrao() {
  const nomes = ['Filé mignon','Rúcula','Parmesão','Alcaparras','Azeite trufado','Pão de fermentação natural','Burrata','Tomate confit','Manjericão','Camarão','Alho','Limão siciliano','Arroz arbóreo','Cogumelos','Salmão','Maracujá','Baroa','Aspargos','Massa fresca','Funghi secchi','Creme de leite','Ancho','Batata rústica','Linguiça artesanal','Frango','Chocolate belga','Sorvete de baunilha','Doce de leite','Banana','Castanhas','Pistache','Frutas vermelhas'];
  const ingredientes = nomes.map((nome, i) => ({ id: 'i' + (i + 1), nome, ativo: true }));
  const id = n => ingredientes.find(x => x.nome === n).id;
  const P = (pid, cat, nome, preco, desc, img, ings, destaque) =>
    ({ id: pid, cat, nome, preco, desc, img: IMG(img), ingredientes: ings.map(id), destaque: !!destaque, ativo: true });
  return {
    versao: 2,
    config: configPadrao(),
    ingredientes,
    pratos: [
      P('e1','entradas','Carpaccio de Filé Mignon',48,'Lâminas finas de filé, rúcula, lascas de parmesão, alcaparras e azeite trufado.','photo-1546069901-ba9599a7e63c',['Filé mignon','Rúcula','Parmesão','Alcaparras','Azeite trufado']),
      P('e2','entradas','Bruschetta Burrata',42,'Pão de fermentação natural, burrata cremosa, tomate confit e manjericão fresco.','photo-1482049016688-2d3e1b311543',['Pão de fermentação natural','Burrata','Tomate confit','Manjericão']),
      P('e3','entradas','Camarões ao Alho e Ervas',62,'Camarões salteados na manteiga clarificada com alho dourado e limão siciliano.','photo-1559847844-5315695dadae',['Camarão','Alho','Limão siciliano'],true),
      P('p1','principais','Risoto de Cogumelos Frescos',74,'Arroz arbóreo, mix de cogumelos, vinho branco, manteiga e parmesão envelhecido.','photo-1476224203421-9ac39bcb3327',['Arroz arbóreo','Cogumelos','Parmesão']),
      P('p2','principais','Salmão ao Molho de Maracujá',89,'Filé de salmão selado, purê de baroa, aspargos e redução de maracujá.','photo-1414235077428-338989a2e8c0',['Salmão','Maracujá','Baroa','Aspargos'],true),
      P('p3','principais','Fettuccine ao Funghi',68,'Massa fresca da casa, creme de leite, funghi secchi e toque de noz-moscada.','photo-1565299624946-b28f40a0ae38',['Massa fresca','Funghi secchi','Creme de leite']),
      P('v1','vinhos','Ancho na Brasa',128,'400 g de ancho maturado, batatas rústicas, farofa de alho e vinagrete da casa.','photo-1544025162-d76694265947',['Ancho','Batata rústica','Alho'],true),
      P('v2','vinhos','Espetinho Misto Gourmet',79,'Filé, frango e linguiça artesanal grelhados, com mandioca e molho chimichurri.','photo-1555939594-58d7cb561ad1',['Filé mignon','Frango','Linguiça artesanal']),
      P('v3','vinhos','Vinho Tinto Reserva (garrafa)',149,'Seleção do sommelier, encorpado, com notas de frutas negras.','photo-1510812431401-41d2bd2722f3',[]),
      P('s1','sobremesas','Petit Gâteau de Chocolate',36,'Bolo quente de chocolate belga com centro cremoso e sorvete de baunilha.','photo-1488477181946-6428a0291777',['Chocolate belga','Sorvete de baunilha'],true),
      P('s2','sobremesas','Panqueca de Doce de Leite',32,'Massa leve, doce de leite artesanal, banana caramelizada e castanhas.','photo-1567620905732-2d1ec7ab7445',['Doce de leite','Banana','Castanhas']),
      P('s3','sobremesas','Sorvete Artesanal',28,'Três bolas à escolha: baunilha, pistache ou frutas vermelhas, com calda quente.','photo-1563805042-7684c019e1cb',['Sorvete de baunilha','Pistache','Frutas vermelhas'])
    ]
  };
}

/* ====== UTILITÁRIOS ====== */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const brl = v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const novoId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const nomeCat = id => (CATEGORIAS.find(c => c.id === id) || {}).nome || id;
const ingPorId = id => dados.ingredientes.find(i => i.id === id);

function avisar(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('ativo');
  clearTimeout(avisar.t);
  avisar.t = setTimeout(() => t.classList.remove('ativo'), 2600);
}

/* ====== ARMAZENAMENTO ====== */
let dados;

function valido(d) {
  return d && Array.isArray(d.pratos) && Array.isArray(d.ingredientes);
}
function carregar() {
  try {
    const d = JSON.parse(localStorage.getItem(CONFIG.chave));
    if (valido(d)) return mesclar(d);
  } catch (e) { /* usa o padrão */ }
  return dadosPadrao();
}
function salvar() {
  try { localStorage.setItem(CONFIG.chave, JSON.stringify(dados)); }
  catch (e) { avisar('Não foi possível salvar neste navegador.'); }
}

/* Ingredientes desativados que impedem o prato de ser servido */
const faltas = p => p.ingredientes.map(ingPorId).filter(i => i && !i.ativo);
const disponivel = p => p.ativo && faltas(p).length === 0;

/* ====== RENDERIZAÇÃO ====== */
function renderTudo() {
  $('#nPratos').textContent = dados.pratos.length;
  $('#nIng').textContent = dados.ingredientes.length;
  renderPratos();
  renderIngredientes();
  renderDash();
  renderPrecos();
  atualizarLinks();
}

function renderPratos() {
  const termo = $('#busca').value.trim().toLowerCase();
  const cat = $('#filtroCat').value;
  const st = $('#filtroStatus').value;
  const lista = dados.pratos.filter(p =>
    (!termo || p.nome.toLowerCase().includes(termo)) &&
    (!cat || p.cat === cat) &&
    (!st || (st === 'ativo' && p.ativo) || (st === 'inativo' && !p.ativo) || (st === 'falta' && faltas(p).length))
  );
  $('#listaPratos').innerHTML = lista.length ? lista.map(p => {
    const f = faltas(p);
    const selos = [
      `<span class="selo">${esc(nomeCat(p.cat))}</span>`,
      p.destaque ? '<span class="selo">Destaque</span>' : '',
      !p.ativo ? '<span class="selo alerta">Desativado</span>' : '',
      f.length ? `<span class="selo alerta">Falta: ${esc(f.map(i => i.nome).join(', '))}</span>` : '',
      disponivel(p) ? '<span class="selo ok">Disponível</span>' : ''
    ].join('');
    return `<li class="linha ${disponivel(p) ? '' : 'off'}">
      ${p.img ? `<img class="thumb" src="${esc(p.img)}" alt="" loading="lazy" onerror="this.outerHTML='<div class=&quot;thumb sem-foto&quot;>EG</div>'">` : '<div class="thumb sem-foto">EG</div>'}
      <div class="dados">
        <h3>${esc(p.nome)}</h3>
        <span class="preco">${brl(p.preco)}</span>
        <div class="selos">${selos}</div>
      </div>
      <div class="acoes-linha">
        <label class="sw" title="Ativar ou desativar prato">
          <input type="checkbox" data-acao="toggle-prato" data-id="${p.id}" ${p.ativo ? 'checked' : ''} aria-label="Prato ativo: ${esc(p.nome)}"><i></i>
        </label>
        <div class="botoes">
          <button class="btn fino" data-acao="editar-prato" data-id="${p.id}">Editar</button>
          <button class="btn fino perigo" data-acao="excluir-prato" data-id="${p.id}">Excluir</button>
        </div>
      </div>
    </li>`;
  }).join('') : '<li class="vazio">Nenhum prato encontrado.</li>';
}

function renderIngredientes() {
  const ordenados = [...dados.ingredientes].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  $('#listaIng').innerHTML = ordenados.length ? ordenados.map(i => {
    const usos = dados.pratos.filter(p => p.ingredientes.includes(i.id)).length;
    return `<li class="linha ing ${i.ativo ? '' : 'off'}">
      <div class="dados">
        <h3>${esc(i.nome)}</h3>
        <span class="meta">${usos} ${usos === 1 ? 'prato usa' : 'pratos usam'} este ingrediente${i.ativo ? '' : ' · desativado'}</span>
      </div>
      <div class="acoes-linha">
        <label class="sw" title="Ativar ou desativar ingrediente">
          <input type="checkbox" data-acao="toggle-ing" data-id="${i.id}" ${i.ativo ? 'checked' : ''} aria-label="Ingrediente ativo: ${esc(i.nome)}"><i></i>
        </label>
        <div class="botoes">
          <button class="btn fino" data-acao="renomear-ing" data-id="${i.id}">Renomear</button>
          <button class="btn fino perigo" data-acao="excluir-ing" data-id="${i.id}">Excluir</button>
        </div>
      </div>
    </li>`;
  }).join('') : '<li class="vazio">Nenhum ingrediente cadastrado.</li>';
}

/* ====== AÇÕES: PRATOS ====== */
function renderChecks(selecionados) {
  const ord = [...dados.ingredientes].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  $('#checksIng').innerHTML = ord.length ? ord.map(i => `
    <label class="chk ${i.ativo ? '' : 'off'}">
      <input type="checkbox" value="${i.id}" ${selecionados.includes(i.id) ? 'checked' : ''}>
      <span>${esc(i.nome)}${i.ativo ? '' : ' (desativado)'}</span>
    </label>`).join('') : '<p class="meta">Cadastre um ingrediente abaixo.</p>';
}
const marcados = () => $$('#checksIng input:checked').map(c => c.value);

/* ====== FOTO DO PRATO (envio do aparelho ou URL) ====== */
let fotoTemp = '';

function atualizarPrevia() {
  const im = $('#fotoPrev');
  im.hidden = !fotoTemp; $('#fotoVazia').hidden = !!fotoTemp; $('#fotoRemover').hidden = !fotoTemp;
  if (fotoTemp) im.src = fotoTemp;
  $('#fotoInfo').textContent = fotoTemp.startsWith('data:')
    ? `Foto enviada do aparelho (${Math.round(fotoTemp.length * 0.75 / 1024)} KB).`
    : 'Escolha da galeria ou tire uma foto agora (no celular). Ela é reduzida automaticamente. Você também pode arrastar uma imagem para cá.';
}

function comprimirImagem(arq, max = 900) {   // reduz e converte para JPEG leve
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = () => rej();
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => rej();
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        const x = cv.getContext('2d');
        x.fillStyle = '#fff'; x.fillRect(0, 0, cv.width, cv.height);
        x.drawImage(img, 0, 0, cv.width, cv.height);
        let q = 0.82, out = cv.toDataURL('image/jpeg', q);
        while (out.length > 280000 && q > 0.45) { q -= 0.1; out = cv.toDataURL('image/jpeg', q); }
        res(out);
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(arq);
  });
}

async function receberFoto(arq) {
  if (!arq) return;
  if (!arq.type.startsWith('image/')) return avisar('Escolha um arquivo de imagem (JPG ou PNG).');
  try {
    fotoTemp = await comprimirImagem(arq);
    $('#formPrato').img.value = '';
    atualizarPrevia(); avisar('Foto carregada.');
  } catch (e) { avisar('Não foi possível ler essa imagem. Tente JPG ou PNG.'); }
}

function abrirPrato(id) {
  const f = $('#formPrato');
  const p = id ? dados.pratos.find(x => x.id === id) : null;
  f.dataset.id = id || '';
  $('#dlgTitulo').textContent = p ? 'Editar prato' : 'Novo prato';
  f.nome.value = p ? p.nome : '';
  f.cat.value = p ? p.cat : CATEGORIAS[0].id;
  f.preco.value = p ? String(p.preco).replace('.', ',') : '';
  f.desc.value = p ? p.desc : '';
  fotoTemp = p ? p.img : '';
  f.img.value = /^https?:/i.test(fotoTemp) ? fotoTemp : '';
  atualizarPrevia();
  f.destaque.checked = p ? p.destaque : false;
  f.ativo.checked = p ? p.ativo : true;
  $('#ingRapido').value = '';
  $('#erroPrato').hidden = true;
  $$('#formPrato .invalido').forEach(e => e.classList.remove('invalido'));
  renderChecks(p ? p.ingredientes : []);
  $('#dlgPrato').showModal();
  f.nome.focus();
}

function erroPrato(msg, campo) {
  $('#erroPrato').textContent = msg; $('#erroPrato').hidden = false;
  $$('#formPrato .invalido').forEach(e => e.classList.remove('invalido'));
  if (campo) { campo.classList.add('invalido'); campo.focus(); }
}

function salvarPrato() {
  const f = $('#formPrato');
  const nome = f.nome.value.trim();
  const preco = parseFloat(f.preco.value.replace(/\./g, '').replace(',', '.'));
  if (!nome) return erroPrato('Informe o nome do prato.', f.nome);
  if (!(preco >= 0) || isNaN(preco)) return erroPrato('Informe um preço válido. Ex.: 48,90', f.preco);
  const url = fotoTemp;
  if (url && !/^(https?:\/\/|data:image\/)/i.test(url)) return erroPrato('O endereço da foto deve começar com http:// ou https://', f.img);

  const reg = {
    nome, cat: f.cat.value, preco: Math.round(preco * 100) / 100,
    desc: f.desc.value.trim(), img: url, ingredientes: marcados(),
    destaque: f.destaque.checked, ativo: f.ativo.checked
  };
  if (f.dataset.id) {
    Object.assign(dados.pratos.find(p => p.id === f.dataset.id), reg);
    avisar('Prato atualizado.');
  } else {
    dados.pratos.push({ id: novoId('p'), ...reg });
    avisar('Prato adicionado.');
  }
  salvar(); renderTudo();
  $('#dlgPrato').close();
}

/* ====== AÇÕES: INGREDIENTES ====== */
function criarIngrediente(nome) {
  nome = nome.trim();
  if (!nome) return null;
  const existente = dados.ingredientes.find(i => i.nome.toLowerCase() === nome.toLowerCase());
  if (existente) { avisar('Esse ingrediente já existe.'); return existente; }
  const novo = { id: novoId('i'), nome, ativo: true };
  dados.ingredientes.push(novo);
  salvar();
  return novo;
}

/* ====== DIÁLOGO PRÓPRIO (substitui confirm/prompt, que alguns ambientes bloqueiam) ====== */
function perguntar(titulo, msg, { input = null, ok = 'Confirmar' } = {}) {
  return new Promise(res => {
    const d = $('#dlgPergunta'), campo = $('#pgInput');
    $('#pgTitulo').textContent = titulo;
    $('#pgMsg').textContent = msg;
    $('#pgSim').textContent = ok;
    campo.hidden = input === null;
    if (input !== null) campo.value = input;
    let feito = false;
    const fim = v => { if (feito) return; feito = true; d.close(); res(v); };
    $('#pgSim').onclick = () => fim(input !== null ? campo.value : true);
    $('#pgNao').onclick = () => fim(null);
    campo.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); $('#pgSim').click(); } };
    d.oncancel = () => fim(null);
    d.showModal();
    (input !== null ? campo : $('#pgSim')).focus();
  });
}

/* ====== EVENTOS ====== */
document.addEventListener('click', async e => {
  const b = e.target.closest('[data-acao]');
  if (!b || b.type === 'checkbox') return;
  const { acao, id } = b.dataset;

  if (acao === 'editar-prato') abrirPrato(id);

  if (acao === 'toggle-delivery') {
    const d = dados.config.delivery;
    d.ativo = !d.ativo; salvar(); renderDash(); renderCfg();
    avisar(d.ativo ? 'Delivery retomado.' : 'Delivery pausado.');
  }

  if (acao === 'excluir-prato') {
    const p = dados.pratos.find(x => x.id === id);
    if (await perguntar('Confirmar', `Excluir o prato "${p.nome}"? Esta ação não pode ser desfeita.\n\nDica: para só tirar do cardápio por um tempo, use o interruptor para desativar.`)) {
      dados.pratos = dados.pratos.filter(x => x.id !== id);
      salvar(); renderTudo(); avisar('Prato excluído.');
    }
  }

  if (acao === 'renomear-ing') {
    const i = ingPorId(id);
    const nome = await perguntar('Renomear ingrediente', 'Novo nome do ingrediente:', { input: i.nome, ok: 'Salvar' });
    if (nome && nome.trim()) { i.nome = nome.trim(); salvar(); renderTudo(); avisar('Ingrediente renomeado.'); }
  }

  if (acao === 'excluir-ing') {
    const i = ingPorId(id);
    const usos = dados.pratos.filter(p => p.ingredientes.includes(id)).length;
    const aviso = usos ? `\n\nEle será removido de ${usos} ${usos === 1 ? 'prato' : 'pratos'}.` : '';
    if (await perguntar('Confirmar', `Excluir o ingrediente "${i.nome}"?${aviso}\n\nDica: para só indicar que acabou, desative-o.`)) {
      dados.ingredientes = dados.ingredientes.filter(x => x.id !== id);
      dados.pratos.forEach(p => { p.ingredientes = p.ingredientes.filter(x => x !== id); });
      salvar(); renderTudo(); avisar('Ingrediente excluído.');
    }
  }
});

document.addEventListener('change', e => {
  const c = e.target;
  if (c.dataset.cfg) salvarCampo(c);
  if (c.dataset.preco) salvarPreco(c);
  if (c.dataset.acao === 'toggle-prato') {
    const p = dados.pratos.find(x => x.id === c.dataset.id);
    p.ativo = c.checked; salvar(); renderTudo();
    avisar(p.ativo ? 'Prato ativado.' : 'Prato desativado.');
  }
  if (c.dataset.acao === 'toggle-ing') {
    const i = ingPorId(c.dataset.id);
    i.ativo = c.checked; salvar(); renderTudo();
    avisar(i.ativo ? 'Ingrediente ativado.' : 'Ingrediente desativado. Pratos que o usam ficaram indisponíveis.');
  }
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || e.target.tagName !== 'INPUT' || ['checkbox', 'file'].includes(e.target.type)) return;
  const id = e.target.id, form = e.target.closest('form');
  if (!form || id === 'ingRapido') return;
  e.preventDefault();
  if (form.id === 'formPin') $('#entrar').click();
  if (form.id === 'formIng') $('#addIng').click();
  if (form.id === 'formPrato') salvarPrato();
});

/* ====== NAVEGAÇÃO, LINKS E UTILITÁRIOS ====== */
function abrirAba(n) {
  $$('.aba').forEach(x => x.setAttribute('aria-selected', x.dataset.aba === n));
  $$('main > section').forEach(s => { s.hidden = s.id !== 'aba-' + n; });
  window.scrollTo(0, 0);
}
function atualizarLinks() {
  $$('[data-url]').forEach(l => { l.href = dados.config.sistema['url' + (l.dataset.url === 'mesa' ? 'Mesa' : 'Delivery')] || '#'; });
}
function parseNum(s) {
  s = String(s).trim();
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}
const fmtNum = n => String(n).replace('.', ',');
const getP = (o, p) => p.split('.').reduce((x, k) => x && x[k], o);
const setP = (o, p, v) => { const ks = p.split('.'), u = ks.pop(); ks.reduce((x, k) => x[k], o)[u] = v; };

/* ====== DASHBOARD ====== */
function renderDash() {
  const P = dados.pratos, disp = P.filter(disponivel), off = P.filter(p => !p.ativo);
  const falta = P.filter(p => p.ativo && faltas(p).length);
  const media = P.length ? P.reduce((s, p) => s + p.preco, 0) / P.length : 0;
  const kpis = [
    ['Pratos disponíveis', `${disp.length}/${P.length}`], ['Desativados', off.length], ['Sem ingrediente', falta.length],
    ['Preço médio', brl(media)], ['Ingredientes desativados', dados.ingredientes.filter(i => !i.ativo).length],
    ['Em destaque', P.filter(p => p.destaque && disponivel(p)).length]
  ];
  $('#kpis').innerHTML = kpis.map(([t, v]) => `<div class="kpi"><span>${t}</span><strong>${v}</strong></div>`).join('');

  const max = Math.max(1, ...CATEGORIAS.map(c => P.filter(p => p.cat === c.id).length));
  $('#grafCat').innerHTML = CATEGORIAS.map(c => {
    const n = P.filter(p => p.cat === c.id).length, d = P.filter(p => p.cat === c.id && disponivel(p)).length;
    return `<div class="barra-g"><span>${c.nome}</span><div class="trilho"><div class="preenche" style="width:${n / max * 100}%"><div class="disp" style="width:${n ? d / n * 100 : 0}%"></div></div></div><b>${d}/${n}</b></div>`;
  }).join('') + '<p class="meta">Barra clara: cadastrados. Barra dourada: disponíveis agora.</p>';

  const al = [
    ...falta.map(p => `<li><b>${esc(p.nome)}</b> indisponível: falta ${esc(faltas(p).map(i => i.nome).join(', '))}</li>`),
    ...off.map(p => `<li><b>${esc(p.nome)}</b> está desativado</li>`),
    ...P.filter(p => p.ativo && !p.img).map(p => `<li><b>${esc(p.nome)}</b> está sem foto</li>`)
  ];
  $('#alertas').innerHTML = al.length ? al.slice(0, 8).join('') + (al.length > 8 ? `<li>+ ${al.length - 8} avisos</li>` : '') : '<li class="ok">Tudo em ordem.</li>';

  const uso = dados.ingredientes.map(i => ({ i, n: P.filter(p => p.ingredientes.includes(i.id)).length })).filter(x => x.n).sort((x, y) => y.n - x.n).slice(0, 6);
  const mx = Math.max(1, ...uso.map(x => x.n));
  $('#topIng').innerHTML = uso.length ? uso.map(x => `<div class="barra-g"><span>${esc(x.i.nome)}</span><div class="trilho"><div class="preenche" style="width:${x.n / mx * 100}%"><div class="disp" style="width:100%"></div></div></div><b>${x.n}</b></div>`).join('') : '<p class="meta">Nenhum ingrediente em uso.</p>';

  const d = dados.config.delivery;
  $('#operacao').innerHTML = `<p class="op ${d.ativo ? 'ok' : 'alerta'}"><b>Delivery ${d.ativo ? 'aberto' : 'pausado'}</b>
    <button class="btn fino" type="button" data-acao="toggle-delivery">${d.ativo ? 'Pausar' : 'Retomar'}</button></p>
    <dl class="op-l">
      <div><dt>Taxa de entrega</dt><dd>${brl(d.taxaEntrega)}</dd></div>
      <div><dt>Pedido mínimo</dt><dd>${brl(d.pedidoMinimo)}</dd></div>
      <div><dt>Tempo estimado</dt><dd>${esc(d.tempoEstimado) || '—'}</dd></div>
      <div><dt>WhatsApp</dt><dd>${esc(d.whatsapp) || '—'}</dd></div>
    </dl>`;
}

/* ====== PREÇOS ====== */
function renderPrecos() {
  $('#listaPrecos').innerHTML = dados.pratos.map(p => `<li class="linha preco-l">
    <div class="dados"><h3>${esc(p.nome)}</h3><span class="meta">${esc(nomeCat(p.cat))}</span></div>
    <label class="campo-p">R$ <input type="text" inputmode="decimal" data-preco="${p.id}" value="${fmtNum(p.preco.toFixed(2))}" aria-label="Preço de ${esc(p.nome)}"></label>
  </li>`).join('');
}
function salvarPreco(c) {
  const v = parseNum(c.value), p = dados.pratos.find(x => x.id === c.dataset.preco);
  if (v === null || v < 0) { avisar('Informe um preço válido.'); c.value = fmtNum(p.preco.toFixed(2)); return; }
  p.preco = Math.round(v * 100) / 100; c.value = fmtNum(p.preco.toFixed(2));
  salvar(); renderPratos(); renderDash(); avisar('Preço atualizado.');
}
async function aplicarReajuste() {
  const pct = parseNum($('#precoPct').value), cat = $('#precoCat').value;
  if (pct === null || pct === 0 || pct < -90 || pct > 200) return avisar('Informe uma porcentagem entre -90 e 200 (diferente de 0).');
  const alvo = dados.pratos.filter(p => !cat || p.cat === cat);
  if (!alvo.length) return avisar('Nenhum prato nessa categoria.');
  const ok = await perguntar('Reajustar preços', `Aplicar ${pct > 0 ? '+' : ''}${fmtNum(pct)}% em ${alvo.length} ${alvo.length === 1 ? 'prato' : 'pratos'}${cat ? ' (' + nomeCat(cat) + ')' : ''}?`, { ok: 'Aplicar' });
  if (!ok) return;
  alvo.forEach(p => { p.preco = Math.max(0, Math.round(p.preco * (1 + pct / 100) * 100) / 100); });
  salvar(); $('#precoPct').value = ''; renderTudo(); avisar('Reajuste aplicado.');
}

/* ====== CONFIGURAÇÕES (delivery, mesa, sistema) ====== */
const CAMPOS = {
  delivery: [
    { p: 'delivery.ativo', t: 'switch', l: 'Receber pedidos de delivery' },
    { p: 'delivery.whatsapp', t: 'fone', l: 'WhatsApp que recebe os pedidos', d: 'Somente números, com DDI e DDD. Ex.: 5588999999999' },
    { p: 'delivery.taxaEntrega', t: 'num', l: 'Taxa de entrega (R$)' },
    { p: 'delivery.pedidoMinimo', t: 'num', l: 'Pedido mínimo (R$)' },
    { p: 'delivery.freteGratisAcima', t: 'num', l: 'Frete grátis acima de (R$)', d: 'Use 0 para não oferecer frete grátis.' },
    { p: 'delivery.tempoEstimado', t: 'texto', l: 'Tempo estimado de entrega', d: 'Ex.: 40 a 60 min' },
    { t: 'titulo', l: 'Formas de pagamento aceitas' },
    { p: 'delivery.pagPix', t: 'switch', l: 'Pix' },
    { p: 'delivery.pagCartao', t: 'switch', l: 'Cartão na entrega' },
    { p: 'delivery.pagDinheiro', t: 'switch', l: 'Dinheiro' }
  ],
  mesa: [
    { p: 'mesa.aviso', t: 'area', l: 'Aviso exibido no topo do cardápio da mesa' },
    { p: 'mesa.mostrarDestaques', t: 'switch', l: 'Exibir a aba Destaques' },
    { p: 'mesa.mostrarFotos', t: 'switch', l: 'Exibir fotos dos pratos' }
  ],
  sistema: [
    { p: 'restaurante.nome', t: 'texto', l: 'Nome do restaurante' },
    { p: 'restaurante.telefone', t: 'fone', l: 'Telefone do restaurante', d: 'Somente números, com DDD.' },
    { p: 'restaurante.endereco', t: 'texto', l: 'Endereço do restaurante' },
    { p: 'restaurante.horario', t: 'texto', l: 'Horário de funcionamento' },
    { p: 'sistema.urlMesa', t: 'texto', l: 'Endereço do cardápio da mesa', d: 'Caminho ou link usado nos atalhos do painel.' },
    { p: 'sistema.urlDelivery', t: 'texto', l: 'Endereço da área de delivery', d: 'Caminho ou link usado nos atalhos do painel.' },
    { p: 'sistema.notas', t: 'area', l: 'Anotações do sistema', d: 'Espaço livre para lembretes da equipe.' }
  ]
};
function campoHTML(c) {
  if (c.t === 'titulo') return `<h3 class="sub-t">${c.l}</h3>`;
  const d = c.d ? `<small>${esc(c.d)}</small>` : '';
  if (c.t === 'switch') return `<label class="sw-row"><span class="sw"><input type="checkbox" data-cfg="${c.p}"><i></i></span>${c.l}</label>`;
  if (c.t === 'area') return `<label class="campo">${c.l}<textarea rows="2" data-cfg="${c.p}"></textarea>${d}</label>`;
  const im = c.t === 'texto' ? '' : ` inputmode="${c.t === 'fone' ? 'tel' : 'decimal'}"`;
  return `<label class="campo">${c.l}<input type="text" data-cfg="${c.p}" data-tipo="${c.t}"${im}>${d}</label>`;
}
function renderCfg() {
  Object.keys(CAMPOS).forEach(k => { $('#cfg-' + k).innerHTML = CAMPOS[k].map(campoHTML).join(''); });
  $$('[data-cfg]').forEach(el => {
    const v = getP(dados.config, el.dataset.cfg);
    if (el.type === 'checkbox') el.checked = !!v;
    else el.value = el.dataset.tipo === 'num' ? fmtNum(v ?? 0) : (v ?? '');
  });
}
function salvarCampo(c) {
  const path = c.dataset.cfg;
  let v;
  if (c.type === 'checkbox') v = c.checked;
  else if (c.dataset.tipo === 'num') {
    v = parseNum(c.value);
    if (v === null || v < 0) { avisar('Informe um valor numérico válido.'); c.value = fmtNum(getP(dados.config, path)); return; }
    c.value = fmtNum(v);
  } else if (c.dataset.tipo === 'fone') { v = c.value.replace(/\D/g, ''); c.value = v; }
  else v = c.value.trim();
  setP(dados.config, path, v);
  salvar(); renderDash(); atualizarLinks(); avisar('Configuração salva.');
}

function iniciar() {
  dados = carregar();

  // Categorias nos seletores
  $('#filtroCat').innerHTML = '<option value="">Todas as categorias</option>' + CATEGORIAS.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
  $('#formPrato').cat.innerHTML = CATEGORIAS.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');

  // Abas
  $$('.aba').forEach(b => b.addEventListener('click', () => abrirAba(b.dataset.aba)));

  // Filtros
  ['#busca', '#filtroCat', '#filtroStatus'].forEach(s => $(s).addEventListener('input', renderPratos));

  // Prato
  $('#novoPrato').addEventListener('click', () => abrirPrato(null));
  $('#salvarPrato').addEventListener('click', salvarPrato);
  $$('[data-fechar]').forEach(b => b.addEventListener('click', () => $('#dlgPrato').close()));
  $('#addIngRapido').addEventListener('click', () => {
    const marcadosAntes = marcados();
    const n = criarIngrediente($('#ingRapido').value);
    if (!n) return;
    if (!marcadosAntes.includes(n.id)) marcadosAntes.push(n.id);
    renderChecks(marcadosAntes);
    $('#ingRapido').value = '';
    renderTudo();
  });
  $('#ingRapido').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('#addIngRapido').click(); } });

  // Ingredientes
  $('#addIng').addEventListener('click', () => {
    if (criarIngrediente($('#novoIng').value)) { $('#novoIng').value = ''; renderTudo(); avisar('Ingrediente adicionado.'); }
  });

  // Backup e publicação
  const baixar = (conteudo, nome, tipo) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
    a.download = nome; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  $('#baixarJs').addEventListener('click', () => {
    // Publica apenas pratos ativos e com todos os ingredientes ativos, já com os nomes dos ingredientes
    const publico = dados.pratos.filter(disponivel).map(p => ({
      id: p.id, categoria: p.cat, nome: p.nome, preco: p.preco, descricao: p.desc, foto: p.img,
      destaque: p.destaque, ingredientes: p.ingredientes.map(i => ingPorId(i).nome)
    }));
    const js = `/* Gerado pelo Painel de Gestão em ${new Date().toLocaleString('pt-BR')} */\nwindow.CARDAPIO_DADOS = ${JSON.stringify({ atualizadoEm: new Date().toISOString(), config: configPublica(), pratos: publico }, null, 2)};\n`;
    baixar(js, 'cardapio-dados.js', 'text/javascript');
    avisar(`Arquivo gerado com ${publico.length} pratos disponíveis.`);
  });
  $('#baixarJson').addEventListener('click', () => baixar(JSON.stringify(dados, null, 2), 'cardapio-backup.json', 'application/json'));
  $('#importar').addEventListener('change', async e => {
    const arq = e.target.files[0]; if (!arq) return;
    try {
      const d = JSON.parse(await arq.text());
      if (!valido(d)) throw new Error();
      if (await perguntar('Confirmar', 'Substituir o cardápio atual pelo backup selecionado?')) { dados = mesclar(d); salvar(); renderCfg(); renderTudo(); avisar('Backup importado.'); }
    } catch (err) { avisar('Arquivo de backup inválido.'); }
    e.target.value = '';
  });
  $('#restaurar').addEventListener('click', async () => {
    if (await perguntar('Confirmar', 'Restaurar o cardápio padrão? Todas as suas alterações serão perdidas.')) { dados = dadosPadrao(); salvar(); renderCfg(); renderTudo(); avisar('Cardápio padrão restaurado.'); }
  });

  // Foto do prato
  $('#fotoArq').addEventListener('change', e => { const arq = e.target.files[0]; e.target.value = ''; receberFoto(arq); });
  $('#formPrato').img.addEventListener('input', e => { fotoTemp = e.target.value.trim(); atualizarPrevia(); });
  $('#fotoRemover').addEventListener('click', () => { fotoTemp = ''; $('#formPrato').img.value = ''; atualizarPrevia(); });
  $('#fotoPrev').addEventListener('error', () => { $('#fotoPrev').hidden = true; $('#fotoVazia').hidden = false; });
  const caixa = $('#fotoBox');
  caixa.addEventListener('dragover', e => { e.preventDefault(); caixa.classList.add('arrastando'); });
  caixa.addEventListener('dragleave', () => caixa.classList.remove('arrastando'));
  caixa.addEventListener('drop', e => { e.preventDefault(); caixa.classList.remove('arrastando'); receberFoto(e.dataTransfer.files[0]); });

  // Preços, configurações e segurança
  $('#precoCat').innerHTML = '<option value="">Todas as categorias</option>' + CATEGORIAS.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
  $('#aplicarPct').addEventListener('click', aplicarReajuste);
  $('#trocarPin').addEventListener('click', () => {
    const atual = $('#pinAtualCampo').value.trim(), novo = $('#pinNovo').value.trim();
    if (atual !== dados.config.sistema.pin) return avisar('PIN atual incorreto.');
    if (!/^\d{4,8}$/.test(novo)) return avisar('O novo PIN deve ter de 4 a 8 números.');
    dados.config.sistema.pin = novo; salvar();
    $('#pinAtualCampo').value = ''; $('#pinNovo').value = ''; avisar('PIN alterado.');
  });
  renderCfg();
  renderTudo();
}

/* ====== ACESSO POR PIN ====== */
function liberar() {
  $('#bloqueio').hidden = true;
  iniciar();
}
let sessaoOk = false;
try { sessaoOk = sessionStorage.getItem(CONFIG.chaveSessao) === '1'; } catch (e) { /* ignora */ }

if (sessaoOk) liberar();
$('#entrar').addEventListener('click', () => {
  if ($("#pin").value.trim() === pinAtual()) {
    try { sessionStorage.setItem(CONFIG.chaveSessao, '1'); } catch (err) { /* ignora */ }
    liberar();
  } else { $('#pinErro').hidden = false; $('#pin').value = ''; $('#pin').focus(); }
});
$('#sair').addEventListener('click', () => {
  try { sessionStorage.removeItem(CONFIG.chaveSessao); } catch (e) { /* ignora */ }
  location.reload();
});