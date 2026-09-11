const express = require("express");

const router = express.Router();

const controller = require("../controllers/produtosController");


// LISTAR PRODUTOS
router.get("/", controller.listarProdutos);


// BUSCAR PRODUTO POR ID
router.get("/:id", controller.buscarProdutoPorId);


// CRIAR PRODUTO
router.post("/", controller.criarProduto);


// ATUALIZAR PRODUTO
router.put("/:id", controller.atualizarProduto);


// DELETAR PRODUTO
router.delete("/:id", controller.deletarProduto);


module.exports = router;