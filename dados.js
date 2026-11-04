// Conteúdo da checklist CAIDI (versão 2.1): áreas, itens, estratégias e fontes.
// Ver no README como editar.
const CONTEUDO = {
  "versao": "v2.1",
  "areas": [
    {
      "nome": "COMUNICAÇÃO",
      "itens": [
        "i1",
        "i2",
        "i3",
        "i4",
        "i5",
        "i6"
      ],
      "escola": [
        {
          "t": "A comunicação dos professores e técnicos com o aluno é clara e sem ambiguidades"
        },
        {
          "t": "As regras da turma e da escola são explicadas ao aluno de forma explícita"
        }
      ]
    },
    {
      "nome": "INTERAÇÃO SOCIAL",
      "itens": [
        "i7",
        "i8",
        "i9",
        "i10",
        "i11",
        "i12"
      ],
      "escola": [
        {
          "t": "Os colegas que convivem com o aluno conhecem as suas características e necessidades, com o acordo do aluno e da família"
        },
        {
          "t": "Existe um sistema de colegas de apoio"
        },
        {
          "t": "Os grupos de trabalho e os pares são escolhidos com cuidado"
        },
        {
          "t": "O aluno é preparado para os momentos sociais pouco estruturados, como os intervalos"
        }
      ]
    },
    {
      "nome": "PROCESSAMENTO SENSORIAL",
      "itens": [
        "i13",
        "i14",
        "i15",
        "i16",
        "i17",
        "i18",
        "i19"
      ],
      "escola": [
        {
          "t": "Há na escola espaços de trabalho com menos ruído e distração"
        },
        {
          "t": "O aluno tem um sítio para onde se pode retirar quando precisa"
        }
      ]
    },
    {
      "nome": "EMOÇÕES E REGULAÇÃO",
      "itens": [
        "i20",
        "i21",
        "i22",
        "i23",
        "i24"
      ],
      "escola": [
        {
          "t": "Existe um plano individual para prevenir e responder a crises, combinado com a família e conhecido pela equipa",
          "nota": "O plano deve prever a contenção física e o isolamento só como último recurso, segundo as regras da escola."
        },
        {
          "t": "As situações difíceis para o aluno (ex.: reação ao contacto físico) são conhecidas também fora da sala de aula"
        },
        {
          "t": "A equipa pode discutir com especialistas as situações difíceis e definir estratégias"
        }
      ]
    },
    {
      "nome": "ROTINAS, MUDANÇAS E INTERESSES",
      "itens": [
        "i25",
        "i26",
        "i27"
      ],
      "escola": [
        {
          "t": "Os horários e as rotinas do dia estão visualizados (ex.: horário visual, temporizador)"
        },
        {
          "t": "As mudanças de rotina ou de planos são comunicadas o mais cedo possível"
        },
        {
          "t": "As transições (mudança de turma, de ciclo ou de escola) são preparadas com a participação do aluno"
        }
      ]
    },
    {
      "nome": "APRENDIZAGEM E ORGANIZAÇÃO",
      "itens": [
        "i28",
        "i29",
        "i30",
        "i31",
        "i32",
        "i33"
      ],
      "escola": [
        {
          "t": "O aluno pode mostrar o que aprendeu de forma ajustada (ex.: por escrito em vez de oralmente)"
        },
        {
          "t": "As áreas de interesse do aluno são usadas no ensino"
        },
        {
          "t": "Há apoios de organização para as tarefas (listas de passos, planos de atividade)"
        }
      ]
    },
    {
      "nome": "AUTONOMIA PESSOAL",
      "itens": [
        "i34",
        "i35",
        "i36",
        "i37",
        "i38"
      ],
      "escola": [
        {
          "t": "Pequenos ajustes na rotina (lugar na cantina, horário de saída) fazem-se sem burocracia"
        }
      ]
    }
  ],
  "itens": {
    "i1": {
      "id": "i1",
      "n": 1,
      "area": "COMUNICAÇÃO",
      "tipo": "N",
      "texto": "Compreende instruções e explicações orais (ex.: frases longas, várias instruções seguidas)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Usar sempre o nome do aluno antes de dar instruções para garantir atenção"
          },
          {
            "t": "Dar instruções em frases curtas e simples, uma de cada vez"
          },
          {
            "t": "Acompanhar instruções orais com apoio visual (imagens, texto escrito, demonstração)",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Pedir que repita instruções com palavras próprias para verificar compreensão"
          },
          {
            "t": "Dar tempo extra para processar informação verbal - contar mentalmente até 10 antes de repetir"
          },
          {
            "t": "Reduzir informação auditiva concorrente (ruído de fundo) quando dá instruções"
          },
          {
            "t": "Verificar compreensão de vocabulário novo - não assumir que o aluno compreende, mesmo que lhe pareçam simples"
          },
          {
            "t": "Permitir que o aluno leia instruções escritas em vez de apenas ouvir"
          },
          {
            "t": "Criar listas de verificação visuais para tarefas multi-passo",
            "pbe": [
              "Apoios visuais"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Usar o nome do aluno antes de dar instruções"
          },
          {
            "t": "Verificar compreensão pedindo para repetir instruções"
          },
          {
            "t": "Simplificar linguagem quando necessário"
          }
        ]
      }
    },
    "i2": {
      "id": "i2",
      "n": 2,
      "area": "COMUNICAÇÃO",
      "tipo": "N",
      "texto": "Compreende linguagem não literal (ex.: ironia, expressões idiomáticas, duplos sentidos)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Usar linguagem concreta e literal"
          },
          {
            "t": "Evitar linguagem figurada, sarcasmo, duplos sentidos sem explicação explícita"
          },
          {
            "t": "Ensinar explicitamente expressões comuns, com exemplos e apoio visual (ex.: um dicionário de expressões da turma)",
            "pbe": [
              "Apoios visuais"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Explicar o sentido de expressões idiomáticas e ironias quando aparecem na aula"
          },
          {
            "t": "Confirmar com o aluno como interpretou uma frase ambígua"
          }
        ]
      }
    },
    "i3": {
      "id": "i3",
      "n": 3,
      "area": "COMUNICAÇÃO",
      "tipo": "N",
      "texto": "Inicia conversas com colegas ou adultos",
      "estrategias": {
        "nivel1": [
          {
            "t": "Ensinar formas de iniciar uma conversa (cumprimentar, fazer uma pergunta, comentar) com um guião escrito ou visual",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Construir um guião escrito ou visual para conversações comuns"
          },
          {
            "t": "Criar oportunidades para comunicação sem pressão social (comunicação escrita, gravações)"
          },
          {
            "t": "Implementar SAAC (Sistemas Aumentativos e Alternativos de Comunicação) conforme necessário",
            "pbe": [
              "Comunicação aumentativa e alternativa"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Criar momentos previsíveis para conversar, por exemplo sobre um tema de interesse do aluno",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Fomentar trabalho de pares baseado em interesses comuns"
          }
        ]
      },
      "fontes": [
        "irlanda2022"
      ]
    },
    "i4": {
      "id": "i4",
      "n": 4,
      "area": "COMUNICAÇÃO",
      "tipo": "N",
      "texto": "Mantém uma conversa de ida e volta (responde, dá a vez, mantém o tema)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Nunca insistir em contacto visual - pode ser fisicamente desconfortável e impedir processamento"
          },
          {
            "t": "Validar explicitamente: \"Podes ouvir sem olhar para mim. Está tudo bem\""
          },
          {
            "t": "Permitir tempo de processamento ampliado - não pressionar resposta imediata"
          },
          {
            "t": "Fazer perguntas fechadas além de abertas para facilitar resposta"
          },
          {
            "t": "Usar apoio visual para estruturar conversações",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Aceitar respostas em formato preferido (falar, escrever, apontar, gesticular)"
          },
          {
            "t": "Compreender que comunicação não-verbal atípica não significa falta de interesse ou compreensão"
          }
        ],
        "nivel2": [
          {
            "t": "Não exigir contacto visual para demonstrar atenção"
          },
          {
            "t": "Aceitar que o aluno pode ouvir e compreender sem olhar"
          },
          {
            "t": "Usar formas alternativas de verificar compreensão"
          }
        ]
      },
      "fontes": [
        "trevisan2017",
        "irlanda2022"
      ]
    },
    "i5": {
      "id": "i5",
      "n": 5,
      "area": "COMUNICAÇÃO",
      "tipo": "N",
      "texto": "Pede ajuda quando tem dificuldades",
      "estrategias": {
        "nivel1": [
          {
            "t": "Implementar sistema visual discreto para pedir ajuda (cartão, sinal de mão combinado)"
          },
          {
            "t": "Criar \"leques de comunicação\" ou quadros com necessidades comuns (preciso ajuda, não compreendi, pausa)"
          },
          {
            "t": "Fazer 'check-ins' frequentes e discretos sem colocar o aluno em exposição"
          },
          {
            "t": "Validar dificuldades: \"Esta tarefa é complexa. Vamos ver juntos\""
          },
          {
            "t": "Ensinar explicitamente como pedir ajuda e praticar em situações de baixo risco"
          },
          {
            "t": "Criar ambiente onde pedir ajuda é normalizado e valorizado (não sinal de fraqueza)"
          },
          {
            "t": "Permitir comunicar as dificuldades por escrito, se for mais confortável"
          },
          {
            "t": "Ter uma pessoa de referência clara que o aluno sabe que pode ajudar sempre"
          },
          {
            "t": "Reduzir vergonha associada a dificuldades - todos precisam de apoio"
          }
        ],
        "nivel2": [
          {
            "t": "Fazer verificações regulares sobre compreensão da tarefa"
          },
          {
            "t": "Normalizar o ato de pedir ajuda, para todo o grupo"
          },
          {
            "t": "Usar apoios visuais para facilitar pedidos de ajuda",
            "pbe": [
              "Apoios visuais"
            ]
          }
        ]
      }
    },
    "i6": {
      "id": "i6",
      "n": 6,
      "area": "COMUNICAÇÃO",
      "tipo": "N",
      "texto": "Comunica necessidades básicas, desconforto ou dor (por palavras, gestos, imagens ou outro sistema de comunicação)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Articular com a família e os técnicos o uso do sistema de comunicação do aluno (ex.: SAAC) em todos os espaços da escola",
            "pbe": [
              "Comunicação aumentativa e alternativa"
            ]
          },
          {
            "t": "Ensinar de forma explícita a pedir pausa, ajuda e a recusar, com apoio visual",
            "pbe": [
              "Treino de comunicação funcional",
              "Apoios visuais"
            ]
          },
          {
            "t": "Garantir que os adultos do recreio, da cantina e dos transportes conhecem a forma de comunicação do aluno"
          },
          {
            "t": "Ter sempre à mão apoios visuais de comunicação («preciso de ajuda», «dói-me», «quero parar»)",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Interpretar mudanças súbitas de comportamento como possível sinal de desconforto ou dor, e verificar"
          }
        ],
        "nivel2": [
          {
            "t": "Combinar com o aluno uma forma simples de sinalizar necessidades (cartão, gesto, palavra-chave)"
          },
          {
            "t": "Perguntar de forma direta e fechada em momentos previsíveis («Precisas de ir à casa de banho?», «Dói-te alguma coisa?»)"
          },
          {
            "t": "Aceitar todas as formas de comunicação, incluindo apontar, escrever ou usar imagens"
          }
        ]
      },
      "fontes": [
        "ontario",
        "hume2021"
      ]
    },
    "i7": {
      "id": "i7",
      "n": 7,
      "area": "INTERAÇÃO SOCIAL",
      "tipo": "N",
      "texto": "Toma a iniciativa de interagir com colegas (ex.: aproxima-se, junta-se a um jogo)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Ensino explícito de competências sociais com modelo direto (demonstrar exatamente como fazer)",
            "pbe": [
              "Treino de competências sociais"
            ]
          },
          {
            "t": "Usar vídeo-modelagem com situações sociais semelhantes",
            "pbe": [
              "Modelação por vídeo"
            ]
          },
          {
            "t": "Criar sistema de pares com colega preparado para apoiar interações",
            "pbe": [
              "Intervenção mediada por pares"
            ]
          },
          {
            "t": "Não forçar situações sociais desconfortáveis - respeitar limites e validar sentimentos"
          }
        ],
        "nivel2": [
          {
            "t": "Estruturar interações sociais em pequenos passos explícitos (ex: primeiro cumprimentar, depois perguntar nome, depois fazer convite)",
            "pbe": [
              "Análise de tarefas"
            ]
          },
          {
            "t": "Criar oportunidades estruturadas de interação com pares empáticos",
            "pbe": [
              "Intervenção mediada por pares"
            ]
          },
          {
            "t": "Reforçar positivamente tentativas de interação social"
          }
        ]
      }
    },
    "i8": {
      "id": "i8",
      "n": 8,
      "area": "INTERAÇÃO SOCIAL",
      "tipo": "N",
      "texto": "Participa em atividades com colegas seguindo as regras (ex.: espera a vez, partilha materiais)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Criar histórias sociais personalizadas para situações específicas que causam dificuldade",
            "pbe": [
              "Narrativas sociais"
            ]
          },
          {
            "t": "Planificação e antecipação detalhada de novas situações (usar agenda visual, fotografias do local, explicar quem estará presente)",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Encorajar ativamente a fazer perguntas sobre situações sociais"
          },
          {
            "t": "Ensinar as regras de jogos e atividades de grupo com apoio visual (ex.: um indicador de quem é a vez)",
            "pbe": [
              "Apoios visuais"
            ],
            "fontes": [
              "irlanda2022"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Usar guiões sociais visuais com sequências de interação",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Praticar role-play de situações habituais (juntar-se a um jogo, pedir ajuda, conversa informal)",
            "pbe": [
              "Treino de competências sociais"
            ]
          }
        ]
      },
      "fontes": [
        "irlanda2022"
      ]
    },
    "i9": {
      "id": "i9",
      "n": 9,
      "area": "INTERAÇÃO SOCIAL",
      "tipo": "P",
      "texto": "Tem na escola colegas com quem convive regularmente",
      "estrategias": {
        "asvezes": [
          {
            "t": "Criar atividades atrativas e estruturadas que gerem experiências positivas partilhadas"
          },
          {
            "t": "Fomentar trabalho de pares baseado em interesses comuns"
          },
          {
            "t": "Promover a criação de pequenos grupos de pares (mais empáticos, se necessário) com rotação de elementos"
          },
          {
            "t": "Valorizar e celebrar momentos de conexão social"
          }
        ],
        "nao": [
          {
            "t": "Implementar \"círculo de amigos\" estruturado com sessões regulares",
            "pbe": [
              "Intervenção mediada por pares"
            ]
          },
          {
            "t": "Criar livro de experiências partilhadas com fotografias e legendas descritivas"
          },
          {
            "t": "Organizar atividades sensoriais partilhadas (ler contos sensoriais no chão, experiências científicas, arte colaborativa)"
          },
          {
            "t": "Ensinar explicitamente conceitos de amizade (o que é, como se inicia, como se mantém)"
          },
          {
            "t": "Promover atividades baseadas em interesses especiais do aluno para criar pontos de conexão natural"
          },
          {
            "t": "Preparar atividades curtas e simples, por serem frequentemente mais eficazes que atividades longas"
          },
          {
            "t": "Rever regularmente experiências partilhadas positivas através de fotografias/vídeos"
          },
          {
            "t": "Criar oportunidades para que o aluno possa demonstrar as suas competências especiais aos pares"
          },
          {
            "t": "Criar clubes ou atividades no intervalo à volta de interesses partilhados",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Sensibilizar a turma para as diferenças e para a forma de incluir colegas, com o acordo do aluno e da família",
            "fontes": [
              "irlanda2022"
            ]
          }
        ]
      },
      "fontes": [
        "milton2012",
        "irlanda2022"
      ]
    },
    "i10": {
      "id": "i10",
      "n": 10,
      "area": "INTERAÇÃO SOCIAL",
      "tipo": "N",
      "texto": "Compreende situações sociais e regras implícitas (ex.: o que se espera num trabalho de grupo ou no recreio)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Criar histórias sociais personalizadas para situações específicas que causam dificuldade",
            "pbe": [
              "Narrativas sociais"
            ]
          },
          {
            "t": "Atribuir ao aluno um papel claro nos trabalhos de grupo (ex.: tomar notas, controlar o tempo)",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Rever depois com o aluno, com desenhos ou banda desenhada, as situações sociais que o confundiram",
            "pbe": [
              "Narrativas sociais"
            ],
            "fontes": [
              "irlanda2022"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Explicar de forma explícita o que se espera em cada situação (trabalho de grupo, recreio, cantina)",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Usar guiões sociais visuais com sequências de interação",
            "pbe": [
              "Apoios visuais"
            ]
          }
        ]
      },
      "fontes": [
        "irlanda2022"
      ]
    },
    "i11": {
      "id": "i11",
      "n": 11,
      "area": "INTERAÇÃO SOCIAL",
      "tipo": "C",
      "texto": "Mostra desconforto em espaços com muitas pessoas",
      "estrategias": {
        "grau1": [
          {
            "t": "Facilitar o acesso ao espaço 'seguro' para autorregulação quando necessário"
          }
        ],
        "grau2": [
          {
            "t": "Garantir acesso imediato e livre ao espaço 'seguro' sem necessidade de pedir autorização"
          },
          {
            "t": "Criar sinal discreto (cartão, gesto) que o aluno pode usar para comunicar necessidade de sair"
          },
          {
            "t": "Ensinar estratégias de autorregulação para usar em ambientes cheios"
          },
          {
            "t": "Reduzir densidade de pessoas sempre que possível (grupos mais pequenos, espaçamento)"
          },
          {
            "t": "Validar explicitamente desconforto: \"Compreendo que isto é difícil para ti\""
          },
          {
            "t": "Preparação prévia para eventos com multidões (festas escolares, visitas de estudo)"
          },
          {
            "t": "Permitir estar na periferia de grupos grandes em vez de no centro"
          }
        ]
      }
    },
    "i12": {
      "id": "i12",
      "n": 12,
      "area": "INTERAÇÃO SOCIAL",
      "tipo": "B",
      "texto": "É alvo de exclusão, troça ou intimidação por parte de colegas",
      "estrategias": {
        "sim": [
          {
            "t": "Ativar de imediato os procedimentos da escola para situações de bullying e informar a família"
          },
          {
            "t": "Garantir a supervisão de adultos nos espaços e momentos identificados como de risco"
          },
          {
            "t": "Definir com o aluno uma pessoa de referência a quem pode recorrer sempre"
          },
          {
            "t": "Criar uma rede de colegas de apoio, escolhidos com cuidado e preparados para esse papel",
            "pbe": [
              "Intervenção mediada por pares"
            ],
            "fontes": [
              "eckert2013"
            ]
          },
          {
            "t": "Registar as ocorrências para acompanhamento pela equipa e pela família"
          },
          {
            "t": "Observar com atenção os intervalos, a cantina e os corredores, onde a intimidação é menos visível"
          },
          {
            "t": "Perguntar ao aluno, em privado e de forma direta, como correm os intervalos e com quem está"
          },
          {
            "t": "Trabalhar com a turma o respeito pelas diferenças, sem expor o aluno"
          },
          {
            "t": "Disponibilizar um canal anónimo para os alunos sinalizarem situações que os preocupam (ex.: caixa de preocupações)",
            "fontes": [
              "irlanda2022"
            ]
          }
        ]
      },
      "fontes": [
        "maiano2016",
        "irlanda2022"
      ],
      "sempreVisivel": true
    },
    "i13": {
      "id": "i13",
      "n": 13,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Mostra desconforto com ruído (ex.: tapa os ouvidos, foge, fica agitado)",
      "estrategias": {
        "grau1": [
          {
            "t": "Permitir uso de auriculares de cancelamento de ruído durante atividades ruidosas",
            "nota": "Segundo a orientação irlandesa, os auriculares de proteção devem fazer parte de um plano de dessensibilização orientado por um terapeuta ocupacional, limitado a atividades e períodos concretos (Department of Education, 2022, p. 120)."
          },
          {
            "t": "Avisar previamente sobre atividades que serão ruidosas"
          },
          {
            "t": "Permitir sentar longe de fontes de ruído (porta, janela com ruído exterior)"
          }
        ],
        "grau2": [
          {
            "t": "Garantir a disponibilidade de auriculares de cancelamento de ruído de alta qualidade sempre que necessários",
            "nota": "Segundo a orientação irlandesa, os auriculares de proteção devem fazer parte de um plano de dessensibilização orientado por um terapeuta ocupacional, limitado a atividades e períodos concretos (Department of Education, 2022, p. 120)."
          },
          {
            "t": "Criar espaço 'seguro' insonorizado ou com ruído reduzido para autorregulação"
          },
          {
            "t": "Personalizar espaço individual de trabalho considerando a acústica"
          },
          {
            "t": "Reduzir ruído de fundo sempre que possível (fechar porta, baixar voz, reduzir eco)"
          },
          {
            "t": "Permitir sair antes do toque da campainha"
          },
          {
            "t": "Usar sinais visuais em vez de auditivos sempre que possível"
          },
          {
            "t": "Ensinar técnicas de autorregulação sensorial (respiração, objetos calmantes)"
          },
          {
            "t": "Permitir usar espaço individual durante trabalhos que exijam concentração"
          },
          {
            "t": "Considerar pausas sensoriais regulares em ambientes mais calmos"
          }
        ]
      }
    },
    "i14": {
      "id": "i14",
      "n": 14,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Mostra desconforto com luzes intensas, brilhantes ou intermitentes",
      "estrategias": {
        "grau1": [
          {
            "t": "Prestar atenção especial ao local onde se senta (evitar janelas com sol direto, luzes fluorescentes)"
          },
          {
            "t": "Atenuar luzes sempre que possível"
          },
          {
            "t": "Evitar uso excessivo de decorações brilhantes perto do espaço de trabalho"
          }
        ],
        "grau2": [
          {
            "t": "Realizar avaliação do perfil sensorial completo para identificar sensibilidades específicas"
          },
          {
            "t": "Posicionar o aluno longe de janelas com luz solar direta e luzes fluorescentes intermitentes"
          },
          {
            "t": "Usar iluminação natural ou lâmpadas de luz contínua em vez de fluorescentes"
          },
          {
            "t": "Permitir uso de boné/viseira se ajudar a reduzir sensibilidade luminosa"
          },
          {
            "t": "Reduzir estímulos visuais no ambiente de trabalho (quadros limpos, organização visual)"
          },
          {
            "t": "Evitar apresentações com luzes intermitentes ou animações rápidas"
          },
          {
            "t": "Utilizar versões das ferramentas de trabalho e de ensino em papel com fundo mate em vez de projeções"
          },
          {
            "t": "Considerar uso de filtros/películas nas janelas se luz natural for problemática"
          }
        ]
      }
    },
    "i15": {
      "id": "i15",
      "n": 15,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Mostra desconforto com o toque ou o contacto físico",
      "estrategias": {
        "grau1": [
          {
            "t": "Avisar antes de qualquer contacto físico necessário (ex: \"vou tocar no teu ombro\")"
          },
          {
            "t": "Respeitar preferências de distância pessoal"
          }
        ],
        "grau2": [
          {
            "t": "Nunca forçar contacto físico (abraços, apertos de mão) - ensinar alternativas aceitáveis (acenar, 'high-five' opcional)"
          },
          {
            "t": "Pedir o acordo do aluno antes de ajudar com contacto (ex.: apertar o casaco)",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Reduzir o contacto nas filas e no chão (ex.: lugar no fim da fila, marcas no chão)",
            "fontes": [
              "irlanda2022"
            ]
          }
        ]
      }
    },
    "i16": {
      "id": "i16",
      "n": 16,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Mexe-se com frequência ou precisa de se levantar quando está muito tempo sentado",
      "estrategias": {
        "grau1": [
          {
            "t": "Permitir levantar-se e mover-se durante aulas sem pedir autorização"
          },
          {
            "t": "Providenciar objetos 'fidget' adequados (bolas anti-stress, plasticina, bandas elásticas na cadeira)",
            "nota": "Ajuste à preferência do aluno. Fora da Integração Sensorial de Ayres, as intervenções sensoriais não cumprem os critérios de prática com evidência do NCAEP (Hume et al., 2021)."
          },
          {
            "t": "Integrar movimento nas atividades de aprendizagem",
            "pbe": [
              "Exercício e movimento"
            ]
          }
        ],
        "grau2": [
          {
            "t": "Implementar pausas de movimento regulares e estruturadas (cada 15-20 minutos)",
            "pbe": [
              "Exercício e movimento"
            ]
          },
          {
            "t": "Permitir trabalhar em pé ou em posições alternativas (almofada no chão, banco alto)"
          },
          {
            "t": "Providenciar variedade de objetos sensoriais/'fidget' acessíveis (spinner, cubo sensorial, esticador)",
            "nota": "Ajuste à preferência do aluno. Fora da Integração Sensorial de Ayres, as intervenções sensoriais não cumprem os critérios de prática com evidência do NCAEP (Hume et al., 2021)."
          },
          {
            "t": "Usar cadeira com bola de exercício ou almofada de ar para permitir movimento enquanto sentado",
            "nota": "Ajuste à preferência do aluno. Fora da Integração Sensorial de Ayres, as intervenções sensoriais não cumprem os critérios de prática com evidência do NCAEP (Hume et al., 2021)."
          },
          {
            "t": "Criar \"percurso motor\" que o aluno pode fazer quando necessário (levar recado, buscar material)"
          },
          {
            "t": "Integrar movimento em aprendizagens (responder com gestos, trabalho em estações)",
            "pbe": [
              "Exercício e movimento"
            ]
          },
          {
            "t": "Permitir a utilização de banda elástica resistente em volta das pernas da cadeira para pés, se recomendado pela equipa clínica",
            "nota": "Ajuste à preferência do aluno. Fora da Integração Sensorial de Ayres, as intervenções sensoriais não cumprem os critérios de prática com evidência do NCAEP (Hume et al., 2021)."
          },
          {
            "t": "Ensinar técnicas de autorregulação propriocetiva (pressão, esticamentos discretos)"
          },
          {
            "t": "Nunca punir movimento - é uma necessidade sensorial, não um comportamento inadequado"
          }
        ]
      }
    },
    "i17": {
      "id": "i17",
      "n": 17,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Faz movimentos ou sons repetitivos (ex.: balancear o corpo, abanar as mãos, repetir palavras)",
      "estrategias": {
        "grau1": [
          {
            "t": "Dedicar momentos específicos para estereotipias na rotina (ex: pausas programadas)"
          },
          {
            "t": "Compreender que são mecanismos de autorregulação, não comportamentos a eliminar"
          },
          {
            "t": "Observar padrões: quando aumentam? (stress, cansaço, excitação?)"
          }
        ],
        "grau2": [
          {
            "t": "Estabelecer claramente onde, quando e durante quanto tempo as estereotipias são aceitáveis"
          },
          {
            "t": "Se interromper aprendizagem de outros, redirecionar suavemente com alternativa sensorial equivalente"
          },
          {
            "t": "Disponibilizar objetos sensoriais que satisfaçam mesma necessidade de forma mais discreta"
          },
          {
            "t": "Explicar ao grupo, com o acordo do aluno, que estes movimentos o ajudam a concentrar-se e a regular-se",
            "fontes": [
              "kapp2019"
            ]
          },
          {
            "t": "Nunca punir ou forçar supressão - pode causar ansiedade extrema e sobrecarga"
          },
          {
            "t": "Usar estratégias preventivas: reduzir fatores de stress, pausas sensoriais regulares"
          },
          {
            "t": "Se interrupção necessária, usar sinal combinado previamente (visual ou tátil suave), não verbal"
          },
          {
            "t": "Criar \"zona de movimento livre\" onde as estereotipias são sempre permitidas"
          },
          {
            "t": "Compreender que aumento deste sinal pode indicar sobrecarga - investigar e ajustar ambiente"
          }
        ]
      },
      "fontes": [
        "kapp2019",
        "irlanda2022"
      ]
    },
    "i18": {
      "id": "i18",
      "n": 18,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Parece pouco sensível à dor, ao frio ou ao calor",
      "estrategias": {
        "grau1": [
          {
            "t": "Verificar ativamente se o aluno se magoou ou tem frio ou calor, mesmo que não se queixe"
          },
          {
            "t": "Descrever ao aluno o que o corpo está a mostrar (ex.: «Tens as mãos frias, precisas do casaco»)",
            "fontes": [
              "irlanda2022"
            ]
          }
        ],
        "grau2": [
          {
            "t": "Ensinar o aluno a reconhecer e a comunicar sinais do corpo (dor, fome, cansaço) com apoio visual",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Usar um apoio visual para o aluno indicar dor e a parte do corpo",
            "pbe": [
              "Apoios visuais"
            ],
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Combinar com a família e a equipa clínica (ex.: terapia ocupacional) um plano sensorial individual",
            "fontes": [
              "hume2021"
            ]
          }
        ]
      },
      "fontes": [
        "dsm5tr",
        "irlanda2022"
      ]
    },
    "i19": {
      "id": "i19",
      "n": 19,
      "area": "PROCESSAMENTO SENSORIAL",
      "tipo": "C",
      "texto": "Procura estímulos de forma intensa (ex.: toca, cheira ou leva objetos à boca)",
      "estrategias": {
        "grau1": [
          {
            "t": "Oferecer alternativas seguras para a procura sensorial (objetos para mastigar, texturas)"
          },
          {
            "t": "Incluir na rotina tarefas com movimento intenso (carregar materiais, arrumar cadeiras)",
            "pbe": [
              "Exercício e movimento"
            ]
          }
        ],
        "grau2": [
          {
            "t": "Combinar com a família e a equipa clínica (ex.: terapia ocupacional) um plano sensorial individual",
            "fontes": [
              "hume2021"
            ]
          },
          {
            "t": "Supervisionar com mais atenção os momentos em que a procura sensorial pode pôr o aluno em risco"
          },
          {
            "t": "Registar as situações para perceber o que o aluno procura e em que momentos"
          }
        ]
      },
      "fontes": [
        "dsm5tr",
        "irlanda2022"
      ]
    },
    "i20": {
      "id": "i20",
      "n": 20,
      "area": "EMOÇÕES E REGULAÇÃO",
      "tipo": "N",
      "texto": "Interpreta expressões faciais e emoções dos outros",
      "estrategias": {
        "nivel1": [
          {
            "t": "Ensino explícito e sistemático de reconhecimento de emoções com fotos/desenhos reais"
          },
          {
            "t": "Criar póster/livro personalizado de emoções com fotografias do próprio aluno"
          },
          {
            "t": "Praticar reconhecimento de emoções em contextos reais (\"Como achas que a Maria se está a sentir?\")"
          },
          {
            "t": "Ensinar linguagem corporal e expressões faciais de forma explícita e estruturada"
          },
          {
            "t": "Importante: validar que todos expressam emoções de forma diferente"
          },
          {
            "t": "Reconhecer que o aluno sente empatia, mesmo que possa não expressar da forma esperada ou convencional"
          },
          {
            "t": "Ensinar formas concretas de demonstrar empatia aceitáveis para o aluno"
          },
          {
            "t": "Usar histórias sociais sobre situações emocionais específicas",
            "pbe": [
              "Narrativas sociais"
            ]
          },
          {
            "t": "Evitar pressão para \"mostrar\" emoções de forma performativa"
          },
          {
            "t": "Criar ambiente seguro onde expressões atípicas de empatia são validadas"
          }
        ],
        "nivel2": [
          {
            "t": "Ser claro, consistente e explícito na comunicação verbal e não-verbal"
          },
          {
            "t": "Usar apoio visual com emoções básicas acessível na sala",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Nomear explicitamente emoções próprias e de outros: \"Estou feliz porque...\", \"O João parece triste...\""
          },
          {
            "t": "Ensinar que expressão de empatia pode ser diferente mas o sentimento é genuíno"
          }
        ]
      },
      "fontes": [
        "milton2012",
        "irlanda2022"
      ]
    },
    "i21": {
      "id": "i21",
      "n": 21,
      "area": "EMOÇÕES E REGULAÇÃO",
      "tipo": "N",
      "texto": "Mostra ou diz o que sente (por palavras, imagens ou uma escala)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Ensinar explicitamente vocabulário emocional alargado (não só \"feliz/triste\")"
          },
          {
            "t": "Usar escalas visuais de intensidade emocional (termómetro, escala 1-5)",
            "pbe": [
              "Apoios visuais",
              "Estratégias cognitivo-comportamentais"
            ]
          },
          {
            "t": "Implementar \"zonas de autorregulação\" com todo o grupo",
            "pbe": [
              "Estratégias cognitivo-comportamentais"
            ]
          },
          {
            "t": "Criar múltiplas formas de expressão: verbal, escrita, desenho, escolha de cartão"
          },
          {
            "t": "'Check-ins' emocionais regulares e estruturados (manhã, após recreio, fim do dia)"
          },
          {
            "t": "Ensinar a pedir ajuda quando confuso ou zangado - tornar este processo seguro e fácil"
          },
          {
            "t": "Criar diário emocional se o aluno preferir expressão escrita"
          },
          {
            "t": "Ensinar ligação entre sensações corporais e emoções"
          }
        ],
        "nivel2": [
          {
            "t": "Conversar regularmente individualmente e encorajar expressão"
          },
          {
            "t": "Proporcionar oportunidades de grupo para falar sobre emoções e sentimentos"
          },
          {
            "t": "Validar todas as formas de expressão emocional, desde que não prejudiciais para o próprio ou os outros"
          }
        ]
      }
    },
    "i22": {
      "id": "i22",
      "n": 22,
      "area": "EMOÇÕES E REGULAÇÃO",
      "tipo": "W",
      "texto": "A família ou outros adultos relatam mal-estar que não se vê na escola (ex.: cansaço ou crises em casa)",
      "estrategias": {
        "sim": [
          {
            "t": "Validar 'masking': \"Às vezes escondes como te sentes. Aqui é seguro mostrares\""
          },
          {
            "t": "Reconhecer sinais não-verbais de sobrecarga mesmo quando aluno diz estar \"bem\""
          },
          {
            "t": "Combinar com a família um registo simples (ex.: caderno casa-escola) para partilhar como correu o dia",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Evitar pedir ao aluno que esconda comportamentos que o ajudam a regular-se",
            "fontes": [
              "raymaker2020",
              "cook2021"
            ]
          }
        ]
      },
      "fontes": [
        "cook2021",
        "irlanda2022"
      ]
    },
    "i23": {
      "id": "i23",
      "n": 23,
      "area": "EMOÇÕES E REGULAÇÃO",
      "tipo": "C",
      "texto": "Tem episódios de frustração ou de sobrecarga intensa (crises)",
      "estrategias": {
        "grau1": [
          {
            "t": "Perante uma mudança súbita no comportamento, considerar primeiro causas físicas (dor, sono, dentes, ouvidos, intestinos) e falar com a família",
            "fontes": [
              "buie2010"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Perante uma mudança súbita no comportamento, considerar primeiro causas físicas (dor, sono, dentes, ouvidos, intestinos) e falar com a família",
            "fontes": [
              "buie2010"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Oferecer pausas regulares antes de atingir ponto de sobrecarga",
            "fase": "prevencao"
          },
          {
            "t": "Ensinar estratégias de autorregulação quando o aluno está calmo",
            "fase": "prevencao"
          },
          {
            "t": "Reconhecer sinais precoces de frustração",
            "fase": "sinais"
          },
          {
            "t": "Apoio visual para comunicar necessidade de pausa antes de atingir limite",
            "pbe": [
              "Apoios visuais"
            ],
            "fase": "sinais"
          },
          {
            "t": "Validar: \"Este trabalho é mesmo difícil. Vamos fazer pausa e voltar depois\"",
            "fase": "sinais"
          },
          {
            "t": "Reduzir as exigências e falar pouco, em frases curtas",
            "fontes": [
              "irlanda2022"
            ],
            "fase": "sinais"
          }
        ],
        "grau2": [
          {
            "t": "Perante uma mudança súbita no comportamento, considerar primeiro causas físicas (dor, sono, dentes, ouvidos, intestinos) e falar com a família",
            "fontes": [
              "buie2010"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Perante uma mudança súbita no comportamento, considerar primeiro causas físicas (dor, sono, dentes, ouvidos, intestinos) e falar com a família",
            "fontes": [
              "buie2010"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Oferecer pausas regulares antes de atingir ponto de sobrecarga",
            "fase": "prevencao"
          },
          {
            "t": "Implementar pausas regulares antes de sinais de frustração (preventivo, não reativo)",
            "fase": "prevencao"
          },
          {
            "t": "Ensinar estratégias de autorregulação quando o aluno está calmo",
            "fase": "prevencao"
          },
          {
            "t": "Ensinar \"caixa de ferramentas de autorregulação\" personalizada quando aluno está regulado",
            "pbe": [
              "Estratégias cognitivo-comportamentais"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Criar espaço 'seguro' com elementos sensoriais calmantes (luz suave, objetos texturados, música calma)",
            "fase": "prevencao"
          },
          {
            "t": "Identificar padrões: hora do dia, tipos de tarefa, contextos que desencadeiam sobrecargas",
            "fase": "prevencao"
          },
          {
            "t": "Reduzir antecipadamente exigências em momentos identificados como difíceis",
            "fase": "prevencao"
          },
          {
            "t": "Registar o que acontece antes e depois de cada episódio, para perceber o que a crise comunica, e pedir a um técnico uma avaliação funcional do comportamento",
            "pbe": [
              "Avaliação funcional do comportamento"
            ],
            "fontes": [
              "hume2021"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Ensinar, num momento calmo, uma forma de pedir pausa ou ajuda que substitua a crise (ver a área Comunicação)",
            "pbe": [
              "Treino de comunicação funcional"
            ],
            "fontes": [
              "hume2021"
            ],
            "fase": "prevencao"
          },
          {
            "t": "Compreender que alunos com PEA fazem esforço cognitivo enorme - a sensação de exaustão é real",
            "fase": "prevencao"
          },
          {
            "t": "Reconhecer sinais precoces de frustração",
            "fase": "sinais"
          },
          {
            "t": "Apoio visual para comunicar necessidade de pausa antes de atingir limite",
            "pbe": [
              "Apoios visuais"
            ],
            "fase": "sinais"
          },
          {
            "t": "Validar: \"Este trabalho é mesmo difícil. Vamos fazer pausa e voltar depois\"",
            "fase": "sinais"
          },
          {
            "t": "Reduzir as exigências e falar pouco, em frases curtas",
            "fontes": [
              "irlanda2022"
            ],
            "fase": "sinais"
          },
          {
            "t": "Durante episódio: dar espaço, reduzir exigências, não forçar contacto visual ou conversação",
            "fase": "pico"
          },
          {
            "t": "Garantir a segurança de todos (afastar os colegas e os objetos perigosos), sem conter o aluno",
            "fontes": [
              "irlanda2022"
            ],
            "fase": "pico"
          },
          {
            "t": "O adulto manter-se calmo, falar pouco e evitar gestos que possam ser sentidos como ameaça",
            "fontes": [
              "irlanda2022"
            ],
            "fase": "pico"
          },
          {
            "t": "Ensinar ao grupo que o colega precisa de espaço quando frustrado - não é rejeição pessoal",
            "fase": "pico"
          },
          {
            "t": "Permitir tempo amplo para recuperação - não exigir desculpas ou explicações imediatas",
            "fase": "recuperacao"
          },
          {
            "t": "Voltar à rotina com uma tarefa preferida e pouco exigente, quando o aluno estiver pronto",
            "fontes": [
              "irlanda2022"
            ],
            "fase": "recuperacao"
          },
          {
            "t": "Não falar logo sobre o que aconteceu, e combinar mais tarde, com a equipa, como prevenir",
            "fontes": [
              "irlanda2022"
            ],
            "fase": "recuperacao"
          },
          {
            "t": "Nunca consequenciar comportamento resultante de sobrecarga sensorial/emocional",
            "fase": "recuperacao"
          }
        ]
      },
      "fontes": [
        "irlanda2022"
      ],
      "porFases": true,
      "antesDeInterpretar": true
    },
    "i24": {
      "id": "i24",
      "n": 24,
      "area": "EMOÇÕES E REGULAÇÃO",
      "tipo": "W",
      "texto": "Houve mudanças no bem-estar ao longo do tempo (mais cansaço, menos tolerância, perda de competências que já tinha)",
      "estrategias": {
        "sim": [
          {
            "t": "Procurar com a família as causas possíveis (dor ou doença, sono, problemas com colegas, sobrecarga, mudanças em casa) antes de tirar conclusões",
            "fontes": [
              "irlanda2022"
            ]
          },
          {
            "t": "Rever a carga de exigências do dia e introduzir pausas de recuperação"
          },
          {
            "t": "Observar se o cansaço aumenta em períodos com mais mudanças ou avaliações"
          },
          {
            "t": "Reduzir temporariamente as exigências (trabalhos de casa, apresentações orais, atividades sociais obrigatórias)"
          },
          {
            "t": "Levar a situação à equipa multidisciplinar (EMAEI) e articular com os técnicos de saúde"
          },
          {
            "t": "Planear com o aluno e a família um regresso gradual às exigências habituais"
          }
        ]
      },
      "antesDeInterpretar": true
    },
    "i25": {
      "id": "i25",
      "n": 25,
      "area": "ROTINAS, MUDANÇAS E INTERESSES",
      "tipo": "C",
      "texto": "Fica desregulado em momentos pouco estruturados (ex.: intervalos, esperas)",
      "estrategias": {
        "grau1": [
          {
            "t": "Estruturar transições entre aulas com rotinas previsíveis"
          },
          {
            "t": "Proporcionar atividades estruturadas para tempos livres"
          },
          {
            "t": "Usar apoio visual para sequência de atividades",
            "pbe": [
              "Apoios visuais"
            ]
          }
        ],
        "grau2": [
          {
            "t": "Criar rotinas visuais explícitas para todos os momentos de transição",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Estruturar cuidadosamente intervalos e recreios (atividades opcionais organizadas)"
          },
          {
            "t": "Usar temporizador visual para mudanças (\"faltam 5 minutos para arrumar\")",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Comunicar mudanças com calendário visual detalhado com antecedência adequada",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Providenciar \"trabalho\" durante permanência na sala (responsabilidades: apagar quadro, organizar biblioteca, regar plantas)"
          },
          {
            "t": "Criar guião visual para tempo não estruturado (\"O que posso fazer no intervalo\")",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Ensinar competências de gestão de tempo livre de forma explícita"
          },
          {
            "t": "Permitir aceder a interesse especial durante tempos não estruturados"
          },
          {
            "t": "Ter sempre \"plano B\" visual preparado para mudanças de última hora"
          },
          {
            "t": "Reduzir ansiedade através de previsibilidade máxima"
          }
        ]
      }
    },
    "i26": {
      "id": "i26",
      "n": 26,
      "area": "ROTINAS, MUDANÇAS E INTERESSES",
      "tipo": "C",
      "texto": "Fica desregulado perante mudanças, imprevistos ou surpresas sem aviso prévio",
      "estrategias": {
        "grau1": [
          {
            "t": "Antecipar e comunicar mudanças na rotina com máxima antecedência possível"
          },
          {
            "t": "Usar calendário visual para mudanças planeadas",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Dar oportunidade de fazer perguntas sobre mudanças"
          }
        ],
        "grau2": [
          {
            "t": "Usar calendário visual detalhado com dias e horas para comunicar mudanças",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Antecipar mudanças com a máxima antecedência (dias, não minutos)"
          },
          {
            "t": "Para mudanças inesperadas: explicar clara e calmamente o que mudou e porquê"
          },
          {
            "t": "Preparar \"histórias sociais\" para mudanças previsíveis (visitas de estudo, professores substitutos, alterações de horário)",
            "pbe": [
              "Narrativas sociais"
            ]
          },
          {
            "t": "Preparar atividades alternativas atrativas para tempos de espera imprevistos"
          },
          {
            "t": "Ter rotinas alternativas preparadas (\"plano B\", \"plano C\") e ensiná-las previamente"
          },
          {
            "t": "Fotografias de locais novos, pessoas novas, situações novas sempre que possível"
          },
          {
            "t": "Criar \"kit de mudança\" com objetos calmantes e atividade preferida"
          },
          {
            "t": "Validar ansiedade: \"Sei que mudanças são difíceis. Vamos ver o que vai acontecer juntos\""
          },
          {
            "t": "Permitir mais pausas/acesso a espaço seguro em dias com mudanças"
          },
          {
            "t": "Evitar múltiplas mudanças no mesmo dia sempre que possível"
          }
        ]
      }
    },
    "i27": {
      "id": "i27",
      "n": 27,
      "area": "ROTINAS, MUDANÇAS E INTERESSES",
      "tipo": "D",
      "texto": "Tem interesses intensos ou muito focados",
      "estrategias": {
        "motivar": [
          {
            "t": "Ligar conceitos abstratos a interesses do aluno"
          },
          {
            "t": "Usar os interesses nos exemplos, nos problemas e nos trabalhos",
            "fontes": [
              "gunn2016"
            ]
          },
          {
            "t": "Promover atividades baseadas em interesses especiais do aluno para criar pontos de conexão natural"
          }
        ],
        "mudar": [
          {
            "t": "Avisar antes de terminar a atividade do interesse e usar um temporizador visual",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Combinar um momento do dia para o interesse e mostrá-lo no horário visual"
          },
          {
            "t": "Permitir aceder a interesse especial durante tempos não estruturados"
          }
        ],
        "conversa": [
          {
            "t": "Combinar momentos para falar do tema"
          },
          {
            "t": "Usar o tema como ponte para conversar com colegas que partilham o interesse",
            "fontes": [
              "irlanda2022"
            ]
          }
        ]
      },
      "fontes": [
        "gunn2016",
        "bottema2021",
        "irlanda2022",
        "bishop2023"
      ],
      "ajuda": "O que lhe prende a atenção? Quando mostra entusiasmo ou satisfação? Pede com frequência certas atividades ou faz muitas perguntas sobre um tema? (Prizant, citado em Department of Education, 2022, p. 33)"
    },
    "i28": {
      "id": "i28",
      "n": 28,
      "area": "APRENDIZAGEM E ORGANIZAÇÃO",
      "tipo": "N",
      "texto": "Compreende conceitos abstratos",
      "estrategias": {
        "nivel1": [
          {
            "t": "Tornar conceitos abstratos concretos através de manipulativos físicos e materiais visuais"
          },
          {
            "t": "Ligar a experiências e interesses específicos do aluno"
          },
          {
            "t": "Usar organizadores gráficos e mapas concetuais"
          },
          {
            "t": "Decompor conceitos complexos em componentes menores e sequenciais",
            "pbe": [
              "Análise de tarefas"
            ]
          },
          {
            "t": "Ensinar vocabulário abstrato explicitamente com definições concretas"
          },
          {
            "t": "Usar metáforas e analogias baseadas em tópicos familiares/interesse especial"
          },
          {
            "t": "Disponibilizar modelos visuais de raciocínio abstrato"
          },
          {
            "t": "Permitir demonstrar o que compreende e aprende de formas alternativas (visual, prática) não apenas verbal",
            "aval": "diversificação dos instrumentos de recolha de informação"
          },
          {
            "t": "Estabelecer objetivos individualizados baseados em interesses genuínos do aluno"
          },
          {
            "t": "Usar reforço ligado às áreas de interesse do aluno e escolhido com ele, em vez de sistemas de recompensa iguais para todos",
            "pbe": [
              "Reforço"
            ],
            "fontes": [
              "hume2021",
              "gunn2016"
            ],
            "nota": "A orientação irlandesa recomenda pelo menos quatro reforços positivos por cada correção, e que o que o aluno ganhou não se perca por mau comportamento (Department of Education, 2022, Tabela 5)."
          },
          {
            "t": "Focar em motivação intrínseca e aprendizagem significativa"
          },
          {
            "t": "Nunca punir confusão - é oportunidade de ensino"
          }
        ],
        "nivel2": [
          {
            "t": "Usar exemplos concretos e visuais sempre que possível"
          },
          {
            "t": "Ligar conceitos abstratos a interesses do aluno"
          },
          {
            "t": "Verificar compreensão frequentemente"
          }
        ]
      }
    },
    "i29": {
      "id": "i29",
      "n": 29,
      "area": "APRENDIZAGEM E ORGANIZAÇÃO",
      "tipo": "C",
      "texto": "Evita ou abandona tarefas quando encontra dificuldades",
      "estrategias": {
        "grau1": [
          {
            "t": "Fazer verificações regulares sobre compreensão da tarefa"
          },
          {
            "t": "Dividir a tarefa em passos mais pequenos e reconhecer cada passo concluído",
            "fontes": [
              "irlanda2022"
            ]
          }
        ],
        "grau2": [
          {
            "t": "Oferecer ajuda proativamente antes de evitamento/desistência"
          },
          {
            "t": "Identificar sinais não-verbais de dificuldade (desistir rapidamente, olhar perdido)"
          },
          {
            "t": "Providenciar modelos de trabalho, exemplos visuais, guias passo-a-passo"
          },
          {
            "t": "Validar dificuldades: \"Esta tarefa é complexa. Vamos ver juntos\""
          }
        ]
      }
    },
    "i30": {
      "id": "i30",
      "n": 30,
      "area": "APRENDIZAGEM E ORGANIZAÇÃO",
      "tipo": "N",
      "texto": "Inicia e conclui tarefas",
      "estrategias": {
        "nivel1": [
          {
            "t": "Usar listas de verificação que o aluno vai marcando à medida que avança (autogestão)",
            "pbe": [
              "Autogestão"
            ]
          },
          {
            "t": "Dar uma instrução de cada vez e confirmar que o aluno começou a tarefa"
          },
          {
            "t": "Fazer com o aluno o primeiro passo da tarefa"
          }
        ],
        "nivel2": [
          {
            "t": "Dar a tarefa dividida em passos, por escrito ou com imagens",
            "pbe": [
              "Análise de tarefas"
            ]
          },
          {
            "t": "Mostrar um exemplo do produto final"
          }
        ]
      },
      "fontes": [
        "demetriou2018",
        "hume2021"
      ]
    },
    "i31": {
      "id": "i31",
      "n": 31,
      "area": "APRENDIZAGEM E ORGANIZAÇÃO",
      "tipo": "N",
      "texto": "Organiza o material (ex.: traz o que precisa, sabe onde estão as coisas)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Organizar o material com códigos de cor e um lugar fixo para cada coisa"
          },
          {
            "t": "Ter um lugar fixo e assinalado para o material do aluno"
          },
          {
            "t": "Usar uma lista visual do material necessário para cada dia ou disciplina",
            "fontes": [
              "irlanda2022"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Rever com o aluno, no fim do dia, o que precisa de levar no dia seguinte"
          }
        ]
      },
      "fontes": [
        "demetriou2018",
        "irlanda2022"
      ]
    },
    "i32": {
      "id": "i32",
      "n": 32,
      "area": "APRENDIZAGEM E ORGANIZAÇÃO",
      "tipo": "N",
      "texto": "Gere o tempo (ex.: sabe quanto falta, cumpre prazos)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Combinar com a família uma agenda visual partilhada para trabalhos de casa e prazos",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Dividir trabalhos longos em etapas com datas, num calendário visual",
            "fontes": [
              "irlanda2022"
            ]
          }
        ],
        "nivel2": [
          {
            "t": "Usar um temporizador visual para mostrar o tempo disponível",
            "pbe": [
              "Apoios visuais"
            ]
          }
        ]
      },
      "fontes": [
        "demetriou2018",
        "irlanda2022"
      ]
    },
    "i33": {
      "id": "i33",
      "n": 33,
      "area": "APRENDIZAGEM E ORGANIZAÇÃO",
      "tipo": "N",
      "texto": "Realiza tarefas de motricidade fina (ex.: escrever à mão, recortar)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Disponibilizar teclado/tablet para maior parte da escrita",
            "aval": "utilização de produtos de apoio"
          },
          {
            "t": "Usar software de conversão de voz para texto quando apropriado",
            "aval": "utilização de produtos de apoio"
          },
          {
            "t": "Reduzir quantidade de escrita manual necessária (foco na qualidade, não quantidade)"
          },
          {
            "t": "Aceitar respostas orais gravadas, apresentações visuais, vídeos em vez de texto escrito",
            "aval": "diversificação dos instrumentos de recolha de informação"
          },
          {
            "t": "Disponibilizar folhas com espaços aumentados, linhas guia"
          },
          {
            "t": "Permitir instrumentos de escrita alternativos (lápis triangulares, grips)"
          },
          {
            "t": "Dar tempo extra para tarefas escritas",
            "aval": "tempo suplementar"
          },
          {
            "t": "Não avaliar caligrafia quando avaliar conteúdo"
          },
          {
            "t": "Usar materiais manipuláveis para matemática em vez de apenas escrita"
          },
          {
            "t": "Disponibilizar notas/apontamentos para copiar em vez de exigir sempre que copie do quadro"
          },
          {
            "t": "Considerar avaliação através de resposta oral ou demonstração prática",
            "aval": "diversificação dos instrumentos de recolha de informação"
          },
          {
            "t": "Quebrar tarefas de motricidade fina em passos menores com pausas",
            "pbe": [
              "Análise de tarefas"
            ]
          },
          {
            "t": "Nunca penalizar dificuldades motoras - adaptar a tarefa, não baixar expectativas cognitivas"
          }
        ],
        "nivel2": [
          {
            "t": "Permitir uso de computador para escrita",
            "aval": "utilização de produtos de apoio"
          },
          {
            "t": "Dar tempo extra para tarefas que exigem motricidade fina",
            "aval": "tempo suplementar"
          },
          {
            "t": "Aceitar formatos alternativos de resposta",
            "aval": "diversificação dos instrumentos de recolha de informação"
          }
        ]
      }
    },
    "i34": {
      "id": "i34",
      "n": 34,
      "area": "AUTONOMIA PESSOAL",
      "tipo": "N",
      "texto": "Trata da higiene e usa a casa de banho",
      "estrategias": {
        "nivel1": [
          {
            "t": "Ensinar a rotina passo a passo, retirando a ajuda de forma gradual"
          },
          {
            "t": "Combinar com a família as mesmas palavras e passos usados em casa"
          },
          {
            "t": "Definir quem acompanha o aluno quando é preciso e como se preserva a sua privacidade"
          },
          {
            "t": "Permitir usar uma casa de banho mais calma, se o ruído dos secadores ou do grupo o perturbar"
          }
        ],
        "nivel2": [
          {
            "t": "Lembrar o aluno em momentos previsíveis (antes do intervalo, depois do almoço)"
          },
          {
            "t": "Afixar na casa de banho uma sequência visual dos passos",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Garantir que o aluno sabe onde fica a casa de banho e pode ir sem pedir em voz alta"
          }
        ]
      },
      "fontes": [
        "ontario",
        "irlanda2022"
      ],
      "nivelEnsino": "inicial"
    },
    "i35": {
      "id": "i35",
      "n": 35,
      "area": "AUTONOMIA PESSOAL",
      "tipo": "N",
      "texto": "Come de forma autónoma (ex.: abre embalagens, usa os talheres)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Ensinar passo a passo a abrir embalagens e a usar os talheres, com sequência visual",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Informar os funcionários da cantina sobre as necessidades do aluno"
          }
        ],
        "nivel2": [
          {
            "t": "Dar mais tempo para comer"
          },
          {
            "t": "Permitir que o aluno se sente num lugar fixo e mais calmo da cantina"
          }
        ]
      },
      "fontes": [
        "ontario"
      ],
      "nivelEnsino": "inicial"
    },
    "i36": {
      "id": "i36",
      "n": 36,
      "area": "AUTONOMIA PESSOAL",
      "tipo": "C",
      "texto": "Come uma variedade muito limitada de alimentos",
      "estrategias": {
        "grau1": [
          {
            "t": "Não forçar o aluno a provar alimentos novos"
          },
          {
            "t": "Avisar com antecedência o que vai ser servido"
          }
        ],
        "grau2": [
          {
            "t": "Combinar com a família as alternativas aceitáveis quando o aluno não come o que é servido"
          },
          {
            "t": "Permitir comer num espaço mais calmo ou num horário com menos gente"
          },
          {
            "t": "Se a restrição for muito grande, falar com a família para articular com o médico ou o nutricionista",
            "fontes": [
              "irlanda2022"
            ]
          }
        ]
      },
      "fontes": [
        "irlanda2022"
      ],
      "nivelEnsino": "inicial"
    },
    "i37": {
      "id": "i37",
      "n": 37,
      "area": "AUTONOMIA PESSOAL",
      "tipo": "N",
      "texto": "Veste-se e despe-se (ex.: casaco, calçado)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Usar uma sequência visual para vestir e despir o casaco ou preparar a mochila",
            "pbe": [
              "Apoios visuais"
            ]
          },
          {
            "t": "Retirar a ajuda de forma gradual, à medida que o aluno ganha autonomia"
          }
        ],
        "nivel2": [
          {
            "t": "Dar mais tempo nas saídas e nas mudanças de sala"
          }
        ]
      },
      "fontes": [
        "ontario"
      ],
      "nivelEnsino": "inicial"
    },
    "i38": {
      "id": "i38",
      "n": 38,
      "area": "AUTONOMIA PESSOAL",
      "tipo": "N",
      "texto": "Orienta-se e desloca-se na escola (ex.: encontra a sala, muda de sala)",
      "estrategias": {
        "nivel1": [
          {
            "t": "Fazer com o aluno, antes do início das aulas, uma visita aos espaços que vai usar"
          },
          {
            "t": "Dar ao aluno um mapa ou fotografias do percurso entre salas"
          }
        ],
        "nivel2": [
          {
            "t": "Indicar um colega que acompanhe o aluno nas primeiras mudanças de sala"
          },
          {
            "t": "Dar mais tempo nas saídas e nas mudanças de sala"
          }
        ]
      },
      "fontes": [
        "ontario"
      ]
    }
  },
  "transversais": [
    {
      "t": "A família é reconhecida como especialista no seu filho e participa nas decisões"
    },
    {
      "t": "Há conversas regulares entre a escola e a família"
    },
    {
      "t": "A família tem uma pessoa de contacto na escola"
    },
    {
      "t": "Os papéis de cada adulto no apoio ao aluno estão definidos"
    },
    {
      "t": "O progresso do aluno é revisto e registado com regularidade"
    }
  ],
  "fontes": {
    "eckert2013": {
      "curta": "Eckert & Sempert, 2013",
      "ref": "Eckert, A., & Sempert, W. (2013). Checkliste zur schulischen Förderung von Kindern und Jugendlichen mit einer Autismus-Spektrum-Störung (ASS). Autismus, 2, 27–30."
    },
    "eckert2012": {
      "curta": "Eckert & Sempert, 2012",
      "ref": "Eckert, A., & Sempert, W. (2012). Kinder und Jugendliche mit Autismus-Spektrum-Störungen in der Schule: Entwicklung eines Rahmenmodells der schulischen Förderung. Vierteljahresschrift für Heilpädagogik und ihre Nachbardisziplinen, 81(3), 221–233."
    },
    "hume2021": {
      "curta": "Hume et al., 2021",
      "ref": "Hume, K., Steinbrenner, J. R., Odom, S. L., Morin, K. L., Nowell, S. W., Tomaszewski, B., Szendrey, S., McIntyre, N. S., Yücesoy-Özkan, S., & Savage, M. N. (2021). Evidence-based practices for children, youth, and young adults with autism: Third generation review. Journal of Autism and Developmental Disorders, 51(11), 4013–4032. https://doi.org/10.1007/s10803-020-04844-2"
    },
    "milton2012": {
      "curta": "Milton, 2012",
      "ref": "Milton, D. E. M. (2012). On the ontological status of autism: The 'double empathy problem'. Disability & Society, 27(6), 883–887. https://doi.org/10.1080/09687599.2012.710008"
    },
    "cook2021": {
      "curta": "Cook et al., 2021",
      "ref": "Cook, J., Hull, L., Crane, L., & Mandy, W. (2021). Camouflaging in autism: A systematic review. Clinical Psychology Review, 89, 102080. https://doi.org/10.1016/j.cpr.2021.102080"
    },
    "maiano2016": {
      "curta": "Maïano et al., 2016",
      "ref": "Maïano, C., Normand, C. L., Salvas, M.-C., Moullec, G., & Aimé, A. (2016). Prevalence of school bullying among youth with autism spectrum disorders: A systematic review and meta-analysis. Autism Research, 9(6), 601–615. https://doi.org/10.1002/aur.1568"
    },
    "demetriou2018": {
      "curta": "Demetriou et al., 2018",
      "ref": "Demetriou, E. A., Lampit, A., Quintana, D. S., Naismith, S. L., Song, Y. J. C., Pye, J. E., Hickie, I., & Guastella, A. J. (2018). Autism spectrum disorders: A meta-analysis of executive function. Molecular Psychiatry, 23(5), 1198–1204. https://doi.org/10.1038/mp.2017.75"
    },
    "kapp2019": {
      "curta": "Kapp et al., 2019",
      "ref": "Kapp, S. K., Steward, R., Crane, L., Elliott, D., Elphick, C., Pellicano, E., & Russell, G. (2019). 'People should be allowed to do what they like': Autistic adults' views and experiences of stimming. Autism, 23(7), 1782–1792. https://doi.org/10.1177/1362361319829628"
    },
    "trevisan2017": {
      "curta": "Trevisan et al., 2017",
      "ref": "Trevisan, D. A., Roberts, N., Lin, C., & Birmingham, E. (2017). How do adults and teens with self-declared autism spectrum disorder experience eye contact? A qualitative analysis of first-hand accounts. PLoS ONE, 12(11), e0188446. https://doi.org/10.1371/journal.pone.0188446"
    },
    "raymaker2020": {
      "curta": "Raymaker et al., 2020",
      "ref": "Raymaker, D. M., Teo, A. R., Steckler, N. A., Lentz, B., Scharer, M., Delos Santos, A., Kapp, S. K., Hunter, M., Joyce, A., & Nicolaidis, C. (2020). \"Having all of your internal resources exhausted beyond measure and being left with no clean-up crew\": Defining autistic burnout. Autism in Adulthood, 2(2), 132–143. https://doi.org/10.1089/aut.2019.0079"
    },
    "gunn2016": {
      "curta": "Gunn & Delafield-Butt, 2016",
      "ref": "Gunn, K. C. M., & Delafield-Butt, J. T. (2016). Teaching children with autism spectrum disorder with restricted interests: A review of evidence for best practice. Review of Educational Research, 86(2), 408–430. https://doi.org/10.3102/0034654315604027"
    },
    "bottema2021": {
      "curta": "Bottema-Beutel et al., 2021",
      "ref": "Bottema-Beutel, K., Kapp, S. K., Lester, J. N., Sasson, N. J., & Hand, B. N. (2021). Avoiding ableist language: Suggestions for autism researchers. Autism in Adulthood, 3(1), 18–29. https://doi.org/10.1089/aut.2020.0014"
    },
    "buie2010": {
      "curta": "Buie et al., 2010",
      "ref": "Buie, T., Campbell, D. B., Fuchs, G. J., 3rd, Furuta, G. T., Levy, J., Vandewater, J., et al. (2010). Evaluation, diagnosis, and treatment of gastrointestinal disorders in individuals with ASDs: A consensus report. Pediatrics, 125(Suppl. 1), S1–S18. https://doi.org/10.1542/peds.2009-1878C"
    },
    "klein2025": {
      "curta": "Klein et al., 2025",
      "ref": "Klein, [iniciais por confirmar], Witthöft, M., & Jungmann, S. M. (2025). Interoception in individuals with autism spectrum disorder: A systematic literature review and meta-analysis. Frontiers in Psychiatry. https://doi.org/10.3389/fpsyt.2025.1573263"
    },
    "dsm5tr": {
      "curta": "APA, 2022",
      "ref": "American Psychiatric Association. (2022). Diagnostic and statistical manual of mental disorders (5th ed., text rev.). https://doi.org/10.1176/appi.books.9780890425787"
    },
    "dl54": {
      "curta": "DL n.º 54/2018",
      "ref": "Decreto-Lei n.º 54/2018, de 6 de julho, que estabelece o regime jurídico da educação inclusiva, na redação dada pela Lei n.º 116/2019, de 13 de setembro."
    },
    "ontario": {
      "curta": "Checklist de prontidão escolar (Ontário)",
      "ref": "School Readiness Checklist for Autistic Children in Ontario. Texto fornecido pela autora; página e autoria por identificar. Cita Ontario Ministry of Education (2024) e Ontario Regulation 181/98."
    },
    "irlanda2022": {
      "curta": "Department of Education, 2022",
      "ref": "Department of Education (Ireland). (2022). Autism good practice guidance for schools: Supporting children and young people. Government of Ireland."
    },
    "bishop2023": {
      "curta": "Bishop & Lord, 2023",
      "ref": "Bishop, S. L., & Lord, C. (2023). Commentary: Best practices and processes for assessment of autism spectrum disorder – the intended role of standardized diagnostic instruments. Journal of Child Psychology and Psychiatry, 64(5), 834–838. https://doi.org/10.1111/jcpp.13802"
    }
  },
  "antesDeInterpretar": [
    "Tem frio ou calor?",
    "Está cansado ou dormiu mal?",
    "Tem fome ou sede?",
    "Pode ter dor (incluindo dentes, ouvidos, barriga)?",
    "Está a passar por alterações hormonais ou de crescimento?",
    "Houve mudanças em casa ou na escola?",
    "Há sobrecarga sensorial (ruído, luz, multidão)?",
    "Houve mudança de medicação?"
  ],
  "fases": [
    [
      "prevencao",
      "Prevenção"
    ],
    [
      "sinais",
      "Sinais iniciais"
    ],
    [
      "pico",
      "Escalada e pico"
    ],
    [
      "recuperacao",
      "Recuperação"
    ]
  ]
};
