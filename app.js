// Endereço da aplicação web do Google Apps Script que recebe a partilha (ver README).
// Vazio = a secção de partilha não aparece e nada é enviado.
const ENDPOINT_PARTILHA = '';

// Estado da aplicação
let valores = {};      // { itemId: valor }
let contextos = {};    // { itemId: 'nao' | 'naosei' } quando o nível é 3
let observacoes = {};  // { itemId: texto }
let marcacoes = {};    // { chaveEstrategia: { estado, ajuda, motivos, outro } }
let interesses = { quais: '', influencia: [] };
let areasFechadas = [];
let areasTocadas = [];
let sintese = { facilita: '', objetivos: '', excluidos: [], prioridades: [], familiaOuvida: '', dataRevisao: '' };
let idRelatorio = null;

const CHAVE_ARMAZENAMENTO = 'checklist-caidi-v2.1';
const CAMPOS_IDENTIFICACAO = ['nomeAluno', 'turma', 'data', 'nivel', 'professor', 'periodo'];
const CAMPOS_LIVRES = {
    pf_destaca: 'Em que se destaca e o que corre bem',
    pf_acalma: 'O que o ajuda a acalmar',
    pf_comunica: 'Como prefere comunicar',
    voz_aluno: 'O que o aluno diz',
    voz_familia: 'O que a família partilha'
};
const CAMPOS_NUMERO = ['horasTurma'];
const OPCOES = ['incluirObservacoes', 'incluirPorDecidir', 'incluirSaude'];

// Os apoios fora da escola em APOIOS_SAUDE só aparecem no PDF se o professor o escolher
const APOIOS_SAUDE = ['Psicologia', 'Terapia da fala', 'Terapia ocupacional', 'Consulta de desenvolvimento ou pedopsiquiatria', 'Intervenção precoce'];
const GRUPOS_CONTEXTO = {
    apoiosEscola: ['Docente de educação especial', 'Centro de Apoio à Aprendizagem', 'Apoio tutorial', 'Psicologia', 'Terapia da fala', 'Terapia ocupacional', 'Assistente operacional de apoio', 'Outro'],
    apoiosFora: [...APOIOS_SAUDE, 'Atividades desportivas, artísticas ou outras', 'Outro'],
    medidas: ['Nenhuma', 'Universais', 'Seletivas', 'Adicionais', 'Não sei'],
    rtp: ['Sim', 'Não', 'Não sei'],
    diagnostico: ['Sim', 'Não', 'Em avaliação', 'Não sei']
};
let contexto = { apoiosEscola: [], apoiosFora: [], medidas: [], rtp: '', diagnostico: '' };

const ESCALAS = {
    N: [[1, 'Apoio regular ou intenso'], [2, 'Apoio pontual'], [3, 'Sem apoio, na escola'], [4, 'Sem apoio, também noutros contextos'], ['NO', 'Não foi possível observar']],
    P: [['sim', 'Sim'], ['asvezes', 'Às vezes'], ['nao', 'Não'], ['naosei', 'Não sei']],
    C: [[0, 'Não se observa'], [1, 'Pouco impacto'], [2, 'Impacto claro'], ['NO', 'Não foi possível observar']],
    B: [['sim', 'Sim'], ['nao', 'Não'], ['naosei', 'Não sei']],
    W: [['sim', 'Sim'], ['nao', 'Não'], ['naosei', 'Não sei']],
    D: [['sim', 'Sim'], ['nao', 'Não'], ['NO', 'Não foi possível observar']]
};
const CONTEXTOS = [['nao', 'Precisa de apoio noutros contextos'], ['naosei', 'Não foi possível observar noutros contextos']];
const INFLUENCIAS = [['motivar', 'Ajudam a motivar'], ['mudar', 'Tornam difícil mudar de atividade'], ['conversa', 'Ocupam grande parte da conversa'], ['outro', 'Outro']];
const GENERALIZAR = { t: 'Praticar esta competência noutros contextos e combinar com a família como a reforçar em casa', fontes: ['irlanda2022'] };

const ESTADOS = [['pratica', 'Já está em prática'], ['nao', 'Ainda não'], ['impossivel', 'Não é possível']];
const AJUDA = [['pouco', 'Ajuda pouco'], ['ajuda', 'Ajuda'], ['muito', 'Ajuda muito'], ['cedo', 'Ainda é cedo para saber']];
const MOTIVOS = [['recursos', 'Faltam materiais ou recursos'], ['tempo', 'Falta de tempo'], ['formacao', 'Falta de formação ou de apoio'], ['espaco', 'O espaço ou a organização da escola não permitem'], ['naoadequa', 'Não se adequa a este aluno'], ['outro', 'Outro']];
const MAX_PRIORIDADES = 5;
const MAX_NA_SINTESE = 4;

const ITENS = CONTEUDO.itens;
const ORDEM_ITENS = CONTEUDO.areas.flatMap(a => a.itens);
const ID_INTERESSES = ORDEM_ITENS.find(id => ITENS[id].tipo === 'D');
const AREA_FIXA = 'EMOÇÕES E REGULAÇÃO';
const AREA_AUTONOMIA = 'AUTONOMIA PESSOAL';
const NIVEIS_SEM_AUTONOMIA = ['2.º ciclo', '3.º ciclo', 'Secundário'];

const areasAbertas = () => CONTEUDO.areas.filter(a => !areasFechadas.includes(a.nome));
// Numa área fechada continuam visíveis os itens marcados sempreVisivel (exclusão e intimidação)
const itensDaArea = area => areasFechadas.includes(area.nome) ? area.itens.filter(id => ITENS[id].sempreVisivel) : area.itens;
const itensAbertos = () => CONTEUDO.areas.flatMap(itensDaArea);
const rotulo = (lista, v) => (lista.find(([x]) => x === v) || [])[1] || '';

document.addEventListener('DOMContentLoaded', function() {
    construirContexto();
    construirAreas();
    construirChecklist();
    configurarEventos();
    if (!restaurarEstado()) {
        document.getElementById('data').value = dataDeHoje();
    }
    aplicarAreas();
    aplicarModos();
    atualizarProgresso();
    document.getElementById('privacidadePartilha').hidden = !ENDPOINT_PARTILHA;
});

// ---------- Construção do formulário ----------

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
    const span = document.createElement('span');
    span.className = 'opcao-contexto';
    span.appendChild(input);
    span.appendChild(label);
    return span;
}

function construirContexto() {
    document.querySelectorAll('.grupo-opcoes').forEach(fs => {
        const campo = fs.dataset.campo;
        const radio = fs.dataset.tipo === 'radio';
        const caixa = document.createElement('div');
        caixa.className = 'grupo-opcoes-lista';
        GRUPOS_CONTEXTO[campo].forEach((op, i) => {
            const span = criarOpcao(radio ? 'radio' : 'checkbox', campo, `${campo}_${i}`, op, op, function() {
                if (radio) contexto[campo] = this.value;
                else contexto[campo] = [...fs.querySelectorAll('input:checked')].map(x => x.value);
                guardarEstado();
            });
            if (campo === 'apoiosFora' && APOIOS_SAUDE.includes(op)) {
                const s = document.createElement('span');
                s.className = 'marca-saude';
                s.title = 'Dado de saúde';
                s.textContent = '✚';
                span.querySelector('label').appendChild(s);
            }
            caixa.appendChild(span);
        });
        fs.appendChild(caixa);
    });
}

function construirAreas() {
    const lista = document.getElementById('listaAreas');
    CONTEUDO.areas.forEach((area, i) => {
        const span = criarOpcao('checkbox', 'areas', `area_${i}`, area.nome, nomeArea(area.nome), function() {
            alternarArea(area.nome, this.checked);
        });
        if (area.nome === AREA_FIXA) {
            const input = span.querySelector('input');
            input.checked = true;
            input.disabled = true;
            const n = document.createElement('span');
            n.className = 'nota-area-fixa';
            n.textContent = 'sempre aberta';
            span.appendChild(n);
        }
        lista.appendChild(span);
    });
}

// Nome da área em minúsculas, para o texto corrido
function nomeArea(nome) {
    const t = nome.toLowerCase();
    return t.charAt(0).toUpperCase() + t.slice(1);
}

function alternarArea(nome, abrir) {
    if (nome === AREA_FIXA) return;
    const area = CONTEUDO.areas.find(a => a.nome === nome);
    if (!abrir) {
        const respondidos = area.itens.filter(id => valores[id] !== undefined && !ITENS[id].sempreVisivel).length;
        if (respondidos && !confirm(`Esta área tem ${respondidos} ${respondidos === 1 ? 'item respondido' : 'itens respondidos'}. As respostas ficam guardadas, mas não entram no relatório enquanto a área estiver fechada.\n\nFechar a área?`)) {
            aplicarAreas();
            return;
        }
    }
    areasFechadas = abrir ? areasFechadas.filter(a => a !== nome) : [...new Set([...areasFechadas, nome])];
    if (!areasTocadas.includes(nome)) areasTocadas.push(nome);
    aplicarAreas();
    atualizarProgresso();
    guardarEstado();
    if (!document.getElementById('relatorio').hidden) construirRelatorio();
}

