# Checklist CAIDI — Observação e Apoio PEA

**Ferramenta de observação para planear o apoio a alunos autistas, com ou sem diagnóstico**

Desenvolvido por: NIDCAIDI/CAIDI
Para: Agrupamento de Escolas Padre Vítor Melícias

> ⚠️ Esta é uma ferramenta pedagógica de observação. Não serve para diagnosticar nem para sinalizar possível autismo.

---

## O que é

Uma aplicação web gratuita, que funciona no computador, no tablet e no telemóvel. Com ela, o professor pode:

- registar o contexto do aluno (horas na turma, apoios na escola e fora da escola, medidas em vigor);
- observar 38 itens em sete áreas, preenchendo só as áreas que quer observar nessa altura;
- registar observações em cada item;
- gerar um relatório com as estratégias que correspondem ao que foi assinalado;
- marcar cada estratégia como «Já está em prática» (e quanto ajuda), «Ainda não» ou «Não é possível» (e porquê);
- escolher entre três e cinco estratégias para começar;
- guardar o relatório como PDF, que abre com a síntese «O essencial para apoiar este aluno».

Não é preciso instalar nada nem criar conta.

## Privacidade

- Os dados que identificam o aluno (nome, turma, data, nome do professor, observações e outros campos de texto) são processados **apenas no dispositivo** do professor.
- Enquanto o separador do navegador estiver aberto, o preenchimento fica guardado (`sessionStorage`), para não se perder se a página for atualizada. É apagado quando o separador é fechado ou quando se clica em «Limpar Tudo».
- O diagnóstico e as terapias e consultas fora da escola são dados de saúde. Só aparecem no PDF se o professor escolher incluí-los.
- Se a partilha estiver ligada (ver abaixo), o professor pode enviar à CAIDI, sem identificação e só quando a família autorizou, os valores dos itens e as estratégias marcadas. Nunca são enviados o nome, a turma, a data exata, o nome do professor nem nenhum texto livre. Enquanto a partilha não estiver ligada, esta opção não aparece.
- A página recolhe estatísticas anónimas de visitas (Google Analytics), que não incluem nenhum dado do formulário.

## Como usar

1. Abrir a página da aplicação.
2. Preencher a identificação e, se souber, o contexto e os apoios.
3. Escolher as áreas a observar. A área «Emoções e regulação» e o item 12 (exclusão, troça ou intimidação) estão sempre visíveis.
4. Responder aos itens. Nas competências, escolher o apoio de que o aluno precisa, incluindo o que já recebe.
5. Clicar em **Gerar Relatório** e marcar as estratégias.
6. Rever a síntese no início do relatório e escolher as estratégias para começar.
7. Clicar em **Guardar como PDF** e escolher «Guardar como PDF» na janela de impressão.

## Estrutura do projeto

| Ficheiro | Conteúdo |
|---|---|
| `index.html` | Estrutura da página |
| `dados.js` | **Conteúdo da checklist**: áreas, itens, estratégias e fontes |
| `app.js` | Funcionamento da aplicação (checklist, áreas, relatório, síntese, partilha, PDF) |
| `style.css` | Aspeto visual, versão para telemóvel e versão para impressão |
| `partilha-google-sheets.gs` | Script do Google Sheets que recebe a partilha sem identificação |
| `logo-caidi.png` | Logótipo |

### Tipos de item

| Tipo | Para que serve | Respostas |
|---|---|---|
| `N` | Competência e apoio | 1 Apoio regular ou intenso · 2 Apoio pontual · 3 Sem apoio, na escola · 4 Sem apoio, também noutros contextos · Não foi possível observar |
| `P` | Participação | Sim · Às vezes · Não · Não sei |
| `C` | Característica a acomodar | 0 Não se observa · 1 Pouco impacto · 2 Impacto claro · Não foi possível observar |
| `B` | Situação do contexto | Sim · Não · Não sei |
| `W` | Bem-estar | Sim · Não · Não sei |
| `D` | Descritivo (interesses) | Sim · Não · Não foi possível observar |

O relatório não calcula um nível global. Mostra um perfil por área, que descreve onde o aluno precisa de apoio.

### Editar itens e estratégias

Todo o conteúdo está em `dados.js`, no objeto `CONTEUDO`.

- `areas` tem as áreas, pela ordem em que aparecem, com a lista dos itens de cada uma (`itens`) e as estratégias para a escola (`escola`), que entram quando a área tem itens assinalados.
- `itens` tem cada item, com o número (`n`), a área, o tipo (`tipo`), o texto e as estratégias.
- `transversais` tem as estratégias de escola e família, que aparecem sempre.
- `fontes` tem as referências citadas nos itens e nas estratégias.

As estratégias de cada item estão agrupadas pela resposta que as faz aparecer.

| Tipo | Grupos de estratégias |
|---|---|
| `N` | `nivel1` (apoio regular), `nivel2` (apoio pontual) |
| `P` | `asvezes`, `nao` |
| `C` | `grau1` (pouco impacto), `grau2` (impacto claro) |
| `B`, `W` | `sim` |
| `D` | `motivar`, `mudar`, `conversa` |

Cada estratégia tem o texto (`t`) e pode ter:

- `pbe`, com as práticas com evidência da revisão do NCAEP (Hume et al., 2021);
- `aval`, com a adaptação ao processo de avaliação (art. 28.º do Decreto-Lei n.º 54/2018);
- `nota`, que aparece por baixo da estratégia;
- `fase`, nas crises (item 23), com `prevencao`, `sinais`, `pico` ou `recuperacao`;
- `fontes`, com as chaves de `fontes`.

```js
{
  "t": "Acompanhar instruções orais com apoio visual (imagens, texto escrito, demonstração)",
  "pbe": ["Apoios visuais"]
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

Na folha, cada linha é um relatório. As colunas `item_1` a `item_38` têm o valor de cada item, e as áreas fechadas ficam em branco. Quando uma competência tem o valor 3, a coluna `item_N_contextos` diz se precisa de apoio noutros contextos (`nao`), se não foi possível observar (`naosei`) ou se ficou sem resposta (`sem_resposta`). A coluna `estrategias_marcadas` tem o estado de cada estratégia marcada (`pratica`, `nao` ou `impossivel`), com o grau de ajuda ou os motivos. Se o mesmo relatório for enviado duas vezes, aparece com o mesmo `id`, e na análise fica-se com a linha mais recente.

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
