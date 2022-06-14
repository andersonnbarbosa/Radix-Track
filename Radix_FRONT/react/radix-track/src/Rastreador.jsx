import React from 'react'
import './Rastreador.css'
import rastreador from './assets/rastreadores.png'

export default function Home() {
    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-rastreador">
                    <h1>Cadastro de Rastreadores</h1>
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
                                    <img src={rastreador} alt="Rastreador" className="rastreador-logo" />
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