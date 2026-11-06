// Condições das estratégias (quando aparecem), uma por par «estratégia|item».
const REGRAS = {};

// ---- comunicacao ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras da área da comunicação (matriz-estrategias-comunicacao.md, itens 1a a 6a).
// A «regra 7» (perguntar se o apoio já se usa antes de o marcar como implementado) é tratada pela app
// na marcação e não muda quando a estratégia aparece.
const ITENS_AREA = ['1a', '1b', '2', '3', '4a', '4b', '4c', '5', '6a', '6b'];
const algumComAjuda = R => ITENS_AREA.some(i => R.ajuda(i));
const CONF_CAA = 'Confirma que os meios de comunicação que o aluno tem não lhe permitem dizer o que quer?';
const CONF_SISTEMA = 'Confirma que o aluno usa um sistema de comunicação aumentativa e alternativa?';

module.exports = {
  // Adaptações de comunicação (uma só vez para a área)
  'com-adapt-01|*comunicacao': { quando: algumComAjuda },
  'com-adapt-02|*comunicacao': { quando: algumComAjuda },
  'com-adapt-03|*comunicacao': { quando: algumComAjuda },

  // Item 1a
  'instrucoes-passo-a-passo|1a': { quando: R => R.is('1a', 'frequente', 'sistematica') },
  '1a-02|1a': { quando: R => R.ajuda('1a') },
  '1a-03|1a': { quando: R => R.is('1a', 'pontual', 'frequente') && R.tipoAjuda('1a', 'Pistas ou lembretes') },
  '1a-04|1a': { quando: R => R.is('1a', 'pontual', 'frequente') },
  'frases-curtas|1a': { quando: R => R.is('1a', 'pontual') },
  '1a-06|1a': { quando: R => R.is('1a', 'frequente', 'sistematica') },
  '1a-07|1a': { quando: R => R.is('1a', 'frequente', 'sistematica') },
  'ensinar-lista-passos|1a': { quando: R => R.is('1a', 'frequente', 'sistematica'), planoDepende: '1a-07' },
  '1a-09|1a': { quando: R => R.is('1a', 'pontual', 'frequente') },
  '1a-10|1a': { quando: R => R.is('1a', 'frequente', 'sistematica') || (R.is('13', 'Sim') && R.sit('13', 'Sala de aula')) },

  // Item 1b
  '1b-01|1b': { quando: R => R.is('1b', 'pontual') },
  '1b-02|1b': { quando: R => R.is('1b', 'frequente', 'sistematica') },
  '1b-03|1b': { quando: R => R.ajuda('1b') },
  '1b-04|1b': { quando: R => R.is('1b', 'frequente', 'sistematica') },
  'frases-curtas|1b': { quando: R => R.is('1b', 'pontual', 'frequente') },
  '1b-06|1b': { quando: R => R.is('1b', 'frequente', 'sistematica') },

  // Item 2
  '2-01|2': { quando: R => R.ajuda('2') },
  '2-02|2': { quando: R => R.is('2', 'pontual', 'frequente') },
  '2-03|2': { quando: R => R.is('2', 'frequente', 'sistematica') },
  '2-04|2': { quando: R => R.is('2', 'frequente', 'sistematica') },

  // Item 3
  '3-01|3': { quando: R => R.is('3', 'pontual', 'frequente') },
  'pares-interesses|3': { quando: R => R.is('3', 'pontual', 'frequente') },
  '3-03|3': { quando: R => R.is('3', 'frequente', 'sistematica') },
  '3-04|3': { quando: R => R.is('3', 'frequente', 'sistematica') },
  'avaliacao-caa|3': {
    quando: R => R.is('3', 'NR', 'sistematica'),
    confirmacao: CONF_CAA
  },

  // Item 4a
  '4a-01|4a': { quando: R => R.is('4a', 'pontual') },
  '4a-02|4a': { quando: R => R.is('4a', 'frequente', 'sistematica') },
  '4a-03|4a': { quando: R => R.is('4a', 'frequente', 'sistematica') },
  'apoio-visual-conversa|4a': { quando: R => R.is('4a', 'sistematica') },

  // Item 4b
  '4b-01|4b': { quando: R => R.is('4b', 'pontual', 'frequente') },
  '4b-02|4b': { quando: R => R.is('4b', 'frequente', 'sistematica') },
  'apoio-visual-conversa|4b': { quando: R => R.is('4b', 'sistematica') },

  // Item 4c
  '4c-01|4c': { quando: R => R.is('4c', 'pontual', 'frequente') },
  'apoio-visual-conversa|4c': { quando: R => R.is('4c', 'frequente', 'sistematica') },
  '4c-03|4c': { quando: R => R.is('4c', 'frequente', 'sistematica') },

  // Item 5
  'verificacoes-discretas|5': { quando: R => R.is('5', 'frequente', 'sistematica') },
  '5-02|5': { quando: R => R.is('5', 'pontual') },
  '5-03|5': { quando: R => R.is('5', 'frequente', 'sistematica') },
  '5-04|5': { quando: R => R.is('5', 'frequente', 'sistematica') },
  '5-05|5': {
    quando: R => R.is('5', 'frequente'),
    ou: true,
    base: R => R.persp('5', 'Sim'),
    confirmacao: 'Confirma que o aluno diz que prefere escrever as dificuldades?'
  },
  'pessoa-referencia|5': { quando: R => R.is('5', 'sistematica') },
  'reconhecer-dificuldade|5': { quando: R => R.is('5', 'pontual', 'frequente') },

  // Item 6a
  '6a-01|6a': { quando: R => R.is('6a', 'pontual', 'frequente') },
  '6a-02|6a': { quando: R => R.is('6a', 'frequente', 'sistematica') },
  '6a-03|6a': { quando: R => R.is('6a', 'frequente', 'sistematica') },
  '6a-04|6a': { quando: R => R.is('6a', 'frequente', 'sistematica') },
  '6a-05|6a': {
    quando: R => R.is('6a', 'frequente', 'sistematica'),
    ou: true,
    base: R => R.adapt('6a', 'Apoios visuais ou escritos', 'Ferramentas digitais ou tecnologia de apoio', 'Outros'),
    confirmacao: CONF_SISTEMA
  },
  '6a-06|6a': {
    quando: R => R.adapt('6a', 'Ferramentas digitais ou tecnologia de apoio'),
    confirmacao: CONF_SISTEMA
  },
  'avaliacao-caa|6a': {
    quando: R => R.circ('6a', 'Não conseguiu fazer') || R.is('6a', 'sistematica'),
    confirmacao: CONF_CAA
  },
};

    return module.exports;
})());

