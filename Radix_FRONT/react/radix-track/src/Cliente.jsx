import React from 'react'
import './Cliente.css'
import radix from './assets/radix.png'
import cliente from './assets/cliente.png'

export default function Home() {
    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-cliente">
                    <h1>Cadastro Cliente</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-4 container-input">
                                <label htmlFor="">input</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">input</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">input</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">input</label>
                                <input type="text" className="form-group" />
                            </div>
                            <div className="col-4 container-input">
                                <label htmlFor="">input</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">input</label>
                                <input type="text" className="form-group" />
                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={cliente} alt="Cliente" className="cliente-logo" />
                                </div>
                                <div className="container-button">
                                    <button className='btn btn-success'>Salvar</button>
                                    <button className='btn btn-danger'>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    )
}