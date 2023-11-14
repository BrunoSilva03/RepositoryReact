import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <h1>Home - Página principal</h1>

            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
        </>
    )
}

export default Home