function aplicarAreas() {
    CONTEUDO.areas.forEach((area, i) => {
        const fechada = areasFechadas.includes(area.nome);
        document.getElementById(`area_${i}`).checked = !fechada;
        document.getElementById(`categoria_${i}`).classList.toggle('fechada', fechada);
    });
}

// A autonomia pessoal começa fechada a partir do 2.º ciclo, se o professor ainda não lhe tocou
function ajustarAreasAoNivel() {
    if (areasTocadas.includes(AREA_AUTONOMIA)) return;
    const fechar = NIVEIS_SEM_AUTONOMIA.includes(val('nivel'));
    areasFechadas = areasFechadas.filter(a => a !== AREA_AUTONOMIA);
    if (fechar) areasFechadas.push(AREA_AUTONOMIA);
    aplicarAreas();
    atualizarProgresso();
}

function construirChecklist() {
    const container = document.getElementById('checklist');

    CONTEUDO.areas.forEach((area, i) => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'categoria';
        categoriaDiv.id = `categoria_${i}`;
        const header = document.createElement('h4');
        header.className = 'categoria-header';
        header.textContent = area.nome;
        if (area.nome !== AREA_FIXA) {
            const fechar = document.createElement('button');
            fechar.type = 'button';
            fechar.className = 'btn-area btn-fechar-area';
            fechar.textContent = 'Fechar área';
            fechar.addEventListener('click', () => alternarArea(area.nome, false));
            header.appendChild(fechar);
        }
        categoriaDiv.appendChild(header);

        const resumo = document.createElement('div');
        resumo.className = 'area-fechada-resumo';
        const ocultos = area.itens.filter(id => !ITENS[id].sempreVisivel);
        const fixos = area.itens.filter(id => ITENS[id].sempreVisivel);
        const p = document.createElement('p');
        p.textContent = `Área não observada nesta altura. Ficam por responder ${ocultos.length} itens:`;
        resumo.appendChild(p);
        const ul = document.createElement('ul');
        ocultos.forEach(id => {
            const li = document.createElement('li');
            li.textContent = `${ITENS[id].n}. ${ITENS[id].texto}`;
            ul.appendChild(li);
        });
        resumo.appendChild(ul);
        const abrir = document.createElement('button');
        abrir.type = 'button';
        abrir.className = 'btn-area btn-abrir-area';
        abrir.textContent = 'Abrir esta área';
        abrir.addEventListener('click', () => alternarArea(area.nome, true));
        resumo.appendChild(abrir);
        if (fixos.length) {
            const f = document.createElement('p');
            f.className = 'nota-fixo';
            f.textContent = `O ${listaItens(fixos)} continua visível mesmo com a área fechada, porque diz respeito à segurança e ao bem-estar do aluno.`;
            resumo.appendChild(f);
        }
        categoriaDiv.appendChild(resumo);

        const corpo = document.createElement('div');
        corpo.className = 'area-itens';
        area.itens.forEach(itemId => corpo.appendChild(construirItem(itemId)));
        categoriaDiv.appendChild(corpo);
        container.appendChild(categoriaDiv);
    });
}

function construirItem(itemId) {
    const info = ITENS[itemId];
    const fs = document.createElement('fieldset');
    fs.className = `sinal-item tipo-${info.tipo}` + (info.sempreVisivel ? ' item-fixo' : '');
    fs.id = `item_${itemId}`;

    const legenda = document.createElement('legend');
    legenda.className = 'sinal-descricao';
    const num = document.createElement('span');
    num.className = 'item-numero';
    num.textContent = `${info.n}. `;
    legenda.appendChild(num);
    legenda.appendChild(document.createTextNode(info.texto));
    if (info.nivelEnsino === 'inicial') {
        const chip = document.createElement('span');
        chip.className = 'chip-nivel';
        chip.textContent = 'sobretudo pré-escolar e 1.º ciclo';
        legenda.appendChild(chip);
    }
    fs.appendChild(legenda);

    if (info.ajuda) {
        const ajuda = document.createElement('p');
        ajuda.className = 'ajuda-item';
        ajuda.textContent = info.ajuda;
        fs.appendChild(ajuda);
    }

    const opcoes = document.createElement('div');
    opcoes.className = `sinal-opcoes escala-${info.tipo}`;
    const nome = `item_${itemId}_valor`;
    ESCALAS[info.tipo].forEach(([valor, r]) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = nome;
        radio.value = valor;
        radio.id = `${nome}_${valor}`;
        radio.addEventListener('change', function() {
            salvarValor(itemId, isNaN(Number(this.value)) ? this.value : Number(this.value));
        });
        const label = document.createElement('label');
        label.className = `opcao opcao-${info.tipo}-${valor}`;
        label.htmlFor = radio.id;
        label.textContent = r;
        opcoes.appendChild(radio);
        opcoes.appendChild(label);
    });
    fs.appendChild(opcoes);

    if (info.tipo === 'N') fs.appendChild(construirSubpergunta(itemId));
    if (info.tipo === 'D') fs.appendChild(construirCamposInteresses());

    const obsLabel = document.createElement('label');
    obsLabel.className = 'visualmente-oculto';
    obsLabel.htmlFor = `obs_${itemId}`;
    obsLabel.textContent = `Observações sobre: ${info.texto}`;
    fs.appendChild(obsLabel);
    const obs = document.createElement('textarea');
    obs.className = 'observacao-input';
    obs.placeholder = 'Em que situações acontece? O que ajuda? (opcional)';
    obs.id = `obs_${itemId}`;
    obs.rows = 2;
    obs.addEventListener('input', function() {
        if (this.value.trim()) observacoes[itemId] = this.value;
        else delete observacoes[itemId];
        guardarEstado();
    });
    fs.appendChild(obs);
    return fs;
}

// Aparece quando o aluno faz sem apoio na escola mas não se sabe se também faz noutros contextos
function construirSubpergunta(itemId) {
    const caixa = document.createElement('div');
    caixa.className = 'subpergunta';
    caixa.id = `sub_${itemId}`;
    const p = document.createElement('p');
    p.className = 'rotulo-campo';
    p.textContent = 'E noutros contextos (ex.: em casa, noutras aulas)?';
    caixa.appendChild(p);
    const lista = document.createElement('div');
    lista.className = 'grupo-opcoes-lista';
    CONTEXTOS.forEach(([v, r]) => {
        lista.appendChild(criarOpcao('radio', `contextos_${itemId}`, `contextos_${itemId}_${v}`, v, r, function() {
            contextos[itemId] = this.value;
            guardarEstado();
        }));
    });
    caixa.appendChild(lista);
    const nota = document.createElement('p');
    nota.className = 'nota-sub';
    nota.textContent = 'Se não responder, o relatório sugere confirmar com a família.';
    caixa.appendChild(nota);
    return caixa;
}

function construirCamposInteresses() {
    const caixa = document.createElement('div');
    caixa.className = 'campos-interesses';
    caixa.id = 'camposInteresses';

    const label = document.createElement('label');
    label.htmlFor = 'interessesQuais';
    label.textContent = 'Quais são?';
    const txt = document.createElement('textarea');
    txt.id = 'interessesQuais';
    txt.className = 'observacao-input';
    txt.rows = 2;
    txt.placeholder = 'Ex.: dinossauros, mapas, comboios, desenho';
    txt.addEventListener('input', function() { interesses.quais = this.value; guardarEstado(); });
    caixa.appendChild(label);
    caixa.appendChild(txt);

    const p = document.createElement('p');
    p.className = 'rotulo-campo';
    p.textContent = 'Influenciam a participação?';
    caixa.appendChild(p);
    const lista = document.createElement('div');
    lista.className = 'grupo-opcoes-lista';
    INFLUENCIAS.forEach(([valor, r]) => {
        lista.appendChild(criarOpcao('checkbox', 'influencia', `influencia_${valor}`, valor, r, function() {
            interesses.influencia = [...lista.querySelectorAll('input:checked')].map(x => x.value);
            guardarEstado();
        }));
    });
    caixa.appendChild(lista);
    return caixa;
}

