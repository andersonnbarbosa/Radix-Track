import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Cliente.css'
import cliente from '../assets/cliente.png'

export default function Cliente() {

    const [dadosCliente, setDadosCliente] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        setDadosCliente(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        console.log(dadosCliente)
        event.preventDefault();
        try {
            fetch('http://localhost:3001/novoCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosCliente)
            })
            setTimeout(() => { window.location.href = "/"; }, 2000);

        } catch {
            console.log("Erro")
        }

    }


    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-cliente">
                    <h1>Cadastro Cliente</h1>
                    <form onSubmit={handleSubmit} className="form-group">
                        <div className="row">
                            <div className="col-4 container-input">
                                <label htmlFor="">Nome</label>
                                <input type="text" name="nome" value={dadosCliente.nome} onChange={handleChange} className="form-group" />
                                <label htmlFor="">CPF/CNPJ</label>
                                <input type="text" name="cpf_cnpj" value={dadosCliente.cpf_cnpj} onChange={handleChange} className="form-group" />
                                <label htmlFor="">CEP</label>
                                <input type="text" name="cep" value={dadosCliente.cep} onChange={handleChange} className="form-group" />
                                <label htmlFor="">Logradouro</label>
                                <input type="text" name="logradouro" value={dadosCliente.logradouro} onChange={handleChange} className="form-group" />
                            </div>
                            <div className="col-4 container-input">
                                <label htmlFor="">Bairro</label>
                                <input type="text" name="bairro" value={dadosCliente.bairro} onChange={handleChange} className="form-group" />
                                <label htmlFor="">Cidade</label>
                                <input type="text" name="cidade" value={dadosCliente.cidade} onChange={handleChange} className="form-group" />
                                <label htmlFor="">Estado</label>
                                <input type="text" name="estado" value={dadosCliente.estado} onChange={handleChange} sclassName="form-group" />
                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={cliente} alt="Cliente" className="cliente-logo" />
                                </div>
                                <div className="container-button">
                                    <input type="submit" value="Salvar" className='btn btn-success' />
                                    <Link to="/">
                                        <button className='btn btn-danger'>Cancelar</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    )
}