import { useParams } from 'react-router-dom'

function Produto() {

    //nome do parâmetro que vem com o useParams na url, como nomeou lá no routes.js como id, aqui nomeia como id também.
    const { id } = useParams();
    return(
        <p>o produto que você escolheu tem o id de {id}</p>
    )
}

export default Produto