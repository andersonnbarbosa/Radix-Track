import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Veiculo.css'
import veiculo from '../assets/veiculos.png'

export default function Veiculo() {
    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-veiculo">
                    <h1>Cadastro de Veiculos</h1>
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
                                    <img src={veiculo} alt="Veiculo" className="veiculo-logo" />
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