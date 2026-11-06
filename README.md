# Checklist CAIDI — Observação e Apoio PEA

**Ferramenta de observação para planear o apoio a alunos autistas, com ou sem diagnóstico**

Desenvolvido por: NIDCAIDI/CAIDI
Para: Agrupamento de Escolas Padre Vítor Melícias

> ⚠️ Esta é uma ferramenta pedagógica de observação. Não serve para diagnosticar nem para sinalizar possível autismo.

---

## O que é

Uma aplicação web gratuita, que funciona no computador, no tablet e no telemóvel. Com ela, o professor pode:

- registar o contexto do aluno (horas na turma, apoios na escola e fora da escola, medidas em vigor);
- responder a 49 itens em sete áreas, preenchendo só as áreas que quer observar nessa altura, com perguntas a seguir que aparecem conforme a resposta;
- responder às condições da escola das áreas em que há necessidades;
- ver as sugestões de apoio que correspondem às respostas, com as de segurança primeiro e as restantes em «Ver mais»;
- dizer, em cada sugestão, se isto já se faz («Já está implementada», e quanto ajuda), se vai começar («Ainda não», e quem fica responsável) ou se não é possível (e porquê);
- guardar como PDF um relatório que abre com «O essencial para apoiar este aluno».

Não é preciso instalar nada nem criar conta.

## Privacidade

- Os dados que identificam o aluno (nome, turma, data, nome do professor e campos de texto) são processados **apenas no dispositivo** do professor.
- Enquanto o separador do navegador estiver aberto, o preenchimento fica guardado (`sessionStorage`), para não se perder se a página for atualizada. É apagado quando o separador é fechado ou quando se clica em «Limpar Tudo».
- O diagnóstico e as terapias e consultas fora da escola são dados de saúde. Só aparecem no PDF se o professor escolher incluí-los.
- Se a partilha estiver ligada (ver abaixo), o professor pode enviar à CAIDI, sem identificação e só quando a família autorizou, as respostas de listas fechadas e as decisões sobre as sugestões. Nunca são enviados o nome, a turma, a data exata, o nome do professor nem nenhum texto livre. Enquanto a partilha não estiver ligada, esta opção não aparece.
- A página recolhe estatísticas anónimas de visitas (Google Analytics), que não incluem nenhum dado do formulário.

## Como usar

1. Abrir a página da aplicação.
2. Preencher a identificação, incluindo o período a que as respostas se referem, e, se souber, o contexto e os apoios.
3. Escolher as áreas a observar. A área «Emoções e regulação» e o item 12 (exclusão, troça ou intimidação) estão sempre visíveis. A autonomia pessoal começa fechada a partir do 2.º ciclo.
4. Responder aos itens. Cada item tem «Ajuda para escolher». As perguntas a seguir aparecem conforme a resposta.
5. Responder às condições da escola, no fim dos itens.
6. Clicar em **Ver as sugestões de apoio** e dizer, em cada uma, se isto já se faz. As sugestões que precisam de uma confirmação ficam como possibilidade a ponderar até se responder.
7. Clicar em **Fazer o relatório**, escolher o que entra na primeira página (até cinco pontos fortes e até três barreiras) e indicar a data de revisão.
8. Clicar em **Guardar como PDF** e escolher «Guardar como PDF» na janela de impressão.

## Estrutura do projeto

| Ficheiro | Conteúdo |
|---|---|
| `index.html` | Estrutura da página |
| `dados.js` | **Conteúdo da checklist**: áreas, itens, seguimentos, condições da escola, princípios e estratégias |
| `estrategias.js` | **Quando aparece cada estratégia**: uma condição por par «estratégia\|item» |
| `condicoes.js` | As funções que as condições usam (`R.is`, `R.ajuda`, `R.ef`, `R.sit`, `R.tem`…) |
| `app.js` | Funcionamento da aplicação (itens, seguimentos, sugestões, relatório, partilha, PDF) |
| `style.css` | Aspeto visual, versão para telemóvel e versão para impressão |
| `partilha-google-sheets.gs` | Script do Google Sheets que recebe a partilha sem identificação |
| `logo-caidi.png` | Logótipo |

### Tipos de item

