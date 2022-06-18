import React from 'react'
import { Link } from 'react-router-dom'
import './Relatorios.css'
import relatorio from './assets/relatorios.png'


export default function Relatorio() {

    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-relatorio">
                    <h1>Relatorios</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-8">
                                <table class="table">
    
                                </table>
                                    </div>
                                    <div className="col-4">
                                        <div className="container-logo justify-content-center">
                                            <img src={relatorio} alt="Relaatorio" className="relatorio-logo" />
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