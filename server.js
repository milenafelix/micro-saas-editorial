const express = require('express');
const db = require('./src/config/db');
const app = express();
const port = 3000;

// Middleware para entender JSON nas requisições
// Sem isso, a nossa rota POST não consegue ler os dados enviados!
app.use(express.json());

// Rota de teste (Health Check)
app.get('/api/status', (req, res) => {
  res.json({ mensagem: 'API do Micro-SaaS Editorial rodando perfeitamente!' });
});

// Rota para LER todas as parcerias (GET)
app.get('/api/parcerias', async (req, res) => {
  try {
    const [linhas] = await db.query('SELECT * FROM Parcerias');
    res.json(linhas);
  } catch (erro) {
    console.error('Erro ao buscar parcerias:', erro);
    res.status(500).json({ erro: 'Erro interno ao buscar as parcerias.' });
  }
});

// Rota para CRIAR uma nova parceria (POST)
app.post('/api/parcerias', async (req, res) => {
  try {
    // Extrai as informações que chegam no "corpo" do pedido
    const { nome_empresa, nome_programa, status } = req.body;

    // Validação básica para não salvar dados vazios no banco
    if (!nome_empresa || !nome_programa) {
      return res.status(400).json({ 
        erro: 'Os campos nome_empresa e nome_programa são obrigatórios.' 
      });
    }

    // O uso das interrogações (?) protege contra ataques de SQL Injection
    const [resultado] = await db.query(
      'INSERT INTO Parcerias (nome_empresa, nome_programa, status) VALUES (?, ?, ?)',
      [nome_empresa, nome_programa, status || 'Pendente'] 
    );

    // Retorna status 201 (Created) se deu tudo certo
    res.status(201).json({
      mensagem: 'Nova parceria cadastrada com sucesso!',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao criar parceria:', erro);
    res.status(500).json({ erro: 'Erro interno ao salvar os dados.' });
  }
});

// Rota para ATUALIZAR uma parceria existente (PUT)
app.put('/api/parcerias/:id', async (req, res) => {
  try {
    // Pega o ID que vem na URL (ex: /api/parcerias/1)
    const { id } = req.params;
    
    // Pega os novos dados que vêm no corpo da requisição
    const { nome_empresa, nome_programa, status } = req.body;

    // Validação: Garante que enviaram pelo menos um dado para atualizar
    if (!nome_empresa || !nome_programa) {
      return res.status(400).json({ 
        erro: 'Os campos nome_empresa e nome_programa são obrigatórios para a atualização.' 
      });
    }

    // Executa o comando UPDATE no banco de dados
    const [resultado] = await db.query(
      'UPDATE Parcerias SET nome_empresa = ?, nome_programa = ?, status = ? WHERE id = ?',
      [nome_empresa, nome_programa, status || 'Pendente', id]
    );

    // O 'affectedRows' nos diz quantas linhas foram alteradas no banco.
    // Se for 0, significa que o ID que o usuário passou não existe!
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Parceria não encontrada.' });
    }

    res.json({ mensagem: 'Parceria atualizada com sucesso!' });
  } catch (erro) {
    console.error('Erro ao atualizar parceria:', erro);
    res.status(500).json({ erro: 'Erro interno ao atualizar os dados.' });
  }
});

// Rota para DELETAR uma parceria existente (DELETE)
app.delete('/api/parcerias/:id', async (req, res) => {
  try {
    // Pega o ID que vem na URL
    const { id } = req.params;

    // Executa o comando DELETE no banco de dados
    const [resultado] = await db.query('DELETE FROM Parcerias WHERE id = ?', [id]);

    // Verifica se alguma linha foi realmente deletada
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Parceria não encontrada.' });
    }

    res.json({ mensagem: 'Parceria removida com sucesso!' });
  } catch (erro) {
    console.error('Erro ao deletar parceria:', erro);
    res.status(500).json({ erro: 'Erro interno ao deletar os dados.' });
  }
});

// Liga o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});