import React, { Component } from 'react'

class App extends Component {

  constructor(props) {
    super(props);

    {/* em projetos muito longos o ideal é fazer um objeto com todos os atributos
        de uma vez para ter menos trabalho e linhas de código */}
    this.state = {
      form : {
        nome: 'pinguim',
        email: 'pinguin12345@gmail.com',
        senha: 'pinguim123456',
        sexo: 'masculino'
      }
    }

     this.dadosForm = this.dadosForm.bind(this);
     
  }

  

  dadosForm(e) {
    //Desestruturando o objeto form dentro do state, para todos os atributos do objeto
    //form estarem dentro dessa variável form
    let form = this.state.form;

    //vai identificar qual input está acessando pelo name, e vai atribuir o valor digitado
    //ou marcado no input recebendo o e.target.value.
    //se o formulário for email por exemplo ele vai receber o que digitei
    //no formulário email por exemplo
    form[e.target.name] = e.target.value;

    this.setState({form: form});
    //Agora atribuindo ao objeto/state form o valor do form que foi atribuído na linha anterior.
  }

  render() {
    return(
      <>
        <h1>Login:</h1>
        nome:
        <input type="text" id="idnome" name="nome" value={this.state.form.nome} 
        onChange={this.dadosForm}/><br /> <br />


        email:
        <input type="email" id="idemail" name="email" value={this.state.form.email} onChange={this.dadosForm}></input>
        <br></br>
        <br></br>

        senha:
        <input type="password" id="idsenha" name="senha" value={this.state.form.senha}
        onChange={this.dadosForm}></input>
        {/* Aqui fez a mesmo coisa que fez no método insereEmail, só que em uma linha só.*/}
        <br></br>
        <br></br>


        sexo:
        <select id="idselect" value={this.state.sexo} name="sexo" onChange={this.dadosForm}>
          <option>Masculino</option>
          <option>Feminino</option>
        </select>
      </>
    )
  }
}

export default App