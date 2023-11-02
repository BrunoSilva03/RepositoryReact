import React, { Component } from 'react'

{/* Cuidado que na criação da classe não tem () no final
como por exemplo class App extends Component()*/}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: 'Matheus',
      contador: 0
    }

    {/* Essa linha é necessária para que o pai enxergue e consiga utilizar tudo dentro
        da função aumentar.*/}
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);
  }

  aumentar() {
    {/* Na variável todosStates tem todos os nossos states definidos no constructor,
        assim podemos usar qualquer state que quisermos como o contador por exemplo.*/}
    let todosStates = this.state;
    todosStates.contador += 1;
    this.setState(todosStates)
  }

  diminuir() {
    let state = this.state;
    if (state.contador === 0) {
      alert('Opa, o contador chegou a zero.');
      return;
    }

    state.contador -= 1;
    this.setState(state)

  }

  render() {
    return (
      <div>
        <h1>Contador</h1>
        <h3>
          <button onClick={this.diminuir}>-</button>
          {this.state.contador}
          <button onClick={this.aumentar}>+</button>
        </h3>
      </div>
    )
  }
}

export default App