// Dados completos da checklist CAIDI
const dadosChecklist = {
    "INTERAÇÃO SOCIAL": [
        {
            sinal: "Dificuldades com as competências sociais",
            estrategias_grau1: `• Estruturar interações sociais em pequenos passos explícitos (ex: primeiro cumprimentar, depois perguntar nome, depois fazer convite)
• Usar guiões sociais visuais com sequências de interação
• Praticar role-play de situações habituais (juntar-se a um jogo, pedir ajuda, conversa informal)
• Criar oportunidades estruturadas de interação com pares empáticos
• Reforçar positivamente tentativas de interação social`,
            estrategias_grau2: `• Ensino explícito de competências sociais com modelagem direta (demonstrar exatamente como fazer)
• Criar "stories" sociais personalizadas para situações específicas que causam dificuldade
• Nunca forçar situações sociais desconfortáveis - respeitar limites e validar sentimentos
• Planificação e antecipação detalhada de novas situações (usar agenda visual, fotografias do local, explicar quem estará presente)
• Encorajar activamente a fazer perguntas sobre situações sociais
• Usar vídeo-modelagem com situações sociais semelhantes
• Providenciar "guião" escrito ou visual para conversações comuns
• Criar sistema de "buddy" com colega preparado para apoiar interações`
        },
        {
            sinal: "Dificuldades para socializar e desenvolver vínculos de amizade",
            estrategias_grau1: `• Criar atividades atrativas e estruturadas que gerem experiências positivas partilhadas
• Fomentar trabalho de pares baseado em interesses comuns
• Facilitar pequenos grupos com rotação de elementos
• Valorizar e celebrar momentos de conexão social`,
            estrategias_grau2: `• Implementar "círculo de amigos" estruturado com sessões regulares
• Criar livro de experiências partilhadas com fotografias e legendas descritivas
• Organizar atividades sensoriais partilhadas (ler contos sensoriais no chão, experiências científicas, arte colaborativa)
• Ensinar explicitamente conceitos de amizade (o que é, como se inicia, como se mantém)
• Facilitar atividades baseadas em interesses especiais do aluno para criar pontos de conexão natural
• Atividades curtas e simples são frequentemente mais eficazes que atividades longas
• Rever regularmente experiências partilhadas positivas através de fotografias/vídeos
• Criar oportunidades para que o aluno possa demonstrar as suas competências especiais aos pares`
        },
        {
            sinal: "Insegurança perante espaços cheios de pessoas ou contacto físico",
            estrategias_grau1: `• Providenciar acesso facilitado ao espaço 'seguro' para autorregulação quando necessário
• Respeitar preferências de distância pessoal
• Avisar antes de qualquer contacto físico necessário (ex: "vou tocar no teu ombro")`,
            estrategias_grau2: `• Garantir acesso imediato e livre ao espaço 'seguro' sem necessidade de pedir autorização
• Criar sinal discreto (cartão, gesto) que o aluno pode usar para comunicar necessidade de sair
• Ensinar estratégias de autorregulação para usar em ambientes cheios
• Reduzir densidade de pessoas sempre que possível (grupos mais pequenos, espaçamento)
• Validar explicitamente desconforto: "Compreendo que isto é difícil para ti"
• Nunca forçar contacto físico (abraços, apertos de mão) - ensinar alternativas aceitáveis (acenar, high-five opcional)
• Preparação prévia para eventos com multidões (festas escolares, visitas de estudo)
• Permitir estar na periferia de grupos grandes em vez de no centro`
        }
    ],
    "PROCESSAMENTO SENSORIAL": [
        {
            sinal: "Quando há muito ruído, tapa os ouvidos",
            estrategias_grau1: `• Permitir uso de auriculares de cancelamento de ruído durante atividades ruidosas
• Avisar previamente sobre atividades que serão ruidosas
• Permitir sentar longe de fontes de ruído (porta, janela com ruído exterior)`,
            estrategias_grau2: `• Providenciar auriculares de cancelamento de ruído de alta qualidade sempre disponíveis
• Criar espaço 'seguro' insonorizado ou com ruído reduzido para autorregulação
• Personalizar espaço individual de trabalho considerando acústica
• Reduzir ruído de fundo sempre que possível (fechar porta, baixar voz, reduzir eco)
• Permitir sair antes do toque da campainha
• Usar sinais visuais em vez de auditivos sempre que possível
• Ensinar técnicas de autorregulação sensorial (respiração, objetos calmantes)
• Permitir usar espaço individual durante trabalhos que exijam concentração
• Considerar pausas sensoriais regulares em ambientes mais calmos`
        },
        {
            sinal: "Inquietação perante estímulos luminosos, brilhantes e intermitentes",
            estrategias_grau1: `• Prestar atenção especial ao local onde se senta (evitar janelas com sol direto, luzes fluorescentes)
• Atenuar luzes sempre que possível
• Evitar uso excessivo de decorações brilhantes perto do espaço de trabalho`,
            estrategias_grau2: `• Realizar avaliação do perfil sensorial completo para identificar sensibilidades específicas
• Posicionar o aluno longe de janelas com luz solar direta e luzes fluorescentes intermitentes
• Usar iluminação natural ou lâmpadas de luz contínua em vez de fluorescentes
• Permitir uso de boné/viseira se ajudar a reduzir sensibilidade luminosa
• Reduzir estímulos visuais no ambiente de trabalho (quadros limpos, organização visual)
• Evitar apresentações com luzes intermitentes ou animações rápidas
• Providenciar versões em papel com fundo mate em vez de projeções
• Considerar uso de filtros/películas nas janelas se luz natural for problemática`
        },
        {
            sinal: "Ao estar muito tempo sentado move-se excessivamente ou mostra inquietação",
            estrategias_grau1: `• Permitir levantar-se e mover-se durante aulas sem pedir autorização
• Providenciar objetos fidget adequados (bolas anti-stress, plasticina, bandas elásticas na cadeira)
• Integrar movimento nas atividades de aprendizagem`,
            estrategias_grau2: `• Implementar pausas de movimento regulares e estruturadas (cada 15-20 minutos)
• Permitir trabalhar em pé ou em posições alternativas (almofada no chão, banco alto)
• Providenciar variedade de objetos sensoriais/fidget acessíveis (spinner, cubo sensorial, esticador)
• Usar cadeira com bola de exercício ou almofada de ar para permitir movimento enquanto sentado
• Criar "percurso motor" que o aluno pode fazer quando necessário (levar recado, buscar material)
• Integrar movimento em aprendizagens (responder com gestos, trabalho em estações)
• Providenciar banda elástica resistente em volta das pernas da cadeira para pés
• Ensinar técnicas de autorregulação propriocetiva (pressão, esticamentos discretos)
• Nunca punir movimento - é uma necessidade sensorial, não comportamento inadequado`
        },
        {
            sinal: "Estereotipias ou movimentos repetitivos (balanceio, repetição de palavras)",
            estrategias_grau1: `• Dedicar momentos específicos para estereotipias na rotina (ex: pausas programadas)
• Compreender que são mecanismos de autorregulação, não comportamentos a eliminar
• Observar padrões: quando aumentam? (stress, cansaço, excitação?)`,
            estrategias_grau2: `• Estabelecer claramente onde, quando e durante quanto tempo as estereotipias são aceitáveis
• Se interromper aprendizagem de outros, redirecionar suavemente com alternativa sensorial equivalente
• Providenciar objetos sensoriais que satisfaçam mesma necessidade de forma mais discreta
• Ensinar ao grupo que são movimentos que ajudam o colega a concentrar-se - normalizar
• Nunca punir ou forçar supressão - pode causar ansiedade extrema e sobrecarga
• Usar estratégias preventivas: reduzir fatores de stress, pausas sensoriais regulares
• Se interrupção necessária, usar sinal combinado previamente (visual ou tátil suave), não verbal
• Criar "zona de movimento livre" onde estereotipias são sempre permitidas
• Compreender que aumento pode indicar sobrecarga - investigar e ajustar ambiente`
        }
    ],
    "EMOÇÕES E EMPATIA": [
        {
            sinal: "Dificuldade para compreender emoções, reconhecer expressões faciais e mostrar empatia",
            estrategias_grau1: `• Ser claro, consistente e explícito na comunicação verbal e não-verbal
• Usar apoio visual com emoções básicas acessível na sala
• Nomear explicitamente emoções próprias e de outros: "Estou feliz porque...", "O João parece triste..."
• Ensinar que expressão de empatia pode ser diferente mas sentimento é genuíno`,
            estrategias_grau2: `• Ensino explícito e sistemático de reconhecimento de emoções com fotos/desenhos reais
• Criar póster/livro personalizado de emoções com fotografias do próprio aluno
• Praticar reconhecimento de emoções em contextos reais ("Como achas que a Maria está a sentir-se?")
• Ensinar linguagem corporal e expressões faciais de forma explícita e estruturada
• Importante: validar que todos expressam emoções de forma diferente
• Reconhecer que o aluno SENTE empatia profundamente, mesmo que não expresse da forma esperada
• Ensinar formas concretas de demonstrar empatia aceitáveis para o aluno
• Usar histórias sociais sobre situações emocionais específicas
• Evitar pressão para "mostrar" emoções de forma performativa
• Criar ambiente seguro onde expressões atípicas de empatia são validadas`
        },
        {
            sinal: "Dificuldades para expressar emoções e sentimentos, sendo capaz de ocultá-los",
            estrategias_grau1: `• Conversar regularmente individualmente e encorajar expressão
• Propiciar oportunidades de grupo para falar sobre emoções e sentimentos
• Validar todas as formas de expressão emocional`,
            estrategias_grau2: `• Ensinar explicitamente vocabulário emocional alargado (não só "feliz/triste")
• Usar escalas visuais de intensidade emocional (termómetro, escala 1-5)
• Implementar "zonas de autorregulação" com todo o grupo (Zones of Regulation)
• Criar múltiplas formas de expressão: verbal, escrita, desenho, escolha de cartão
• Check-ins emocionais regulares e estruturados (manhã, após recreio, fim do dia)
• Ensinar a pedir ajuda quando confuso ou zangado - tornar seguro e fácil
• Validar masking: "Às vezes escondes como te sentes. Aqui é seguro mostrares"
• Reconhecer sinais não-verbais de sobrecarga mesmo quando aluno diz estar "bem"
• Criar diário emocional se o aluno preferir expressão escrita
• Ensinar ligação entre sensações corporais e emoções`
        },
        {
            sinal: "Episódios de frustração",
            estrategias_grau1: `• Oferecer pausas regulares antes de atingir ponto de sobrecarga
• Ensinar estratégias de autorregulação quando o aluno está calmo
• Reconhecer sinais precoces de frustração`,
            estrategias_grau2: `• Compreender que alunos com PEA fazem esforço cognitivo enorme - exaustão é real
• Implementar pausas regulares ANTES de sinais de frustração (preventivo, não reativo)
• Criar espaço 'seguro' com elementos sensoriais calmantes (luz suave, objetos texturados, música calma)
• Ensinar "caixa de ferramentas de autorregulação" personalizada quando aluno está regulado
• Durante episódio: dar espaço, reduzir exigências, não forçar contacto visual ou conversação
• Permitir tempo amplo para recuperação - não exigir desculpas ou explicações imediatas
• Identificar padrões: hora do dia, tipos de tarefa, contextos que desencadeiam
• Reduzir antecipadamente exigências em momentos identificados como difíceis
• Ensinar ao grupo que o colega precisa de espaço quando frustrado - não é rejeição pessoal
• Apoio visual para comunicar necessidade de pausa antes de atingir limite
• Validar: "Este trabalho é mesmo difícil. Vamos fazer pausa e voltar depois"
• Nunca consequenciar comportamento resultante de sobrecarga sensorial/emocional`
        }
    ],
    "ROTINAS E MUDANÇAS": [
        {
            sinal: "Falta de rotina em contextos não estruturados",
            estrategias_grau1: `• Estruturar transições entre aulas com rotinas previsíveis
• Providenciar atividades estruturadas para tempos livres
• Usar apoio visual para sequência de atividades`,
            estrategias_grau2: `• Criar rotinas visuais explícitas para TODOS os momentos de transição
• Estruturar cuidadosamente intervalos e recreios (atividades opcionais organizadas)
• Usar temporizador visual para mudanças ("faltam 5 minutos para arrumar")
• Comunicar mudanças com calendário visual detalhado com antecedência adequada
• Providenciar "trabalho" durante permanência na sala (responsabilidades: apagar quadro, organizar biblioteca, regar plantas)
• Criar guião visual para tempo não estruturado ("O que posso fazer no intervalo")
• Ensinar competências de gestão de tempo livre de forma explícita
• Permitir aceder a interesse especial durante tempos não estruturados
• Ter sempre "plano B" visual preparado para mudanças de última hora
• Reduzir ansiedade através de previsibilidade máxima`
        },
        {
            sinal: "Desubica-se perante mudanças, imprevistos e surpresas na rotina sem aviso prévio",
            estrategias_grau1: `• Antecipar e comunicar mudanças na rotina com máxima antecedência possível
• Usar calendário visual para mudanças planeadas
• Dar oportunidade de fazer perguntas sobre mudanças`,
            estrategias_grau2: `• Usar calendário visual detalhado com dias e horas para comunicar mudanças
• Antecipar mudanças com MÁXIMA antecedência (dias, não minutos)
• Para mudanças inesperadas: explicar clara e calmamente o que mudou e porquê
• Preparar "histórias sociais" para mudanças previsíveis (visitas de estudo, professores substitutos, alterações de horário)
• Preparar atividades alternativas atrativas para tempos de espera imprevistos
• Ter rotinas alternativas preparadas ("plano B", "plano C") e ensiná-las previamente
• Fotografias de locais novos, pessoas novas, situações novas sempre que possível
• Criar "kit de mudança" com objetos calmantes e atividade preferida
• Validar ansiedade: "Sei que mudanças são difíceis. Vamos ver o que vai acontecer juntos"
• Permitir mais pausas/acesso a espaço seguro em dias com mudanças
• Evitar múltiplas mudanças no mesmo dia sempre que possível`
        }
    ],
    "COMUNICAÇÃO": [
        {
            sinal: "Aparenta tranquilidade, mas não mantém comunicação bidirecional e contacto visual",
            estrategias_grau1: `• Não exigir contacto visual para demonstrar atenção
• Aceitar que o aluno pode ouvir e compreender sem olhar
• Usar formas alternativas de verificar compreensão`,
            estrategias_grau2: `• NUNCA insistir em contacto visual - pode ser fisicamente desconfortável e impedir processamento
• Validar explicitamente: "Podes ouvir sem olhar para mim. Está tudo bem"
• Implementar SAAC (Sistemas Aumentativos e Alternativos de Comunicação) conforme necessário
• Permitir tempo de processamento ampliado - não pressionar resposta imediata
• Fazer perguntas fechadas além de abertas para facilitar resposta
• Usar apoio visual para estruturar conversações
• Aceitar respostas em formato preferido (falar, escrever, apontar, gesticular)
• Compreender que comunicação não-verbal atípica não significa falta de interesse ou compreensão
• Criar oportunidades para comunicação sem pressão social (comunicação escrita, gravações)`
        },
        {
            sinal: "Dificuldades na compreensão oral da linguagem",
            estrategias_grau1: `• Usar o nome do aluno antes de dar instruções
• Verificar compreensão pedindo para repetir instruções
• Simplificar linguagem quando necessário`,
            estrategias_grau2: `• SEMPRE usar o nome do aluno antes de dar instruções para garantir atenção
• Dar instruções em frases curtas e simples, uma de cada vez
• Acompanhar instruções orais com apoio visual (imagens, texto escrito, demonstração)
• Pedir que repita instruções com palavras próprias para verificar compreensão
• Dar tempo extra para processar informação verbal - contar mentalmente até 10 antes de repetir
• Evitar linguagem figurada, sarcasmo, duplos sentidos sem explicação explícita
• Usar linguagem concreta e literal
• Reduzir informação auditiva concorrente (ruído de fundo) quando dar instruções
• Verificar compreensão de vocabulário novo - não assumir
• Permitir que o aluno leia instruções escritas em vez de apenas ouvir
• Criar listas de verificação visuais para tarefas multi-passo`
        },
        {
            sinal: "Dificuldade para pedir ajuda. Evita realizar tarefas para ocultar dificuldades",
            estrategias_grau1: `• Fazer verificações regulares sobre compreensão da tarefa
• Normalizar pedir ajuda para todo o grupo
• Usar apoios visuais para facilitar pedido de ajuda`,
            estrategias_grau2: `• Implementar sistema visual discreto para pedir ajuda (cartão, sinal de mão combinado)
• Criar "leques de comunicação" ou quadros com necessidades comuns (preciso ajuda, não compreendi, pausa)
• Fazer check-ins frequentes e discretos sem colocar aluno em exposição
• Validar dificuldades: "Esta tarefa é complexa. Vamos ver juntos"
• Ensinar explicitamente COMO pedir ajuda e praticar em situações de baixo risco
• Criar ambiente onde pedir ajuda é normalizado e valorizado (não sinal de fraqueza)
• Oferecer ajuda proactivamente antes de evitamento/desistência
• Permitir comunicar dificuldade por escrito se mais confortável
• Ter pessoa de referência clara que o aluno sabe que pode ajudar sempre
• Reduzir vergonha associada a dificuldades - todos precisam de apoio
• Identificar sinais não-verbais de dificuldade (desistir rapidamente, olhar perdido)
• Providenciar modelos de trabalho, exemplos visuais, guias passo-a-passo`
        }
    ],
    "APRENDIZAGEM": [
        {
            sinal: "Dificuldades na compreensão de conceitos abstratos",
            estrategias_grau1: `• Usar exemplos concretos e visuais sempre que possível
• Ligar conceitos abstratos a interesses do aluno
• Verificar compreensão frequentemente`,
            estrategias_grau2: `• Tornar conceitos abstratos concretos através de manipulativos físicos e materiais visuais
• Ligar a experiências e interesses específicos do aluno
• Usar organizadores gráficos e mapas conceituais
• Decompor conceitos complexos em componentes menores e sequenciais
• Ensinar vocabulário abstrato explicitamente com definições concretas
• Usar metáforas e analogias baseadas em tópicos familiares/interesse especial
• Providenciar modelos visuais de raciocínio abstrato
• Permitir demonstrar compreensão de formas alternativas (visual, prática) não apenas verbal
• Estabelecer objetivos individualizados baseados em interesses genuínos do aluno
• EVITAR sistemas de recompensa genéricos - muitas vezes contraproducentes
• Focar em motivação intrínseca e aprendizagem significativa
• Nunca punir confusão - é oportunidade de ensino`
        },
        {
            sinal: "Dificuldades com a motricidade fina",
            estrategias_grau1: `• Permitir uso de computador para escrita
• Dar tempo extra para tarefas que exigem motricidade fina
• Aceitar formatos alternativos de resposta`,
            estrategias_grau2: `• Providenciar teclado/tablet para maior parte da escrita
• Usar software de conversão de voz para texto quando apropriado
• Reduzir quantidade de escrita manual necessária (foco na qualidade, não quantidade)
• Aceitar respostas orais gravadas, apresentações visuais, vídeos em vez de texto escrito
• Providenciar folhas com espaços aumentados, linhas guides
• Permitir instrumentos de escrita alternativos (lápis triangulares, grips)
• Dar tempo significativamente extra para tarefas escritas
• Não avaliar caligrafia quando avaliar conteúdo
• Usar manipulativos para matemática em vez de apenas escrita
• Providenciar notas/apontamentos para copiar em vez de copiar do quadro
• Considerar avaliação através de resposta oral ou demonstração prática
• Quebrar tarefas de motricidade fina em passos menores com pausas
• Nunca penalizar dificuldades motoras - adaptar tarefa, não baixar expectativas cognitivas`
        }
    ]
};
