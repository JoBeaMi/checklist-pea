// Checklist CAIDI v2.12
// Endereço da aplicação web do Google Apps Script que recebe a partilha (ver README).
// Vazio = a secção de partilha não aparece e nada é enviado.
const ENDPOINT_PARTILHA = '';

const CHAVE_ARMAZENAMENTO = 'checklist-caidi-v2.12';
const CAMPOS_IDENTIFICACAO = ['nomeAluno', 'turma', 'data', 'nivel', 'professor', 'periodo'];
const CAMPOS_NUMERO = ['horasTurma'];
const OPCOES = ['incluirSaude'];

// Os apoios fora da escola em APOIOS_SAUDE só aparecem no PDF se o professor o escolher
const APOIOS_SAUDE = ['Psicologia', 'Terapia da fala', 'Terapia ocupacional', 'Consulta de desenvolvimento ou pedopsiquiatria', 'Intervenção precoce'];
const GRUPOS_CONTEXTO = {
    apoiosEscola: ['Docente de educação especial', 'Centro de Apoio à Aprendizagem', 'Apoio tutorial', 'Psicologia', 'Terapia da fala', 'Terapia ocupacional', 'Assistente operacional de apoio', 'Outro'],
    apoiosFora: [...APOIOS_SAUDE, 'Atividades desportivas, artísticas ou outras', 'Outro'],
    medidas: ['Nenhuma', 'Universais', 'Seletivas', 'Adicionais', 'Não sei'],
    rtp: ['Sim', 'Não', 'Não sei'],
    diagnostico: ['Sim', 'Não', 'Em avaliação', 'Não sei']
};

const ESTADOS = [['pratica', 'Já está implementada'], ['nao', 'Ainda não'], ['impossivel', 'Não é possível']];
const AJUDA = [['pouco', 'Ajuda pouco'], ['ajuda', 'Ajuda'], ['muito', 'Ajuda muito'], ['cedo', 'Ainda é cedo para saber']];
const MOTIVOS = [['recursos', 'Faltam materiais ou recursos'], ['tempo', 'Falta de tempo'], ['formacao', 'Falta de formação ou de apoio'], ['espaco', 'O espaço ou a organização da escola não permitem'], ['naoadequa', 'Não se adequa a este aluno'], ['outro', 'Outro']];
const RESPOSTAS_ESCOLA = ['Sim', 'Em parte', 'Não', 'Não sei', 'Não é necessário nesta situação'];
const CHEGAM = ['Sim', 'Em parte', 'Não'];
const CONFIRMA = ['Sim', 'Não', 'Não sei'];
const MAX_PRIMEIRAS = 3;
const MAX_FORTES = 5;
const MAX_BARREIRAS = 3;

const NR = 'Não realizou a atividade nas oportunidades observadas, apesar dos apoios disponíveis';
const NPO = 'Não foi possível observar';
const NA = 'Não se aplica';
const AJUDAS = ['Ajuda pontual', 'Ajuda frequente', 'Ajuda sistemática'];
const SEM_INFO = ['Não sei', 'Não tenho informação suficiente'];

const CRITERIOS_N = {
    'Sem ajuda individual': 'Faz a atividade com as adaptações habituais, sem precisar de orientação individual enquanto a faz',
    'Ajuda pontual': 'Precisa de vez em quando de uma pista, de um lembrete ou de ajuda individual',
    'Ajuda frequente': 'Precisa de ajuda individual na maior parte das oportunidades',
    'Ajuda sistemática': 'Precisa de ajuda individual em quase todas as oportunidades',
    [NR]: 'Houve oportunidades e o aluno não fez a atividade, nem com a ajuda e as adaptações que tem. Quando é o adulto que faz a atividade em vez do aluno, a resposta é esta',
    [NPO]: 'Não houve oportunidades nem informação suficientes para avaliar',
    [NA]: 'A atividade não é relevante nas situações da escola consideradas'
};
const CRITERIOS_EFEITO = {
    'Não foi identificado desconforto nem dificuldade de participação': 'O comportamento existe, mas não traz desconforto nem dificulta a participação',
    'Mantém a participação, com desconforto': 'Participa no que quer ou precisa de fazer, mas mostra ou diz que se sente desconfortável',
    'Mantém a participação': 'Participa nas atividades que quer ou precisa de fazer, mesmo que tenha mostrado ou dito que se sente desconfortável',
    'Dificulta a participação': 'Mesmo com os apoios que já existem, participa menos, com mais esforço ou só numa parte da atividade. Usar uma adaptação que lhe permite participar bem não é dificuldade',
    'Interrompe ou impede a participação': 'Não começa, interrompe ou deixa de participar em certas atividades por causa da situação',
    'Não foi possível determinar': 'Sabe que acontece, mas não consegue perceber a relação com a participação'
};

const ITENS = CONTEUDO.itens;
const AREAS = CONTEUDO.areas;
const ORDEM_ITENS = AREAS.flatMap(a => a.itens);
const AREA_FIXA = 'Emoções e regulação';
const AREA_AUTONOMIA = 'Autonomia pessoal';
const NIVEIS_SEM_AUTONOMIA = ['2.º ciclo', '3.º ciclo', 'Secundário'];
const areaDoItem = id => AREAS.find(a => a.itens.includes(id));

// Estratégias genéricas, que valem para todos os itens (não estão nas tabelas das matrizes)
const GENERICAS = {
    'g-ouvir': { texto: 'Perguntar ao aluno, de forma adequada à sua comunicação, o que lhe custa nesta situação e o que o ajuda', finalidade: 'Averiguação', comoSaber: 'Fica registado o que o aluno diz', responsavel: 'Docente titular', consultar: '' },
    'g-perguntar': { texto: 'Procurar outra forma de perguntar ao aluno (com imagens, por escrito, numa escala)', finalidade: 'Averiguação', comoSaber: 'Fica registado o que o aluno diz', responsavel: 'Docente titular', consultar: 'Docente de educação especial' },
    'g-acessivel': { texto: 'Rever com o docente de educação especial ou a EMAEI se a atividade e os apoios estão acessíveis ao aluno', finalidade: 'Averiguação', comoSaber: 'Fica decidido que ajustes se fazem', responsavel: 'Docente de educação especial, EMAEI', consultar: 'Aluno, família' },
    'g-forma': { texto: 'Rever a forma como a atividade é proposta, para que fique acessível', finalidade: 'Adaptação', comoSaber: 'Implementação. A atividade foi ajustada', responsavel: 'Professores', consultar: 'Docente de educação especial' },
    'g-comparar': { texto: 'Comparar com o aluno e a família as exigências e os apoios em casa e na escola', finalidade: 'Averiguação', comoSaber: 'Fica registado o que explica a diferença', responsavel: 'Docente titular', consultar: 'Aluno, família' },
    'g-observar': { texto: 'Observar em que situações aparece e o que acontece a seguir', finalidade: 'Averiguação', comoSaber: 'Na revisão, o efeito já se consegue indicar', responsavel: 'Professores', consultar: '' }
};

// ---------- Estado ----------

function novoEstado() {
    return {
        respostas: {},
        contexto: { apoiosEscola: [], apoiosFora: [], medidas: [], rtp: '', diagnostico: '' },
        areasFechadas: [], areasTocadas: [],
        escola: {},
        marcacoes: {}, confirmacoes: {},
        sintese: { fortes: [], fortesTexto: '', barreiras: [], chegam: {}, dataRevisao: '', contributo: '' },
        idRelatorio: null
    };
}
let estado = novoEstado();

const resp = id => estado.respostas[id] || (estado.respostas[id] = { v: '', seg: {} });
const valorDe = id => (estado.respostas[id] || {}).v || '';
const segDe = (id, k) => ((estado.respostas[id] || {}).seg || {})[k];
const val = id => document.getElementById(id).value.trim();
const rotulo = (lista, v) => (lista.find(([x]) => x === v) || [])[1] || '';
const el = (tag, cls, texto) => { const e = document.createElement(tag); if (cls) e.className = cls; if (texto != null) e.textContent = texto; return e; };

// ---------- Visibilidade ----------

const areaAberta = nome => !estado.areasFechadas.includes(nome);
function itemVisivel(id) {
    const a = areaDoItem(id);
    return areaAberta(a.nome) || ITENS[id].sempreVisivel;
}
const itensAbertos = () => ORDEM_ITENS.filter(itemVisivel);

// Quando aparece cada seguimento
function seguimentoVisivel(id, s) {
    const v = valorDe(id);
    switch (s.se) {
        case 'sim': return v === 'Sim';
        case 'naoNPO_NA': return !!v && v !== NPO && v !== NA;
        case 'comAjuda': return AJUDAS.includes(v);
        case 'ajudaOuNR': return AJUDAS.includes(v) || v === NR;
        case 'nr': return v === NR;
        case 'naoNao': return !!v && v !== 'Não';
        case 'naoSim': return !!v && v !== 'Sim';
        case 'respondido': return !!v;
        case 'interesses': return !!v && v !== 'Não sei';
        case 'simOuAsVezes': return v === 'Sim' || v === 'Às vezes';
        case 'emParteOuNao': return v === 'Em parte' || v === 'Não';
        case 'dificultaOuInterrompe': return v === 'Sim' && ['Dificulta a participação', 'Interrompe ou impede a participação'].includes(segDe(id, 'efeito'));
        default: return true;
    }
}

// Respostas que contam: só itens visíveis e seguimentos visíveis
function respostasEfetivas() {
    const r = {};
    itensAbertos().forEach(id => {
        const x = estado.respostas[id];
        if (!x || !x.v) return;
        const seg = {};
        ITENS[id].seg.forEach(s => { if (seguimentoVisivel(id, s) && x.seg[s.k] !== undefined) seg[s.k] = x.seg[s.k]; });
        r[id] = { v: x.v, seg };
    });
    return r;
}

