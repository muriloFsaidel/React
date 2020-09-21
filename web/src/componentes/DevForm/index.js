import React, { useState, useEffect} from 'react';

function DevForm({onSubmit}){

    //Criando os estados e funções para atualizar o estado
  const [techs, setTechs] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
 

    //dispara uma função em um exato momento uma única vez
    useEffect( () => {
        //obter a latitude e longitude
        navigator.geolocation.getCurrentPosition(
          //successful
          (position) => {
            //recuperando as coordenadas latitude e longitude da position
            const { latitude, longitude} = position.coords;
            
            //atribuindo a latitude e longitude com o valor de retorno das coordenadas
            setLatitude(latitude);
            setLongitude(longitude);
          },
          //flaw
          (err) => {
              console.log(err);
          },
          {
            //answer time
            timeout: 30000,
          }
        )
      }, []);

async function handleSubmit(e){
     //quebrando o action permanecendo na mesma página
    e.preventDefault();

  await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
    }); 

    // limpar os estados 
   setGithubUsername('');
   setTechs('');
}
    
    return (
        /* onSubmit equivale ao action  */
       <form onSubmit={handleSubmit}>
       <div className="input-block">
        <label htmlFor="github_username">Usuário do GitHub</label>
        <input
        name="github_username"
        id="github_username"
        required
        value = {github_username}
        onChange ={e => setGithubUsername(e.target.value)}/>
        </div>

        <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>  
        <input
        name="techs"
        id="techs"
        required
        value={techs}
        onChange = {e => setTechs(e.target.value)}
        />
        </div>

        <div className="input-group">
          
          <div className="input-block">
            <label htmlFor="Latitude">Latitude</label>
            <input 
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            //e = event
            //ao mudar o valor da latitude no html, atualizar o estado(notReadOnly)
            onChange= {e => setLatitude(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange= {e => setLongitude(e.target.value)} />
          </div>

        </div>
        
      <button type="submit">Salvar</button>
     </form> 
    );
}

export default DevForm;