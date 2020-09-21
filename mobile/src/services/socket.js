import socketio from 'socket.io-client';

//criando conexão dos servidores Expo:BackEnd com socket sem autoConexão
const socket = socketio('http://192.168.0.12:3333',{
    autoConnect: false
});

//04/27(en)
function SubscribeToNewDevs(subscribeFunction){
    //ouvindo conexão via socket com a chave 'new-dev'
    //e disparando função subscribeFunction(recursividade)
    socket.on('new-dev', subscribeFunction);
}

function Connect(latitude, longitude, techs){
    //passando propriedades de consulta para o servidor backend via socket
    socket.io.opts.query = {
        latitude,
        longitude,
        techs}
    //realiza a conexão
    socket.connect();

    //recebe a mensagem do socket do backend
    /*socket.on('message', text => {
        console.log(text);
    });
    */
}

function Disconnect(){
    //se estiver conectado
    if(socket.connected){
        //desconectar
        socket.disconnect();
    }
}

export {
    Connect,
    Disconnect,
    SubscribeToNewDevs
};