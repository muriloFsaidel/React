//import React from 'react';
//import Header from './Header';
// componente é uma função que retorna uma codificação (html,css,javaScript) sem afetar o projeto inteiro, apenas um pedaço.
// propriedade é um atributo ou parâmetro passado da função PAI(primária) para a função FILHO(secundário/destino)
//para usar um componente dentro de outro várias vezes é preciso ter um container ou fragmento(<>) 
/*
function App() {
  return (
<>
<Header title="Title 1"/>
<Header title="Title 2"/>
</>
);}*/
// estado é uma informação manipulada pelo componente
//import {UseState} from 'react';
// useState retorna o valor em uma variável e uma função para atualizá-la
/* Exemplo de useState
function App() {
    const [counter, setCounter] = useState(0);

    function increaseCounter() {
        setCounter(counter + 1);
    }

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={increaseCounter}>Incrementar</button>
    </>
  );
}
*/
//props == all properties
//{} significa conteúdo/variável/atributo js

/*function Header(props){
    return <h1>{props.title}</h1>
}

export default Header;
*/

//aside conteúdo lateral
//main conteúdo principal dentro do aside
// no css * (todos os elementos)
//outline == Contorno
//margin: 0 auto == centraliza o app
//flex-direction: row == os elementos fiquem um do lado do outro
//align-items: flex-start == fazer os itens ficaram no topo
//input-group é a divisória da long e latid para ficarem lado a lado entre eles mesmos
//box-shadow: deslocamento h, deslocamento v, blur(grossura ou borramento), espalhamento , cor
//border-radius: ondulação da borda
//.input-block + .input-block == estilizar somente a(s) tag(s) que tenha(m) a classe.input-block como antecessor(em relação ao 1°objeto)
//display: grid == side at side
//gap == width para o display grid(sentido de margin)
//grid-template-column: 1fr 1fr == input ocupar 50% da div
//cursor: pointer == quando passar o mouse, o ponteiro indicar um link
//flex:1 == 100% do espaço restante
//line-height == espaçamento entre linhas
//list-style / text-decoration = none, eliminam a formatação padrão do objeto(texto/item)
//@media significa qualquer dispositivo(celular)