function configurarEventos() {
    document.getElementById('btnGerar').addEventListener('click', gerarRelatorio);
    document.getElementById('btnLimpar').addEventListener('click', limparFormulario);
    document.getElementById('btnPDF').addEventListener('click', exportarPDF);
    document.getElementById('btnEnviar').addEventListener('click', enviarPartilha);

    OPCOES.forEach(id => document.getElementById(id).addEventListener('change', function() {
        aplicarModos();
        guardarEstado();
        if (id === 'incluirObservacoes' && !document.getElementById('relatorio').hidden) construirRelatorio();
    }));
    document.getElementById('confirmarAutorizacao').addEventListener('change', function() {
        document.getElementById('btnEnviar').disabled = !this.checked;
    });
    document.getElementById('nivel').addEventListener('change', ajustarAreasAoNivel);

    [...CAMPOS_IDENTIFICACAO, ...Object.keys(CAMPOS_LIVRES), ...CAMPOS_NUMERO].forEach(id => {
        const campo = document.getElementById(id);
        campo.addEventListener('input', function() {
            this.classList.remove('campo-em-falta');
            guardarEstado();
        });
        campo.addEventListener('change', () => guardarEstado());
    });

    window.addEventListener('beforeunload', function(e) {
        if (Object.keys(valores).length > 0) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

function aplicarModos() {
    document.body.classList.toggle('imprimir-por-decidir', document.getElementById('incluirPorDecidir').checked);
    document.body.classList.toggle('imprimir-saude', document.getElementById('incluirSaude').checked);
}

function salvarValor(id, valor) {
    valores[id] = valor;
    const fs = document.getElementById(`item_${id}`);
    fs.classList.add('respondido');
    fs.classList.remove('por-avaliar');
    if (ITENS[id].tipo === 'D') document.getElementById('camposInteresses').classList.toggle('visivel', valor === 'sim');
    if (ITENS[id].tipo === 'N') document.getElementById(`sub_${id}`).classList.toggle('visivel', valor === 3);
    atualizarProgresso();
    guardarEstado();
}

function atualizarProgresso() {
    const ids = itensAbertos();
    const total = ids.length;
    const feitos = ids.filter(id => valores[id] !== undefined).length;
    const pct = total ? Math.round((feitos / total) * 100) : 0;
    const fechadas = CONTEUDO.areas.length - areasAbertas().length;
    document.getElementById('progressoTexto').textContent = `${feitos} de ${total} itens respondidos` + (fechadas ? ` (${fechadas} ${fechadas === 1 ? 'área fechada' : 'áreas fechadas'})` : '');
    document.getElementById('progressoPreenchido').style.width = `${pct}%`;
    document.getElementById('progressoBarra').setAttribute('aria-valuenow', pct);
    document.getElementById('progresso').classList.toggle('completo', feitos === total);
}

// ---------- Armazenamento no separador ----------

function guardarEstado() {
    const campos = {};
    [...CAMPOS_IDENTIFICACAO, ...Object.keys(CAMPOS_LIVRES), ...CAMPOS_NUMERO].forEach(id => { campos[id] = document.getElementById(id).value; });
    const opcoes = {};
    OPCOES.forEach(id => { opcoes[id] = document.getElementById(id).checked; });
    try {
        sessionStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify({ campos, valores, contextos, observacoes, marcacoes, interesses, contexto, opcoes, areasFechadas, areasTocadas, sintese, idRelatorio }));
    } catch (e) {
        // Armazenamento indisponível - a aplicação continua a funcionar
    }
}

function restaurarEstado() {
    let estado;
    try {
        estado = JSON.parse(sessionStorage.getItem(CHAVE_ARMAZENAMENTO));
    } catch (e) {
        return false;
    }
    if (!estado) return false;

    for (const [id, v] of Object.entries(estado.campos || {})) {
        const c = document.getElementById(id);
        if (c && v) c.value = v;
    }
    for (const [id, v] of Object.entries(estado.opcoes || {})) {
        const c = document.getElementById(id);
        if (c) c.checked = v;
    }
    contexto = Object.assign(contexto, estado.contexto || {});
    for (const [campo, v] of Object.entries(contexto)) {
        const lista = Array.isArray(v) ? v : [v];
        document.querySelectorAll(`input[name="${campo}"]`).forEach(i => { i.checked = lista.includes(i.value); });
    }
    interesses = Object.assign(interesses, estado.interesses || {});
    document.getElementById('interessesQuais').value = interesses.quais || '';
    interesses.influencia.forEach(v => { const c = document.getElementById(`influencia_${v}`); if (c) c.checked = true; });

    for (const [id, v] of Object.entries(estado.valores || {})) {
        const radio = document.getElementById(`item_${id}_valor_${v}`);
        if (radio) {
            radio.checked = true;
            salvarValor(id, v);
        }
    }
    contextos = estado.contextos || {};
    for (const [id, v] of Object.entries(contextos)) {
        const radio = document.getElementById(`contextos_${id}_${v}`);
        if (radio) radio.checked = true;
    }
    for (const [id, t] of Object.entries(estado.observacoes || {})) {
        const obs = document.getElementById(`obs_${id}`);
        if (obs) {
            obs.value = t;
            observacoes[id] = t;
        }
    }
    marcacoes = estado.marcacoes || {};
    areasFechadas = estado.areasFechadas || [];
    areasTocadas = estado.areasTocadas || [];
    sintese = Object.assign(sintese, estado.sintese || {});
    idRelatorio = estado.idRelatorio || null;
    return true;
}

// ---------- Que estratégias se aplicam a cada item ----------

// Devolve [{ chave, estrategia }] para o item, conforme o valor escolhido
function estrategiasDoItem(id) {
    const info = ITENS[id];
    const v = valores[id];
    const E = info.estrategias;
    const lista = (conj, nome) => (conj || []).map((e, i) => ({ chave: `${id}|${nome}|${i}`, estrategia: e }));
    if (info.tipo === 'N') {
        if (v === 1) return lista(E.nivel1, 'nivel1');
        if (v === 2) return lista(E.nivel2, 'nivel2');
        if (v === 3 && contextos[id] === 'nao') return [{ chave: `${id}|generalizar|0`, estrategia: GENERALIZAR }];
        return [];
    }
    if (info.tipo === 'P') return (v === 'asvezes' || v === 'nao') ? lista(E[v], v) : [];
    if (info.tipo === 'C') {
        if (v === 1) return lista(E.grau1, 'grau1');
        if (v === 2) return lista(E.grau2, 'grau2');
        return [];
    }
    if (info.tipo === 'B' || info.tipo === 'W') return v === 'sim' ? lista(E.sim, 'sim') : [];
    if (info.tipo === 'D') return v === 'sim' ? interesses.influencia.flatMap(inf => lista(E[inf], inf)) : [];
    return [];
}

function itemIdentificado(id) {
    const info = ITENS[id];
    const v = valores[id];
    if (info.tipo === 'N') return v === 1 || v === 2 || (v === 3 && contextos[id] === 'nao');
    if (info.tipo === 'P') return v === 'asvezes' || v === 'nao';
    if (info.tipo === 'C') return v === 1 || v === 2;
    if (info.tipo === 'B' || info.tipo === 'W') return v === 'sim';
    if (info.tipo === 'D') return v === 'sim' && interesses.influencia.length > 0;
    return false;
}

// Precisa de mais apoio: o que entra na síntese
function itemPrecisaMaisApoio(id) {
    const info = ITENS[id];
    const v = valores[id];
    if (info.tipo === 'N') return v === 1;
    if (info.tipo === 'P') return v === 'asvezes' || v === 'nao';
    if (info.tipo === 'C') return v === 2;
    if (info.tipo === 'B' || info.tipo === 'W') return v === 'sim';
    return false;
}

function descreverValor(id) {
    const info = ITENS[id];
    const v = valores[id];
    if (info.tipo === 'N' && v === 3) {
        if (contextos[id] === 'nao') return 'Sem apoio na escola, precisa de apoio noutros contextos';
        return 'Sem apoio, na escola';
    }
    return rotulo(ESCALAS[info.tipo], v);
}

// ---------- Relatório ----------

function gerarRelatorio() {
    const emFalta = CAMPOS_IDENTIFICACAO.map(id => document.getElementById(id)).filter(c => !c.value.trim());
    emFalta.forEach(c => c.classList.add('campo-em-falta'));
    if (emFalta.length) {
        alert('Por favor, preencha todos os campos de identificação, incluindo o período de observação.');
        emFalta[0].focus();
        return;
    }
    const abertos = itensAbertos();
    if (!abertos.some(id => valores[id] !== undefined)) {
        alert('Por favor, responda a pelo menos um item antes de gerar o relatório.');
        document.getElementById('checklist').focus();
        return;
    }
    const porResponder = abertos.filter(id => valores[id] === undefined);
    document.querySelectorAll('.sinal-item').forEach(el => el.classList.remove('por-avaliar'));
    if (porResponder.length) {
        porResponder.forEach(id => document.getElementById(`item_${id}`).classList.add('por-avaliar'));
        if (!confirm(`Há ${porResponder.length} ${porResponder.length === 1 ? 'item' : 'itens'} por responder nas áreas abertas (assinalados a amarelo).\n\nDeseja gerar o relatório mesmo assim?`)) {
            const primeiro = document.getElementById(`item_${porResponder[0]}`);
            primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primeiro.querySelector('input').focus({ preventScroll: true });
            return;
        }
    }
    if (!idRelatorio) idRelatorio = gerarId();
    construirRelatorio();
    const rel = document.getElementById('relatorio');
    rel.hidden = false;
    document.getElementById('partilha').hidden = !ENDPOINT_PARTILHA;
    rel.scrollIntoView({ behavior: 'smooth' });
    rel.focus({ preventScroll: true });
    guardarEstado();
}

function construirRelatorio() {
    const comObs = document.getElementById('incluirObservacoes').checked;
    const c = document.getElementById('relatorioConteudo');
    c.innerHTML = '';
    c.appendChild(secaoIdentificacao());
    c.appendChild(secaoSintese());
    c.appendChild(secaoContexto());
    const fortes = secaoPontosFortes();
    if (fortes) c.appendChild(fortes);
    c.appendChild(secaoPerfil());
    c.appendChild(secaoObservado(comObs));
    c.appendChild(secaoEstrategias());
    const resumo = criarSecao('Resumo das estratégias');
    resumo.id = 'secaoResumo';
    c.appendChild(resumo);
    const obstaculos = criarSecao('Obstáculos à implementação');
    obstaculos.id = 'secaoObstaculos';
    c.appendChild(obstaculos);
    const dl54 = criarSecao('Enquadramento no Decreto-Lei n.º 54/2018');
    dl54.id = 'secaoDL54';
    c.appendChild(dl54);
    if (comObs) {
        const outras = secaoOutrasObservacoes();
        if (outras) c.appendChild(outras);
    }
    const nota = document.createElement('p');
    nota.className = 'relatorio-nota';
    nota.textContent = 'Este relatório resulta de uma ferramenta pedagógica de observação e não constitui um instrumento de diagnóstico clínico. CAIDI | NIDCAIDI';
    c.appendChild(nota);
    atualizarResumo();
}

function criarSecao(titulo) {
    const s = document.createElement('div');
    s.className = 'relatorio-secao';
    const h = document.createElement('h4');
    h.textContent = titulo;
    s.appendChild(h);
    return s;
}

function linhaDado(rotuloDado, valor, alvo, classe) {
    const l = document.createElement('div');
    l.className = 'dado-identificacao' + (classe ? ` ${classe}` : '');
    const a = document.createElement('span');
    a.className = 'dado-label';
    a.textContent = rotuloDado;
    const b = document.createElement('span');
    b.textContent = valor;
    l.appendChild(a);
    l.appendChild(b);
    alvo.appendChild(l);
}

const val = id => document.getElementById(id).value.trim();

function secaoIdentificacao() {
    const s = criarSecao('Identificação');
    s.classList.add('secao-identificacao');
    linhaDado('Nome do Aluno:', val('nomeAluno'), s);
    linhaDado('Turma:', val('turma'), s);
    linhaDado('Nível de ensino:', val('nivel'), s);
    linhaDado('Data da Avaliação:', formatarData(val('data')), s);
    linhaDado('Período observado:', val('periodo'), s);
    linhaDado('Professor(a):', val('professor'), s);
    return s;
}

// ---------- Síntese: o essencial para apoiar este aluno ----------

function campoSintese(chave, rotuloCampo, placeholder) {
    const g = document.createElement('div');
    g.className = 'form-group campo-sintese';
    const l = document.createElement('label');
    l.htmlFor = `sintese_${chave}`;
    l.textContent = rotuloCampo;
    const t = document.createElement('textarea');
    t.id = `sintese_${chave}`;
    t.className = 'campo-livre so-ecra';
    t.rows = 2;
    t.placeholder = placeholder;
    t.value = sintese[chave] || '';
    const espelho = document.createElement('p');
    espelho.className = 'so-impressao campo-livre-relatorio';
    espelho.textContent = t.value;
    t.addEventListener('input', function() {
        sintese[chave] = this.value;
        espelho.textContent = this.value;
        g.classList.toggle('vazio', !this.value.trim());
        guardarEstado();
    });
    g.classList.toggle('vazio', !t.value.trim());
    g.appendChild(l);
    g.appendChild(t);
    g.appendChild(espelho);
    return g;
}

function parteSintese(numero, titulo, id) {
    const p = document.createElement('div');
    p.className = 'sintese-parte';
    const h = document.createElement('h5');
    h.textContent = `${numero}. ${titulo}`;
    p.appendChild(h);
    const auto = document.createElement('div');
    auto.className = 'sintese-auto';
    auto.id = id;
    p.appendChild(auto);
    return p;
}

function secaoSintese() {
    const s = criarSecao('O essencial para apoiar este aluno');
    s.classList.add('secao-sintese');
    s.id = 'secaoSintese';
    const intro = document.createElement('p');
    intro.className = 'nota-secao so-ecra';
    intro.textContent = 'Esta síntese abre o PDF. É preenchida a partir das respostas e das estratégias marcadas mais abaixo, e pode ser ajustada aqui. Os textos escritos nesta síntese nunca são partilhados.';
    s.appendChild(intro);

    const p1 = parteSintese(1, 'O que facilita a participação', 'sinteseFacilita');
    p1.appendChild(campoSintese('facilita', 'Acrescentar', 'Opcional. Ex.: trabalhar a pares com um colega de confiança'));
    s.appendChild(p1);

    s.appendChild(parteSintese(2, 'Em que situações precisa de mais apoio', 'sinteseApoio'));
    s.appendChild(parteSintese(3, 'O que devemos fazer', 'sintesePrioridades'));

    const p4 = parteSintese(4, 'O que precisamos de acompanhar', 'sinteseAcompanhar');
    p4.insertBefore(campoSintese('objetivos', 'Objetivos para o próximo período', 'Opcional. Ex.: pedir ajuda com o cartão de pausa em todas as aulas'), p4.querySelector('.sintese-auto'));
    const g = document.createElement('div');
    g.className = 'form-grid campos-acompanhamento';
    g.innerHTML = `
        <div class="form-group"><label for="familiaOuvida">A família foi ouvida?</label>
            <select id="familiaOuvida" class="so-ecra"><option value="">Por indicar</option><option>Sim</option><option>Ainda não</option></select>
            <p class="so-impressao" id="familiaOuvidaTexto"></p></div>
        <div class="form-group"><label for="dataRevisao">Data prevista para rever esta observação</label><input type="date" id="dataRevisao" class="so-ecra">
            <p class="so-impressao" id="dataRevisaoTexto"></p></div>`;
    p4.appendChild(g);
    const fam = g.querySelector('#familiaOuvida');
    const dat = g.querySelector('#dataRevisao');
    fam.value = sintese.familiaOuvida || '';
    dat.value = sintese.dataRevisao || '';
    const espelhar = () => {
        g.querySelector('#familiaOuvidaTexto').textContent = fam.value || 'Por indicar';
        g.querySelector('#dataRevisaoTexto').textContent = dat.value ? formatarData(dat.value) : 'Por indicar';
    };
    espelhar();
    fam.addEventListener('change', () => { sintese.familiaOuvida = fam.value; espelhar(); guardarEstado(); });
    dat.addEventListener('change', () => { sintese.dataRevisao = dat.value; espelhar(); guardarEstado(); });
    s.appendChild(p4);
    return s;
}

function listaSimples(textos, classe) {
    const ul = document.createElement('ul');
    ul.className = classe || 'lista-sintese';
    textos.forEach(t => {
        const li = document.createElement('li');
        if (typeof t === 'string') li.textContent = t;
        else li.appendChild(t);
        ul.appendChild(li);
    });
    return ul;
}

// «itens 5, 10 e 21»
function listaItens(ids) {
    const n = ids.map(id => ITENS[id].n);
    const texto = n.length > 1 ? `${n.slice(0, -1).join(', ')} e ${n[n.length - 1]}` : String(n[0]);
    return `${n.length > 1 ? 'itens' : 'item'} ${texto}`;
}

function vazioP(texto) {
    const p = document.createElement('p');
    p.className = 'mensagem-vazia';
    p.textContent = texto;
    return p;
}

function atualizarSintese(lista) {
    const abertos = itensAbertos();

    // 1. O que facilita
    const f = document.getElementById('sinteseFacilita');
    f.innerHTML = '';
    const facilita = [];
    if (abertos.includes(ID_INTERESSES) && valores[ID_INTERESSES] === 'sim' && interesses.quais.trim()) facilita.push(`Interesses: ${interesses.quais.trim()}`);
    [['pf_destaca', 'Destaca-se em'], ['pf_acalma', 'Ajuda a acalmar'], ['pf_comunica', 'Prefere comunicar']].forEach(([id, r]) => {
        if (val(id)) facilita.push(`${r}: ${val(id)}`);
    });
    const ajudam = lista.filter(x => marcacoes[x.chave] && marcacoes[x.chave].estado === 'pratica' && ['ajuda', 'muito'].includes(marcacoes[x.chave].ajuda))
        .sort((x, y) => (marcacoes[x.chave].ajuda === 'muito' ? 0 : 1) - (marcacoes[y.chave].ajuda === 'muito' ? 0 : 1));
    ajudam.slice(0, MAX_NA_SINTESE).forEach(x => facilita.push(`${x.estrategia.t} (${rotulo(AJUDA, marcacoes[x.chave].ajuda).toLowerCase()})`));
    if (ajudam.length > MAX_NA_SINTESE) facilita.push(`E mais ${ajudam.length - MAX_NA_SINTESE} estratégias em prática que ajudam, indicadas no relatório`);
    if (facilita.length) f.appendChild(listaSimples(facilita));
    else f.appendChild(vazioP('Preencha os pontos fortes e marque as estratégias que já estão em prática e ajudam.'));

    // 2. Em que situações precisa de mais apoio
    const a = document.getElementById('sinteseApoio');
    a.innerHTML = '';
    const ids = abertos.filter(itemPrecisaMaisApoio);
    if (!ids.length) {
        a.appendChild(vazioP('Não foram assinaladas situações com necessidade de mais apoio.'));
    } else {
        const ul = document.createElement('ul');
        ul.className = 'lista-sintese lista-escolha';
        ids.forEach(id => {
            const li = document.createElement('li');
            const excluido = sintese.excluidos.includes(id);
            li.classList.toggle('excluido', excluido);
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.id = `incluir_${id}`;
            cb.checked = !excluido;
            cb.className = 'so-ecra';
            cb.addEventListener('change', function() {
                sintese.excluidos = this.checked ? sintese.excluidos.filter(x => x !== id) : [...sintese.excluidos, id];
                li.classList.toggle('excluido', !this.checked);
                guardarEstado();
            });
            const l = document.createElement('label');
            l.htmlFor = cb.id;
            l.textContent = ['B', 'W'].includes(ITENS[id].tipo) ? ITENS[id].texto : `${ITENS[id].texto} (${descreverValor(id).toLowerCase()})`;
            li.appendChild(cb);
            li.appendChild(l);
            ul.appendChild(li);
        });
        a.appendChild(ul);
        const n = document.createElement('p');
        n.className = 'nota-secao so-ecra';
        n.textContent = 'Retire o visto ao que não quiser destacar na primeira página. Continua no resto do relatório.';
        a.appendChild(n);
    }

    // 3. O que devemos fazer
    const p = document.getElementById('sintesePrioridades');
    p.innerHTML = '';
    const candidatas = lista.filter(x => marcacoes[x.chave] && marcacoes[x.chave].estado === 'nao');
    sintese.prioridades = sintese.prioridades.filter(k => candidatas.some(x => x.chave === k));
    if (!candidatas.length) {
        p.appendChild(vazioP('Marque «Ainda não» nas estratégias que quer começar. Depois escolha aqui entre três e cinco.'));
    } else {
        const intro = document.createElement('p');
        intro.className = 'nota-secao so-ecra';
        intro.textContent = `Escolha entre três e cinco estratégias para começar (${sintese.prioridades.length} de ${MAX_PRIORIDADES}). As restantes ficam no resumo das estratégias.`;
        p.appendChild(intro);
        const ul = document.createElement('ul');
        ul.className = 'lista-sintese lista-escolha lista-prioridades';
        candidatas.forEach(x => {
            const li = document.createElement('li');
            const escolhida = sintese.prioridades.includes(x.chave);
            li.classList.toggle('excluido', !escolhida);
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.id = `prioridade_${x.chave}`;
            cb.className = 'so-ecra';
            cb.checked = escolhida;
            cb.disabled = !escolhida && sintese.prioridades.length >= MAX_PRIORIDADES;
            cb.addEventListener('change', function() {
                sintese.prioridades = this.checked ? [...sintese.prioridades, x.chave] : sintese.prioridades.filter(k => k !== x.chave);
                guardarEstado();
                atualizarResumo();
            });
            const l = document.createElement('label');
            l.htmlFor = cb.id;
            l.textContent = x.estrategia.t;
            const ar = document.createElement('span');
            ar.className = 'passo-area';
            ar.textContent = x.area;
            l.appendChild(ar);
            li.appendChild(cb);
            li.appendChild(l);
            ul.appendChild(li);
        });
        p.appendChild(ul);
        if (!sintese.prioridades.length) {
            const v = vazioP('Ainda não foram escolhidas as estratégias para começar.');
            v.classList.add('so-impressao');
            p.appendChild(v);
        }
    }

    // 4. O que precisamos de acompanhar
    const c = document.getElementById('sinteseAcompanhar');
    c.innerHTML = '';
    const acomp = [];
    const porConfirmar = abertos.filter(id => ITENS[id].tipo === 'N' && valores[id] === 3 && contextos[id] !== 'nao');
    if (porConfirmar.length) acomp.push(`Confirmar com a família se também o faz em casa (${listaItens(porConfirmar)})`);
    const comAjuda = a => lista.filter(x => marcacoes[x.chave] && marcacoes[x.chave].estado === 'pratica' && marcacoes[x.chave].ajuda === a).map(x => x.estrategia.t);
    const resumir = (titulo, textos) => {
        if (!textos.length) return;
        const mais = textos.length > 2 ? `; e mais ${textos.length - 2}, indicadas no relatório` : '';
        acomp.push(`${titulo} ${textos.slice(0, 2).join('; ')}${mais}`);
    };
    resumir('Rever ou substituir, porque ajudam pouco:', comAjuda('pouco'));
    resumir('Voltar a ver se ajudam:', comAjuda('cedo'));
    const no = abertos.filter(id => valores[id] === 'NO');
    if (no.length) acomp.push(`Observar quando houver oportunidade (${listaItens(no)})`);
    const fechadas = CONTEUDO.areas.filter(ar => areasFechadas.includes(ar.nome)).map(ar => nomeArea(ar.nome).toLowerCase());
    if (fechadas.length) acomp.push(`Áreas ainda não observadas: ${fechadas.join('; ')}`);
    if (acomp.length) c.appendChild(listaSimples(acomp));
}

function secaoContexto() {
    const s = criarSecao('Contexto e apoios atuais');
    linhaDado('Na turma:', val('horasTurma') !== '' ? `${val('horasTurma')} h por semana` : 'Não indicado', s);
    const saude = contexto.apoiosFora.filter(a => APOIOS_SAUDE.includes(a));
    const outrosFora = contexto.apoiosFora.filter(a => !APOIOS_SAUDE.includes(a));
    linhaDado('Apoios na escola:', contexto.apoiosEscola.join('; ') || 'Não indicado', s);
    if (saude.length) linhaDado('Terapias e saúde fora da escola:', saude.join('; '), s, 'dado-saude');
    if (outrosFora.length) linhaDado('Outros apoios fora da escola:', outrosFora.join('; '), s);
    linhaDado('Medidas em vigor:', contexto.medidas.join('; ') || 'Não indicado', s);
    if (contexto.rtp) linhaDado('Relatório técnico-pedagógico:', contexto.rtp, s);
    if (contexto.diagnostico) linhaDado('Diagnóstico de PEA:', contexto.diagnostico, s, 'dado-saude');
    return s;
}

function secaoPontosFortes() {
    const linhas = Object.entries(CAMPOS_LIVRES).map(([id, r]) => [r, val(id)]).filter(([, v]) => v);
    if (itensAbertos().includes(ID_INTERESSES) && valores[ID_INTERESSES] === 'sim' && interesses.quais.trim()) linhas.unshift(['Interesses', interesses.quais.trim()]);
    if (!linhas.length) return null;
    const s = criarSecao('Pontos fortes, interesses e voz do aluno e da família');
    linhas.forEach(([r, v]) => {
        const p = document.createElement('p');
        p.className = 'campo-livre-relatorio';
        const b = document.createElement('strong');
        b.textContent = `${r}. `;
        p.appendChild(b);
        p.appendChild(document.createTextNode(v));
        s.appendChild(p);
    });
    return s;
}

// Perfil por área, sem nível global
function secaoPerfil() {
    const s = criarSecao('Perfil por área');
    const tab = document.createElement('table');
    tab.className = 'tabela-perfil';
    tab.innerHTML = '<thead><tr><th>Área</th><th>Competências com apoio regular</th><th>Competências com apoio pontual</th><th>Características com impacto claro</th><th>Participação, situações e bem-estar a acompanhar</th><th>Não foi possível observar</th></tr></thead>';
    const tb = document.createElement('tbody');
    const ACOMPANHAR = ['P', 'B', 'W'];
    CONTEUDO.areas.forEach(area => {
        const tr = document.createElement('tr');
        const td = t => { const x = document.createElement('td'); x.textContent = t; tr.appendChild(x); return x; };
        td(area.nome);
        if (areasFechadas.includes(area.nome)) {
            const fixos = itensDaArea(area).filter(id => valores[id] !== undefined);
            const x = td('Área não observada' + fixos.map(id => `, exceto o item ${ITENS[id].n} (${descreverValor(id).toLowerCase()})`).join(''));
            x.colSpan = 5;
            x.className = 'celula-fechada';
            tb.appendChild(tr);
            return;
        }
        const ids = area.itens;
        const conta = f => ids.filter(f).length;
        const deTipo = tipos => ids.filter(id => tipos.includes(ITENS[id].tipo)).length;
        const cel = (n, de) => de ? `${n} de ${de}` : '—';
        td(cel(conta(id => ITENS[id].tipo === 'N' && valores[id] === 1), deTipo(['N'])));
        td(cel(conta(id => ITENS[id].tipo === 'N' && valores[id] === 2), deTipo(['N'])));
        td(cel(conta(id => ITENS[id].tipo === 'C' && valores[id] === 2), deTipo(['C'])));
        td(cel(conta(id => ACOMPANHAR.includes(ITENS[id].tipo) && itemPrecisaMaisApoio(id)), deTipo(ACOMPANHAR)));
        td(String(conta(id => valores[id] === 'NO')));
        tb.appendChild(tr);
    });
    tab.appendChild(tb);
    const wrap = document.createElement('div');
    wrap.className = 'tabela-wrap';
    wrap.appendChild(tab);
    s.appendChild(wrap);
    const nota = document.createElement('p');
    nota.className = 'nota-secao';
    nota.textContent = 'O perfil descreve onde o aluno precisa de apoio. Não é uma classificação de gravidade.';
    s.appendChild(nota);
    return s;
}

function observacaoP(texto) {
    const p = document.createElement('p');
    p.className = 'sinal-observacao';
    const b = document.createElement('strong');
    b.textContent = 'Observação: ';
    p.appendChild(b);
    p.appendChild(document.createTextNode(texto));
    return p;
}

function secaoObservado(comObs) {
    const s = criarSecao('O que foi observado');
    const ids = itensAbertos().filter(itemIdentificado);
    if (!ids.length) {
        s.appendChild(vazioP('Não foram assinaladas necessidades de apoio nesta observação.'));
        return s;
    }
    CONTEUDO.areas.forEach(area => {
        const daArea = area.itens.filter(id => ids.includes(id));
        if (!daArea.length) return;
        const t = document.createElement('div');
        t.className = 'sinais-categoria';
        t.textContent = area.nome;
        s.appendChild(t);
        daArea.forEach(id => {
            const d = document.createElement('div');
            d.className = `sinal-identificado ${itemPrecisaMaisApoio(id) ? 'sinal-acentuada' : 'sinal-ligeira'}`;
            const l = document.createElement('div');
            l.className = 'sinal-identificado-linha';
            const a = document.createElement('span');
            a.textContent = `${ITENS[id].n}. ${ITENS[id].texto}`;
            const b = document.createElement('span');
            b.className = 'badge badge-valor';
            b.textContent = descreverValor(id);
            l.appendChild(a);
            l.appendChild(b);
            d.appendChild(l);
            if (comObs && observacoes[id]) d.appendChild(observacaoP(observacoes[id]));
            s.appendChild(d);
        });
    });
    return s;
}

// Texto que substitui os botões no PDF
function textoEstado(m) {
    if (!m || !m.estado) return '○ Por decidir';
    if (m.estado === 'pratica') return '✓ Em prática' + (m.ajuda ? ` · ${rotulo(AJUDA, m.ajuda).toLowerCase()}` : '');
    if (m.estado === 'nao') return '→ Ainda não';
    const motivos = (m.motivos || []).map(x => rotulo(MOTIVOS, x).toLowerCase());
    return '✕ Não é possível' + (motivos.length ? ` · ${motivos.join('; ')}` : '');
}

function construirDetalheMarcacao(chave, caixa, aoMudar) {
    caixa.innerHTML = '';
    const m = marcacoes[chave];
    if (!m || m.estado === 'nao') {
        caixa.hidden = true;
        return;
    }
    caixa.hidden = false;
    if (m.estado === 'pratica') {
        const p = document.createElement('span');
        p.className = 'rotulo-marcacao';
        p.textContent = 'Ajuda?';
        caixa.appendChild(p);
        const g = document.createElement('div');
        g.className = 'botoes-ajuda';
        g.setAttribute('role', 'group');
        g.setAttribute('aria-label', 'Quanto ajuda esta estratégia');
        AJUDA.forEach(([v, r]) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `btn-ajuda ajuda-${v}`;
            b.textContent = r;
            b.setAttribute('aria-pressed', m.ajuda === v);
            b.addEventListener('click', () => {
                m.ajuda = m.ajuda === v ? undefined : v;
                aoMudar(true);
            });
            g.appendChild(b);
        });
        caixa.appendChild(g);
        return;
    }
    const p = document.createElement('span');
    p.className = 'rotulo-marcacao';
    p.textContent = 'Porquê?';
    caixa.appendChild(p);
    const g = document.createElement('div');
    g.className = 'grupo-opcoes-lista motivos';
    MOTIVOS.forEach(([v, r]) => {
        const span = criarOpcao('checkbox', `motivo_${chave}`, `motivo_${chave}_${v}`, v, r, function() {
            m.motivos = [...g.querySelectorAll('input:checked')].map(x => x.value);
            aoMudar(v === 'outro');
        });
        span.querySelector('input').checked = (m.motivos || []).includes(v);
        g.appendChild(span);
    });
    caixa.appendChild(g);
    if ((m.motivos || []).includes('outro')) {
        const l = document.createElement('label');
        l.className = 'visualmente-oculto';
        l.htmlFor = `outro_${chave}`;
        l.textContent = 'Outro motivo';
        const t = document.createElement('input');
        t.type = 'text';
        t.id = `outro_${chave}`;
        t.className = 'campo-outro';
        t.placeholder = 'Qual? (fica só neste relatório)';
        t.value = m.outro || '';
        t.addEventListener('input', function() { m.outro = this.value; guardarEstado(); });
        caixa.appendChild(l);
        caixa.appendChild(t);
    }
}

function linhaEstrategia(chave, e) {
    const linha = document.createElement('div');
    linha.className = 'estrategia-linha';
    const estado = document.createElement('div');
    estado.className = 'estado-impressao';
    linha.appendChild(estado);

    const corpo = document.createElement('div');
    corpo.className = 'estrategia-corpo';
    const t = document.createElement('div');
    t.className = 'estrategia-texto';
    t.textContent = e.t;
    corpo.appendChild(t);
    const et = document.createElement('div');
    et.className = 'estrategia-etiquetas';
    (e.pbe || []).forEach(n => {
        const c = document.createElement('span');
        c.className = 'chip chip-pbe';
        c.title = 'Prática com evidência segundo a revisão do NCAEP (Hume et al., 2021)';
        c.textContent = `Prática com evidência: ${n}`;
        et.appendChild(c);
    });
    if (e.aval) {
        const c = document.createElement('span');
        c.className = 'chip chip-aval';
        c.textContent = `Adaptação na avaliação (art. 28.º): ${e.aval}`;
        et.appendChild(c);
    }
    if (et.childNodes.length) corpo.appendChild(et);
    if (e.nota) {
        const n = document.createElement('div');
        n.className = 'estrategia-nota';
        n.textContent = e.nota;
        corpo.appendChild(n);
    }
    linha.appendChild(corpo);

    const bt = document.createElement('div');
    bt.className = 'estrategia-botoes';
    bt.setAttribute('role', 'group');
    bt.setAttribute('aria-label', 'Situação desta estratégia');
    const detalhe = document.createElement('div');
    detalhe.className = 'detalhe-marcacao';

    const atualizar = reconstruir => {
        const m = marcacoes[chave];
        linha.dataset.estado = m ? m.estado : '';
        estado.textContent = textoEstado(m);
        bt.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(!!m && x.dataset.valor === m.estado)));
        if (reconstruir) construirDetalheMarcacao(chave, detalhe, atualizar);
        guardarEstado();
        atualizarResumo();
    };
    ESTADOS.forEach(([v, r]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `btn-marcar marcar-${v}`;
        b.dataset.valor = v;
        b.textContent = r;
        b.addEventListener('click', function() {
            if (marcacoes[chave] && marcacoes[chave].estado === v) delete marcacoes[chave];
            else marcacoes[chave] = { estado: v };
            atualizar(true);
        });
        bt.appendChild(b);
    });
    linha.appendChild(bt);
    linha.appendChild(detalhe);

    const m = marcacoes[chave];
    linha.dataset.estado = m ? m.estado : '';
    estado.textContent = textoEstado(m);
    bt.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(!!m && x.dataset.valor === m.estado)));
    construirDetalheMarcacao(chave, detalhe, atualizar);
    return linha;
}

