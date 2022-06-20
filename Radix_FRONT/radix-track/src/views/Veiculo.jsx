import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import './styles/Veiculo.css'
import veiculo from '../assets/veiculos.png'

export default function Veiculo() {

    const [dados, setDados] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        setDados(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:3001/novoVeiculo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            document.location.reload();
        } catch {
            console.log("Erro")
        }

    }

    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-veiculo">
                    <h1>Cadastro de Veiculos</h1>
                    <form onSubmit={handleSubmit} className="form-group">
                        <div className="row">
                            <div className="col-4 container-input">
                                <label htmlFor="placa">Placa</label>
                                <input type="text" name="placa" value={dados.placa} onChange={handleChange} className="form-group" />
                                <label htmlFor="renavam">Renavam</label>
                                <input type="text" name="renavam" value={dados.renavam} onChange={handleChange} className="form-group" />
                                <label htmlFor="modelo">Modelo</label>
                                <input type="text" name="modelo" value={dados.modelo} onChange={handleChange} className="form-group" />
                                <label htmlFor="fabricante">Fabricante</label>
                                <input type="text" name="fabricante" value={dados.fabricante} onChange={handleChange} className="form-group" />
                            </div>
                            <div className="col-4 container-input">
                                <label htmlFor="cliente">Cliente</label>
                                <input type="text" name="cliente" value={dados.cliente} onChange={handleChange} className="form-group" />
                                <label htmlFor="rastreador">Rastreador</label>
                                <input type="text" name="rastreador" value={dados.rastreador} onChange={handleChange} className="form-group" />
                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={veiculo} alt="Veiculo" className="veiculo-logo" />
                                </div>
                                <div className="container-button">
                                    <input type="submit" className='btn btn-success' value="Salvar" />
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