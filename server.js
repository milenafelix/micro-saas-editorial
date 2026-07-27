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

// Liga o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});