// ---------- Arranque ----------

document.addEventListener('DOMContentLoaded', function () {
    construirContexto();
    construirAreas();
    construirChecklist();
    configurarEventos();
    if (!restaurarEstado()) document.getElementById('data').value = dataDeHoje();
    aplicarAreas();
    ORDEM_ITENS.forEach(atualizarItem);
    atualizarProgresso();
    atualizarEscola();
    document.getElementById('privacidadePartilha').hidden = !ENDPOINT_PARTILHA;
});

function criarOpcao(tipo, nome, id, valor, texto, aoMudar) {
    const input = document.createElement('input');
    input.type = tipo;
    input.name = nome;
    input.id = id;
    input.value = valor;
    input.addEventListener('change', aoMudar);
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = texto;
    const span = el('span', 'opcao-contexto');
    span.appendChild(input);
    span.appendChild(label);
    return span;
}

let contadorIds = 0;
const novoId = p => `${p}_${++contadorIds}`;

function construirContexto() {
    document.querySelectorAll('.grupo-opcoes[data-campo]').forEach(fs => {
        const campo = fs.dataset.campo;
        const radio = fs.dataset.tipo === 'radio';
        const caixa = el('div', 'grupo-opcoes-lista');
        GRUPOS_CONTEXTO[campo].forEach((op, i) => {
            const span = criarOpcao(radio ? 'radio' : 'checkbox', campo, `${campo}_${i}`, op, op, function () {
                if (radio) estado.contexto[campo] = this.value;
                else estado.contexto[campo] = [...fs.querySelectorAll('input:checked')].map(x => x.value);
                guardarEstado();
            });
            if (campo === 'apoiosFora' && APOIOS_SAUDE.includes(op)) {
                const s = el('span', 'marca-saude', '✚');
                s.title = 'Dado de saúde';
                span.querySelector('label').appendChild(s);
            }
            caixa.appendChild(span);
        });
        fs.appendChild(caixa);
    });
}

function construirAreas() {
    const lista = document.getElementById('listaAreas');
    AREAS.forEach((area, i) => {
        const span = criarOpcao('checkbox', 'areas', `area_${i}`, area.nome, area.nome, function () { alternarArea(area.nome, this.checked); });
        if (area.nome === AREA_FIXA) {
            const input = span.querySelector('input');
            input.checked = true;
            input.disabled = true;
            span.appendChild(el('span', 'nota-area-fixa', 'sempre aberta'));
        }
        lista.appendChild(span);
    });
}

function alternarArea(nome, abrir) {
    if (nome === AREA_FIXA) return;
    const area = AREAS.find(a => a.nome === nome);
    if (!abrir) {
        const respondidos = area.itens.filter(id => valorDe(id) && !ITENS[id].sempreVisivel).length;
        if (respondidos && !confirm(`Esta área tem ${respondidos} ${respondidos === 1 ? 'item respondido' : 'itens respondidos'}. As respostas ficam guardadas, mas não entram no relatório enquanto a área estiver fechada.\n\nFechar a área?`)) {
            aplicarAreas();
            return;
        }
    }
    estado.areasFechadas = abrir ? estado.areasFechadas.filter(a => a !== nome) : [...new Set([...estado.areasFechadas, nome])];
    if (!estado.areasTocadas.includes(nome)) estado.areasTocadas.push(nome);
    aplicarAreas();
    aposMudanca();
}

function aplicarAreas() {
    AREAS.forEach((area, i) => {
        const fechada = !areaAberta(area.nome);
        document.getElementById(`area_${i}`).checked = !fechada;
        document.getElementById(`categoria_${i}`).classList.toggle('fechada', fechada);
    });
}

// A autonomia pessoal começa fechada a partir do 2.º ciclo, se o professor ainda não lhe tocou
function ajustarAreasAoNivel() {
    if (estado.areasTocadas.includes(AREA_AUTONOMIA)) return;
    estado.areasFechadas = estado.areasFechadas.filter(a => a !== AREA_AUTONOMIA);
    if (NIVEIS_SEM_AUTONOMIA.includes(val('nivel'))) estado.areasFechadas.push(AREA_AUTONOMIA);
    aplicarAreas();
    aposMudanca();
}

// ---------- Itens ----------

function construirChecklist() {
    const container = document.getElementById('checklist');
    AREAS.forEach((area, i) => {
        const cat = el('div', 'categoria');
        cat.id = `categoria_${i}`;
        const header = el('h4', 'categoria-header', area.nome);
        if (area.nome !== AREA_FIXA) {
            const fechar = el('button', 'btn-area btn-fechar-area', 'Fechar área');
            fechar.type = 'button';
            fechar.addEventListener('click', () => alternarArea(area.nome, false));
            header.appendChild(fechar);
        }
        cat.appendChild(header);

        const resumo = el('div', 'area-fechada-resumo');
        const ocultos = area.itens.filter(id => !ITENS[id].sempreVisivel);
        const fixos = area.itens.filter(id => ITENS[id].sempreVisivel);
        resumo.appendChild(el('p', null, `Área não observada nesta altura. Ficam por responder ${ocultos.length} itens.`));
        const ul = el('ul');
        ocultos.forEach(id => ul.appendChild(el('li', null, `${id}. ${ITENS[id].titulo}`)));
        resumo.appendChild(ul);
        const abrir = el('button', 'btn-area btn-abrir-area', 'Abrir esta área');
        abrir.type = 'button';
        abrir.addEventListener('click', () => alternarArea(area.nome, true));
        resumo.appendChild(abrir);
        if (fixos.length) resumo.appendChild(el('p', 'nota-fixo', `O item ${fixos.join(', ')} continua visível mesmo com a área fechada, porque diz respeito à segurança e ao bem-estar do aluno.`));
        cat.appendChild(resumo);

        const corpo = el('div', 'area-itens');
        area.itens.forEach(id => corpo.appendChild(construirItem(id)));
        cat.appendChild(corpo);
        container.appendChild(cat);
    });
}

function listaCriterios(pares) {
    const d = el('details', 'criterios');
    d.appendChild(el('summary', null, 'Ajuda para escolher'));
    const ul = el('ul');
    pares.forEach(([r, t]) => {
        const li = el('li');
        li.appendChild(el('strong', null, `${r}. `));
        li.appendChild(document.createTextNode(t));
        ul.appendChild(li);
    });
    d.appendChild(ul);
    return d;
}

function construirItem(id) {
    const info = ITENS[id];
    const fs = el('fieldset', `sinal-item tipo-${info.tipo}` + (info.sempreVisivel ? ' item-fixo' : ''));
    fs.id = `item_${id}`;
    const legenda = el('legend', 'sinal-descricao');
    legenda.appendChild(el('span', 'item-numero', `${id}. `));
    legenda.appendChild(document.createTextNode(info.pergunta));
    fs.appendChild(legenda);
    if (info.tipo === 'N') fs.appendChild(el('p', 'pergunta-escala', 'Nas oportunidades em que isto foi preciso, com que frequência precisou de ajuda individual, contando com as adaptações que já usa?'));

    if (info.tipo === 'D') {
        const caixa = el('div', 'campos-interesses visivel');
        const t = el('textarea', 'observacao-input');
        t.id = `interesses_${id}`;
        t.rows = 2;
        t.placeholder = 'Ex.: dinossauros, mapas, comboios, desenho';
        const ns = criarOpcao('checkbox', `naosei_${id}`, `naosei_${id}`, 'Não sei', 'Não sei', function () {
            t.disabled = this.checked;
            resp(id).v = this.checked ? 'Não sei' : t.value.trim();
            aposResposta(id);
        });
        t.addEventListener('input', function () { resp(id).v = this.value.trim(); aposResposta(id); });
        const l = el('label', 'rotulo-campo', 'Escreva os interesses do aluno');
        l.htmlFor = t.id;
        caixa.appendChild(l);
        caixa.appendChild(t);
        caixa.appendChild(ns);
        fs.appendChild(caixa);
    } else {
        const opcoes = el('div', `sinal-opcoes escala-${info.tipo}`);
        const nome = `item_${id}_valor`;
        info.opcoes.forEach((op, i) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = nome;
            radio.value = op;
            radio.id = `${nome}_${i}`;
            radio.addEventListener('change', function () { resp(id).v = this.value; aposResposta(id); });
            const label = el('label', `opcao opcao-${i}`, op);
            label.htmlFor = radio.id;
            opcoes.appendChild(radio);
            opcoes.appendChild(label);
        });
        fs.appendChild(opcoes);
        const pares = [];
        if (info.tipo === 'N') info.opcoes.forEach(o => pares.push([o, info.criterios[o] || CRITERIOS_N[o]]));
        else if (info.tipo === 'C') {
            pares.push(['Sim', 'No período indicado, observou ou alguém lhe referiu isto']);
            pares.push(['Não', 'Não foi identificado no período indicado, o que não quer dizer que nunca aconteça']);
            pares.push(['Não tenho informação suficiente', 'Falta-lhe informação para responder']);
        } else Object.entries(info.criterios).forEach(p => pares.push(p));
        if (pares.length) fs.appendChild(listaCriterios(pares));
    }

    const segs = el('div', 'seguimentos');
    info.seg.forEach(s => segs.appendChild(construirSeguimento(id, s)));
    fs.appendChild(segs);
    return fs;
}

