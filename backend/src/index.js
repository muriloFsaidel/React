//nodemon atualiza as modificações em tempo real
//devDependencies(nodemon) são bibliotecas apenas de desenvolvimento e não de produção
//express é uma biblioteca usada para inicializar o servidor web
//criando uma variável para importar a biblioteca express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');// biblioteca para quebrar o bloqueio entre servidor backend e frontend
const http = require('http');

const routes = require('./routes');
const { setupWebSocket } = require('./webSocket');

//inicialização do servidor
const app = express();
//extrai a função http do servidor express
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://oministack:oministack@cluster0-poqoh.gcp.mongodb.net/week10?retryWrites=true&w=majority',
{ useNewUrlParser: true,
 useUnifiedTopology: true});


app.use(cors());
//use json também como body de recebimento de dados para cada requisição
app.use(express.json());
app.use(routes);

//definindo porta de serviço
server.listen(3333);