| Tipo | Para que serve | Respostas |
|---|---|---|
| `N` | O que o aluno faz | Sem ajuda individual · Ajuda pontual · Ajuda frequente · Ajuda sistemática · Não realizou a atividade… · Não foi possível observar · Não se aplica |
| `C` | O que se observou | Sim · Não · Não tenho informação suficiente. Com «Sim», o efeito na participação |
| `P` | Participação, situações e bem-estar | As respostas de cada item (Sim · Às vezes · Não · Não sei, e outras) |
| `D` | Interesses | Texto livre ou «Não sei» |

### Editar itens e estratégias

O conteúdo vem dos documentos de trabalho da checklist (itens v2.12 e as sete matrizes das estratégias).

- Em `dados.js`, `itens` tem cada item com a pergunta, as opções, os critérios («Ajuda para escolher») e os seguimentos (`seg`). Cada seguimento tem uma chave (`k`), a pergunta (`p`), as opções (`o`) e a condição em que aparece (`se`).
- Em `dados.js`, `linhas` tem as estratégias, com o identificador (`id`), o item, o texto, a finalidade, o indicador (`comoSaber`), o responsável possível e quem consultar. Uma ação partilhada por vários itens tem o mesmo `id` em todos e aparece uma só vez.
- Em `estrategias.js`, cada par `'id|item'` tem a condição `quando`, e pode ter `confirmacao` (a pergunta «Confirma que…?»), `primeiro`, `depois`, `verMais`, `opcional` e `planoDepende`.

```js
'cantina-ambiente|13': {
  quando: R => R.sit('13', 'Cantina') && (R.tem('13', 'quem', 'O aluno') || R.ef('13', 'dificulta', 'interrompe'))
}
```

Se mudar os números ou a ordem dos itens, convém mudar também a versão (`versao`), porque a partilha usa os números dos itens.

## Ligar a partilha sem identificação

A partilha envia cada relatório autorizado para uma linha de uma folha de Google Sheets. Demora cerca de 10 minutos e deve ser feita com a conta institucional da CAIDI.

1. Criar uma folha de cálculo nova e partilhá-la só com quem vai analisar os dados.
2. Na folha, abrir **Extensões → Apps Script**, apagar o conteúdo de `Código.gs`, colar o conteúdo de `partilha-google-sheets.gs` e guardar.
3. Carregar em **Implementar → Nova implementação**, escolher **Aplicação Web**, com «Executar como» a conta da CAIDI e «Quem tem acesso» **Qualquer pessoa**. Autorizar quando o Google pedir.
4. Copiar o URL da aplicação Web, que termina em `/exec`.
5. Em `app.js`, pôr esse URL na primeira linha de código: `const ENDPOINT_PARTILHA = 'https://script.google.com/macros/s/.../exec';`.
6. Fazer um envio de teste com um aluno fictício e confirmar que aparece uma linha na folha.

«Qualquer pessoa» quer dizer que qualquer pessoa pode enviar uma linha para a folha. Não quer dizer que pode ler a folha, que continua reservada a quem tem acesso a ela.

Na folha, cada linha é um relatório. As colunas `item_1a` a `item_38` têm a resposta de cada item, e as áreas fechadas ficam em branco. As colunas `item_…_seg` têm as respostas aos seguimentos de listas fechadas (os textos livres nunca são enviados). A coluna `estrategias_marcadas` tem o estado de cada estratégia marcada (`pratica`, `nao` ou `impossivel`), com o grau de ajuda ou os motivos. As colunas `condicoes_escola` e `confirmacoes` têm as respostas às condições da escola e às confirmações. Se o mesmo relatório for enviado duas vezes, aparece com o mesmo `id`, e na análise fica-se com a linha mais recente.

## Publicação

A aplicação é um site estático (HTML, CSS e JavaScript, sem dependências) e pode ser publicada gratuitamente no **GitHub Pages**:

1. No repositório, ir a **Settings → Pages**.
2. Em «Source», escolher **Deploy from a branch**, ramo `main`, pasta `/ (root)`.
3. O endereço fica `https://<utilizador-ou-organização>.github.io/checklist-pea/`.

Se o repositório mudar de dono, o endereço muda também. Convém atualizar as ligações partilhadas com as escolas.

Para testar localmente, basta abrir o `index.html` no navegador.

## Créditos e licença

Criado por **Joana Miguel e Joana Carvalho**
NIDCAIDI — Núcleo de Investigação e Desenvolvimento
CAIDI — Centro de Apoio e Intervenção no Desenvolvimento Infantil

© CAIDI 2025 — Todos os direitos reservados
Uso exclusivo: Agrupamento de Escolas Padre Vítor Melícias
