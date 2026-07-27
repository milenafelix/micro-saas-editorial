// ==========================================
// CONFIGURAÇÕES GLOBAIS
// ==========================================
const API_URL = 'http://localhost:3000/api/parcerias';
let graficoAtual = null;

// Inicia a aplicação carregando os dados assim que a página abre
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});

// ==========================================
// 1. CARREGAMENTO E RENDERIZAÇÃO DE DADOS
// ==========================================
async function carregarDados() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error('Erro ao buscar dados da API');
        
        const parcerias = await resposta.json();
        renderizarTabela(parcerias);
        atualizarMetricas(parcerias);
    } catch (erro) {
        console.error('Erro na comunicação:', erro);
    }
}

function renderizarTabela(parcerias) {
    const tbody = document.getElementById('tabelaParcerias');
    tbody.innerHTML = '';

    parcerias.forEach(p => {
        const classeStatus = `status-${p.status.toLowerCase()}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.nome_empresa}</strong></td>
            <td>${p.nome_programa}</td>
            <td><span class="status-badge ${classeStatus}">${p.status}</span></td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-secondary" onclick="prepararEdicao(${p.id}, '${p.nome_empresa}', '${p.nome_programa}', '${p.status}')" style="background: #e2e8f0; color: var(--text-main); border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 500;">Editar</button>
                    <button class="btn-danger" onclick="excluirParceria(${p.id})">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================
// 2. MÉTRICAS E GRÁFICO (CHART.JS)
// ==========================================
function atualizarMetricas(parcerias) {
    document.getElementById('totalProgramas').innerText = parcerias.length;

    const contagem = { 'Ativo': 0, 'Inativo': 0, 'Pendente': 0, 'Renovado': 0 };
    parcerias.forEach(p => {
        if (contagem[p.status] !== undefined) {
            contagem[p.status]++;
        }
    });

    desenharGrafico(contagem);
}

function desenharGrafico(contagem) {
    const ctx = document.getElementById('graficoStatus').getContext('2d');

    if (graficoAtual) {
        graficoAtual.destroy();
    }

    graficoAtual = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ativo', 'Inativo', 'Pendente', 'Renovado'],
            datasets: [{
                data: [contagem['Ativo'], contagem['Inativo'], contagem['Pendente'], contagem['Renovado']],
                backgroundColor: [
                    '#10b981', // Verde (Ativo)
                    '#ef4444', // Vermelho (Inativo)
                    '#f59e0b', // Amarelo (Pendente)
                    '#6366f1'  // Roxo (Renovado)
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

// ==========================================
// 3. CONTROLE DO FORMULÁRIO (ABRIR/FECHAR/EDITAR)
// ==========================================
function toggleForm() {
    const form = document.getElementById('formContainer');
    const grid = document.getElementById('contentGrid');

    if (form.style.display === 'none' || form.style.display === '') {
        // Modo Cadastro Limpo
        document.getElementById('parceriaId').value = '';
        document.getElementById('formTitle').innerText = 'Cadastrar Nova Parceria';
        document.getElementById('btnSalvar').innerText = 'Salvar';
        document.getElementById('formParceria').reset();

        form.style.display = 'block';
        grid.classList.add('with-form');
        document.getElementById('nome_empresa').focus();
    } else {
        // Fechar Formulário
        form.style.display = 'none';
        grid.classList.remove('with-form');
        document.getElementById('formParceria').reset();
        document.getElementById('parceriaId').value = '';
    }
}

function prepararEdicao(id, empresa, programa, status) {
    // Preenche os campos com os dados da linha selecionada
    document.getElementById('parceriaId').value = id;
    document.getElementById('nome_empresa').value = empresa;
    document.getElementById('nome_programa').value = programa;
    document.getElementById('status').value = status;
    
    // Altera os textos visuais para indicar edição
    document.getElementById('formTitle').innerText = 'Editar Parceria';
    document.getElementById('btnSalvar').innerText = 'Atualizar';

    const form = document.getElementById('formContainer');
    const grid = document.getElementById('contentGrid');
    
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        grid.classList.add('with-form');
    }
    document.getElementById('nome_empresa').focus();
}

// ==========================================
// 4. OPERAÇÕES DE SALVAR (CREATE / UPDATE)
// ==========================================
document.getElementById('formParceria').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('parceriaId').value;
    const dadosParceria = {
        nome_empresa: document.getElementById('nome_empresa').value,
        nome_programa: document.getElementById('nome_programa').value,
        status: document.getElementById('status').value
    };

    // Identifica se é Edição (PUT) ou Criação (POST)
    const isEdicao = id !== '';
    const url = isEdicao ? `${API_URL}/${id}` : API_URL;
    const metodo = isEdicao ? 'PUT' : 'POST';

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParceria)
        });

        if (!resposta.ok) throw new Error('Erro ao salvar os dados');

        toggleForm(); // Fecha o formulário e limpa o estado
        carregarDados(); // Atualiza tabela e gráficos
    } catch (erro) {
        console.error('Erro na operação:', erro);
    }
});

// ==========================================
// 5. OPERAÇÕES DE EXCLUSÃO (DELETE)
// ==========================================
async function excluirParceria(id) {
    if (confirm('Tem certeza que deseja excluir esta parceria?')) {
        try {
            const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!resposta.ok) throw new Error('Erro ao excluir parceria');

            carregarDados();
        } catch (erro) {
            console.error('Erro ao deletar:', erro);
        }
    }
}