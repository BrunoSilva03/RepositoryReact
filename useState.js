import React, { useState } from 'react'

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