import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Rastreador.css'
import rastreador from '../assets/rastreadores.png'

export default function Rastreador() {
    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-rastreador">
                    <h1>Cadastro de Rastreadores</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-4 container-input">
                                <label htmlFor="">IMEI</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">ID</label>
                                <input type="text" className="form-group" />
                                <label htmlFor="">CHIP</label>
                                <input type="text" className="form-group" />
                            </div>
                            <div className="col-4 container-input">

                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={rastreador} alt="Rastreador" className="rastreador-logo" />
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