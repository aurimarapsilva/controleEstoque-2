import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaAngleLeft,  FaAngleDown} from 'react-icons/fa';
import moment from 'moment';

import Container from '../../components/Container';
import api from '../../services/api';

import './styles.css';

function Moviments() {

    const [dados, setDados] = useState([]);

    // Atualizar dados ao carregar a página
    useEffect(() => {

        async function fetchData(){

            let movimentos = [];

            await api.get('/moviments')
            .then( response => {
                    response.data.forEach(movimento => {
                        movimentos.push(movimento);
                    })
                    setDados(movimentos);   
                }
            ).catch(error => {
                console.log(error)
            })
        }

        fetchData()

    }, [])

    function handleClickShowItens (e){
        e.preventDefault()

        console.log(e)
        e.target.value = !e.target.value

        // setShowItens(!showItens)

        // console.log(showItens)
    }

    return (
        <Container>

            <div className="cabeçalho">
                <h1>Movimentos</h1>
                <button> 
                    <Link to="/newmoviment">
                        <FaPlus color="#000" size={14}/>
                    </Link> 
                </button>
            </div>
            
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Usuário</th>
                            <th>Cliente</th>
                            <th>Forma de Pagamento</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map( movimento => (
                            <React.Fragment key={String(movimento.id)}>
                                <tr>
                                    <td></td>
                                    <td>{movimento.id}</td>
                                    <td>{movimento.type}</td>
                                    <td>{movimento.userMoviments.name}</td>
                                    <td>{movimento.clientMoviments.name}</td>
                                    <td>{movimento.payment_type}</td>
                                    <td>{moment(movimento.createdAt).format('DD/MM/YYYY HH:MM')}</td>
                                    <td>
                                        {false
                                            ? <FaAngleDown color="#000" size={14} onClick={(e) => handleClickShowItens(e)}/>
                                            : <FaAngleLeft color="#000" size={14} onClick={(e) => handleClickShowItens(e)}/>
                                        }
                                    </td>
                                </tr>
                                <tr >
                                    <td colSpan="8">
                                        <table className="subTabela">
                                            <thead>
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Descrição</th>
                                                    <th>Preço</th>
                                                    <th>Quantidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {movimento.movimentItems.map(item => ( 
                                                    <tr key={String(item.id)}>
                                                        <td> {item.product_id} </td>
                                                        <td> {item.movimentsItemsProduct.name} </td>
                                                        <td> {item.price} </td>
                                                        <td> {item.quantity} </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </React.Fragment>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Moviments;