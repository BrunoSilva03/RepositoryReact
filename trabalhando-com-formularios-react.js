import React, { Component } from 'react'

class App extends Component {

  constructor(props) {
    super(props);

    {/* definindo o valor de email de uma vez inicialmente ele(o usuário) não pode mudar 
          o valor de email */}
    this.state = {
      email: 'pandalindinho@gmail.com',
      senha: ''
    }

     this.insereEmail = this.insereEmail.bind(this);
  }

  

  insereEmail(e) {
    {/* agora dá para inserir um novo email mesmo com o valor padrão vindo como
      pandalindinho@gmail.com*/};
    let valorDigitado = e.target.value;
    this.setState({email: valorDigitado});
  }

  render() {
    return(
      <>
        <h1>Login:</h1>
        email:
        {/* definindo o valor de email de uma vez inicialmente ele(o usuário) não pode mudar o valor de email */}
      
        <input type="email" id="idemail" name="email" value={this.state.email} onChange={this.insereEmail}></input>

        senha:
        <input type="password" id="idsenha" name="senha" value={this.state.senha}
        onChange={(e) => this.setState({senha: e.target.value})}></input>
        {/* Aqui fez a mesmo coisa que fez no método insereEmail, só que em uma linha só.*/}
      </>
    )
  }
}

export default App