// Lista de todas as estratégias apresentadas (sem repetir textos)
function estrategiasDoRelatorio() {
    const vistos = new Set();
    const lista = [];
    const juntar = (chave, e, area, grupo) => {
        if (vistos.has(e.t)) return;
        vistos.add(e.t);
        lista.push({ chave, estrategia: e, area, grupo });
    };
    CONTEUDO.areas.forEach(area => {
        let algum = false;
        itensDaArea(area).forEach(id => {
            const es = estrategiasDoItem(id);
            if (es.length) algum = true;
            es.forEach(x => juntar(x.chave, x.estrategia, area.nome, id));
        });
        if (algum) area.escola.forEach((e, i) => juntar(`escola|${area.nome}|${i}`, e, area.nome, 'escola'));
    });
    CONTEUDO.transversais.forEach((e, i) => juntar(`trans|${i}`, e, 'ESCOLA E FAMÍLIA', 'trans'));
    const terapias = contexto.apoiosFora.some(a => APOIOS_SAUDE.includes(a));
    if (terapias) juntar('trans|tecnicos', { t: 'Articular com os técnicos que acompanham o aluno fora da escola, com o acordo da família' }, 'ESCOLA E FAMÍLIA', 'trans');
    return lista;
}

function caixaEstrategias(itens) {
    const c = document.createElement('div');
    c.className = 'estrategias-lista';
    itens.forEach(x => c.appendChild(linhaEstrategia(x.chave, x.estrategia)));
    return c;
}

