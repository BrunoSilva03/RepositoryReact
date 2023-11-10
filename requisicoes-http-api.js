import { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [nutri, setNutri] = useState([]);

  //API: https://sujeitoprogramador.com/rn-api/?api=posts

  useEffect(() => {
    function loadApi() {
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';

      fetch(url)
        .then((r) => r.json()) //caso dê certo - 1º then - transforma a promise que veio em json
        .then((json) => { //2º then - recebe o arquivo já em json e faz alguma coisa com ele.
          console.log(json)
          setNutri(json);
        })

    }

    loadApi();

  }, [])

  return (
    <div className="container">
      <header>
          <strong>React Nutri</strong>
      </header>

      {nutri.map((item, index) => {
        return(
          <article key={item.id} className="posts">
            <strong className="titulo">{item.titulo}</strong>

            <img src={item.capa} alt={item.titulo} className="capa"/>

            <p className="subtitulo">
              {item.subtitulo}
            </p>

            <a className="botao">Acessar</a>
          </article>
        )
      })}
    </div>
  )
}



export default App