// ---- interacao ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras da área interação social (itens 7 a 10), a partir de matriz-estrategias-interacao.md.
// No item 9, só a preferência do aluno (seguimento prefAluno) decide as estratégias para aumentar o convívio.
// A oportunidade organizada (9-02) e a resposta às atitudes dos colegas (turma-diferencas) não dependem dela.

const PREF_SIM = R => R.tem('9', 'prefAluno', 'Sim, mais', 'Sim, outro tipo');

module.exports = {
  // Item 7
  '7-01|7': { quando: R => R.is('7', 'pontual', 'frequente') },
  '7-02|7': {
    quando: R => R.is('7', 'frequente', 'sistematica') && R.tem('7', 'dificuldade', 'Não foi possível determinar', 'Outra'),
    primeiro: true
  },
  '7-03|7': { quando: R => R.is('7', 'pontual', 'frequente') || R.tem('7', 'dificuldade', 'Encontrar colegas disponíveis') },
  '7-04|7': { quando: R => R.is('7', 'frequente', 'sistematica') && R.tem('7', 'dificuldade', 'Saber como entrar na atividade') },
  '7-05|7': { quando: R => R.is('7', 'frequente', 'sistematica') && R.tem('7', 'dificuldade', 'Saber como entrar na atividade') },
  '7-06|7': { quando: R => R.tem('7', 'dificuldade', 'Aceder à atividade (espaço, regras, materiais)') },
  '7-07|7': {
    quando: R => R.is('7', 'sistematica'),
    ou: true,
    base: R => R.is('7', 'frequente'),
    confirmacao: 'Confirma que as estratégias já experimentadas para facilitar a entrada do aluno nas atividades não chegaram?'
  },
  '7-08|7': { quando: R => R.is('7', 'frequente', 'sistematica') && R.tem('7', 'dificuldade', 'Saber como entrar na atividade') },

  // Item 8
  '8-01|8': { quando: R => R.ajuda('8') },
  '8-02|8': { quando: R => R.is('8', 'pontual') },
  'guioes-visuais|8': { quando: R => R.is('8', 'frequente', 'sistematica') },
  '8-04|8': { quando: R => R.is('8', 'frequente', 'sistematica') },
  'historia-curta|8': {
    quando: R => R.is('8', 'frequente', 'sistematica'),
    confirmacao: 'Confirma que há uma situação concreta, nos jogos ou nas atividades de grupo, que causa dificuldade ao aluno?'
  },
  '8-06|8': {
    quando: R => R.is('8', 'frequente', 'sistematica'),
    confirmacao: 'Confirma que a dificuldade é maior nas atividades novas?'
  },

  // Item 9
  '9-01|9': { quando: R => R.tem('9', 'prefAluno', 'Não foi possível perguntar') },
  '9-02|9': {
    quando: R => R.tem('9', 'oport', 'Não'),
    nota: 'Condição da escola a melhorar, e não apoio para aumentar o convívio deste aluno.'
  },
  '9-03|9': { quando: PREF_SIM },
  'pares-interesses|9': { quando: PREF_SIM },
  'interesses-atividades-colegas|9': { quando: R => PREF_SIM(R) && R.interesses() },
  '9-06|9': {
    quando: R => PREF_SIM(R) && R.interesses(),
    ou: true,
    base: PREF_SIM,
    confirmacao: 'Confirma que o aluno tem pontos fortes conhecidos que pode mostrar aos colegas?'
  },
  '9-07|9': {
    quando: R => PREF_SIM(R) && R.interesses(),
    confirmacao: 'Confirma que há colegas disponíveis que partilham estes interesses?'
  },
  '9-08|9': {
    quando: R => R.respondido('9'),
    confirmacao: 'Confirma que o aluno quer recordar ou partilhar as experiências que viveu com colegas?'
  },
  '9-09|9': { quando: R => R.is('9', 'Às vezes') && R.tem('9', 'prefAluno', 'Sim, mais') },
  'turma-diferencas|9': {
    quando: R => R.is('12', 'Sim'),
    ou: true,
    base: R => R.is('9', 'Às vezes', 'Não'),
    confirmacao: 'Confirma que há atitudes dos colegas que dificultam o convívio do aluno?'
  },
  '9-11|9': {
    quando: R => R.tem('9', 'prefAluno', 'Sim, mais'),
    confirmacao: 'Confirma que há uma necessidade concreta de compreender o que é uma amizade e que isso corresponde a um objetivo do aluno?'
  },
  '9-12|9': {
    quando: R => R.tem('9', 'prefAluno', 'Sim, mais'),
    confirmacao: 'Confirma que há uma barreira concreta às oportunidades de interação e que a equipa considera pertinente uma intervenção estruturada?',
    verMais: true
  },

  // Item 10
  '10-01|10': { quando: R => R.is('10', 'Sim', 'Às vezes') && R.temAlgum('10', 'sit'), primeiro: true },
  '10-02|10': { quando: R => R.is('10', 'Sim', 'Às vezes') && R.sit('10', 'Trabalhos de grupo') },
  'guioes-visuais|10': {
    quando: R => R.is('10', 'Sim'),
    confirmacao: 'Confirma que a explicação à turma não chegou para esta situação?'
  },
  'historia-curta|10': { quando: R => R.is('10', 'Sim') && R.temAlgum('10', 'sit') },
  '10-05|10': {
    quando: R => R.is('10', 'Sim', 'Às vezes'),
    confirmacao: 'Confirma que há uma situação concreta que o aluno viveu e quer perceber?'
  },
  '10-06|10': { quando: R => R.is('10', 'Não sei') },
};

    return module.exports;
})());

