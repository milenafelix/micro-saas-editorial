CREATE TABLE IF NOT EXISTS Parcerias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(100) NOT NULL,
    nome_programa VARCHAR(100),
    status ENUM('Ativo', 'Inativo', 'Pendente', 'Renovado') DEFAULT 'Ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Pautas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parceria_id INT,
    titulo VARCHAR(200) NOT NULL,
    data_publicacao DATE,
    status ENUM('Rascunho', 'Revisão', 'Publicado') DEFAULT 'Rascunho',
    FOREIGN KEY (parceria_id) REFERENCES Parcerias(id)
);

-- Inserindo um dado de teste real para contexto
INSERT INTO Parcerias (nome_empresa, nome_programa, status) 
VALUES ('Editora Valentina', 'Amigos da Valen', 'Ativo');