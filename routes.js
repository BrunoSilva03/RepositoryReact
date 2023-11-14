import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Navbar from './navbar/Navbar'
import Produto from './pages/Produto'
import Erro from './pages/Erro'

function RoutesApp() {
    return (
        <>
           

            <Router>

            <Navbar />

                <Routes>

                    <Route exact path="/" element={<Home />} />

                    <Route path="/sobre" element={<Sobre />} />

                    <Route path="/contato" element={<Contato />} />

                    {/* : mais o nome do parâmetro que você quer colocar, nesse caso id*/}
                    <Route path="/produto/:id" element={<Produto />} />

                    {/* A rota de default para páginas de erro tem sempre que ser a última para dar certo*/}
                    <Route path="*" element={ <Erro />} />

                </Routes>


            </Router>
        </>
    )

}

export default RoutesApp