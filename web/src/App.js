import React,{ useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './sideBar.css';
import './main.css';

import DevItem from './componentes/DevItem';
import DevForm from './componentes/DevForm'

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    //função para carregar os Devs
      async function loadDevs(){
        //faz a requisição via GET pela rota /devs,
        //retornando os registros de todos os Devs no formato json[]
        const  response = await api.get('/devs');
        
        //atualizando o estado com todos os dados de Devs no formato json[]
        setDevs(response.data);
      }

      loadDevs();
  },[]);

  async function handleAddDev(data){
    //fazendo a requisição via método POST pela rota /devs do servidor backend
    //e passando os dados(estados), com mesmo efeito de requisição via body do insomnia
    const response = await api.post('/devs', data);

     //console.log(response.data);

     //manter os ...devs cadastrados e acrescentar um novo no final(response)
     setDevs([...devs, response.data]);
  }

  return (
    <div id ="app">
     <aside>
       <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
     </aside>
     <main>
        <ul>
          {/* map equivale ao while/for
           varrer cada elemento do vetor
           propridade key para identificar cada elemento do array*/}
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev}/>
          ))}
         
        </ul>
       </main>
    </div>
  );
}

export default App;

