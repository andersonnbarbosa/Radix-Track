import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Home.css'
import radix from './assets/radix.png'
import relatorios from './assets/relatorios.png'
import rastreadores from './assets/rastreadores.png'
import veiculos from './assets/veiculos.png'
import cliente from './assets/cliente.png'
import filtro from './assets/filtro.png'

export default function Home() {
    return (
        <div className="container-main">
            <div className="container-logo">
                <span className="logo-radix">
                    <img src={radix} alt="Radix Track" />
                </span>
            </div>
            <div className="container-opcoes">
                <span className="logo-relatorios">
                    <img src={relatorios} alt="Relatorios" />
                </span>
                <span className="logo-rastreadores">
                    <img src={rastreadores} alt="Rastreadores" />
                </span>
                <span className="logo-veiculos">
                    <img src={veiculos} alt="Veiculos" />
                </span>
                <span className="logo-cliente">
                    <img src={cliente} alt="Cliente" />
                </span>
                <div className="container-filter">
                    <span className="logo-filter">
                        <img src={filtro} alt="Filtro" />
                    </span>
                </div>
            </div>
            <div id="map">
                <MapContainer center={[-12.245056, -38.9458136]} zoom={6}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    )
}