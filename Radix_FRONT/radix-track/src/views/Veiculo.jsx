import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Veiculo.css'
import veiculo from '../assets/veiculos.png'

export default function Veiculo() {

    const [dados, setDados] = useState({})
    const [clientes, setCliente] = useState([])
    const [rastreadores, setRastreador] = useState([])
    const [status, setStatus] = useState(false)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        setDados(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            fetch('http://localhost:3001/novoVeiculo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(data => {
                document.location.reload()
            })
        }catch (error){
            console.log(error)
        }
    }

    const queryDataCliente = () => {
        try {
            fetch('http://localhost:3001/autocompleteClientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCliente(data)
                    setStatus(true)
                    console.log(data)
                })
        } catch {
            console.log("Erro")
        }
    }

    const queryDataRastreador = () => {
        try {
            fetch('http://localhost:3001/autocompleteRastreador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setRastreador(data)
                    console.log(data)
                })
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
                                <select name="cliente" value={dados.cliente} onChange={handleChange} onClick={queryDataCliente} className="form-group">
                                    {!status ? <option>Selecione Um Cliente</option> :clientes.map((i) => {
                                        return (
                                            <option>{i.nome}</option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="rastreador">Rastreador</label>
                                <select name="rastreador" value={dados.rastreador} onChange={handleChange} onClick={queryDataRastreador} required className="form-group">
                                    
                                    {!status ? <option>Selecione Um Rastreador</option> : rastreadores.map((i) => {
                                        return(
                                            <option>{i.id}</option>
                                        )
                                    })}
                                </select>
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