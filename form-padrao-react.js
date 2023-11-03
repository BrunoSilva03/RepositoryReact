import { getDefaultNormalizer } from '@testing-library/react';
import React, { Component } from 'react'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      error: ''
    }

    this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(event) {
    const {nome, email, senha} = this.state //Desestruturando as states para poder usar cada state separadamente.

    if(nome !== '' && email !== '' && senha !== '') {
      this.setState({error: ''}) //set todos os dados estão preenchidos então não tem mensagem de erro
      alert(`Nome: ${nome} \nEmail: ${email} \nSenha: ${senha}`)  //O \n é para quebrar linhas tipo a tag <br></br>

    } else {
      this.setState({error: 'Tem que preencher todos os campos meu parcero'}) //mensagem de erro caso algum item não esteja preenchido
    }


    event.preventDefault() //Aqui vai impedir de atualizar a página quando clica no botão de submit
    
                        
  }


  render() {
    return(
      <div>
        <h1>Tela de Cadastro</h1>
        {this.state.error && <p>{this.state.error}</p>} {/* se tiver algum erro vai mostar, se não tiver não vai mostrar nada*/}
        <form onSubmit={this.cadastrar}>
          <label htmlFor="name">Nome:</label> <input type="text" id="name"
                 onChange={(e) => this.setState({nome: e.target.value})}></input><br></br><br></br>

          <label htmlFor="email">Email:</label> <input type="email" id="email"
                 onChange={(e) => this.setState({email: e.target.value})}></input><br></br><br></br>

          <label htmlFor="senha">Senha:</label> <input type="password" id="senha"
                 onChange={(e) => this.setState({senha: e.target.value})}></input><br></br><br></br>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
  }

}



export default App