const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../webSocket'); 
//          Retrieve                 Create       Update   Delete
//funções:  index(all), show(one)    store        update   destroy

module.exports = {
    async index (request, response){
        //find() == select * from Dev
        const devs = await Dev.find(); 

        return response.json(devs);
    },

    //estes símbolos "() => {}" representam um função sem nome(lambda)
    //request é a requisição de envio de informações pela rota(dados de formulário)
    //response é a resposta do servidor(dados salvos)
    //store = nome da função
    async store (request,response) {
        
        const { github_username, techs, latitude, longitude } = request.body;

        //variável 
                        //select * from Dev where Dev.github_username = diego3g 
        let dev = await Dev.findOne({ github_username });

        //se o dev não! existir, cadastre
        if (!dev){ 
            //async e await para esperar a resposta da api do github e depois continuar o código
            const apiResponse  = await axios.get(`https://api.github.com/users/${github_username}`);
    
            // caso name = null então receba o login
            const { name = login, avatar_url, bio} = apiResponse.data;
    
            // separa as posições por ',' e mapeia cada elemento para eliminar o espaço(trim)
            const techArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            //create({})
            //insert into Dev(github_username,name,avatar_url, bio,techs: techArray,location) values( github_username,name,avatar_url, bio,techs: techArray,location)
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location,
            })
            
            
            //retorna conexões filtradas com 10km de distância 
            //e que o dev atenda as techs
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techArray,
            )
            //enviando mensagem com os dados do dev cadastrado
            sendMessage(sendSocketMessageTo, 'new-dev',dev);
        }
       
        //console.log(request.body)
        //Content as String "return response.send('Hello World')";
        //retorno com objeto do tipo json
        //message é a propriedade e 'Hello World' é o valor
        return response.json(dev);
    },

    async update(){
        // a plus to the project for practing
    },

    async destroy(){
        // a plus to the project for practing
    }

};