function secaoEstrategias() {
    const s = criarSecao('Estratégias de Intervenção Pedagógica');
    const lista = estrategiasDoRelatorio();
    const intro = document.createElement('div');
    intro.className = 'estrategias-intro';
    intro.innerHTML = '<p>As estratégias correspondem ao que foi assinalado em cada item. Marque em cada uma a situação atual.</p>' +
        '<ul><li><strong>Já está em prática.</strong> Indique depois quanto ajuda.</li>' +
        '<li><strong>Ainda não.</strong> Pode ser escolhida como uma das estratégias para começar.</li>' +
        '<li><strong>Não é possível.</strong> Indique porquê. Estas razões ajudam a escola a perceber o que falta.</li></ul>' +
        '<p>As que ficarem por marcar aparecem como «por decidir».</p>';
    s.appendChild(intro);

    const ids = itensAbertos().filter(id => estrategiasDoItem(id).length);
    if (ids.some(id => ITENS[id].antesDeInterpretar)) {
        const caixa = document.createElement('div');
        caixa.className = 'caixa-antes';
        const h = document.createElement('div');
        h.className = 'estrategias-sinal';
        h.textContent = 'Antes de interpretar o comportamento, pergunte-se';
        caixa.appendChild(h);
        caixa.appendChild(listaSimples(CONTEUDO.antesDeInterpretar, ''));
        const f = document.createElement('p');
        f.className = 'nota-secao';
        f.textContent = 'Adaptado da lista de necessidades básicas de Department of Education (2022, Apêndice 5.1). Estas perguntas não são registadas.';
        caixa.appendChild(f);
        s.appendChild(caixa);
    }

    CONTEUDO.areas.forEach(area => {
        const daArea = lista.filter(x => x.area === area.nome);
        if (!daArea.length) return;
        const cat = document.createElement('div');
        cat.className = 'estrategias-categoria';
        const t = document.createElement('div');
        t.className = 'estrategias-titulo';
        t.textContent = `📌 ${area.nome}`;
        cat.appendChild(t);

        area.itens.forEach(id => {
            const doItem = daArea.filter(x => x.grupo === id);
            if (!doItem.length) return;
            const bloco = document.createElement('div');
            bloco.className = 'estrategias-bloco';
            const st = document.createElement('div');
            st.className = 'estrategias-sinal';
            st.textContent = `${ITENS[id].n}. ${ITENS[id].texto} (${descreverValor(id).toLowerCase()})`;
            bloco.appendChild(st);
            if (ITENS[id].porFases) {
                CONTEUDO.fases.forEach(([f, nome]) => {
                    const daFase = doItem.filter(x => x.estrategia.fase === f);
                    if (!daFase.length) return;
                    const ft = document.createElement('div');
                    ft.className = 'fase-titulo';
                    ft.textContent = nome;
                    bloco.appendChild(ft);
                    bloco.appendChild(caixaEstrategias(daFase));
                });
            } else {
                bloco.appendChild(caixaEstrategias(doItem));
            }
            cat.appendChild(bloco);
        });

        const escola = daArea.filter(x => x.grupo === 'escola');
        if (escola.length) {
            const bloco = document.createElement('div');
            bloco.className = 'estrategias-bloco bloco-escola';
            const st = document.createElement('div');
            st.className = 'estrategias-sinal';
            st.textContent = 'Na escola';
            bloco.appendChild(st);
            bloco.appendChild(caixaEstrategias(escola));
            cat.appendChild(bloco);
        }
        s.appendChild(cat);
    });

    const trans = lista.filter(x => x.grupo === 'trans');
    const cat = document.createElement('div');
    cat.className = 'estrategias-categoria';
    const t = document.createElement('div');
    t.className = 'estrategias-titulo';
    t.textContent = '📌 ESCOLA E FAMÍLIA';
    cat.appendChild(t);
    cat.appendChild(caixaEstrategias(trans));
    s.appendChild(cat);
    return s;
}

