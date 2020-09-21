const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

//construindo a model(sentido tabela) de Devs
//DevSchema será a estrutura de criação de tabelas
//[String] vetor de strings = "html,css,python,js"
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        //índice para separar longitude e latitude (eixos)
        index: "2dsphere"
    }
});

//exportando o model com nome Dev e estrura DevSchema
module.exports = mongoose.model('Dev',DevSchema);