//Importando apenas uma parte {} do express
const {Router} = require('express');

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController');

const routes = Router();

//testes feitos no insomnia
//Métodos HTTP: get (obter,receber) algo já cadastrado, post(inserir) dados sigilosos, put(editar), delete (excluir)
//Query Params:/users?param=value(insomnia) -> request.query (filtros, ordenação, paginação) geralmente em get
//Rout Params:geralmente em put/delete "/users/:id" insomnia(localhost:3333/users/valor) -> request.params(identificar um recurso na alteração/ remoção)
//Body: request.body (Dados para criação ou alteração de algum registro) (post)

//route de acesso aos recursos(caminho) 
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

//exportando as rotas para aplicação
// module no sentido de arquivo
module.exports = routes;