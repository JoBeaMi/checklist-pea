// Estado da aplicação
let respostas = {};
let sinaisInfo = {}; // Guardar info dos sinais

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', function() {
    construirChecklist();
    configurarLogo();
    document.getElementById('data').valueAsDate = new Date();
});

// Configurar logo
function configurarLogo() {
    const logo = document.getElementById('logo');
    // Tentar carregar logo, se não existir, esconder
    logo.onerror = function() {
        this.style.display = 'none';
    };
}

// Construir checklist dinâmica
function construirChecklist() {
    const container = document.getElementById('checklist');
    let sinalId = 0;
    
    console.log('📋 Construindo checklist...');
    console.log('Total de categorias:', Object.keys(dadosChecklist).length);
    
    for (const [categoria, sinais] of Object.entries(dadosChecklist)) {
        console.log('Categoria:', categoria, '- Sinais:', sinais.length);
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'categoria';
        
        // Cabeçalho da categoria
        const header = document.createElement('div');
        header.className = 'categoria-header';
        header.textContent = categoria;
        categoriaDiv.appendChild(header);
        
        // Sinais desta categoria
        sinais.forEach((item, index) => {
            const sinalDiv = document.createElement('div');
            sinalDiv.className = 'sinal-item';
            
            // Guardar info do sinal
            sinaisInfo[sinalId] = {
                categoria: categoria,
                sinal: item.sinal,
                estrategias_grau1: item.estrategias_grau1,
                estrategias_grau2: item.estrategias_grau2
            };
            
            // Descrição do sinal
            const descricao = document.createElement('div');
            descricao.className = 'sinal-descricao';
            descricao.textContent = item.sinal;
            sinalDiv.appendChild(descricao);
            
            // Opções de resposta
            const opcoes = document.createElement('div');
            opcoes.className = 'sinal-opcoes';
            
            // Radio buttons - NOME ÚNICO para cada sinal!
            const radioName = `sinal_${sinalId}`;
            
            [
                { valor: 0, label: 'Não observado' },
                { valor: 1, label: 'Ligeira' },
                { valor: 2, label: 'Acentuada' }
            ].forEach(opcao => {
                const radioGroup = document.createElement('div');
                radioGroup.className = 'radio-group';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = radioName; // CADA SINAL TEM NOME ÚNICO
                radio.value = opcao.valor;
                radio.id = `${radioName}_${opcao.valor}`;
                
                // Usar data attributes para guardar info
                radio.setAttribute('data-sinal-id', sinalId);
                
                // Event listener
                radio.addEventListener('change', function() {
                    const id = parseInt(this.getAttribute('data-sinal-id'));
                    const grau = parseInt(this.value);
                    salvarResposta(id, grau);
                    console.log(`✅ Salvei: ID=${id}, Grau=${grau}, Categoria=${sinaisInfo[id].categoria}`);
                });
                
                const label = document.createElement('label');
                label.htmlFor = radio.id;
                label.textContent = opcao.label;
                
                radioGroup.appendChild(radio);
                radioGroup.appendChild(label);
                opcoes.appendChild(radioGroup);
            });
            
            sinalDiv.appendChild(opcoes);
            
            // Campo de observações (opcional)
            const obs = document.createElement('textarea');
            obs.className = 'observacao-input';
            obs.placeholder = 'Observações adicionais (opcional)';
            obs.id = `obs_${sinalId}`;
            obs.setAttribute('data-sinal-id', sinalId);
            obs.addEventListener('change', function() {
                const id = parseInt(this.getAttribute('data-sinal-id'));
                salvarObservacao(id, this.value);
            });
            sinalDiv.appendChild(obs);
            
            categoriaDiv.appendChild(sinalDiv);
            sinalId++;
        });
        
        container.appendChild(categoriaDiv);
    }
    
    console.log(`✅ Checklist construída com ${sinalId} sinais`);
}

