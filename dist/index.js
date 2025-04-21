import express from 'express';
import cors from 'cors';
import itens from './itens.js';
const app = express();
//ativando cors
app.use(cors());
app.get('/products', (req, res) => {
    let id = req.query.id || undefined;
    const page = parseInt(req.query._page) || 1; //pegue o numero na variavel na url ou comece com 1
    const countItens = parseInt(req.query._limit) || itens.products.length; //pegue o limite que a requisicao esta pedindo ou
    //retorne a quantidade do json
    //verificando se id existe e retornando iten
    if (id) {
        //encontrar o item
        const arrItem = itens.products.find(prod => prod.id === Number(id));
        return res.json(arrItem);
    }
    const startIndex = (page - 1) * countItens;
    const endIndex = page * countItens;
    //dividindo json
    const paginatedProducts = itens.products.slice(startIndex, endIndex);
    //configuracao do header
    res.setHeader("x-total-count", itens.products.length);
    res.json(paginatedProducts);
});
//escolha a porta ou use a 3000
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.warn(`Servidor rodando na porta ${port}`);
});
