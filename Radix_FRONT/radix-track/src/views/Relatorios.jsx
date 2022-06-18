import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles/Relatorios.css'
import relatorio from '../assets/relatorios.png'

export default function Relatorio() {
    const [trackInfo, setTrackinfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    function queryData(){
        setLoading(true)
        fetch('http://localhost:3001/statusRastreador')
            .then(response => response.json())
            .then(data => {
                setTrackinfo(data);
                setLoading(false)
            });
        }
    useEffect(() => {
        queryData();
    },[])

    if(isLoading){
        return (<p>Loading...</p>)
     }

    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-relatorio">
                    <h1>Relatorios</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-8">
                                <ul>
                                   <li>{trackInfo.latitude}</li>
                                    <li>{trackInfo.longitude}</li>
                                </ul>
                            </div>
                            <div className="col-4">
                                <div className="container-logo justify-content-center">
                                    <img src={relatorio} alt="Relatorio" className="relatorio-logo" />
                                </div>
                                <div className="container-button">
                                    <button className='btn btn-success'>Salvar</button>
                                    <button className="btn" onChange>Atualizar</button>
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