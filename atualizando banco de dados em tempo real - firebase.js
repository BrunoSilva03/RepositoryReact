import { useState, useEffect } from 'react'
import { db } from './firebaseConnection'
import styles from './App.css'
import { doc, setDoc, addDoc, collection, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState([]);

  //useEffect para sempre que o componente for montado realizar estas seguintes ações:
  useEffect(() => {
    async function loadPosts() {
      //onSnapshot fica verificando no nosso banco de dados se existe alguma alteração no 
      //local monitorado, nesse caso estamos monitorando a collection posts, então sempre que
      //houver alguma alteração na collection posts o onSnapshot ficará sabendo.
      //e esse snapshot depois da vírgula são os dados que recebemos de cada document
      //igual na função buscarPosts
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPosts = [];

        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })

        setPosts(listaPosts)
      })
    }

    //Chamando a função loadPosts assim que o componente for montado
    loadPosts();
  }, [])

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


 
  async function editPost() {

    
      const docRef = doc(db, "posts", idPost)

     
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
