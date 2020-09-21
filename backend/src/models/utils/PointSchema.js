const mongoose  = require('mongoose');

// criando a estrutura de localização
const PointSchema = new mongoose.Schema({
    //nome do campo
    type: {
        //tipo
        type: String,
        //ponto de mapa
        enum: ['Point'],
        //obrigatório
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;