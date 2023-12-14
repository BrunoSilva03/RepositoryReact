import { useState } from 'react'
import { db } from './firebaseConnection'
import styles from './App.css'
import { doc, setDoc, addDoc, collection, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
//AULA 76 SECTION 10: FIREBASE
function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState([]);

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


  //deixa a função como assíncrona porque pode demorar um pouco já que vai no banco
  //atualizar algo.
  async function editPost() {

    //Estou passando aqui que quero acessar o documento dentro da collection posts dentro do db que
    //tenha o id fornecido pela state.;
    /*Aqui informa que quero atualizar dentro de posts, dentro do arquivo idPost */
      const docRef = doc(db, "posts", idPost)

      //await para esperar a requisição chegar, e dentro de updateDoc coloca o que quer atualizar no post
      await updateDoc(docRef, {
        titulo: titulo,
        autor: autor,
      })
      .then(
        console.log("POST ATUALIZADO COM SUCESSO!!!"),
        setIdPost(''),
        setTitulo(''),
        setAutor(''),
      )
      .catch((error) => {
        console.log(error)
      })
  }

  //Para deletar o post segue o mesmo padrão dos outros métodos.
  async function excluirPost(id) {
    const deleteRef = doc(db, "posts", id);

    await deleteDoc(deleteRef)
    .then(
      console.log("POST DELETADO COM SUCESSO!!!"),
    )
    .catch((error) => {
      console.log("ERRO: " + error)
    })

  }


  return (
    <div className="App">
      <h1>React JS + Firebase </h1>

      <div className="container">

        {/* Escolhendo o post que vai fazeer o update pelo id*/}
        <label>ID do post</label>
        <input 
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />
        <br></br>

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
        <button onClick={buscarPost}>Buscar Post</button> <br></br>

        <button onClick={editPost}>Atualizar post</button>

        <ul>
          {posts.map( (post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <span>Titulo: {post.titulo}</span> <br></br>
                <span>Autor: {post.autor}</span> <br></br>
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
