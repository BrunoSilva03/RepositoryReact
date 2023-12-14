import { useState, useEffect } from 'react'
import { db, auth } from './firebaseConnection'
import styles from './App.css'
import { doc, setDoc, addDoc, collection, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState([]);

  useEffect(() => {
    async function loadPosts() {
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

  async function novoUsuario() {
    //criando o novo usuário no banco de dados com email e senha,
    //1º parâmetro, a conexão, 2º parâmetro nesse caso a state email
    //e 3º parâmetro a state senha
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      //esse value que vem no then são informações úteis do usuário
      //é sempre bom colocar no log para te auxiliar
      console.log("USUÁRIO(A) CADASTRADO(A) COM SUCESSO!!!")
      console.log(value)
      setEmail('')
      setSenha('')
    })
    .catch((error) => {
        //os erros tem códigos pré-definidos, o firebase aceita senhas de no mínimo
          //6 dígitos, se a senha tiver menos de 6 dígitos(for fraca) o código é esse 
          //por exemplo
          if(error.code === 'auth/weak-password') {
            alert("Senha muito fraca.")
          } else if(error.code === 'auth/email-already-in-use') {
            alert("Esse Email já existe!")
          }
          })
    
  }

  return (
    <div className="App">
      <h1>React JS + Firebase </h1>

      <div className="container">
        <h2>Usuário</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite um e-mail"
          /> <br />

          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Informe a senha"
            /> <br />

            <button onClick={novoUsuario}>Cadastrar</button>
      </div>

<hr />  <br /> <br/>
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
