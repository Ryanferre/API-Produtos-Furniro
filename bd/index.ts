import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import itens from './itens.js';//importando array de objetos


   const Serverapp: Express = express();
   //ativando cors
   Serverapp.use(cors())

    Serverapp.get('/products', (req: Request, res: Response): void=>{
        let id= req.query.id as string || undefined //identifique a query da url
        const page: number= parseInt(req.query._page as string) || 1 //pegando o numero na variavel da url que representa a pagina atual ou comece com 1
        const countItens: number= parseInt(req.query._limit as string) || itens.products.length //pegando o limite que a requisicao esta pedindo ou
                                                                                                //retorne a quantidade do json

        if(id){//verificando se id existe e retornando item especifico
            //encontrar o item
            const arrItem= itens.products.find(prod => prod.id === Number(id))

        res.json(arrItem)
        }
        const Indexstart = (page - 1) * countItens;//definir o ponto de partida do indice
        const Indexfind = page * countItens;//definir o ponto final do iten

        //dividindo json
        const paginatedProducts = itens.products.slice(Indexstart, Indexfind);

        //configuracao do header
        res.setHeader("x-total-count", itens.products.length);
        res.json(paginatedProducts)
    })

    //escolha a porta ou use a 3000
    const port = process.env.PORT || 3000;
    Serverapp.listen(port, function(){
        console.warn(`Servidor rodando na porta ${port}`)
    })