// Salvar resposta - VERSÃO SIMPLIFICADA
function salvarResposta(id, grau) {
    if (!sinaisInfo[id]) {
        console.error('❌ Erro: Sinal ID não encontrado:', id);
        return;
    }
    
    respostas[id] = {
        categoria: sinaisInfo[id].categoria,
        sinal: sinaisInfo[id].sinal,
        grau: parseInt(grau),
        estrategias_grau1: sinaisInfo[id].estrategias_grau1,
        estrategias_grau2: sinaisInfo[id].estrategias_grau2
    };
    
    console.log('📝 Resposta salva:', respostas[id]);
}

// Salvar observação
function salvarObservacao(id, texto) {
    if (respostas[id]) {
        respostas[id].observacao = texto;
        console.log(`📝 Observação salva para ID ${id}`);
    }
}

// Gerar relatório
function gerarRelatorio() {
    console.log('📊 Gerando relatório...');
    console.log('Respostas atuais:', respostas);
    
    // Validar dados de identificação
    const nome = document.getElementById('nomeAluno').value.trim();
    const turma = document.getElementById('turma').value.trim();
    const data = document.getElementById('data').value;
    const professor = document.getElementById('professor').value.trim();
    
    if (!nome || !turma || !data || !professor) {
        alert('Por favor, preencha todos os campos de identificação do aluno.');
        return;
    }
    
    // Verificar se há pelo menos uma resposta
    const respostasValidas = Object.values(respostas).filter(r => r.grau !== undefined);
    console.log('Respostas válidas:', respostasValidas.length);
    
    if (respostasValidas.length === 0) {
        alert('Por favor, avalie pelo menos um sinal antes de gerar o relatório.');
        return;
    }
    
    // Construir relatório
    const relatorioDiv = document.getElementById('relatorio');
    const conteudo = document.getElementById('relatorioConteudo');
    conteudo.innerHTML = '';
    
    // Identificação
    conteudo.appendChild(criarSecaoIdentificacao(nome, turma, data, professor));
    
    // Perfil Quantitativo
    const perfil = calcularPerfilQuantitativo();
    console.log('Perfil calculado:', perfil);
    conteudo.appendChild(criarSecaoPerfilQuantitativo(perfil));
    
    // Sinais Identificados
    conteudo.appendChild(criarSecaoSinaisIdentificados());
    
    // Nível de Prioridade
    conteudo.appendChild(criarSecaoPrioridade(perfil));
    
    // Estratégias
    conteudo.appendChild(criarSecaoEstrategias());
    
    // Mostrar relatório
    relatorioDiv.style.display = 'block';
    relatorioDiv.scrollIntoView({ behavior: 'smooth' });
    
    console.log('✅ Relatório gerado!');
}

// Criar secção de identificação
function criarSecaoIdentificacao(nome, turma, data, professor) {
    const secao = document.createElement('div');
    secao.className = 'relatorio-secao';
    
    const titulo = document.createElement('h4');
    titulo.textContent = 'Identificação';
    secao.appendChild(titulo);
    
    const dados = [
        ['Nome do Aluno:', nome],
        ['Turma:', turma],
        ['Data da Avaliação:', new Date(data).toLocaleDateString('pt-PT')],
        ['Professor(a):', professor]
    ];
    
    dados.forEach(([label, valor]) => {
        const linha = document.createElement('div');
        linha.className = 'dado-identificacao';
        
        const labelSpan = document.createElement('span');
        labelSpan.className = 'dado-label';
        labelSpan.textContent = label;
        
        const valorSpan = document.createElement('span');
        valorSpan.textContent = valor;
        
        linha.appendChild(labelSpan);
        linha.appendChild(valorSpan);
        secao.appendChild(linha);
    });
    
    return secao;
}

// Calcular perfil quantitativo
function calcularPerfilQuantitativo() {
    let nao_observados = 0;
    let ligeiros = 0;
    let acentuados = 0;
    
    Object.values(respostas).forEach(r => {
        if (r.grau === 0) nao_observados++;
        else if (r.grau === 1) ligeiros++;
        else if (r.grau === 2) acentuados++;
    });
    
    return { nao_observados, ligeiros, acentuados };
}

