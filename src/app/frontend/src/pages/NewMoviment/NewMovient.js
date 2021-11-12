import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { FaPlus, FaSearch } from 'react-icons/fa';

import Container from "../../components/Container";
import api from "../../services/api";

import {Form, SubmitButton, Produto, List, Header} from './style';



function NewMoviment() {

    const [usuarios, setUsuarios] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [quantidadeProduto, setquantidadeProduto] = useState(0);
    const [produto, setProduto] = useState(0);
    const [sendProdutos, setSendProdutos] = useState([]);

    useEffect (() => {

        async function fetchData() {

            await api.get('/users')
            .then(response => {

                const usuarios = response.data.filter(user => user.active)

                setUsuarios(usuarios);
            })
            .catch(error => {
                console.log(error)
            }) 

            await api.get('/products')
            .then(response => {

                const produtos = response.data.map(user => user)

                setProdutos(produtos);
            })
            .catch(error => {
                console.log(error)
            }) 
        }

        fetchData()

    }, [])


    async function handleSendMoviment(e){
        // e.preventDefault();

        const type = document.getElementById('typeMoviments').value; 
        // nf,  
        const client_id = document.getElementById('client').value;
        const user_id = document.getElementById('user').value;
        const payment_type = document.getElementById('typePayments').value;
        const items  = [];

        sendProdutos.forEach(product => {
            items.push({ product_id: product.product_id,
                         quantity: product.quantity})
        })

        api.post(`/users/${user_id}/moviments`, {
            type,
            client_id,
            payment_type,
            items
        })
        .then(response => {
            console.log(response.data)
        })
    }

    function handleQauntityProduct  (e)  {
        setquantidadeProduto(e.target.value)
    }

    function handleProduct (e){
        setProduto(e.target.value)
    }

    function handleAddProducts (e) {
        e.preventDefault();

        
        let sendProduto = Array.from(sendProdutos);
        
        const product = produtos.map(prod => {
            if (prod.id === Number(produto)) { 
                return prod
            }
            return null
        })

        console.log(product)

        if(produto && quantidadeProduto){

            sendProduto.push({
                product_id: produto,
                price: product.price,
                quantity: quantidadeProduto
            })

            setSendProdutos( sendProduto )
            setProduto('')
            setquantidadeProduto('')

            document.getElementById("product").value = ""
            document.getElementById("productQuantity").value = ""
        }
        else {
            alert('Precisa preencher todos os campos do produto')
        }
        
    }

    return(
        
        <Container>
            <Header>
                <h1>Novo movimento</h1>
                <Link to = "/moviments">
                    <FaSearch color="#000" size={14} />
                </Link>
            </Header>

            <Form onSubmit={() => {}}>


                <p>Tipo de movimento</p>
                <select name="typeMoviments" id="typeMoviments"> 
                    <option value=""></option>
                    <option value="E">E</option>
                    <option value="S">S</option>
                </select>

                <p>Forma de pagamento</p>
                <select name="typePayments" id="typePayments"> 
                    <option value=""></option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de credito">Cartão de credito</option>
                    <option value="Pix">Pix</option>
                </select>

                <p>Vendedor</p>
                <select name="user" id="user"> 
                    <option value=""></option>
                    {usuarios.map( usuario => (
                        <option 
                            key={String(usuario.id)} 
                            value={usuario.id}>
                                {usuario.name}
                        </option>
                    ))}
                </select>

                <p>Cliente</p>
                <select name="client" id="client"> 
                    <option value=""></option>
                    {usuarios.map( usuario => (
                        <option 
                            key={String(usuario.id)} 
                            value={usuario.id}>{usuario.name}
                        </option>
                    ))}
                </select>

                <Produto>
                    <div>
                        <p>Produtos</p>
                        <select 
                            name="produtos" 
                            id={`product`}
                            onChange={ e => handleProduct(e)}> 
                            <option value=""></option>
                            {produtos.map( produto => (
                                <option 
                                    key={String(produto.id)} 
                                    value={produto.id}>{produto.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <p>Quantidade</p>
                        <input 
                        id = "productQuantity"
                        onChange={ e => handleQauntityProduct(e)}
                        type = "number" 
                        placeholder="" />
                    </div>
                    <div>
                        <button onClick={e => handleAddProducts(e)}> 
                            <FaPlus color="#000" size={14}/>
                        </button>
                    </div>
                </Produto>
                
                <List>
                    <li>
                        <span>Pruduto</span> 
                        <span>Preço</span>
                        <span>Quantidade</span>
                        <span>Total do item</span>
                    </li>  
                    {sendProdutos.map(  (produto, index) => (
                        <li key={String(index)}>
                            <span>{produto.product_id} </span> 
                            <span>{produto.price} </span>
                            <span>{produto.quantity} </span>
                            <span>{produto.price * produto.quantity} </span>
                        </li>   
                    ))}
                </List>
                
            
            <SubmitButton onClick={ e => handleSendMoviment(e)}> Enviar </SubmitButton>
            </Form>

        </Container>
    )
}

export default NewMoviment;