function construirSeguimento(id, s) {
    const caixa = el('div', 'seguimento');
    caixa.dataset.k = s.k;
    const nome = `seg_${id}_${s.k}`;
    const guardar = v => { resp(id).seg[s.k] = v; aposResposta(id, true); };
    const titulo = (texto, opc) => {
        const p = el('p', 'rotulo-campo', texto);
        if (opc) p.appendChild(el('span', 'opcional', ' (opcional)'));
        return p;
    };

    if (s.k === 'efeito') {
        caixa.appendChild(titulo(s.p));
        const lista = el('div', 'grupo-opcoes-lista');
        s.o.forEach((o, i) => lista.appendChild(criarOpcao('radio', nome, `${nome}_${i}`, o, o, function () { guardar(this.value); })));
        caixa.appendChild(lista);
        const pares = s.o.map(o => [o, CRITERIOS_EFEITO[o]]);
        const exemplos = ITENS[id].criterios;
        const lc = listaCriterios(pares);
        Object.entries(exemplos).forEach(([r, t]) => {
            const li = el('li', 'exemplo-item');
            li.appendChild(el('strong', null, `Exemplo neste item, ${r.toLowerCase()}. `));
            li.appendChild(document.createTextNode(t.charAt(0).toUpperCase() + t.slice(1)));
            lc.querySelector('ul').appendChild(li);
        });
        caixa.appendChild(lc);
        return caixa;
    }
    if (s.tipo === 'texto') {
        const l = titulo(s.p, true);
        const t = el('input', 'campo-texto');
        t.type = 'text';
        t.id = nome;
        t.addEventListener('input', function () { resp(id).seg[s.k] = this.value; guardarEstado(); });
        caixa.appendChild(l);
        caixa.appendChild(t);
        return caixa;
    }
    if (s.tipo === 'episodios') {
        caixa.appendChild(titulo(s.p));
        const g = el('div', 'campos-episodios');
        const atual = () => resp(id).seg[s.k] || (resp(id).seg[s.k] = { obs: '', ref: '', desconhecido: false });
        [['obs', 'Observados por si'], ['ref', 'Só referidos por outras pessoas, sem os ter observado']].forEach(([k, r]) => {
            const lab = el('label', 'campo-numero');
            lab.appendChild(document.createTextNode(r + ' '));
            const n = el('input');
            n.type = 'number'; n.min = 0; n.max = 99; n.inputMode = 'numeric'; n.id = `${nome}_${k}`;
            n.addEventListener('input', function () { atual()[k] = this.value; aposResposta(id, true); });
            lab.appendChild(n);
            g.appendChild(lab);
        });
        g.appendChild(criarOpcao('checkbox', `${nome}_desc`, `${nome}_desc`, 'sim', 'Número desconhecido', function () { atual().desconhecido = this.checked; aposResposta(id, true); }));
        caixa.appendChild(g);
        if (s.nota) caixa.appendChild(el('p', 'nota-sub', s.nota));
        return caixa;
    }
    if (s.tipo === 'risco') {
        caixa.appendChild(titulo(s.p));
        const atual = () => resp(id).seg[s.k] || (resp(id).seg[s.k] = { v: '', presente: '', oque: '', circunstancia: '' });
        const lista = el('div', 'grupo-opcoes-lista');
        const sub1 = el('div', 'sub-risco');
        const sub2 = el('div', 'sub-risco');
        s.o.forEach((o, i) => lista.appendChild(criarOpcao('radio', nome, `${nome}_${i}`, o, o, function () {
            atual().v = this.value;
            aposResposta(id, true);
        })));
        caixa.appendChild(lista);
        sub1.dataset.quando = 'Já aconteceu';
        sub1.appendChild(titulo('O que aconteceu?'));
        const t1 = el('input', 'campo-texto'); t1.type = 'text'; t1.id = `${nome}_oque`;
        t1.addEventListener('input', function () { atual().oque = this.value; guardarEstado(); });
        sub1.appendChild(t1);
        sub1.appendChild(titulo('A circunstância continua presente?'));
        const l2 = el('div', 'grupo-opcoes-lista');
        ['Sim', 'Não', 'Não sei'].forEach((o, i) => l2.appendChild(criarOpcao('radio', `${nome}_pres`, `${nome}_pres_${i}`, o, o, function () { atual().presente = this.value; aposResposta(id, true); })));
        sub1.appendChild(l2);
        sub2.dataset.quando = 'Existe um risco concreto, sem incidente conhecido';
        sub2.appendChild(titulo('Que circunstância?'));
        const t2 = el('input', 'campo-texto'); t2.type = 'text'; t2.id = `${nome}_circ`;
        t2.addEventListener('input', function () { atual().circunstancia = this.value; guardarEstado(); });
        sub2.appendChild(t2);
        caixa.appendChild(sub1);
        caixa.appendChild(sub2);
        return caixa;
    }
    if (s.tipo === 'outro') {
        const det = el('details', 'outro-contexto');
        det.appendChild(el('summary', null, 'Acrescentar informação de outro contexto'));
        const atual = () => resp(id).seg[s.k] || (resp(id).seg[s.k] = { fonte: '', sabe: '' });
        det.appendChild(titulo('De quem é a informação?'));
        const l1 = el('div', 'grupo-opcoes-lista');
        ['Família', 'Aluno', 'Outro técnico'].forEach((o, i) => l1.appendChild(criarOpcao('radio', `${nome}_fonte`, `${nome}_fonte_${i}`, o, o, function () { atual().fonte = this.value; aposResposta(id, true); })));
        det.appendChild(l1);
        det.appendChild(titulo('O que se sabe noutro contexto?'));
        const l2 = el('div', 'grupo-opcoes-lista');
        ['Faz sem ajuda individual', 'Precisa de ajuda', 'Não se sabe'].forEach((o, i) => l2.appendChild(criarOpcao('radio', `${nome}_sabe`, `${nome}_sabe_${i}`, o, o, function () { atual().sabe = this.value; aposResposta(id, true); })));
        det.appendChild(l2);
        det.appendChild(el('p', 'nota-sub', 'Aparece no relatório numa coluna à parte e não gera estratégias automáticas.'));
        caixa.appendChild(det);
        return caixa;
    }
    caixa.appendChild(titulo(s.p, s.opcional));
    if (s.multi) caixa.appendChild(el('p', 'nota-sub', 'Pode marcar mais do que uma.'));
    const lista = el('div', 'grupo-opcoes-lista');
    s.o.forEach((o, i) => lista.appendChild(criarOpcao(s.multi ? 'checkbox' : 'radio', nome, `${nome}_${i}`, o, o, function () {
        if (s.multi) guardar([...lista.querySelectorAll('input:checked')].map(x => x.value));
        else guardar(this.value);
    })));
    caixa.appendChild(lista);
    if (s.nota) caixa.appendChild(el('p', 'nota-sub', s.nota));
    return caixa;
}

function atualizarItem(id) {
    const fs = document.getElementById(`item_${id}`);
    const v = valorDe(id);
    fs.classList.toggle('respondido', !!v);
    if (v) fs.classList.remove('por-avaliar');
    fs.querySelectorAll(':scope > .seguimentos > .seguimento').forEach(c => {
        const s = ITENS[id].seg.find(x => x.k === c.dataset.k);
        c.hidden = !seguimentoVisivel(id, s);
        if (s.tipo === 'risco') {
            const r = segDe(id, s.k) || {};
            c.querySelectorAll('.sub-risco').forEach(sub => { sub.hidden = sub.dataset.quando !== r.v; });
        }
    });
}

function aposResposta(id, soSeguimento) {
    atualizarItem(id);
    aposMudanca();
}

function aposMudanca() {
    atualizarProgresso();
    atualizarEscola();
    guardarEstado();
    if (!document.getElementById('sugestoes').hidden) construirSugestoes();
    if (!document.getElementById('relatorio').hidden) construirRelatorio();
}

function atualizarProgresso() {
    const ids = itensAbertos();
    const feitos = ids.filter(id => valorDe(id)).length;
    const pct = ids.length ? Math.round((feitos / ids.length) * 100) : 0;
    const fechadas = AREAS.filter(a => !areaAberta(a.nome)).length;
    document.getElementById('progressoTexto').textContent = `${feitos} de ${ids.length} itens respondidos` + (fechadas ? ` (${fechadas} ${fechadas === 1 ? 'área fechada' : 'áreas fechadas'})` : '');
    document.getElementById('progressoPreenchido').style.width = `${pct}%`;
    document.getElementById('progressoBarra').setAttribute('aria-valuenow', pct);
    document.getElementById('progresso').classList.toggle('completo', feitos === ids.length);
}

// ---------- Necessidade identificada em cada item ----------

function necessidade(id, r) {
    const x = r[id];
    if (!x) return false;
    const it = ITENS[id];
    const v = x.v;
    if (it.tipo === 'N') return AJUDAS.includes(v) || v === NR;
    if (it.tipo === 'C') {
        if (v !== 'Sim') return false;
        const risco = (x.seg.risco || {}).v;
        return x.seg.efeito !== 'Não foi identificado desconforto nem dificuldade de participação' || ['Já aconteceu', 'Existe um risco concreto, sem incidente conhecido'].includes(risco);
    }
    if (it.tipo === 'D') return /^Sim/.test(x.seg.dificultam || '');
    if (id === '9') return v === 'Às vezes' || v === 'Não';
    if (id === '36') return v === 'Em parte' || v === 'Não';
    if (id === '10') return v === 'Sim' || v === 'Às vezes';
    return v === 'Sim';
}

const semInformacao = (id, r) => r[id] && (SEM_INFO.includes(r[id].v) || r[id].v === NPO);

// ---------- Condições da escola ----------