const estadoDe = chave => marcacoes[chave] ? marcacoes[chave].estado : '';

function atualizarResumo() {
    const resumo = document.getElementById('secaoResumo');
    const dl54 = document.getElementById('secaoDL54');
    if (!resumo || !dl54) return;
    const lista = estrategiasDoRelatorio();
    atualizarSintese(lista);

    const conta = e => lista.filter(x => estadoDe(x.chave) === e).length;
    resumo.querySelectorAll(':scope > :not(h4)').forEach(el => el.remove());
    const grid = document.createElement('div');
    grid.className = 'perfil-quantitativo';
    [['Em prática', conta('pratica'), 'perfil-sim'], ['Ainda não', conta('nao'), 'perfil-nao'], ['Não é possível', conta('impossivel'), 'perfil-impossivel'], ['Por decidir', conta(''), 'perfil-por-avaliar']].forEach(([r, n, c]) => {
        const item = document.createElement('div');
        item.className = `perfil-item ${c}`;
        item.innerHTML = `<div class="perfil-numero">${n}</div><div class="perfil-label">${r}</div>`;
        grid.appendChild(item);
    });
    resumo.appendChild(grid);
    const outras = lista.filter(x => estadoDe(x.chave) === 'nao' && !sintese.prioridades.includes(x.chave));
    if (outras.length) {
        const t = document.createElement('div');
        t.className = 'sinais-categoria';
        t.textContent = 'Outras estratégias marcadas «Ainda não», para rever na próxima observação';
        resumo.appendChild(t);
        const ul = document.createElement('ul');
        ul.className = 'lista-passos';
        outras.forEach(x => {
            const li = document.createElement('li');
            li.textContent = x.estrategia.t;
            const a = document.createElement('span');
            a.className = 'passo-area';
            a.textContent = x.area;
            li.appendChild(a);
            ul.appendChild(li);
        });
        resumo.appendChild(ul);
    }

    atualizarObstaculos(lista);

    document.querySelectorAll('#relatorioConteudo .estrategias-bloco, #relatorioConteudo .estrategias-categoria').forEach(b => {
        b.dataset.temMarcadas = b.querySelectorAll('.estrategia-linha:not([data-estado=""])').length ? 'sim' : 'nao';
    });

    dl54.querySelectorAll(':scope > :not(h4)').forEach(el => el.remove());
    const par = texto => { const p = document.createElement('p'); p.className = 'texto-dl54'; p.textContent = texto; dl54.appendChild(p); };
    par('A maior parte das estratégias deste relatório corresponde a medidas universais (art. 8.º), como a diferenciação pedagógica e as acomodações curriculares, que o professor pode pôr em prática na sala de aula.');
    const aval = [...new Set(lista.filter(x => x.estrategia.aval && estadoDe(x.chave) !== 'pratica').map(x => x.estrategia.aval))];
    if (aval.length) par(`Algumas estratégias são adaptações ao processo de avaliação previstas no art. 28.º, que podem ser ponderadas pela escola (${aval.join('; ')}).`);
    if (conta('impossivel')) par('Quando uma estratégia necessária não é possível por falta de recursos, de tempo, de formação ou de condições do espaço, essa informação pode ser levada à EMAEI, que tem entre as suas competências propor os recursos e as medidas necessários.');
    if (contexto.medidas.some(m => m === 'Seletivas' || m === 'Adicionais')) {
        par('O aluno já tem medidas seletivas ou adicionais. Se esta observação mostrar necessidades que as medidas atuais não cobrem, pode propor-se a revisão do relatório técnico-pedagógico, com a participação dos pais ou encarregados de educação.');
    } else {
        par('Se as medidas universais não forem suficientes, os pais ou encarregados de educação, os docentes ou outros técnicos podem apresentar ao diretor a identificação da necessidade de medidas de suporte à aprendizagem e à inclusão (art. 20.º), com as razões e a documentação relevante. Este relatório pode acompanhar esse pedido. As medidas seletivas e adicionais são propostas pela equipa multidisciplinar (EMAEI) no relatório técnico-pedagógico, e a sua aplicação depende da concordância dos pais ou encarregados de educação.');
    }
    if (val('nivel') === 'Pré-escolar') par('No pré-escolar, segundo as perguntas frequentes da DGE, as medidas seletivas e adicionais não se aplicam da mesma forma que nos ensinos básico e secundário. Convém confirmar com a EMAEI.');
    const aviso = document.createElement('p');
    aviso.className = 'relatorio-nota';
    aviso.textContent = 'Este enquadramento é informativo e não substitui a decisão da escola nem da EMAEI.';
    dl54.appendChild(aviso);

    atualizarPrevia();
}

