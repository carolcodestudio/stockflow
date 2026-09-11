const fs = require("fs");

const arquivo = "./data/produtos.json";


// LISTAR TODOS OS PRODUTOS
function listarProdutos(req, res) {

    const produtos = JSON.parse(
        fs.readFileSync(arquivo)
    );

    res.json(produtos);
}


// BUSCAR PRODUTO POR ID
function buscarProdutoPorId(req, res) {

    const produtos = JSON.parse(
        fs.readFileSync(arquivo)
    );


    const id = Number(req.params.id);


    const produto = produtos.find(
        produto => produto.id === id
    );


    if (!produto) {

        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });

    }


    res.json(produto);
}


// CRIAR PRODUTO
function criarProduto(req, res) {

    const produtos = JSON.parse(
        fs.readFileSync(arquivo)
    );


    const novoProduto = {
        id: Date.now(),
        ...req.body
    };


    produtos.push(novoProduto);


    fs.writeFileSync(
        arquivo,
        JSON.stringify(produtos, null, 2)
    );


    res.status(201).json(novoProduto);
}


// ATUALIZAR PRODUTO
function atualizarProduto(req, res) {

    const produtos = JSON.parse(
        fs.readFileSync(arquivo)
    );


    const id = Number(req.params.id);


    const index = produtos.findIndex(
        produto => produto.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });

    }


    produtos[index] = {
        ...produtos[index],
        ...req.body
    };


    fs.writeFileSync(
        arquivo,
        JSON.stringify(produtos, null, 2)
    );


    res.json(produtos[index]);
}


// DELETAR PRODUTO
function deletarProduto(req, res) {

    const produtos = JSON.parse(
        fs.readFileSync(arquivo)
    );


    const id = Number(req.params.id);


    const novosProdutos = produtos.filter(
        produto => produto.id !== id
    );


    if (produtos.length === novosProdutos.length) {

        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });

    }


    fs.writeFileSync(
        arquivo,
        JSON.stringify(novosProdutos, null, 2)
    );


    res.json({
        mensagem: "Produto removido com sucesso"
    });
}



module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto
};