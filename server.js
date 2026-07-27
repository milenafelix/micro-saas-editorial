require('dotenv').config();
const express = require('express');
const parceriaRoutes = require('./src/routes/parceriaRoutes');

const app = express();
app.use(express.json()); // Permite entender JSON no body

app.use(express.static('public'));

// "Qualquer requisição que comece com /api/parcerias, mande para o parceriaRoutes"
app.use('/api/parcerias', parceriaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});