function atualizarEscola() {
    const r = respostasEfetivas();
    const s = document.getElementById('escola');
    const grupos = AREAS.filter(a => areaAberta(a.nome) && a.itens.some(id => necessidade(id, r)));
    const assinatura = grupos.map(a => a.nome).join('|');
    if (s.dataset.assinatura === assinatura && s.childElementCount) return;
    s.dataset.assinatura = assinatura;
    s.innerHTML = '';
    s.appendChild(el('h3', null, 'Condições da escola'));
    s.appendChild(el('p', 'nota-secao', 'Responda a pensar nas situações em que este aluno precisa de cada condição, e não na escola em geral. Cada grupo aparece quando a área tem pelo menos uma necessidade identificada.'));
    const ajuda = listaCriterios([
        ['Sim', 'Existe nas situações em que o aluno precisa e funciona para ele'],
        ['Em parte', 'Existe, mas falta em algumas das situações em que o aluno precisa, ou não funciona bem para ele'],
        ['Não', 'Não existe nas situações em que o aluno precisa'],
        ['Não sei', 'Falta informação'],
        ['Não é necessário nesta situação', 'A condição não faz falta a este aluno']
    ]);
    s.appendChild(ajuda);
    [...grupos.map(a => [a.nome, a.escola]), ['Escola e família', CONTEUDO.escolaFamilia]].forEach(([nome, lista]) => {
        if (!lista.length) return;
        const g = el('div', 'grupo-escola');
        g.appendChild(el('h4', null, nome));
        lista.forEach((t, i) => {
            const chave = `${nome}|${i}`;
            const linha = el('div', 'linha-escola');
            linha.appendChild(el('p', null, t));
            const l = el('div', 'grupo-opcoes-lista');
            RESPOSTAS_ESCOLA.forEach((o, j) => {
                const op = criarOpcao('radio', `escola_${nome}_${i}`, `escola_${nome}_${i}_${j}`.replace(/\s/g, '_'), o, o, function () {
                    estado.escola[chave] = this.value;
                    guardarEstado();
                    if (!document.getElementById('relatorio').hidden) construirRelatorio();
                });
                if (estado.escola[chave] === o) op.querySelector('input').checked = true;
                l.appendChild(op);
            });
            linha.appendChild(l);
            g.appendChild(linha);
        });
        s.appendChild(g);
    });
}

function condicoesEscola() {
    const r = respostasEfetivas();
    const out = [];
    AREAS.filter(a => areaAberta(a.nome) && a.itens.some(id => necessidade(id, r))).forEach(a => a.escola.forEach((t, i) => out.push({ area: a.nome, t, v: estado.escola[`${a.nome}|${i}`] || '' })));
    CONTEUDO.escolaFamilia.forEach((t, i) => out.push({ area: 'Escola e família', t, v: estado.escola[`Escola e família|${i}`] || '' }));
    return out;
}

// ---------- Motor das sugestões ----------

function calcularSugestoes() {
    const r = respostasEfetivas();
    const R = criarR(CONTEUDO, { respostas: r, nivel: val('nivel'), marcacoes: estado.marcacoes }, false);
    const porItem = {};
    const add = (item, s) => (porItem[item] = porItem[item] || []).push(s);
    const ativas = new Set();

    CONTEUDO.linhas.forEach((L, ordem) => {
        const chave = `${L.id}|${L.item}`;
        const regra = REGRAS[chave];
        if (!regra) return;
        let item = L.item;
        if (item === '*comunicacao') {
            if (!areaAberta('Comunicação')) return;
            item = AREAS.find(a => a.nome === 'Comunicação').itens.find(i => r[i] && (AJUDAS.includes(r[i].v) || r[i].v === NR));
            if (!item) return;
        } else if (!r[item]) return;
        let q = false, b = false;
        try { q = !!regra.quando(R); b = regra.base ? !!regra.base(R) : false; } catch (e) { console.warn(chave, e); return; }
        let modo = null;
        const c = estado.confirmacoes[chave];
        if (regra.confirmacao) {
            if (regra.ou) modo = q ? 'normal' : (b ? 'confirmar' : null);
            else modo = q ? 'confirmar' : null;
            if (modo === 'confirmar') modo = c === 'Sim' ? 'normal' : (c === 'Não' ? null : 'confirmar');
        } else if (q) modo = 'normal';
        if (!modo) return;
        // Uma sugestão que precisa de confirmação só aparece quando o item indica necessidade ou falta de informação
        if (modo === 'confirmar' && !(necessidade(item, r) || SEM_INFO.includes(r[item].v))) return;
        if (regra.planoDepende && !R.noPlano(regra.planoDepende) && modo === 'normal') modo = 'depende';
        ativas.add(chave);
        add(item, { id: L.id, chave, item, L, regra, modo, ordem, seguranca: L.finalidade === 'Segurança' });
    });

    // Linhas genéricas
    ORDEM_ITENS.forEach((id, k) => {
        const x = r[id];
        if (!x) return;
        const proprias = porItem[id] || [];
        const gen = (gid, condicao) => {
            if (!condicao) return;
            const L = Object.assign({ id: gid, item: id }, GENERICAS[gid]);
            add(id, { id: gid === 'g-acessivel' || gid === 'g-forma' || gid === 'g-observar' ? `${gid}-${id}` : gid, chave: `${gid}|${id}`, item: id, L, regra: {}, modo: 'normal', ordem: 100000 + k, seguranca: false, generica: true });
        };
        if (x.seg.persp === 'Ainda não') gen('g-ouvir', !proprias.some(s => s.regra.substituiOuvir));
        if (x.seg.persp === 'Não foi possível') gen('g-perguntar', !proprias.some(s => s.regra.substituiOuvir));
        if (x.v === NR) {
            gen('g-acessivel', x.seg.circ === 'Não conseguiu fazer');
            gen('g-forma', ['A atividade ou o espaço não estavam acessíveis', 'A tarefa não era adequada para ele'].includes(x.seg.circ));
        }
        const o = x.seg.outro;
        if (o && o.sabe && ITENS[id].tipo === 'N') {
            const escolaAjuda = AJUDAS.includes(x.v) || x.v === NR;
            gen('g-comparar', (x.v === 'Sem ajuda individual' && o.sabe === 'Precisa de ajuda') || (escolaAjuda && o.sabe === 'Faz sem ajuda individual'));
        }
        if (ITENS[id].tipo === 'C' && x.seg.efeito === 'Não foi possível determinar') gen('g-observar', !proprias.some(s => s.regra.substituiObservar));
    });

    // Ordenar dentro de cada item e separar primeiras e «Ver mais»
    const vistos = new Map();
    const resultado = [];
    ORDEM_ITENS.forEach(id => {
        const lista = porItem[id];
        if (!lista) return;
        const peso = s => (s.seguranca ? (s.regra.primeiro ? 0 : 1) : (s.regra.primeiro ? 2 : (s.regra.depois ? 4 : 3)));
        lista.sort((a, b) => peso(a) - peso(b) || a.ordem - b.ordem);
        const proprias = [], partilhadas = [];
        lista.forEach(s => {
            if (vistos.has(s.id)) { vistos.get(s.id).itens.push(id); partilhadas.push(vistos.get(s.id)); return; }
            s.itens = [id];
            vistos.set(s.id, s);
            proprias.push(s);
        });
        let n = 0;
        proprias.forEach(s => {
            if (s.id === 'g-ouvir' || s.id === 'g-perguntar') { s.grupo = 'ouvir'; return; }
            if (s.L.item === '*comunicacao') { s.grupo = 'adaptacoes'; return; }
            if (s.regra.opcional) { s.grupo = 'opcional'; return; }
            if (s.seguranca && s.modo === 'normal') { s.grupo = 'primeiras'; return; }
            if (s.modo === 'normal' && !s.regra.verMais && n < MAX_PRIMEIRAS) { s.grupo = 'primeiras'; n++; return; }
            s.grupo = 'mais';
        });
        resultado.push({ item: id, proprias, partilhadas: [...new Set(partilhadas)] });
    });
    return resultado;
}

// ---------- Ecrã das sugestões ----------

function principiosDoItem(id) {
    return (CONTEUDO.principiosItem[id] || []);
}

function cartao(s) {
    const L = s.L;
    const chave = s.id;
    const c = el('div', 'cartao-estrategia' + (s.seguranca ? ' cartao-seguranca' : '') + (s.modo !== 'normal' ? ' cartao-pendente' : ''));
    const t = el('p', 'cartao-texto');
    if (s.seguranca) t.appendChild(el('span', 'etiqueta-seguranca', 'Segurança'));
    t.appendChild(document.createTextNode(L.texto));
    if (s.regra.opcional) t.appendChild(el('span', 'etiqueta-opcional', ' (opcional)'));
    c.appendChild(t);
    const outros = s.itens.length > 1 ? `Responde aos itens ${s.itens.join(', ')}` : (['ouvir', 'opcional', 'adaptacoes'].includes(s.grupo) ? `Item ${s.itens[0]}` : '');
    if (outros) c.appendChild(el('p', 'cartao-itens', outros));
    if (s.regra.nota) c.appendChild(el('p', 'cartao-nota', s.regra.nota));
    if (L.comoSaber) c.appendChild(el('p', 'cartao-indicador', `Como saber se ajuda. ${L.comoSaber}`));
    if (L.depende) c.appendChild(el('p', 'cartao-depende', `Depende de ${L.depende.charAt(0).toLowerCase() + L.depende.slice(1)}.`));
    if (L.pratica) c.appendChild(el('p', 'cartao-pratica', `Relacionada com a prática «${L.pratica}» (Hume et al., 2021).`));

    if (s.modo === 'confirmar') {
        const bloco = el('div', 'cartao-confirmar');
        bloco.appendChild(el('p', 'rotulo-campo', s.regra.confirmacao));
        const l = el('div', 'grupo-opcoes-lista');
        CONFIRMA.forEach((o, i) => {
            const op = criarOpcao('radio', `conf_${s.chave}`, `conf_${s.chave}_${i}`.replace(/[^\w-]/g, '_'), o, o, function () {
                estado.confirmacoes[s.chave] = this.value;
                guardarEstado();
                construirSugestoes();
            });
            if (estado.confirmacoes[s.chave] === o) op.querySelector('input').checked = true;
            l.appendChild(op);
        });
        bloco.appendChild(l);
        bloco.appendChild(el('p', 'nota-sub', 'Enquanto não confirmar, esta sugestão fica como possibilidade a ponderar.'));
        c.appendChild(bloco);
        return c;
    }
    if (s.modo === 'depende') {
        const dep = CONTEUDO.linhas.find(x => x.id === s.regra.planoDepende);
        c.appendChild(el('p', 'nota-sub', `Fica disponível depois de marcar como implementada ou a implementar «${dep ? dep.texto : s.regra.planoDepende}».`));
        return c;
    }
    c.appendChild(controlosMarcacao(chave, L));
    return c;
}

