// Ajudantes para as condições das estratégias.
// criarR(dados, estado) devolve o objeto R usado em quando: R => ...
// Em modo estrito (validação), cada rótulo usado tem de existir nas opções do item ou do seguimento.

const ABREV_PRINCIPAL = {
    sem: 'Sem ajuda individual', pontual: 'Ajuda pontual', frequente: 'Ajuda frequente', sistematica: 'Ajuda sistemática',
    NR: 'Não realizou a atividade nas oportunidades observadas, apesar dos apoios disponíveis',
    NPO: 'Não foi possível observar', NA: 'Não se aplica'
};
const ABREV_EFEITO = {
    nenhum: 'Não foi identificado desconforto nem dificuldade de participação',
    mantemDesconforto: 'Mantém a participação, com desconforto',
    mantem: 'Mantém a participação', dificulta: 'Dificulta a participação',
    interrompe: 'Interrompe ou impede a participação', nd: 'Não foi possível determinar'
};
const ABREV_RISCO = {
    aconteceu: 'Já aconteceu', concreto: 'Existe um risco concreto, sem incidente conhecido',
    nenhum: 'Não foi identificado risco', nd: 'Não foi possível determinar'
};
const AJUDAS_R = ['pontual', 'frequente', 'sistematica', 'NR'].map(k => ABREV_PRINCIPAL[k]);

function criarR(dados, estado, estrito) {
    const resp = estado.respostas || {};
    const r = i => resp[i] || {};
    const item = i => {
        const it = dados.itens[i];
        if (!it) throw new Error(`Item inexistente: ${i}`);
        return it;
    };
    const seg = (i, k) => {
        const s = item(i).seg.find(x => x.k === k);
        if (!s) throw new Error(`Seguimento inexistente: ${i}.${k}`);
        return s;
    };
    const expande = (mapa, x) => mapa[x] || x;
    const verificar = (lista, rotulos, onde) => {
        if (!estrito) return;
        rotulos.forEach(l => { if (!lista.includes(l)) throw new Error(`Rótulo «${l}» não existe em ${onde}. Opções: ${lista.join(' | ')}`); });
    };
    const comoLista = v => v == null ? [] : (Array.isArray(v) ? v : [v]);

    const R = {
        v: i => { item(i); return r(i).v || ''; },
        is: (i, ...ls) => {
            const it = item(i);
            const full = ls.map(x => expande(ABREV_PRINCIPAL, x));
            if (it.tipo !== 'D') verificar(it.opcoes, full, `item ${i}`);
            return full.includes(r(i).v);
        },
        respondido: i => { item(i); return !!r(i).v; },
        ajuda: i => { item(i); return AJUDAS_R.includes(r(i).v); },
        circ: (i, ...ls) => { const s = seg(i, 'circ'); verificar(s.o, ls, `${i}.circ`); return R.is(i, 'NR') && ls.includes(r(i).seg && r(i).seg.circ); },
        efeito: i => { seg(i, 'efeito'); return r(i).v === 'Sim' ? ((r(i).seg || {}).efeito || '') : ''; },
        ef: (i, ...ls) => {
            const s = seg(i, 'efeito');
            const full = ls.map(x => expande(ABREV_EFEITO, x));
            verificar(s.o, full, `${i}.efeito`);
            return r(i).v === 'Sim' && full.includes((r(i).seg || {}).efeito);
        },
        s: (i, k) => { seg(i, k); return (r(i).seg || {})[k]; },
        tem: (i, k, ...ls) => {
            const s = seg(i, k);
            const full = k === 'risco' ? ls.map(x => expande(ABREV_RISCO, x)) : ls;
            if (s.o) verificar(s.o, full, `${i}.${k}`);
            const v = (r(i).seg || {})[k];
            const val = k === 'risco' ? (v && v.v) : v;
            return comoLista(val).some(x => full.includes(x));
        },
        temAlgum: (i, k) => { seg(i, k); const v = (r(i).seg || {})[k]; return Array.isArray(v) ? v.length > 0 : (v != null && v !== ''); },
        sit: (i, ...ls) => R.tem(i, 'sit', ...ls),
        persp: (i, ...ls) => R.tem(i, 'persp', ...ls),
        adapt: (i, ...ls) => R.tem(i, 'adapt', ...ls),
        tipoAjuda: (i, ...ls) => R.tem(i, 'tipoAjuda', ...ls),
        risco: (i, ...ls) => R.tem(i, 'risco', ...ls),
        riscoPresente: i => { seg(i, 'risco'); const v = (r(i).seg || {}).risco; return !!(v && v.v === 'Já aconteceu' && v.presente === 'Sim'); },
        nEpisodios: i => {
            seg(i, 'episodios');
            const e = (r(i).seg || {}).episodios || {};
            const n = (Number(e.obs) || 0) + (Number(e.ref) || 0);
            return e.desconhecido && !n ? null : n;
        },
        interesses: () => { const v = r('27').v; return !!v && v !== 'Não sei'; },
        nivel: (...ls) => ls.includes(estado.nivel || ''),
        noPlano: id => { const m = (estado.marcacoes || {})[id]; return !!(m && (m.estado === 'pratica' || m.estado === 'nao')); }
    };
    return R;
}

if (typeof module !== 'undefined') module.exports = { criarR, ABREV_PRINCIPAL, ABREV_EFEITO, ABREV_RISCO };
