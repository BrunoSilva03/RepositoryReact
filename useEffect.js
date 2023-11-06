import React, { useState, useEffect } from 'react'

function App() {

  //primeiro parâmetro(tarefas) é o nome do state, segundo parâmetro(setTarefas) é
  //a function que iremos chamar para atualizar o state tarefas.
  const[tarefas, setTarefas] = useState([
      'Estudar HTML',
      'Estudar CSS',
      'Estudar JavaScript',
      'Estudar React',
      'Estudar Banco de Dados',
      'Estudar Hortifrúti',
  ])

  const [input, setInput] = useState('');

  
  //dois parâmetros. no primeiro parâmetro é a própria função que vai ser executada
  //() => {} e o segundo parâmetro é a state que ele fica monitorando por exemplo.
  //O segundo parâmetro pode ser um array com várias states
  //Nesse caso toda vez que a statetarefas(a state que ele está monitorando) sofrer alterações
  //ele vai realizar a função do primeiro parâmetro
useEffect(() => {}, [])


  //isso substitui o componentDidUpdate quando sofre alguma alteração
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    //salvando no localStorage a state tarefas, toda vez que a state tarefas sofrer alguma
    //alteração. o JSON.stringify é para transformar o array tarefas que vem em JSON em String
  }, [tarefas])


  //isso substitui o componentDidMount que é quando  carrega o componente ele é executado.
  //pra fazer isso é só deixar o segundo parâmetro vazio...
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas');

    if(tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, [])


  //E pra fazer o componentWillAmount(função executada quando sai do componente) no useEffect é só
  //colocar o segundo parâmetro vazio e acrescentar o return.
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas');

    if(tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }

    return () => {}; //o que estiver aqui na função do return vai ser executado assim que sair do componente
  }, [])


  //precisa colocar function com useState, quando era class e usava o constructor não precisava
  function handleAdd() {
    //vai pegar todos os itens da lista com o Spread Operator (...tarefas) mais o novo
    //item que vem/vai vir no input
    setTarefas([...tarefas, input]);
    setInput('');
  }


  return(
   <div>
    <h1>Lista de Tarefas</h1>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Adicionar Tarefa</button>
      {/* Não precisa colocar o this pra chamar o método handleAdd*/}
   </div>
  )
}



export default App