function controlosMarcacao(chave, L) {
    const m = estado.marcacoes[chave] || {};
    const caixa = el('div', 'marcacao');
    caixa.appendChild(el('p', 'rotulo-campo', 'Isto já se faz?'));
    const l = el('div', 'grupo-opcoes-lista');
    const base = `marc_${chave}`.replace(/[^\w-]/g, '_');
    ESTADOS.forEach(([v, r], i) => {
        const op = criarOpcao('radio', base, `${base}_${i}`, v, r, function () {
            estado.marcacoes[chave] = Object.assign(estado.marcacoes[chave] || {}, { estado: this.value });
            guardarEstado();
            construirSugestoes();
        });
        if (m.estado === v) op.querySelector('input').checked = true;
        l.appendChild(op);
    });
    const limpar = el('button', 'btn-limpar-marcacao', 'Limpar');
    limpar.type = 'button';
    limpar.addEventListener('click', () => { delete estado.marcacoes[chave]; guardarEstado(); construirSugestoes(); });
    if (m.estado) l.appendChild(limpar);
    caixa.appendChild(l);

    if (m.estado === 'pratica') {
        caixa.appendChild(el('p', 'rotulo-campo', 'Quanto ajuda?'));
        const a = el('div', 'grupo-opcoes-lista');
        AJUDA.forEach(([v, r], i) => {
            const op = criarOpcao('radio', `${base}_aj`, `${base}_aj_${i}`, v, r, function () { m.ajuda = this.value; estado.marcacoes[chave] = m; guardarEstado(); });
            if (m.ajuda === v) op.querySelector('input').checked = true;
            a.appendChild(op);
        });
        caixa.appendChild(a);
    }
    if (m.estado === 'nao' || m.estado === 'pratica') {
        const lab = el('label', 'rotulo-campo', 'Quem fica responsável?');
        const inp = el('input', 'campo-texto');
        inp.type = 'text';
        inp.id = `${base}_resp`;
        lab.htmlFor = inp.id;
        inp.value = m.responsavel || '';
        const dl = el('datalist');
        dl.id = `${base}_lista`;
        (L.responsavel || '').split(/,\s*| ou /).filter(Boolean).forEach(x => { const o = el('option'); o.value = x.charAt(0).toUpperCase() + x.slice(1); dl.appendChild(o); });
        inp.setAttribute('list', dl.id);
        inp.addEventListener('input', function () { m.responsavel = this.value; estado.marcacoes[chave] = m; guardarEstado(); });
        caixa.appendChild(lab);
        caixa.appendChild(inp);
        caixa.appendChild(dl);
        if (L.consultar) caixa.appendChild(el('p', 'nota-sub', `Consultar ${L.consultar.charAt(0).toLowerCase() + L.consultar.slice(1)}.`));
    }
    if (m.estado === 'impossivel') {
        caixa.appendChild(el('p', 'rotulo-campo', 'Porquê?'));
        const a = el('div', 'grupo-opcoes-lista');
        MOTIVOS.forEach(([v, r], i) => {
            const op = criarOpcao('checkbox', `${base}_mot`, `${base}_mot_${i}`, v, r, function () {
                m.motivos = [...a.querySelectorAll('input:checked')].map(x => x.value);
                estado.marcacoes[chave] = m;
                guardarEstado();
            });
            if ((m.motivos || []).includes(v)) op.querySelector('input').checked = true;
            a.appendChild(op);
        });
        caixa.appendChild(a);
    }
    return caixa;
}

function construirSugestoes() {
    const s = document.getElementById('sugestoesConteudo');
    const scroll = window.scrollY;
    s.innerHTML = '';
    const lista = calcularSugestoes();
    if (!lista.length) {
        s.appendChild(el('p', 'mensagem-vazia', 'As respostas não indicam necessidades de apoio. Pode ainda gerar o relatório, com o que o aluno faz bem.'));
        return;
    }
    const ouvir = lista.flatMap(x => x.proprias.filter(y => y.grupo === 'ouvir'));
    if (ouvir.length) {
        const g = el('div', 'grupo-sugestoes grupo-ouvir');
        g.appendChild(el('h4', null, 'Ouvir o aluno'));
        g.appendChild(el('p', 'nota-secao', 'Nestes itens, a perspetiva do aluno ainda não foi recolhida ou não foi possível recolhê-la.'));
        ouvir.forEach(x => g.appendChild(cartao(x)));
        s.appendChild(g);
    }
    const adaptacoes = lista.flatMap(x => x.proprias.filter(y => y.grupo === 'adaptacoes'));
    const opcionais = lista.flatMap(x => x.proprias.filter(y => y.grupo === 'opcional'));
    if (opcionais.length) {
        const g = el('div', 'grupo-sugestoes grupo-opcional');
        g.appendChild(el('h4', null, 'O que facilita a participação (sugestões opcionais)'));
        g.appendChild(el('p', 'nota-secao', 'Estas sugestões vêm dos interesses do aluno. Só entram no plano se as escolher.'));
        opcionais.forEach(x => g.appendChild(cartao(x)));
        s.appendChild(g);
    }
    let areaAtual = null;
    lista.forEach(({ item, proprias, partilhadas }) => {
        const prim = proprias.filter(x => x.grupo === 'primeiras');
        const mais = proprias.filter(x => x.grupo === 'mais');
        if (!prim.length && !mais.length && !partilhadas.length) return;
        const area = areaDoItem(item).nome;
        if (area !== areaAtual) {
            areaAtual = area;
            s.appendChild(el('h4', 'sugestoes-area', area));
            const pa = AREAS.find(a => a.nome === area).principios;
            if (pa.length) {
                const d = el('details', 'principios');
                d.appendChild(el('summary', null, 'Princípios desta área'));
                d.appendChild(listaSimples(pa));
                s.appendChild(d);
            }
            if (area === 'Comunicação' && adaptacoes.length) {
                const g = el('div', 'grupo-sugestoes');
                g.appendChild(el('h5', null, 'Adaptações de comunicação'));
                g.appendChild(el('p', 'resumo-resposta', 'Formas de os adultos comunicarem com o aluno, que valem para toda a área.'));
                adaptacoes.forEach(x => g.appendChild(cartao(x)));
                s.appendChild(g);
            }
        }
        const bloco = el('div', 'grupo-sugestoes');
        bloco.appendChild(el('h5', null, `${item}. ${ITENS[item].titulo}`));
        bloco.appendChild(el('p', 'resumo-resposta', descreverResposta(item)));
        principiosDoItem(item).forEach(p => bloco.appendChild(el('p', 'principio', p)));
        prim.forEach(x => bloco.appendChild(cartao(x)));
        partilhadas.forEach(x => bloco.appendChild(el('p', 'nota-partilhada', `Também responde a este item: «${x.L.texto}» (no item ${x.itens[0]}).`)));
        if (mais.length) {
            const d = el('details', 'ver-mais');
            d.appendChild(el('summary', null, `Ver mais (${mais.length})`));
            mais.forEach(x => d.appendChild(cartao(x)));
            bloco.appendChild(d);
        }
        s.appendChild(bloco);
    });
    window.scrollTo(0, scroll);
}

function listaSimples(textos, classe) {
    const ul = el('ul', classe || 'lista-sintese');
    textos.forEach(t => { const li = el('li'); if (typeof t === 'string') li.textContent = t; else li.appendChild(t); ul.appendChild(li); });
    return ul;
}

// Resumo de uma resposta, em texto corrido
function descreverResposta(id) {
    const x = (estado.respostas[id] || {});
    const it = ITENS[id];
    const partes = [];
    if (it.tipo === 'D') return x.v === 'Não sei' ? 'Não sei' : `Interesses: ${x.v}`.replace(': ', ', ');
    partes.push(x.v);
    const seg = respostasEfetivas()[id] ? respostasEfetivas()[id].seg : {};
    if (seg.efeito) partes.push(seg.efeito.toLowerCase());
    if (seg.sit && seg.sit.length) partes.push(`em ${seg.sit.join(', ').toLowerCase()}`);
    if (seg.risco && seg.risco.v) partes.push(`risco, ${seg.risco.v.toLowerCase()}`);
    return partes.filter(Boolean).join(' · ');
}

// ---------- Relatório ----------