// ---- sensorial ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras da área do processamento sensorial (itens 11, 13 a 17 e 19).
// Fonte: ../matriz-estrategias-sensorial.md, coluna «Aparece quando».
// Nos itens 17 e 19, as ações de segurança dependem só do risco, e não do efeito na participação.

const CONFIRMA_ANTERIORES = 'Confirma que as adaptações anteriores não chegaram?';

module.exports = {
  // Item 11 · Espaços com muitas pessoas
  '11-01|11': {
    quando: R => R.is('11', 'Sim') && !!R.efeito('11')
  },
  'cantina-ambiente|11': {
    quando: R => R.sit('11', 'Cantina') && R.ef('11', 'mantem', 'dificulta', 'interrompe')
  },
  '11-03|11': {
    quando: R => R.sit('11', 'Festas, visitas e eventos')
  },
  '11-04|11': {
    quando: R => R.sit('11', 'Sala com o grupo todo', 'Festas, visitas e eventos')
  },
  '11-05|11': {
    quando: R => R.sit('11', 'Corredores e transições') && R.ef('11', 'mantem', 'dificulta', 'interrompe')
  },
  '11-06|11': {
    quando: R => R.ef('11', 'dificulta', 'interrompe') && R.sit('11', 'Sala com o grupo todo', 'Recreio')
  },
  '11-07|11': {
    quando: R => R.ef('11', 'interrompe')
  },

  // Item 13 · Sons e ambientes ruidosos
  'cantina-ambiente|13': {
    quando: R => R.sit('13', 'Cantina') && (R.tem('13', 'quem', 'O aluno') || R.ef('13', 'dificulta', 'interrompe'))
  },
  '13-02|13': {
    quando: R => R.sit('13', 'Campainha') && R.ef('13', 'mantem', 'dificulta', 'interrompe')
  },
  '13-03|13': {
    quando: R => R.sit('13', 'Sala de aula') && R.ef('13', 'mantem', 'dificulta', 'interrompe')
  },
  '13-04|13': {
    quando: R => R.sit('13', 'Sala de aula') && R.ef('13', 'mantem', 'dificulta', 'interrompe')
  },
  '13-05|13': {
    quando: R => R.sit('13', 'Atividades com música', 'Recreio') && R.ef('13', 'mantem', 'dificulta', 'interrompe')
  },
  '13-06|13': {
    quando: R => R.sit('13', 'Sala de aula', 'Campainha') && R.ef('13', 'dificulta', 'interrompe')
  },
  '13-07|13': {
    // «Desconforto ou dificuldade com relevo»: qualquer efeito menos «Não foi possível determinar».
    // A parte «tendo em conta as adaptações que já usa» é a regra 7, tratada pela app.
    quando: R => R.ef('13', 'mantem', 'dificulta', 'interrompe')
  },
  '13-08|13': {
    quando: R => R.ef('13', 'interrompe')
  },
  '13-09|13': {
    quando: R => R.ef('13', 'dificulta', 'interrompe') && R.temAlgum('13', 'sit')
  },
  '13-10|13': {
    quando: R => R.ef('13', 'interrompe')
  },

  // Item 14 · Luzes intensas ou intermitentes
  '14-01|14': {
    quando: R => R.sit('14', 'Sala de aula (janelas, luzes)') && R.ef('14', 'mantem', 'dificulta', 'interrompe')
  },
  '14-02|14': {
    quando: R => R.sit('14', 'Sala de aula (janelas, luzes)') && R.ef('14', 'dificulta', 'interrompe')
  },
  '14-03|14': {
    quando: R => R.sit('14', 'Projeções e ecrãs')
  },
  '14-04|14': {
    quando: R => R.ef('14', 'dificulta', 'interrompe')
  },
  '14-05|14': {
    quando: R => R.ef('14', 'dificulta', 'interrompe')
  },
  '14-06|14': {
    quando: R => R.sit('14', 'Sala de aula (janelas, luzes)') && R.ef('14', 'interrompe'),
    confirmacao: 'Confirma que a luz natural é a causa?'
  },
  '14-07|14': {
    quando: R => R.ef('14', 'interrompe'),
    confirmacao: CONFIRMA_ANTERIORES
  },

  // Item 15 · Toque ou contacto físico
  '15-01|15': {
    quando: R => R.sit('15', 'Ajuda nas rotinas (ex.: vestir o casaco)') && !!R.efeito('15')
  },
  '15-02|15': {
    quando: R => R.sit('15', 'Filas')
  },
  '15-03|15': {
    quando: R => R.sit('15', 'Jogos e educação física') && R.ef('15', 'dificulta', 'interrompe')
  },
  '15-04|15': {
    quando: R => R.ef('15', 'mantem', 'dificulta')
  },

  // Item 16 · Levanta-se ou mexe-se com frequência
  // Nota do item: com «Não foi identificado desconforto nem dificuldade de participação», não aparecem estratégias.
  '16-01|16': {
    quando: R => R.ef('16', 'mantemDesconforto', 'dificulta', 'interrompe')
  },
  '16-02|16': {
    quando: R => R.sit('16', 'Aulas expositivas') && !R.ef('16', 'nenhum')
  },
  '16-03|16': {
    quando: R => R.sit('16', 'Trabalho individual', 'Testes') && R.ef('16', 'dificulta', 'interrompe')
  },
  '16-04|16': {
    quando: R => R.ef('16', 'dificulta', 'interrompe')
  },
  '16-05|16': {
    quando: R => R.ef('16', 'dificulta')
  },
  '16-06|16': {
    quando: R => R.sit('16', 'Testes') && !R.ef('16', 'nenhum')
  },
  '16-07|16': {
    quando: R => R.ef('16', 'interrompe'),
    confirmacao: CONFIRMA_ANTERIORES
  },

  // Item 17 · Movimentos ou sons repetitivos
  // As ações de segurança (17-01, 17-02) dependem só do risco.
  '17-01|17': {
    quando: R => R.risco('17', 'aconteceu'),
    primeiro: true
  },
  '17-02|17': {
    quando: R => R.risco('17', 'concreto'),
    primeiro: true
  },
  '17-03|17': {
    quando: R => R.ef('17', 'mantemDesconforto')
  },
  '17-04|17': {
    quando: R => R.tem('17', 'origem', 'Afeta a aula ou os colegas'),
    primeiro: true
  },
  '17-05|17': {
    quando: R => R.tem('17', 'origem', 'Os colegas reagem mal')
  },
  '17-06|17': {
    quando: R => R.tem('17', 'origem', 'Afeta a aprendizagem do aluno') && R.ef('17', 'dificulta', 'interrompe')
  },
  '17-07|17': {
    quando: R => R.ef('17', 'dificulta', 'interrompe') && R.temAlgum('17', 'sit')
  },
  '17-08|17': {
    quando: R => R.tem('17', 'origem', 'Afeta a aula ou os colegas') && R.ef('17', 'interrompe'),
    confirmacao: 'Confirma que a dificuldade concreta já foi identificada e que as adaptações do contexto não a resolveram?'
  },

  // Item 19 · Procura repetidamente certas sensações
  // As ações de segurança (19-01, 19-02) dependem só do risco.
  '19-01|19': {
    quando: R => R.risco('19', 'aconteceu'),
    primeiro: true
  },
  '19-02|19': {
    quando: R => R.risco('19', 'concreto'),
    primeiro: true
  },
  '19-03|19': {
    quando: R => R.tem('19', 'tipo', 'Levar objetos à boca') &&
      (R.risco('19', 'aconteceu', 'concreto') || R.ef('19', 'mantemDesconforto', 'dificulta', 'interrompe', 'nd'))
  },
  '19-04|19': {
    quando: R => R.tem('19', 'tipo', 'Tocar e explorar texturas') && R.ef('19', 'dificulta', 'interrompe')
  },
  '19-05|19': {
    quando: R => R.tem('19', 'tipo', 'Movimento intenso') && R.ef('19', 'dificulta', 'interrompe')
  },
  '19-06|19': {
    // Princípio do item: sem desconforto, sem dificuldade e sem risco, não se sugerem apoios.
    quando: R => (R.tem('19', 'tipo', 'Cheiros', 'Outro') &&
      !(R.ef('19', 'nenhum') && R.risco('19', 'nenhum'))) || R.ef('19', 'nd')
  },
  '19-07|19': {
    quando: R => R.risco('19', 'aconteceu'),
    ou: true,
    confirmacao: CONFIRMA_ANTERIORES,
    base: R => R.ef('19', 'interrompe')
  },
};

    return module.exports;
})());

