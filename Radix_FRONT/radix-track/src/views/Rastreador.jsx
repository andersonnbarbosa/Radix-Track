import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Rastreador.css'
import rastreador from '../assets/rastreadores.png'
import Chip from '../components/Chip'

export default function Rastreador() {

    const [viewChip, setViewchip] = useState(false)
    const [dados, setDados] = useState({})
    const [chips, setChips] = useState([])

    const handleView = () => {
        if (viewChip) {
            setViewchip(false)
        } else {
            setViewchip(true)
        }
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        setDados(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:3001/novoRastreador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            setTimeout(() => { window.location.href = "/"; }, 2000);

        } catch {
            console.log("Erro")
        }

    }

    const queryData = () => {
        try {
            fetch('http://localhost:3001/autocompleteChip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setChips(data)
                    console.log(data)
                 })
        } catch {
            console.log("Erro")
        }
    }

    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-rastreador">
                    <h1>Cadastro de Rastreadores</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-4 container-input">
                                <label htmlFor="">IMEI</label>
                                <input type="text" name="imei" value={dados.imei} onChange={handleChange} className="form-group" />
                                <label htmlFor="">ID</label>
                                <input type="text" name="id" value={dados.id} onChange={handleChange} className="form-group" />
                                <label htmlFor="">CHIP</label>
                                <div className="container-flex">
                                    <select type="text" name="chip" value={dados.chip} onChange={handleChange} onClick={queryData} className="form-select form-select-sm">
                                        <option selected>Selecione um Chip</option>
                                        {chips.map((i) =>{
                                            return(
                                                <option>{i.iccid}</option>
                                            )
                                        })}
                                    </select>
                                    {viewChip ? <></> :
                                        <button type="button" onClick={handleView} aria-pressed="false">Cadastrar Chip</button>
                                    }
                                </div>
                            </div>
                            <div className="col-4 container-input">
                                {viewChip ? <Chip viewChip={setViewchip} /> : <></>}
                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={rastreador} alt="Rastreador" className="rastreador-logo" />
                                </div>
                                <div className="container-button">
                                    <input type="submit" className='btn btn-success' onClick={handleSubmit} value="Salvar" />
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