// Criar secção perfil quantitativo
function criarSecaoPerfilQuantitativo(perfil) {
    const secao = document.createElement('div');
    secao.className = 'relatorio-secao';
    
    const titulo = document.createElement('h4');
    titulo.textContent = 'Perfil Quantitativo';
    secao.appendChild(titulo);
    
    const grid = document.createElement('div');
    grid.className = 'perfil-quantitativo';
    
    [
        ['Não observados', perfil.nao_observados, 'var(--cinza-medio)'],
        ['Ligeiros', perfil.ligeiros, '#f0ad4e'],
        ['Acentuados', perfil.acentuados, '#d9534f']
    ].forEach(([label, valor, cor]) => {
        const item = document.createElement('div');
        item.className = 'perfil-item';
        
        const numero = document.createElement('div');
        numero.className = 'perfil-numero';
        numero.textContent = valor;
        numero.style.color = cor;
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'perfil-label';
        labelDiv.textContent = label;
        
        item.appendChild(numero);
        item.appendChild(labelDiv);
        grid.appendChild(item);
    });
    
    secao.appendChild(grid);
    return secao;
}

// Criar secção sinais identificados
function criarSecaoSinaisIdentificados() {
    const secao = document.createElement('div');
    secao.className = 'relatorio-secao';
    
    const titulo = document.createElement('h4');
    titulo.textContent = 'Sinais Identificados';
    secao.appendChild(titulo);
    
    const sinaisIdentificados = Object.values(respostas).filter(r => r.grau > 0);
    
    if (sinaisIdentificados.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'Nenhum sinal foi identificado nesta avaliação.';
        msg.style.fontStyle = 'italic';
        secao.appendChild(msg);
    } else {
        // Agrupar por categoria
        const porCategoria = {};
        sinaisIdentificados.forEach(r => {
            if (!porCategoria[r.categoria]) {
                porCategoria[r.categoria] = [];
            }
            porCategoria[r.categoria].push(r);
        });
        
        // Criar lista por categoria
        for (const [categoria, sinais] of Object.entries(porCategoria)) {
            const catTitulo = document.createElement('div');
            catTitulo.style.fontWeight = '700';
            catTitulo.style.color = 'var(--caidi-dark)';
            catTitulo.style.marginTop = '15px';
            catTitulo.style.marginBottom = '8px';
            catTitulo.textContent = categoria;
            secao.appendChild(catTitulo);
            
            sinais.forEach(sinal => {
                const sinalDiv = document.createElement('div');
                sinalDiv.className = `sinal-identificado sinal-${sinal.grau === 1 ? 'ligeira' : 'acentuada'}`;
                sinalDiv.innerHTML = `<strong>•</strong> ${sinal.sinal} 
                    <span style="float:right; font-style:italic; font-size:0.9em;">
                        ${sinal.grau === 1 ? 'Ligeira' : 'Acentuada'}
                    </span>`;
                secao.appendChild(sinalDiv);
            });
        }
    }
    
    return secao;
}

// Criar secção prioridade
function criarSecaoPrioridade(perfil) {
    const secao = document.createElement('div');
    secao.className = 'relatorio-secao';
    
    const titulo = document.createElement('h4');
    titulo.textContent = 'Nível de Prioridade de Intervenção';
    secao.appendChild(titulo);
    
    let nivel, classe, texto;
    
    if (perfil.acentuados >= 5) {
        nivel = '⚠️ URGENTE';
        classe = 'prioridade-urgente';
        texto = 'Avaliação especializada imediata necessária';
    } else if (perfil.acentuados >= 3) {
        nivel = '🔴 ALTA';
        classe = 'prioridade-alta';
        texto = 'Intervenção prioritária com apoio especializado';
    } else if (perfil.acentuados >= 1 || perfil.ligeiros >= 4) {
        nivel = '🔶 MODERADA';
        classe = 'prioridade-moderada';
        texto = 'Intervenção estruturada e monitorização regular';
    } else {
        nivel = '✅ LIGEIRA';
        classe = 'prioridade-ligeira';
        texto = 'Ajustes pedagógicos e monitorização trimestral';
    }
    
    const prioridadeDiv = document.createElement('div');
    prioridadeDiv.className = `prioridade ${classe}`;
    prioridadeDiv.innerHTML = `${nivel}<br><span style="font-size:0.8em; font-weight:400;">${texto}</span>`;
    secao.appendChild(prioridadeDiv);
    
    return secao;
}