// ---- seguranca-bem-estar ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras «Aparece quando» da área segurança e bem-estar (matriz, Parte 3: itens 6b, 12, 18, 22, 23a, 23b, 24a, 24b).
// A pergunta prévia da regra 7 (apoios visuais já nas adaptações) é tratada pela app à parte.

const SIT_23B = ['Quando erra ou é corrigido', 'Quando perde', 'Quando tem de esperar', 'Quando tem de mudar de atividade', 'Outra'];

module.exports = {
  // 6b · Quando tem dor ou se sente mal, comunica-o ou pede ajuda
  '6b-01|6b': { quando: R => R.is('6b', 'pontual') },
  '6b-02|6b': { quando: R => R.is('6b', 'frequente', 'sistematica', 'NR') },
  '6b-03|6b': { quando: R => R.is('6b', 'frequente', 'sistematica', 'NR') },
  '6b-04|6b': { quando: R => R.is('6b', 'frequente', 'sistematica', 'NR') },
  '6b-05|6b': { quando: R => R.is('6b', 'frequente', 'sistematica') },
  'avaliacao-caa|6b': {
    quando: R => R.circ('6b', 'Não conseguiu fazer'),
    confirmacao: 'Confirma que os meios de comunicação que o aluno tem não lhe permitem dizer que tem dor?'
  },

  // 12 · Episódios de exclusão, troça ou intimidação
  '12-01|12': { quando: R => R.is('12', 'Sim'), primeiro: true },
  '12-02|12': { quando: R => R.is('12', 'Sim') && R.temAlgum('12', 'onde') },
  'pessoa-referencia|12': { quando: R => R.is('12', 'Sim') },
  '12-04|12': { quando: R => R.is('12', 'Não sei') || R.persp('12', 'Ainda não'), primeiro: true, substituiOuvir: true },
  '12-05|12': { quando: R => R.is('12', 'Não sei') },
  '12-06|12': {
    quando: R => R.is('12', 'Sim', 'Não sei'),
    confirmacao: 'Confirma que a escola ainda não tem um canal anónimo para os alunos sinalizarem situações que os preocupam?'
  },
  '12-07|12': {
    quando: R => R.is('12', 'Sim'),
    confirmacao: 'Confirma que o aluno está de acordo com a organização de uma rede de colegas que o apoiem?',
    depois: true
  },
  'turma-diferencas|12': { quando: R => R.is('12', 'Sim'), depois: true },

  // 18 · Dificuldade em perceber se sentia dor, frio ou calor
  '18-01|18': { quando: R => R.is('18', 'Não sei', 'Sim'), primeiro: true },
  '18-02|18': { quando: R => R.is('18', 'Sim') && R.tem('18', 'aconteceu', 'Magoou-se') },
  '18-03|18': { quando: R => R.is('18', 'Sim') && R.tem('18', 'aconteceu', 'Frio ou calor intensos') },
  '18-04|18': { quando: R => R.is('18', 'Sim'), depois: true },
  '18-05|18': {
    quando: R => R.is('18', 'Sim') && R.tem('18', 'aconteceu', 'Magoou-se', 'Esteve doente'),
    confirmacao: 'Confirma que a situação se repetiu ou teve consequências?'
  },

  // 22 · Mal-estar fora da escola que não se vê na escola
  '22-01|22': { quando: R => R.is('22', 'Sim'), primeiro: true },
  '22-02|22': { quando: R => R.is('22', 'Não sei') },
  '22-03|22': { quando: R => R.is('22', 'Sim') },
  '22-04|22': { quando: R => R.is('22', 'Sim') },
  '22-05|22': { quando: R => R.is('22', 'Sim'), depois: true },

  // 23a · Perante contrariedades, mostra desconforto
  '23a-01|23a': { quando: R => R.is('23a', 'Sim') && R.persp('23a', 'Ainda não'), substituiOuvir: true },
  '23a-02|23a': { quando: R => R.ef('23a', 'mantem', 'dificulta') },
  '23a-03|23a': { quando: R => R.ef('23a', 'dificulta', 'interrompe') },
  'apoio-visual-pausa|23a': { quando: R => R.ef('23a', 'dificulta', 'interrompe') },
  '23a-05|23a': { quando: R => R.is('23a', 'Sim') && R.sit('23a', 'Quando erra ou é corrigido') },
  '23a-06|23a': { quando: R => R.is('23a', 'Sim') && R.sit('23a', 'Quando perde') },
  '23a-07|23a': { quando: R => R.is('23a', 'Sim') && R.sit('23a', 'Quando tem de esperar') },
  'aviso-fim-atividade|23a': { quando: R => R.is('23a', 'Sim') && R.sit('23a', 'Quando tem de mudar de atividade') },
  '23a-09|23a': { quando: R => R.ef('23a', 'interrompe') },
  '23a-10|23a': { quando: R => R.ef('23a', 'nd'), substituiObservar: true },

  // 23b · Episódios de mal-estar intenso (ordem: sinais iniciais, durante o episódio, recuperação, prevenção, equipa)
  // Sinais iniciais
  '23b-01|23b': { quando: R => R.is('23b', 'Sim') },
  'apoio-visual-pausa|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-03|23b': { quando: R => R.is('23b', 'Sim') },
  // Durante o episódio
  '23b-04|23b': { quando: R => R.is('23b', 'Sim') && R.tem('23b', 'como', 'Ficou muito parado ou sem responder'), primeiro: true },
  '23b-05|23b': {
    quando: R => R.is('23b', 'Sim') && R.tem('23b', 'como', 'Magoou-se', 'Magoou outra pessoa', 'Atirou ou estragou objetos'),
    primeiro: true
  },
  '23b-06|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-07|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-08|23b': {
    quando: R => R.is('23b', 'Sim'),
    confirmacao: 'Confirma que os episódios aconteceram na presença dos colegas?'
  },
  // Recuperação
  '23b-09|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-10|23b': { quando: R => R.is('23b', 'Sim') },
  // Prevenção
  '23b-11|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-12|23b': { quando: R => R.is('23b', 'Sim') },
  'pedir-pausa-ajuda|23b': { quando: R => R.is('23b', 'Sim') && R.sit('23b', ...SIT_23B) },
  '23b-14|23b': { quando: R => R.is('23b', 'Sim') && R.sit('23b', ...SIT_23B) },
  '23b-15|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-16|23b': { quando: R => R.is('23b', 'Sim') },
  '23b-17|23b': { quando: R => R.is('23b', 'Sim') && R.sit('23b', ...SIT_23B) },
  // Equipa
  '23b-18|23b': {
    quando: R => R.is('23b', 'Sim') && ((R.nEpisodios('23b') || 0) > 1 || R.tem('23b', 'como', 'Magoou-se', 'Magoou outra pessoa'))
  },
  '23b-19|23b': { quando: R => R.is('23b', 'Sim') && (R.nEpisodios('23b') || 0) > 1 },

  // 24a · Mudança que se mantém no cansaço, no bem-estar ou na participação
  '24a-01|24a': { quando: R => R.is('24a', 'Sim'), primeiro: true },
  '24a-02|24a': { quando: R => R.is('24a', 'Não sei') },
  '24a-03|24a': { quando: R => R.is('24a', 'Sim') },
  '24a-04|24a': { quando: R => R.is('24a', 'Sim') },
  '24a-05|24a': {
    quando: R => R.is('24a', 'Sim'),
    confirmacao: 'Confirma que a mudança afeta a participação ou o bem-estar do aluno?'
  },
  '24a-06|24a': {
    quando: R => R.is('24a', 'Sim'),
    confirmacao: 'Confirma que a mudança se mantém desde a última revisão, ou que é grave?'
  },

  // 24b · Deixou de fazer coisas que já fazia
  '24b-01|24b': { quando: R => R.is('24b', 'Sim'), primeiro: true },
  '24b-02|24b': { quando: R => R.is('24b', 'Sim') },
  '24b-03|24b': { quando: R => R.is('24b', 'Não sei') },
  '24b-04|24b': { quando: R => R.is('24b', 'Sim') }
};

    return module.exports;
})());

