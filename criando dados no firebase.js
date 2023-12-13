import { useState } from 'react'
import { db } from './firebaseConnection'
import styles from './App.css'
import { doc, setDoc, addDoc, collection, getDoc } from 'firebase/firestore'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "post10"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADOS REGISTRADOS NO BANCO DE DADOS!")
    // })
    // .catch((error) => {
    //   console.log("GEROU ERRO" + error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("DADOS REGISTRADOS COM SUCESSO!!!");
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log("ERROR " + error);
    })
  }

  async function buscarPost() {
    const postRef = doc(db, "posts", "post10")

    await getDoc(postRef)
    .then((snapshot) => {
      setAutor(snapshot.data().autor);
      setTitulo(snapshot.data().titulo);
    })
    .catch((error) => {
      console.log("ERRO " + error);
    })
  }
  return (
    <div className="App">
      <h1>React JS + Firebase </h1>

      <div className="container">
        <label>Título:</label>
        <textarea 
          type="text"
          placeholder='Digite o título'
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={ (e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button>
      </div>
    </div>
  );
}

export default App;
