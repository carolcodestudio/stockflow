const express = require("express");
const cors = require("cors");

const produtosRoutes = require("./routes/produtos");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/produtos", produtosRoutes);


app.get("/", (req, res) => {
    res.json({
        mensagem: "🚀 API StockFlow funcionando!"
    });
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});