// ---- emocoes-rotinas ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras «Aparece quando» da área emoções e regulação, rotinas e interesses (itens 20, 21, 25, 26 e 27).
// Fonte: ../matriz-estrategias-emocoes-rotinas.md e esqueleto.json["emocoes-rotinas"].

// Item 26, seguimento «Que tipo de alterações?»: «Previstas» são as duas primeiras opções,
// «Previstas, pouco antes» só a segunda, «Imprevistas» a terceira.
const previstas = R => R.tem('26', 'tipoAlt', 'Previstas e comunicadas com antecedência', 'Previstas, mas comunicadas pouco antes');
const previstasPoucoAntes = R => R.tem('26', 'tipoAlt', 'Previstas, mas comunicadas pouco antes');
const imprevistas = R => R.tem('26', 'tipoAlt', 'Imprevistas');

module.exports = {
  // ---------- Item 20 ----------
  '20-01|20': {
    quando: R => R.ajuda('20'),
    nota: 'Pode também ser uma atividade para toda a turma, sem estar ligada a este aluno.'
  },
  '20-02|20': { quando: R => R.tem('20', 'apoio', 'Na situação', 'Nas duas') },
  '20-03|20': { quando: R => R.tem('20', 'apoio', 'Na situação', 'Nas duas') && R.is('20', 'frequente', 'sistematica') },
  '20-04|20': { quando: R => R.tem('20', 'apoio', 'Na expressão da cara', 'Nas duas') },
  '20-05|20': {
    quando: R => R.tem('20', 'apoio', 'Na expressão da cara'),
    confirmacao: 'Confirma que o aluno aceita este formato e que há uma finalidade concreta para o registo?'
  },
  '20-06|20': { quando: R => R.is('20', 'pontual') },
  '20-07|20': { quando: R => R.is('20', 'pontual', 'frequente') },
  '20-08|20': {
    quando: R => R.is('20', 'frequente', 'sistematica'),
    confirmacao: 'Confirma que o aluno está de acordo com esta conversa com a turma?'
  },

  // ---------- Item 21 ----------
  '21-01|21': { quando: R => R.ajuda('21') },
  '21-02|21': { quando: R => R.is('21', 'frequente', 'sistematica') },
  '21-03|21': { quando: R => R.is('21', 'frequente', 'sistematica') },
  '21-04|21': { quando: R => R.is('21', 'pontual') },
  '21-05|21': {
    quando: R => R.is('21', 'frequente', 'sistematica'),
    confirmacao: 'Confirma que os meios que o aluno tem não lhe permitem comunicar certos estados ou distinções que quer comunicar?'
  },
  '21-06|21': {
    quando: R => R.persp('21', 'Sim'),
    confirmacao: 'Confirma que o aluno prefere escrever ou desenhar para dizer como se sente?'
  },
  '21-07|21': { quando: R => R.is('21', 'pontual', 'frequente') },
  '21-08|21': { quando: R => R.is('21', 'pontual') },
  'pedir-pausa-ajuda|21': { quando: R => R.is('21', 'frequente', 'sistematica') },
  '21-10|21': {
    quando: R => R.respondido('21'),
    confirmacao: 'Confirma que há uma necessidade concreta ligada a identificar ou comunicar o que o aluno sente, que ele mostra interesse nesta abordagem e que a atividade não lhe causa desconforto?'
  },

  // ---------- Item 25 ----------
  '25-01|25': {
    quando: R => R.tem('25', 'dificuldade', 'As condições do espaço (ruído, muita gente)') || (R.is('25', 'Sim') && R.efeito('25') !== '')
  },
  '25-02|25': {
    quando: R => R.tem('25', 'dificuldade', 'Não sabe que opções tem') && R.sit('25', 'Intervalos', 'Esperas')
  },
  '25-03|25': { quando: R => R.tem('25', 'dificuldade', 'Quer participar numa atividade que não lhe é acessível') },
  '25-04|25': { quando: R => R.sit('25', 'Substituições e tempos livres', 'Intervalos') },
  'interesse-tempos-livres|25': {
    quando: R => R.ef('25', 'mantem', 'dificulta', 'interrompe') && R.interesses()
  },
  '25-06|25': { quando: R => R.sit('25', 'Entradas e saídas') },
  '25-07|25': { quando: R => R.sit('25', 'Esperas') },
  '25-08|25': {
    quando: R => R.ef('25', 'interrompe'),
    confirmacao: 'Confirma que organizar o tempo livre é um objetivo do aluno?'
  },

  // ---------- Item 26 ----------
  '26-01|26': {
    quando: R => previstasPoucoAntes(R) && R.ef('26', 'mantem', 'dificulta', 'interrompe'),
    primeiro: true
  },
  '26-02|26': { quando: R => previstas(R) && R.ef('26', 'dificulta', 'interrompe') },
  '26-03|26': {
    quando: R => previstas(R) && R.sit('26', 'Visitas de estudo e eventos', 'Professores substitutos', 'Mudanças de sala ou de lugar')
  },
  '26-04|26': {
    quando: R => imprevistas(R) && R.ef('26', 'mantem', 'dificulta', 'interrompe'),
    primeiro: true
  },
  '26-05|26': { quando: R => imprevistas(R) && R.ef('26', 'dificulta', 'interrompe') },
  '26-06|26': { quando: R => R.ef('26', 'interrompe') },
  '26-07|26': { quando: R => imprevistas(R) && R.sit('26', 'Mudanças de horário') },
  '26-08|26': { quando: R => R.ef('26', 'mantem', 'dificulta', 'interrompe') },
  '26-09|26': { quando: R => R.ef('26', 'mantem', 'dificulta') },
  '26-10|26': { quando: R => R.ef('26', 'interrompe') },
  '26-11|26': { quando: R => previstas(R) && R.ef('26', 'interrompe') },

  // ---------- Item 27 ----------
  // «Como podem ajudar a participação?» -> facilitadores opcionais.
  '27-01|27': {
    quando: R => R.interesses() && R.tem('27', 'comoAjudam', 'Motivar nas tarefas'),
    opcional: true
  },
  'ligar-conceitos-interesses|27': {
    quando: R => R.interesses() && R.tem('27', 'comoAjudam', 'Motivar nas tarefas') && R.ajuda('28'),
    opcional: true
  },
  '27-03|27': {
    quando: R => R.interesses() && R.tem('27', 'comoAjudam', 'Ponte para conversar com colegas') && R.tem('9', 'prefAluno', 'Sim, mais', 'Sim, outro tipo'),
    opcional: true
  },
  '27-04|27': {
    quando: R => R.interesses() && R.tem('27', 'comoAjudam', 'Momento de descanso ou de regulação'),
    opcional: true
  },
  'interesse-tempos-livres|27': {
    quando: R => R.interesses() && (R.tem('27', 'comoAjudam', 'Momento de descanso ou de regulação') || R.ef('25', 'mantem', 'dificulta', 'interrompe')),
    opcional: true
  },
  'interesses-atividades-colegas|27': {
    quando: R => R.interesses() && R.tem('27', 'comoAjudam', 'Ponte para conversar com colegas') && R.tem('9', 'prefAluno', 'Sim, mais', 'Sim, outro tipo'),
    opcional: true
  },
  // «Há situações da escola em que estes interesses dificultam…?» -> não são opcionais.
  'aviso-fim-atividade|27': {
    quando: R => R.interesses() && R.tem('27', 'dificultam', 'Sim, ao mudar de atividade')
  },
  '27-07|27': {
    quando: R => R.interesses() && R.tem('27', 'dificultam', 'Sim, em conversas sobre outros temas')
  }
};

    return module.exports;
})());