function abrirSugestoes() {
    const emFalta = CAMPOS_IDENTIFICACAO.map(id => document.getElementById(id)).filter(c => !c.value.trim());
    emFalta.forEach(c => c.classList.add('campo-em-falta'));
    if (emFalta.length) {
        alert('Por favor, preencha todos os campos de identificação, incluindo o período de observação.');
        emFalta[0].focus();
        return;
    }
    const abertos = itensAbertos();
    if (!abertos.some(id => valorDe(id))) {
        alert('Por favor, responda a pelo menos um item antes de continuar.');
        document.getElementById('checklist').focus();
        return;
    }
    const porResponder = abertos.filter(id => !valorDe(id));
    document.querySelectorAll('.sinal-item').forEach(e => e.classList.remove('por-avaliar'));
    if (porResponder.length) {
        porResponder.forEach(id => document.getElementById(`item_${id}`).classList.add('por-avaliar'));
        if (!confirm(`Há ${porResponder.length} ${porResponder.length === 1 ? 'item' : 'itens'} por responder nas áreas abertas (assinalados a amarelo).\n\nDeseja continuar mesmo assim?`)) {
            const primeiro = document.getElementById(`item_${porResponder[0]}`);
            primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }
    if (!estado.idRelatorio) estado.idRelatorio = gerarId();
    const sec = document.getElementById('sugestoes');
    sec.hidden = false;
    construirSugestoes();
    sec.scrollIntoView({ behavior: 'smooth' });
    guardarEstado();
}

function gerarRelatorio() {
    construirRelatorio();
    const rel = document.getElementById('relatorio');
    rel.hidden = false;
    document.getElementById('partilha').hidden = !ENDPOINT_PARTILHA;
    rel.scrollIntoView({ behavior: 'smooth' });
    guardarEstado();
}

function criarSecao(titulo, cls) {
    const s = el('div', 'relatorio-secao' + (cls ? ` ${cls}` : ''));
    s.appendChild(el('h4', null, titulo));
    return s;
}

function linhaDado(r, v, alvo, classe) {
    const l = el('div', 'dado-identificacao' + (classe ? ` ${classe}` : ''));
    l.appendChild(el('span', 'dado-label', r));
    l.appendChild(el('span', null, v));
    alvo.appendChild(l);
}

// Todas as estratégias sugeridas, com o item onde aparecem
function sugestoesPlanas() {
    return calcularSugestoes().flatMap(x => x.proprias);
}

function candidatosFortes(r) {
    const c = [];
    itensAbertos().forEach(id => {
        const x = r[id];
        if (!x) return;
        if (ITENS[id].tipo === 'N' && x.v === 'Sem ajuda individual') c.push({ k: `item:${id}`, t: `${ITENS[id].titulo}, sem ajuda individual` });
        if (ITENS[id].tipo === 'N' && x.seg.adapt && x.seg.adapt.length && !x.seg.adapt.includes('Nenhum')) c.push({ k: `adapt:${id}`, t: `Já usa ${x.seg.adapt.join(', ').toLowerCase()} (item ${id})` });
    });
    const i27 = r['27'];
    if (i27 && i27.v !== 'Não sei') {
        const COMO = { 'Motivar nas tarefas': 'motivá-lo nas tarefas', 'Ponte para conversar com colegas': 'servir de ponte para conversar com colegas', 'Momento de descanso ou de regulação': 'dar-lhe momentos de descanso ou de regulação' };
        const como = (i27.seg.comoAjudam || []).map(x => COMO[x]).filter(Boolean);
        const lista = como.length > 1 ? `${como.slice(0, -1).join(', ')} e ${como[como.length - 1]}` : como.join('');
        c.push({ k: 'interesses', t: `Interessa-se por ${i27.v}` + (lista ? `, o que pode ${lista}` : '') });
    }
    sugestoesPlanas().forEach(s => {
        const m = estado.marcacoes[s.id];
        if (m && m.estado === 'pratica' && ['ajuda', 'muito'].includes(m.ajuda)) c.push({ k: `estr:${s.id}`, t: `${s.L.texto} (já em prática, ${rotulo(AJUDA, m.ajuda).toLowerCase()})` });
    });
    condicoesEscola().filter(x => x.v === 'Sim').forEach(x => c.push({ k: `escola:${x.t}`, t: x.t }));
    return c;
}

function descreverCurto(id, r) {
    const x = r[id];
    const p = [];
    if (ITENS[id].tipo === 'C') {
        if (x.seg.efeito) p.push(x.seg.efeito.toLowerCase());
    } else if (ITENS[id].tipo === 'N') p.push(x.v === NR ? 'não realizou a atividade' : x.v.toLowerCase());
    else if (ITENS[id].tipo === 'D') p.push('os interesses dificultam ' + (x.seg.dificultam || '').replace(/^Sim, /, '').toLowerCase());
    else p.push(x.v.toLowerCase());
    if (x.seg.sit && x.seg.sit.length) p.push(`em ${x.seg.sit.join(', ').toLowerCase()}`);
    if (x.seg.risco && ['Já aconteceu', 'Existe um risco concreto, sem incidente conhecido'].includes(x.seg.risco.v)) p.push(`risco, ${x.seg.risco.v.toLowerCase()}`);
    return p.join(', ');
}

function candidatosBarreiras(r) {
    const c = [];
    itensAbertos().forEach(id => {
        if (!necessidade(id, r)) return;
        c.push({ k: `item:${id}`, item: id, t: `${ITENS[id].titulo} (${descreverCurto(id, r)})` });
    });
    condicoesEscola().filter(x => x.v === 'Não' || x.v === 'Em parte').forEach(x => c.push({ k: `escola:${x.t}`, t: `Condição da escola, ${x.t.charAt(0).toLowerCase() + x.t.slice(1)} (${x.v.toLowerCase()})` }));
    return c;
}

function escolhaLista(candidatos, chaveEstado, max, extra) {
    const ul = el('ul', 'lista-sintese lista-escolha');
    const escolhidos = estado.sintese[chaveEstado] = estado.sintese[chaveEstado].filter(k => candidatos.some(c => c.k === k));
    candidatos.forEach(c => {
        const li = el('li');
        const on = escolhidos.includes(c.k);
        li.classList.toggle('excluido', !on);
        const cb = el('input', 'so-ecra');
        cb.type = 'checkbox';
        cb.id = `${chaveEstado}_${c.k}`.replace(/[^\w-]/g, '_');
        cb.checked = on;
        cb.disabled = !on && escolhidos.length >= max;
        cb.addEventListener('change', function () {
            estado.sintese[chaveEstado] = this.checked ? [...estado.sintese[chaveEstado], c.k] : estado.sintese[chaveEstado].filter(k => k !== c.k);
            guardarEstado();
            construirRelatorio();
        });
        const l = el('label', null, c.t);
        l.htmlFor = cb.id;
        li.appendChild(cb);
        li.appendChild(l);
        if (on && extra) li.appendChild(extra(c));
        ul.appendChild(li);
    });
    return ul;
}

function construirRelatorio() {
    const r = respostasEfetivas();
    const c = document.getElementById('relatorioConteudo');
    c.innerHTML = '';
    const sug = sugestoesPlanas();
    const marc = id => estado.marcacoes[id] || {};
    const apoios = sug.filter(s => marc(s.id).estado && s.L.finalidade !== 'Averiguação' && ['nao', 'pratica'].includes(marc(s.id).estado));
    const averiguar = sug.filter(s => s.L.finalidade === 'Averiguação' && marc(s.id).estado === 'nao');

    // Identificação
    const id = criarSecao('Identificação', 'secao-identificacao');
    linhaDado('Nome do aluno', val('nomeAluno'), id);
    linhaDado('Turma', val('turma'), id);
    linhaDado('Nível de ensino', val('nivel'), id);
    linhaDado('Data', formatarData(val('data')), id);
    linhaDado('Período observado', val('periodo'), id);
    linhaDado('Professor(a)', val('professor'), id);
    c.appendChild(id);

    // Primeira página
    const fortesC = candidatosFortes(r);
    const barreirasC = candidatosBarreiras(r);
    const barreirasEscolhidas = () => estado.sintese.barreiras.filter(k => barreirasC.some(b => b.k === k));
    const p = criarSecao('O essencial para apoiar este aluno', 'secao-sintese');
    p.appendChild(el('p', 'nota-secao so-ecra', 'Esta parte abre o PDF. Escolha aqui o que entra. As caixas de escolha não aparecem no PDF.'));

    const p1 = el('div', 'sintese-parte');
    p1.appendChild(el('h5', null, '1. O que o aluno faz bem e o que facilita a sua participação'));
    p1.appendChild(el('p', 'nota-secao so-ecra', `Escolha até ${MAX_FORTES}.`));
    if (fortesC.length) p1.appendChild(escolhaLista(fortesC, 'fortes', MAX_FORTES));
    const ft = el('textarea', 'campo-livre so-ecra');
    ft.rows = 2; ft.placeholder = 'Acrescentar (opcional)'; ft.value = estado.sintese.fortesTexto;
    const ftp = el('p', 'so-impressao campo-livre-relatorio', estado.sintese.fortesTexto);
    ft.addEventListener('input', function () { estado.sintese.fortesTexto = this.value; ftp.textContent = this.value; guardarEstado(); });
    p1.appendChild(ft);
    p1.appendChild(ftp);
    p.appendChild(p1);

    const p2 = el('div', 'sintese-parte');
    p2.appendChild(el('h5', null, '2. Em que situações encontra barreiras à participação, à aprendizagem ou ao bem-estar'));
    if (barreirasC.length) {
        p2.appendChild(el('p', 'nota-secao so-ecra', `Escolha até ${MAX_BARREIRAS}.`));
        p2.appendChild(escolhaLista(barreirasC, 'barreiras', MAX_BARREIRAS, b => {
            const caixa = el('div', 'chegam');
            caixa.appendChild(el('span', 'rotulo-campo', 'Os apoios que existem chegam para esta situação? '));
            const cur = estado.sintese.chegam[b.k] || '';
            const sel = el('select', 'so-ecra');
            ['', ...CHEGAM].forEach(o => { const op = el('option', null, o || 'Escolher'); op.value = o; if (o === cur) op.selected = true; sel.appendChild(op); });
            sel.addEventListener('change', function () { estado.sintese.chegam[b.k] = this.value; guardarEstado(); construirRelatorio(); });
            caixa.appendChild(sel);
            caixa.appendChild(el('span', 'so-impressao', cur ? cur : 'Por indicar'));
            return caixa;
        }));
    } else p2.appendChild(el('p', 'mensagem-vazia', 'Não foram identificadas barreiras nesta observação.'));
    p.appendChild(p2);

    const p3 = el('div', 'sintese-parte');
    p3.appendChild(el('h5', null, '3. Que apoios vamos implementar ou manter'));
    const itensBarreiras = barreirasEscolhidas().filter(k => k.startsWith('item:')).map(k => k.slice(5));
    const apoiosPrimeira = apoios.filter(s => s.itens.some(i => itensBarreiras.includes(i)));
    if (apoios.length && !apoiosPrimeira.length) p3.appendChild(el('p', 'mensagem-vazia', 'Escolha as barreiras acima. Aqui aparecem os apoios marcados para essas situações. A lista completa está mais abaixo, em «Apoios sugeridos e decisões».'));
    if (apoiosPrimeira.length) {
        p3.appendChild(el('p', 'nota-secao so-ecra', 'Aparecem aqui os apoios das barreiras escolhidas. Os outros estão em «Apoios sugeridos e decisões».'));
        const ul = el('ul', 'lista-sintese');
        apoiosPrimeira.forEach(s => {
            const m = marc(s.id);
            const li = el('li');
            li.appendChild(el('span', null, s.L.texto));
            li.appendChild(el('span', 'estado-apoio', m.estado === 'nao' ? ' · a implementar' : ` · já em prática${m.ajuda ? `, ${rotulo(AJUDA, m.ajuda).toLowerCase()}` : ''}`));
            if (m.estado === 'nao' || m.responsavel) li.appendChild(el('span', 'responsavel', ` · responsável, ${m.responsavel ? m.responsavel : 'por indicar'}`));
            ul.appendChild(li);
        });
        p3.appendChild(ul);
    } else if (!apoios.length) p3.appendChild(el('p', 'mensagem-vazia', 'Marque nas sugestões os apoios que já se fazem («Já está implementada») e os que vão começar («Ainda não»).'));
    p.appendChild(p3);

    const p4 = el('div', 'sintese-parte');
    p4.appendChild(el('h5', null, '4. Como saberemos se os apoios estão a funcionar'));
    const aImplementar = apoiosPrimeira.filter(s => marc(s.id).estado === 'nao');
    if (aImplementar.length) p4.appendChild(listaSimples(aImplementar.map(s => `${s.L.texto}. ${s.L.comoSaber || 'Indicador por definir'}`)));
    const g = el('div', 'form-grid campos-acompanhamento');
    g.innerHTML = `<div class="form-group"><label for="dataRevisao">Data de revisão</label><input type="date" id="dataRevisao" class="so-ecra"><p class="so-impressao" id="dataRevisaoTexto"></p></div>
        <div class="form-group"><label for="contributo">Contributo do aluno e da família</label><textarea id="contributo" class="campo-livre so-ecra" rows="2" placeholder="O que o aluno e a família vão dizer ou observar"></textarea><p class="so-impressao campo-livre-relatorio" id="contributoTexto"></p></div>`;
    p4.appendChild(g);
    p.appendChild(p4);
    const dat = g.querySelector('#dataRevisao'), con = g.querySelector('#contributo');
    dat.value = estado.sintese.dataRevisao; con.value = estado.sintese.contributo;
    const espelhar = () => { g.querySelector('#dataRevisaoTexto').textContent = dat.value ? formatarData(dat.value) : 'Por indicar'; g.querySelector('#contributoTexto').textContent = con.value || 'Por indicar'; };
    espelhar();
    dat.addEventListener('change', () => { estado.sintese.dataRevisao = dat.value; espelhar(); guardarEstado(); });
    con.addEventListener('input', () => { estado.sintese.contributo = con.value; espelhar(); guardarEstado(); });

    // O que averiguar
    const av = [];
    averiguar.forEach(s => av.push(`${s.L.texto} (item ${s.itens.join(', ')}) · responsável, ${marc(s.id).responsavel || 'por indicar'}`));
    itensAbertos().forEach(i => { if (semInformacao(i, r)) av.push(`${ITENS[i].titulo} (item ${i}, ${r[i].v.toLowerCase()})`); });
    AREAS.filter(a => !areaAberta(a.nome)).forEach(a => av.push(`Área não observada, ${a.nome.toLowerCase()}`));
    condicoesEscola().filter(x => x.v === 'Não sei').forEach(x => av.push(`Condição da escola, ${x.t.charAt(0).toLowerCase() + x.t.slice(1)}`));
    const p5 = el('div', 'sintese-parte parte-larga');
    p5.appendChild(el('h5', null, 'O que averiguar'));
    if (av.length) p5.appendChild(listaSimples(av)); else p5.appendChild(el('p', 'mensagem-vazia', 'Nada por averiguar.'));
    p.appendChild(p5);

    // Relatório provisório: uma barreira escolhida sem apoio associado
    const semApoio = barreirasEscolhidas().filter(k => k.startsWith('item:')).map(k => k.slice(5)).filter(item => !apoiosPrimeira.some(s => s.itens.includes(item)));
    if (semApoio.length) {
        p.querySelector('h4').textContent = 'O essencial para apoiar este aluno (provisório)';
        p.appendChild(el('p', 'aviso-provisorio parte-larga', `O relatório é provisório porque ${semApoio.length === 1 ? 'a barreira do item' : 'as barreiras dos itens'} ${semApoio.join(', ')} ainda não ${semApoio.length === 1 ? 'tem' : 'têm'} nenhum apoio associado.`));
    }
    c.appendChild(p);

    // Contexto
    const ctx = criarSecao('Contexto e apoios atuais', 'quebra-antes');
    const k = estado.contexto;
    linhaDado('Na turma', val('horasTurma') !== '' ? `${val('horasTurma')} h por semana` : 'Não indicado', ctx);
    linhaDado('Apoios na escola', k.apoiosEscola.join('; ') || 'Não indicado', ctx);
    const saude = k.apoiosFora.filter(a => APOIOS_SAUDE.includes(a));
    const outrosFora = k.apoiosFora.filter(a => !APOIOS_SAUDE.includes(a));
    if (saude.length) linhaDado('Terapias e saúde fora da escola', saude.join('; '), ctx, 'dado-saude');
    if (outrosFora.length) linhaDado('Outros apoios fora da escola', outrosFora.join('; '), ctx);
    linhaDado('Medidas em vigor', k.medidas.join('; ') || 'Não indicado', ctx);
    if (k.rtp) linhaDado('Relatório técnico-pedagógico', k.rtp, ctx);
    if (k.diagnostico) linhaDado('Diagnóstico de PEA', k.diagnostico, ctx, 'dado-saude');
    c.appendChild(ctx);

    // O que foi observado
    const ob = criarSecao('O que foi observado');
    AREAS.forEach(a => {
        const ids = a.itens.filter(i => r[i]);
        if (!ids.length) { if (!areaAberta(a.nome)) ob.appendChild(el('p', 'sinais-categoria', `${a.nome} · área não observada`)); return; }
        ob.appendChild(el('div', 'sinais-categoria', a.nome));
        const tab = el('table', 'tabela-observado');
        tab.innerHTML = '<thead><tr><th>Item</th><th>Na escola</th><th>Outro contexto</th></tr></thead>';
        const tb = el('tbody');
        ids.forEach(i => {
            const tr = el('tr');
            tr.appendChild(el('td', null, `${i}. ${ITENS[i].titulo}`));
            const td = el('td', necessidade(i, r) ? 'com-necessidade' : null, descreverResposta(i));
            if (i === '17' && r[i].v === 'Sim' && r[i].seg.efeito === 'Não foi identificado desconforto nem dificuldade de participação' && !['Já aconteceu', 'Existe um risco concreto, sem incidente conhecido'].includes((r[i].seg.risco || {}).v)) {
                td.appendChild(el('p', 'nota-sub', 'Estes movimentos podem ter uma função de autorregulação. Quando não afetam a participação, não há razão para os reduzir (Kapp et al., 2019).'));
            }
            tr.appendChild(td);
            const o = r[i].seg.outro;
            tr.appendChild(el('td', null, o && o.sabe ? `${o.fonte || 'Fonte por indicar'}, ${o.sabe.toLowerCase()}` : ''));
            tb.appendChild(tr);
        });
        tab.appendChild(tb);
        const w = el('div', 'tabela-wrap');
        w.appendChild(tab);
        ob.appendChild(w);
    });
    c.appendChild(ob);

    // Apoios por estado
    const ap = criarSecao('Apoios sugeridos e decisões');
    const grupos = [['pratica', 'Já em prática'], ['nao', 'A implementar'], ['impossivel', 'Não é possível agora']];
    let algum = false;
    grupos.forEach(([e, t]) => {
        const xs = sug.filter(s => marc(s.id).estado === e);
        if (!xs.length) return;
        algum = true;
        ap.appendChild(el('h5', null, t));
        ap.appendChild(listaSimples(xs.map(s => {
            const m = marc(s.id);
            let x = `${s.L.texto} (item ${s.itens.join(', ')})`;
            if (e === 'pratica' && m.ajuda) x += `, ${rotulo(AJUDA, m.ajuda).toLowerCase()}`;
            if (e === 'nao') x += ` · responsável, ${m.responsavel || 'por indicar'}`;
            if (e === 'impossivel' && m.motivos && m.motivos.length) x += `, ${m.motivos.map(v => rotulo(MOTIVOS, v).toLowerCase()).join('; ')}`;
            return x;
        })));
    });
    if (!algum) ap.appendChild(el('p', 'mensagem-vazia', 'Ainda não foram marcadas decisões sobre as sugestões.'));
    c.appendChild(ap);

    // Condições da escola
    const ce = condicoesEscola().filter(x => x.v && x.v !== 'Não é necessário nesta situação');
    if (ce.length) {
        const s = criarSecao('Condições da escola');
        [['Sim', 'Facilitadores'], ['Em parte', 'A melhorar'], ['Não', 'A resolver'], ['Não sei', 'Por averiguar']].forEach(([v, t]) => {
            const xs = ce.filter(x => x.v === v);
            if (!xs.length) return;
            s.appendChild(el('h5', null, t));
            s.appendChild(listaSimples(xs.map(x => `${x.t} (${x.area.toLowerCase()})`)));
        });
        c.appendChild(s);
    }

    const nota = el('p', 'relatorio-nota', 'Este documento apoia a observação e o planeamento. Não substitui o relatório técnico-pedagógico nem os procedimentos do Decreto-Lei n.º 54/2018, e pode ser entregue à EMAEI para ajudar a elaborá-lo ou a revê-lo. É uma ferramenta pedagógica de observação e não um instrumento de diagnóstico clínico. CAIDI | NIDCAIDI');
    c.appendChild(nota);
    atualizarPrevia();
}

// ---------- Eventos e armazenamento ----------

function configurarEventos() {
    document.getElementById('btnSugestoes').addEventListener('click', abrirSugestoes);
    document.getElementById('btnGerar').addEventListener('click', gerarRelatorio);
    document.getElementById('btnLimpar').addEventListener('click', limparFormulario);
    document.getElementById('btnPDF').addEventListener('click', exportarPDF);
    document.getElementById('btnEnviar').addEventListener('click', enviarPartilha);
    OPCOES.forEach(id => document.getElementById(id).addEventListener('change', function () { aplicarModos(); guardarEstado(); }));
    document.getElementById('confirmarAutorizacao').addEventListener('change', function () { document.getElementById('btnEnviar').disabled = !this.checked; });
    document.getElementById('nivel').addEventListener('change', ajustarAreasAoNivel);
    [...CAMPOS_IDENTIFICACAO, ...CAMPOS_NUMERO].forEach(id => {
        const campo = document.getElementById(id);
        campo.addEventListener('input', function () { this.classList.remove('campo-em-falta'); guardarEstado(); });
        campo.addEventListener('change', () => guardarEstado());
    });
    window.addEventListener('beforeunload', function (e) {
        if (Object.keys(estado.respostas).length > 0) { e.preventDefault(); e.returnValue = ''; }
    });
}

function aplicarModos() {
    document.body.classList.toggle('imprimir-saude', document.getElementById('incluirSaude').checked);
}

function guardarEstado() {
    const campos = {};
    [...CAMPOS_IDENTIFICACAO, ...CAMPOS_NUMERO].forEach(id => { campos[id] = document.getElementById(id).value; });
    const opcoes = {};
    OPCOES.forEach(id => { opcoes[id] = document.getElementById(id).checked; });
    try { sessionStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify({ campos, opcoes, estado })); } catch (e) { /* armazenamento indisponível */ }
}

