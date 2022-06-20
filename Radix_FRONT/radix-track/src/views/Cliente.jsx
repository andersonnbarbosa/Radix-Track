import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Cliente.css'
import cliente from '../assets/cliente.png'

export default function Home() {
    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-cliente">
                    <h1>Cadastro Cliente</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-4 container-input">
                                <label htmlFor="">Nome</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">CPF/CNPJ</label>
                                <input type="text" className="form-group" />
                            </div>
                            <div className="col-4 container-input">

                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={cliente} alt="Cliente" className="cliente-logo" />
                                </div>
                                <div className="container-button">
                                    <button className='btn btn-success'>Salvar</button>
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