// ---- aprendizagem ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras «Aparece quando» da área aprendizagem e organização (itens 28 a 33b).
// Fonte: ../matriz-estrategias-aprendizagem.md e esqueleto.json["aprendizagem"].
// A pergunta da regra 7 («Com ... nas adaptações, pergunta-se primeiro») não muda se a estratégia aparece,
// só como é marcada; fica para a app e não entra em quando.
module.exports = {
  // Item 28 · conceitos abstratos
  '28-01|28': { quando: R => R.ajuda('28') },
  'ligar-conceitos-interesses|28': { quando: R => R.ajuda('28') },
  '28-03|28': { quando: R => R.is('28', 'pontual', 'frequente') },
  '28-04|28': { quando: R => R.is('28', 'frequente', 'sistematica') },
  '28-05|28': { quando: R => R.is('28', 'frequente', 'sistematica') },
  '28-06|28': { quando: R => R.is('28', 'frequente', 'sistematica') },
  '28-07|28': { quando: R => R.is('28', 'frequente', 'sistematica', 'NR') },

  // Item 29 · interrompe ou deixa a tarefa quando encontra dificuldades
  '29-01|29': {
    quando: R => R.is('29', 'Sim') && R.tem('29', 'depois', 'Não retoma', 'Varia') && R.persp('29', 'Ainda não'),
    primeiro: true,
    substituiOuvir: true
  },
  '29-02|29': { quando: R => R.is('29', 'Sim') && R.tem('29', 'depois', 'Retoma com ajuda individual', 'Não retoma') },
  'verificacoes-discretas|29': { quando: R => R.is('29', 'Sim') && R.tem('29', 'depois', 'Retoma com ajuda individual') },
  '29-04|29': { quando: R => R.is('29', 'Sim') && R.tem('29', 'depois', 'Não retoma', 'Varia') },
  '29-05|29': {
    quando: R => R.is('29', 'Sim') && R.tem('29', 'tarefas', 'Tarefas novas', 'Tarefas escritas') && R.tem('29', 'depois', 'Não retoma', 'Varia')
  },
  'reconhecer-dificuldade|29': { quando: R => R.is('29', 'Sim') && R.tem('29', 'depois', 'Retoma com ajuda individual', 'Não retoma') },
  '29-07|29': {
    quando: R => R.is('29', 'Sim') && R.tem('29', 'depois', 'Não retoma'),
    confirmacao: 'Confirma que o aluno quer este tipo de apoio (um reforço ligado aos seus interesses e escolhido com ele)?'
  },

  // Item 30a · começa as tarefas
  'instrucoes-passo-a-passo|30a': { quando: R => R.is('30a', 'pontual', 'frequente') },
  '30a-02|30a': { quando: R => R.is('30a', 'pontual', 'frequente') },
  'tarefa-dividida|30a': { quando: R => R.is('30a', 'frequente', 'sistematica') },
  '30a-04|30a': { quando: R => R.is('30a', 'sistematica') },

  // Item 30b · mantém-se na tarefa até a concluir
  'tarefa-dividida|30b': { quando: R => R.is('30b', 'pontual', 'frequente') },
  '30b-02|30b': { quando: R => R.is('30b', 'frequente', 'sistematica') },
  'ensinar-lista-passos|30b': {
    quando: R => R.is('30b', 'frequente', 'sistematica'),
    planoDepende: 'tarefa-dividida'
  },

  // Item 31 · encontra e prepara o material
  '31-01|31': { quando: R => R.is('31', 'pontual', 'frequente') },
  '31-02|31': { quando: R => R.is('31', 'frequente', 'sistematica') },
  '31-03|31': { quando: R => R.is('31', 'frequente', 'sistematica') },

  // Item 32a · acompanha o tempo de uma tarefa
  '32a-01|32a': { quando: R => R.is('32a', 'pontual') },
  '32a-02|32a': { quando: R => R.is('32a', 'frequente', 'sistematica') },

  // Item 32b · organiza as etapas de trabalhos com prazo
  '32b-01|32b': { quando: R => R.ajuda('32b') },
  '32b-02|32b': { quando: R => R.is('32b', 'frequente', 'sistematica') },
  '32b-03|32b': { quando: R => R.is('32b', 'frequente', 'sistematica') },

  // Item 33a · registos escritos à mão
  '33a-01|33a': { quando: R => R.ajuda('33a') },
  '33a-02|33a': { quando: R => R.is('33a', 'pontual', 'frequente') },
  '33a-03|33a': { quando: R => R.is('33a', 'frequente', 'sistematica') },
  '33a-04|33a': { quando: R => R.is('33a', 'pontual', 'frequente') },
  '33a-05|33a': { quando: R => R.is('33a', 'frequente', 'sistematica', 'NR') },
  '33a-06|33a': { quando: R => R.is('33a', 'sistematica', 'NR') },
  '33a-07|33a': { quando: R => R.is('33a', 'frequente', 'sistematica') },

  // Item 33b · manipula os materiais
  '33b-01|33b': { quando: R => R.ajuda('33b') },
  '33b-02|33b': { quando: R => R.is('33b', 'pontual', 'frequente') },
  '33b-03|33b': { quando: R => R.is('33b', 'frequente', 'sistematica') },
  '33b-04|33b': {
    quando: R => R.is('33b', 'frequente', 'sistematica'),
    confirmacao: 'Confirma que a dificuldade aparece nas tarefas de matemática?'
  },
  '33b-05|33b': { quando: R => R.is('33b', 'sistematica') || R.circ('33b', 'Não conseguiu fazer') }
};

    return module.exports;
})());

