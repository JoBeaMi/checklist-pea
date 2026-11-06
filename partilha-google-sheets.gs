// Recebe a partilha sem identificação da Checklist CAIDI e acrescenta uma linha à folha.
// Cada chave do envio passa a ser uma coluna. Colunas novas são acrescentadas no fim.

const NOME_FOLHA = 'Respostas';
const CAMPOS_PROIBIDOS = ['nome', 'nomeAluno', 'turma', 'professor', 'data', 'observacoes', 'quais', 'sintese', 'objetivos', 'facilita', 'outro'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const dados = JSON.parse(e.postData.contents);
    if (!dados.id || !dados.versao_checklist) return resposta({ ok: false, erro: 'envio inválido' });
    CAMPOS_PROIBIDOS.forEach(c => delete dados[c]);

    const linha = { recebido_em: new Date() };
    Object.keys(dados).forEach(chave => {
      const v = dados[chave];
      if (chave === 'itens') {
        Object.keys(v).forEach(k => {
          linha[k] = v[k] && typeof v[k] === 'object' ? v[k].v : v[k];
          if (v[k] && v[k].seg && Object.keys(v[k].seg).length) linha[k + '_seg'] = JSON.stringify(v[k].seg);
        });
      } else if (v && typeof v === 'object' && !Array.isArray(v)) {
        linha[chave] = JSON.stringify(v);
      } else if (Array.isArray(v)) {
        linha[chave] = v.join('; ');
      } else {
        linha[chave] = v;
      }
    });

    const folha = obterFolha();
    let cabecalho = folha.getLastRow() > 0 ? folha.getRange(1, 1, 1, folha.getLastColumn()).getValues()[0] : [];
    const novas = Object.keys(linha).filter(k => cabecalho.indexOf(k) === -1);
    if (novas.length) {
      cabecalho = cabecalho.concat(novas);
      folha.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
      folha.setFrozenRows(1);
    }
    folha.appendRow(cabecalho.map(k => (k in linha ? linha[k] : '')));
    return resposta({ ok: true });
  } catch (erro) {
    return resposta({ ok: false, erro: String(erro) });
  } finally {
    lock.releaseLock();
  }
}

function obterFolha() {
  const livro = SpreadsheetApp.getActiveSpreadsheet();
  return livro.getSheetByName(NOME_FOLHA) || livro.insertSheet(NOME_FOLHA);
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
