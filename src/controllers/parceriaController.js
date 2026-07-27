const db = require('../config/db');

// GET - Listar todas
exports.listarParcerias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Parcerias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar parcerias' });
    }
};

// POST - Criar nova
exports.criarParceria = async (req, res) => {
    const { nome_empresa, nome_programa, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Parcerias (nome_empresa, nome_programa, status) VALUES (?, ?, ?)',
            [nome_empresa, nome_programa, status]
        );
        res.status(201).json({ id: result.insertId, nome_empresa, nome_programa, status });
    } catch (error) {
        // ADICIONE ESTA LINHA ABAIXO PARA VER O ERRO REAL NO TERMINAL
        console.error("❌ Erro do MySQL:", error.sqlMessage || error); 
        res.status(500).json({ erro: 'Erro ao criar parceria' });
    }
};

// PUT - Atualizar
exports.atualizarParceria = async (req, res) => {
    const { id } = req.params;
    const { nome_empresa, nome_programa, status } = req.body;
    try {
        await db.query(
            'UPDATE Parcerias SET nome_empresa = ?, nome_programa = ?, status = ? WHERE id = ?',
            [nome_empresa, nome_programa, status, id]
        );
        res.json({ mensagem: 'Parceria atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar parceria' });
    }
};

// DELETE - Deletar
exports.deletarParceria = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Parcerias WHERE id = ?', [id]);
        res.json({ mensagem: 'Parceria deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar parceria' });
    }
};