function restaurarEstado() {
    let guardado;
    try { guardado = JSON.parse(sessionStorage.getItem(CHAVE_ARMAZENAMENTO)); } catch (e) { return false; }
    if (!guardado) return false;
    for (const [id, v] of Object.entries(guardado.campos || {})) { const c = document.getElementById(id); if (c && v) c.value = v; }
    for (const [id, v] of Object.entries(guardado.opcoes || {})) { const c = document.getElementById(id); if (c) c.checked = v; }
    estado = Object.assign(novoEstado(), guardado.estado || {});
    estado.sintese = Object.assign(novoEstado().sintese, estado.sintese || {});
    for (const [campo, v] of Object.entries(estado.contexto)) {
        const lista = Array.isArray(v) ? v : [v];
        document.querySelectorAll(`input[name="${campo}"]`).forEach(i => { i.checked = lista.includes(i.value); });
    }
    for (const [id, x] of Object.entries(estado.respostas)) preencherItem(id, x);
    aplicarModos();
    return true;
}

// Volta a pôr no formulário as respostas guardadas
function preencherItem(id, x) {
    const it = ITENS[id];
    if (!it) return;
    if (it.tipo === 'D') {
        if (x.v === 'Não sei') { document.getElementById(`naosei_${id}`).checked = true; document.getElementById(`interesses_${id}`).disabled = true; }
        else document.getElementById(`interesses_${id}`).value = x.v || '';
    } else {
        const i = it.opcoes.indexOf(x.v);
        if (i >= 0) document.getElementById(`item_${id}_valor_${i}`).checked = true;
    }
    it.seg.forEach(s => {
        const v = (x.seg || {})[s.k];
        if (v == null) return;
        const nome = `seg_${id}_${s.k}`;
        if (s.tipo === 'texto') document.getElementById(nome).value = v;
        else if (s.tipo === 'episodios') {
            document.getElementById(`${nome}_obs`).value = v.obs || '';
            document.getElementById(`${nome}_ref`).value = v.ref || '';
            document.getElementById(`${nome}_desc`).checked = !!v.desconhecido;
        } else if (s.tipo === 'risco') {
            const i = s.o.indexOf(v.v);
            if (i >= 0) document.getElementById(`${nome}_${i}`).checked = true;
            document.getElementById(`${nome}_oque`).value = v.oque || '';
            document.getElementById(`${nome}_circ`).value = v.circunstancia || '';
            const j = ['Sim', 'Não', 'Não sei'].indexOf(v.presente);
            if (j >= 0) document.getElementById(`${nome}_pres_${j}`).checked = true;
        } else if (s.tipo === 'outro') {
            const a = ['Família', 'Aluno', 'Outro técnico'].indexOf(v.fonte);
            if (a >= 0) document.getElementById(`${nome}_fonte_${a}`).checked = true;
            const b = ['Faz sem ajuda individual', 'Precisa de ajuda', 'Não se sabe'].indexOf(v.sabe);
            if (b >= 0) document.getElementById(`${nome}_sabe_${b}`).checked = true;
            if (v.fonte || v.sabe) document.querySelector(`#item_${id} .outro-contexto`).open = true;
        } else {
            (Array.isArray(v) ? v : [v]).forEach(o => { const i = s.o.indexOf(o); if (i >= 0) document.getElementById(`${nome}_${i}`).checked = true; });
        }
    });
}

