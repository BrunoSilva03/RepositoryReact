import React, { useState, useEffect, useMemo, useCallback } from 'react'

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

  


  //Dessa forma a cada caractere que eu colocar no input essa função handleAdd
  //vai ser excluída da memória e depois recriada por baixo dos panos
  //prejudicando muito a velocidade e processamento do sistema.
  /* */
  function handleAdd() {
    setTarefas([...tarefas, input]);
    setInput('');
  }

  /* Por isso é mais efeciente usar o useCallback que tem a mesma função do useMemo só
   que para coisas mais complexas, ao invés de retornar um valor único ele retorna uma 
   função: */
  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input]);
    setInput('');
  }, [input, tarefas])

  /* Assim essa função só vai ser executado quando ocorrer alguma alteração nos states monitorados. O primeiro parâmetro recebe a função e o segundo parâmetro recebe um array
  com todos os hooks ou states utilizados na respectiva função.*/

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