// ---- autonomia ----
Object.assign(REGRAS, (function () {
    const module = { exports: {} };
// Regras da área «autonomia» (itens 34a a 38), a partir de ../matriz-estrategias-autonomia.md.
// Regra da v2.11: quando o adulto faz a atividade pelo aluno, a resposta é «Não realizou a atividade…».
// Por isso, onde a matriz (escrita com os itens da v2.10) diz «Ajuda sistemática», conta também
// «Não realizou» com a circunstância «Não conseguiu fazer» ou «Não sei» (o caso em que o adulto faz por ele).
// As circunstâncias de contexto («não estavam acessíveis», «não era adequada») e «Escolheu não fazer»
// ficam para a linha geral de rever a acessibilidade, tratada à parte pela app.

const adultoFaz = (R, i) => R.circ(i, 'Não conseguiu fazer', 'Não sei');
const freqOuSist = (R, i) => R.is(i, 'frequente', 'sistematica') || adultoFaz(R, i);
const sist = (R, i) => R.is(i, 'sistematica') || adultoFaz(R, i);

module.exports = {
  // Item 34a
  '34a-01|34a': {
    quando: R => R.is('34a', 'pontual', 'frequente'),
    confirmacao: 'Confirma que o aluno precisa de ajuda para identificar ou antecipar quando deve ir à casa de banho?'
  },
  '34a-02|34a': { quando: R => R.ajuda('34a') },
  'familia-mesmas-palavras|34a': { quando: R => freqOuSist(R, '34a') },
  '34a-04|34a': { quando: R => R.tem('34a', 'acompanhado', 'Sim') },

  // Item 34b
  '34b-01|34b': { quando: R => R.is('34b', 'pontual', 'frequente') },
  '34b-02|34b': { quando: R => freqOuSist(R, '34b') },
  'familia-mesmas-palavras|34b': { quando: R => freqOuSist(R, '34b') },
  '34b-04|34b': { quando: R => sist(R, '34b') },
  '34b-05|34b': {
    quando: R => R.ajuda('34b') || R.is('13', 'Sim'),
    confirmacao: 'Confirma que o ruído ou a agitação da casa de banho dificultam a rotina de higiene do aluno?'
  },

  // Item 35a
  '35a-01|35a': {
    quando: R => freqOuSist(R, '35a'),
    confirmacao: 'Confirma que há uma dificuldade específica no uso dos talheres?'
  },
  'cantina-informar-ajuda|35a': { quando: R => R.ajuda('35a') },
  '35a-03|35a': {
    quando: R => freqOuSist(R, '35a'),
    confirmacao: 'Confirma que a dificuldade no uso dos talheres é motora?'
  },

  // Item 35b
  '35b-01|35b': {
    quando: R => freqOuSist(R, '35b'),
    confirmacao: 'Confirma que há uma dificuldade específica em abrir as embalagens?'
  },
  '35b-02|35b': {
    quando: R => R.ajuda('35b'),
    confirmacao: 'Confirma que o aluno traz comida de casa?'
  },
  '35b-03|35b': {
    quando: R => R.ajuda('35b'),
    confirmacao: 'Confirma que as embalagens são fornecidas pela escola?'
  },
  'cantina-informar-ajuda|35b': { quando: R => R.ajuda('35b') },

  // Item 36 (a resposta que indica necessidade é «Não» ou «Em parte»)
  '36-01|36': { quando: R => R.is('36', 'Não sei') },
  '36-02|36': { quando: R => R.is('36', 'Em parte', 'Não') },
  '36-03|36': {
    quando: R => R.is('36', 'Em parte', 'Não'),
    planoDepende: '36-02'
  },
  '36-04|36': { quando: R => R.is('36', 'Em parte', 'Não') },
  'cantina-ambiente|36': {
    quando: R => R.is('36', 'Em parte', 'Não'),
    confirmacao: 'Confirma que o ambiente da cantina também pesa na alimentação do aluno na escola?'
  },
  '36-06|36': {
    quando: R => R.is('36', 'Não') && R.tem('36', 'variedade', 'Sim'),
    confirmacao: 'Confirma que a alimentação na escola está a afetar o bem-estar ou a participação do aluno?'
  },

  // Item 37
  '37-01|37': { quando: R => R.ajuda('37') },
  '37-02|37': { quando: R => freqOuSist(R, '37') },
  '37-03|37': { quando: R => freqOuSist(R, '37') },

  // Item 38
  '38-01|38': { quando: R => R.ajuda('38') },
  '38-02|38': {
    quando: R => freqOuSist(R, '38'),
    ou: true,
    confirmacao: 'Confirma que está prevista uma mudança de escola, de ciclo ou de sala?',
    base: R => R.respondido('38') && !R.is('38', 'NA')
  },
  '38-03|38': { quando: R => R.is('38', 'frequente') },
  '38-04|38': { quando: R => R.is('38', 'pontual', 'frequente') },
};

    return module.exports;
})());
