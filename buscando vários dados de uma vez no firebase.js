import { useState } from 'react'
import { db } from './firebaseConnection'
import styles from './App.css'
import { doc, setDoc, addDoc, collection, getDoc, getDocs } from 'firebase/firestore'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    //usando um document espeífico neste caso o 'post10'
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

    //usando document criado dinamicamente pelo firebase
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
    // const postRef = doc(db, "posts", "post10")

    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor);
    //   setTitulo(snapshot.data().titulo);
    // })
    // .catch((error) => {
    //   console.log("ERRO " + error);
    // })

    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(lista);
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

        <ul>
          {posts.map( (post) => {
            return(
              <li key={post.id}>
                <span>Titulo: {post.titulo}</span> <br></br>
                <span>Autor: {post.autor}</span> <br></br>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