// Criar secção estratégias
function criarSecaoEstrategias() {
    const secao = document.createElement('div');
    secao.className = 'relatorio-secao';
    
    const titulo = document.createElement('h4');
    titulo.textContent = 'Estratégias de Intervenção Pedagógica';
    secao.appendChild(titulo);
    
    const intro = document.createElement('p');
    intro.textContent = 'As estratégias abaixo são apresentadas apenas para os sinais identificados, organizadas por categoria:';
    intro.style.fontSize = '0.9em';
    intro.style.fontStyle = 'italic';
    intro.style.marginBottom = '20px';
    secao.appendChild(intro);
    
    const sinaisComEstrategias = Object.values(respostas).filter(r => r.grau > 0);
    
    console.log('🎯 Gerando estratégias...');
    console.log('Sinais com estratégias:', sinaisComEstrategias.length);
    sinaisComEstrategias.forEach(s => {
        console.log('- Categoria:', s.categoria, '| Sinal:', s.sinal, '| Grau:', s.grau);
    });
    
    if (sinaisComEstrategias.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'Nenhuma estratégia necessária - não foram identificados sinais nesta avaliação.';
        msg.style.fontStyle = 'italic';
        secao.appendChild(msg);
        return secao;
    }
    
    // Agrupar por categoria
    const porCategoria = {};
    sinaisComEstrategias.forEach(r => {
        if (!porCategoria[r.categoria]) {
            porCategoria[r.categoria] = [];
        }
        porCategoria[r.categoria].push(r);
    });
    
    // Criar estratégias por categoria
    for (const [categoria, sinais] of Object.entries(porCategoria)) {
        const catDiv = document.createElement('div');
        catDiv.className = 'estrategias-categoria';
        
        const catTitulo = document.createElement('div');
        catTitulo.className = 'estrategias-titulo';
        catTitulo.textContent = `📌 ${categoria}`;
        catDiv.appendChild(catTitulo);
        
        // Juntar todas as estratégias desta categoria
        sinais.forEach(sinal => {
            const estrategias = sinal.grau === 2 ? sinal.estrategias_grau2 : sinal.estrategias_grau1;
            
            const estratDiv = document.createElement('div');
            estratDiv.className = 'estrategias-texto';
            estratDiv.textContent = estrategias;
            estratDiv.style.marginBottom = '10px';
            catDiv.appendChild(estratDiv);
        });
        
        secao.appendChild(catDiv);
    }
    
    return secao;
}

// Limpar formulário
function limparFormulario() {
    if (!confirm('Tem a certeza que deseja limpar todos os dados? Esta ação não pode ser revertida.')) {
        return;
    }
    
    // Limpar campos de identificação
    document.getElementById('nomeAluno').value = '';
    document.getElementById('turma').value = '';
    document.getElementById('data').valueAsDate = new Date();
    document.getElementById('professor').value = '';
    
    // Limpar radios e observações
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('.observacao-input').forEach(obs => obs.value = '');
    
    // Limpar estado
    respostas = {};
    
    // Esconder relatório
    document.getElementById('relatorio').style.display = 'none';
    
    // Scroll para topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('🔄 Formulário limpo');
}

// Exportar para PDF
function exportarPDF() {
    window.print();
}
