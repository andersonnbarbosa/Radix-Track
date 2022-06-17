import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import './Home.css'
import radix from './assets/radix.png'
import relatorios from './assets/relatorios.png'
import rastreadores from './assets/rastreadores.png'
import veiculos from './assets/veiculos.png'
import cliente from './assets/cliente.png'
import filtro from './assets/filtro.png'

export default function Home() {
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
                <div id="map" className='container'>
                    <MapContainer center={[-12.245056, -38.9458136]} zoom={6}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}