function atualizarObstaculos(lista) {
    const s = document.getElementById('secaoObstaculos');
    s.querySelectorAll(':scope > :not(h4)').forEach(el => el.remove());
    const impossiveis = lista.filter(x => estadoDe(x.chave) === 'impossivel');
    s.hidden = !impossiveis.length;
    if (!impossiveis.length) return;
    const intro = document.createElement('p');
    intro.className = 'nota-secao';
    intro.textContent = 'Estratégias que seriam úteis mas que não é possível pôr em prática, agrupadas pela razão indicada.';
    s.appendChild(intro);
    const motivosDe = x => marcacoes[x.chave].motivos || [];
    const grupo = (titulo, itens, classe) => {
        if (!itens.length) return;
        const t = document.createElement('div');
        t.className = 'sinais-categoria' + (classe ? ` ${classe}` : '');
        t.textContent = titulo;
        s.appendChild(t);
        s.appendChild(listaSimples(itens.map(x => x.estrategia.t + (titulo === 'Outro' && marcacoes[x.chave].outro ? ` (${marcacoes[x.chave].outro})` : '')), 'lista-passos'));
    };
    MOTIVOS.filter(([v]) => v !== 'naoadequa').forEach(([v, r]) => grupo(r, impossiveis.filter(x => motivosDe(x).includes(v))));
    grupo('Sem razão indicada', impossiveis.filter(x => !motivosDe(x).length));
    const naoAdequa = impossiveis.filter(x => motivosDe(x).includes('naoadequa'));
    if (naoAdequa.length) {
        grupo('Não se adequam a este aluno', naoAdequa, 'grupo-nao-adequa');
        const n = document.createElement('p');
        n.className = 'nota-secao';
        n.textContent = 'Não se trata de obstáculos da escola. Ficam registadas para não voltarem a ser sugeridas sem razão.';
        s.appendChild(n);
    }
}

