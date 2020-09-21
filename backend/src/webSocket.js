//webSocket é o intermediário entre servidores sem uso de requisição http
const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calcularDistance');

let io;
const connections = [];

//exportando o método de configuração do Websocket via servidor http
exports.setupWebSocket = (server) => {
    //estabelecendo conexão socket com o servidor http
    io  = socketio(server);

    //inicia a conexão
    io.on('connection', socket => {
        //recebendo coordenadas(String) do socket do expo
        const {latitude, longitude, techs} = socket.handshake.query

        //adicionando elementos(push) ao vetor de conexões
        connections.push({
            id: socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
}


exports.findConnections = (coordinates, techs) =>{
    return connections.filter( connection =>{
        //retorna distância entre dois pontos(dev a ser cadastrado e o já cadastrado) menor que 10KM
        return calculateDistance(coordinates, connection.coordinates) < 10
        //verifica se as techs cadastradas estão incluidas nas techs do novo dev
        && connection.techs.some(item =>  techs.includes(item))
    })
}

//message = key, data = dados cadastrados(dev)
exports.sendMessage = (to, message, data) => {
//Varre cada conexão(connections[])    
to.forEach(connection => {
    //emite uma mensagem para a conexão atual(id)
    io.to(connection.id).emit(message,data);
})
}


 //definindo tempo de resposta do servidor
        /*setTimeout(() => {
            //emite uma mensagem ao expo
            socket.emit('message','Hello Oministack')
        }, 3000);
        */