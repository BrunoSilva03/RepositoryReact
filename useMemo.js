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

  
  //primeiro parâmetro é a função, segundo parâmetro é qual state que quando eu
  //alterar quero que chame a função.
  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return(
   <div>
    <h1>Lista de Tarefas</h1>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      {/* Toda vez que houver uma alteração de um caractere sequer no input, vai ser
          requerido tudo isso que está no return, nesse exemplo não compromete muito mas mas se fosse uma conta mais complexa por exemplo poderia deixar o sistema lento.Colocando a variável totalTarefas do useMemo aqui vai executá-la no sistema somente quando houver uma mudança de fato no site.*/}
      <strong>Você tem {totalTarefas} tarefas!</strong>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Adicionar Tarefa</button>
   </div>
  )
}



export default App