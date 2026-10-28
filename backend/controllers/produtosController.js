const conexao = require("../../database/conexao");

// LISTAR TODOS OS PRODUTOS
exports.listarProdutos = (req, res) => {
    const sql = "SELECT * FROM produtos ORDER BY id ASC";

    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao listar produtos:", erro);
            return res.status(500).json({
                erro: "Erro ao listar produtos"
            });
        }

        res.json(resultados);
    });
};


// BUSCAR PRODUTO POR ID
exports.buscarProdutoPorId = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM produtos WHERE id = ?";

    conexao.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar produto:", erro);
            return res.status(500).json({
                erro: "Erro ao buscar produto"
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(resultados[0]);
    });
};


// CRIAR PRODUTO
exports.criarProduto = (req, res) => {
    const { nome, categoria, quantidade, preco } = req.body;

    const sql = `
        INSERT INTO produtos
        (nome, categoria, quantidade, preco)
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, categoria, quantidade, preco],
        (erro, resultado) => {
            if (erro) {
                console.error("Erro ao criar produto:", erro);
                return res.status(500).json({
                    erro: "Erro ao criar produto"
                });
            }

            res.status(201).json({
                id: resultado.insertId,
                nome,
                categoria,
                quantidade,
                preco
            });
        }
    );
};


// ATUALIZAR PRODUTO
exports.atualizarProduto = (req, res) => {
    const id = req.params.id;

    const { nome, categoria, quantidade, preco } = req.body;

    const sql = `
        UPDATE produtos
        SET nome = ?,
            categoria = ?,
            quantidade = ?,
            preco = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [nome, categoria, quantidade, preco, id],
        (erro, resultado) => {
            if (erro) {
                console.error("Erro ao atualizar produto:", erro);
                return res.status(500).json({
                    erro: "Erro ao atualizar produto"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }

            res.json({
                id: Number(id),
                nome,
                categoria,
                quantidade,
                preco
            });
        }
    );
};


// EXCLUIR PRODUTO
exports.deletarProduto = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM produtos WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao excluir produto:", erro);
            return res.status(500).json({
                erro: "Erro ao excluir produto"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json({
            mensagem: "Produto excluído com sucesso"
        });
    });
};