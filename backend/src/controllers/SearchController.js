const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
              
        //{criar mais de uma constante de uma vez}
        const { latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        //select *(find) from Dev where Dev.techs in (techsArray) and Dev.location = (location)
        const devs = await Dev.find({
            // filtrar por tecnologias
            techs: {
                //techs que estejão dentro de(in)
                $in: techsArray,
            },
            // buscar todos os devs com base na localização
            location: {
                //localizações que estejão próximas(near)
                $near: {
                    //passando os pontos de longitude e latitude
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                     // buscar todos os devs num raio de 10km = 10.000m
                     $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs })
    }
}