// ---------- Partilha sem identificação ----------

function construirPartilha() {
    const r = respostasEfetivas();
    const itens = {};
    // Só respostas de listas fechadas: os textos livres (interesses, o que ajuda, descrições) nunca saem
    Object.entries(r).forEach(([id, x]) => {
        const seg = {};
        ITENS[id].seg.forEach(s => {
            const v = x.seg[s.k];
            if (v == null || s.tipo === 'texto') return;
            if (s.tipo === 'risco') seg[s.k] = { v: v.v, presente: v.presente };
            else if (s.tipo === 'outro') seg[s.k] = { fonte: v.fonte, sabe: v.sabe };
            else seg[s.k] = v;
        });
        itens[`item_${id}`] = { v: ITENS[id].tipo === 'D' ? (x.v === 'Não sei' ? 'Não sei' : 'respondido') : x.v, seg };
    });
    const estrategias = {};
    Object.entries(estado.marcacoes).forEach(([k, m]) => {
        if (!m.estado) return;
        const e = { estado: m.estado };
        if (m.ajuda) e.ajuda = m.ajuda;
        if (m.motivos && m.motivos.length) e.motivos = m.motivos;
        estrategias[k] = e;
    });
    return {
        id: estado.idRelatorio,
        versao_checklist: CONTEUDO.versao,
        mes_observacao: val('data').slice(0, 7),
        nivel_ensino: val('nivel'),
        periodo_observacao: val('periodo'),
        horas_turma: val('horasTurma'),
        apoios_escola: estado.contexto.apoiosEscola,
        apoios_fora: estado.contexto.apoiosFora,
        medidas: estado.contexto.medidas,
        rtp: estado.contexto.rtp,
        diagnostico: estado.contexto.diagnostico,
        areas_observadas: AREAS.filter(a => areaAberta(a.nome)).map(a => a.nome),
        itens,
        condicoes_escola: estado.escola,
        confirmacoes: estado.confirmacoes,
        estrategias_marcadas: estrategias
    };
}

function atualizarPrevia() {
    const pre = document.getElementById('previaEnvio');
    if (pre) pre.textContent = JSON.stringify(construirPartilha(), null, 2);
}

function enviarPartilha() {
    if (!document.getElementById('confirmarAutorizacao').checked || !ENDPOINT_PARTILHA) return;
    const msg = document.getElementById('estadoEnvio');
    msg.textContent = 'A enviar…';
    fetch(ENDPOINT_PARTILHA, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(construirPartilha()) })
        .then(() => { msg.textContent = 'Enviado. Obrigado por contribuir para melhorar a ferramenta.'; msg.className = 'estado-envio enviado'; })
        .catch(() => { msg.textContent = 'Não foi possível enviar. Verifique a ligação à internet e tente de novo.'; msg.className = 'estado-envio erro'; });
}

// ---------- Limpar, PDF e utilitários ----------

function limparFormulario() {
    if (!confirm('Tem a certeza que deseja limpar todos os dados? Esta ação não pode ser revertida.')) return;
    try { sessionStorage.removeItem(CHAVE_ARMAZENAMENTO); } catch (e) { /* nada a apagar */ }
    window.removeEventListener('beforeunload', () => {});
    estado = novoEstado();
    location.reload();
}

function exportarPDF() {
    const original = document.title;
    document.title = `Relatório Checklist CAIDI - ${val('nomeAluno')} - ${val('data')}`;
    window.addEventListener('afterprint', () => { document.title = original; }, { once: true });
    window.print();
}

function gerarId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'r-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function dataDeHoje() {
    const h = new Date();
    return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`;
}

function formatarData(v) {
    if (!v) return '';
    const [a, m, d] = v.split('-');
    return `${d}/${m}/${a}`;
}
