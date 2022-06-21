import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import './styles/Home.css'
import radix from '../assets/radix.png'
import relatorios from '../assets/relatorios.png'
import rastreadores from '../assets/rastreadores.png'
import veiculos from '../assets/veiculos.png'
import cliente from '../assets/cliente.png'
import filtro from '../assets/filtro.png'

export default function Home() {

    const [trackInfo, setTrackinfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    function queryData() {
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
    }, [])

    if (isLoading) {
        return (
            <div>
                <span>Loading...  </span>
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row container-row justify-content-around w-auto p-3 bg-transparent">
                <div className="col-1">
                    <div className="container-logo">
                        <span className="logo-radix">
                            <Link to="/">
                                <img src={radix} alt="Radix Track" />
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="container-opcoes">
                        <span className="logo-relatorios">
                            <Link to="/relatorios">
                                <img src={relatorios} alt="Relatorios" />
                            </Link>
                        </span>
                        <span className="logo-rastreadores">
                            <Link to="/rastreadores">
                                <img src={rastreadores} alt="Rastreadores" />
                            </Link>
                        </span>
                        <span className="logo-veiculos">
                            <Link to="/veiculos">
                                <img src={veiculos} alt="Veiculos" />
                            </Link>
                        </span>
                        <span className="logo-cliente">
                            <Link to="/cliente">
                                <img src={cliente} alt="Cliente" />
                            </Link>
                        </span>

                    </div>
                </div>
                <div className="col-1">
                    <div className="container-filter">
                        <span className="logo-filter">
                            <Link to="/filter">
                                <img src={filtro} alt="Filtro" />
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div id="container-map" className='container-flex'>
                            <MapContainer center={[-12.245056, -38.9458136]} zoom={15}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[trackInfo.latitude, trackInfo.longitude]}>
                                    <Popup>
                                        <div className="card popup-card">
                                            <div className="card-header">
                                                {trackInfo.placa} - {trackInfo.rastreador}
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <th>Velocidade</th>
                                                        <th>Ult. comunicação</th>
                                                        <th>GPS status</th>
                                                        <th>Ignição</th>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{trackInfo.velocidade}Km</td>
                                                            <td>{trackInfo.hora} {trackInfo.data}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}