function secaoOutrasObservacoes() {
    const ids = itensAbertos().filter(id => observacoes[id] && !itemIdentificado(id));
    if (!ids.length) return null;
    const s = criarSecao('Outras Observações');
    ids.forEach(id => {
        const d = document.createElement('div');
        d.className = 'sinal-identificado';
        const t = document.createElement('div');
        t.textContent = `${ITENS[id].n}. ${ITENS[id].texto}`;
        d.appendChild(t);
        d.appendChild(observacaoP(observacoes[id]));
        s.appendChild(d);
    });
    return s;
}

// ---------- Partilha sem identificação ----------

function construirPartilha() {
    const abertos = itensAbertos();
    const itens = {};
    abertos.forEach(id => {
        if (valores[id] === undefined) return;
        itens[`item_${ITENS[id].n}`] = valores[id];
        if (ITENS[id].tipo === 'N' && valores[id] === 3) itens[`item_${ITENS[id].n}_contextos`] = contextos[id] || 'sem_resposta';
    });
    // Só os valores escolhidos em listas fechadas; o texto de «Outro» nunca sai
    const estrategias = {};
    estrategiasDoRelatorio().forEach(x => {
        const m = marcacoes[x.chave];
        if (!m) return;
        const e = { estado: m.estado };
        if (m.ajuda) e.ajuda = m.ajuda;
        if (m.motivos && m.motivos.length) e.motivos = m.motivos;
        estrategias[x.chave] = e;
    });
    return {
        id: idRelatorio,
        versao_checklist: CONTEUDO.versao,
        mes_observacao: val('data').slice(0, 7),
        nivel_ensino: val('nivel'),
        periodo_observacao: val('periodo'),
        horas_turma: val('horasTurma'),
        apoios_escola: contexto.apoiosEscola,
        apoios_fora: contexto.apoiosFora,
        medidas: contexto.medidas,
        rtp: contexto.rtp,
        diagnostico: contexto.diagnostico,
        areas_observadas: areasAbertas().map(a => a.nome),
        itens,
        interesses_influencia: abertos.includes(ID_INTERESSES) && valores[ID_INTERESSES] === 'sim' ? interesses.influencia : [],
        estrategias_marcadas: estrategias,
        estrategias_prioritarias: sintese.prioridades
    };
}

function atualizarPrevia() {
    const pre = document.getElementById('previaEnvio');
    if (pre) pre.textContent = JSON.stringify(construirPartilha(), null, 2);
}

function enviarPartilha() {
    if (!document.getElementById('confirmarAutorizacao').checked) return;
    const dados = construirPartilha();
    const estado = document.getElementById('estadoEnvio');
    if (!ENDPOINT_PARTILHA) return;
    estado.textContent = 'A enviar…';
    fetch(ENDPOINT_PARTILHA, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(dados) })
        .then(() => {
            estado.textContent = 'Enviado. Obrigado por contribuir para melhorar a ferramenta.';
            estado.className = 'estado-envio enviado';
        })
        .catch(() => {
            estado.textContent = 'Não foi possível enviar. Verifique a ligação à internet e tente de novo.';
            estado.className = 'estado-envio erro';
        });
}

// ---------- Limpar, PDF e utilitários ----------

function limparFormulario() {
    if (!confirm('Tem a certeza que deseja limpar todos os dados? Esta ação não pode ser revertida.')) return;
    [...CAMPOS_IDENTIFICACAO, ...Object.keys(CAMPOS_LIVRES), ...CAMPOS_NUMERO].forEach(id => {
        const c = document.getElementById(id);
        c.value = '';
        c.classList.remove('campo-em-falta');
    });
    document.getElementById('data').value = dataDeHoje();
    document.querySelectorAll('main input[type="radio"], main input[type="checkbox"]').forEach(i => { if (!OPCOES.includes(i.id)) i.checked = false; });
    document.querySelectorAll('.observacao-input').forEach(o => { o.value = ''; });
    document.querySelectorAll('.sinal-item').forEach(el => el.classList.remove('respondido', 'por-avaliar'));
    document.querySelectorAll('.subpergunta, #camposInteresses').forEach(el => el.classList.remove('visivel'));
    document.getElementById('incluirObservacoes').checked = true;
    valores = {}; contextos = {}; observacoes = {}; marcacoes = {}; interesses = { quais: '', influencia: [] };
    contexto = { apoiosEscola: [], apoiosFora: [], medidas: [], rtp: '', diagnostico: '' };
    areasFechadas = []; areasTocadas = [];
    sintese = { facilita: '', objetivos: '', excluidos: [], prioridades: [], familiaOuvida: '', dataRevisao: '' };
    idRelatorio = null;
    try { sessionStorage.removeItem(CHAVE_ARMAZENAMENTO); } catch (e) { /* nada a apagar */ }
    aplicarAreas();
    atualizarProgresso();
    document.getElementById('relatorio').hidden = true;
    document.getElementById('partilha').hidden = true;
    document.getElementById('estadoEnvio').textContent = '';
    document.getElementById('btnEnviar').disabled = true;
    document.getElementById('relatorioConteudo').innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const [a, m, d] = v.split('-');
    return `${d}/${m}/${a}`;
}
