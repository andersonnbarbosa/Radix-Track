import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import './styles/Relatorios.css'

export default function Relatorio() {
    const [trackInfo, setTrackinfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    function queryData() {
        setLoading(true)
        fetch('http://localhost:3001/ultimosEventos')
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
        return (<p>Loading...</p>)
    }

    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-relatorio">
                    <h1>Relatorios</h1>
                    <form action="" className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <div className="container-fluid container-table">
                                    <table className="table table-striped">
                                        <thead>
                                            <th>Data</th>
                                            <th>Hora</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Placa</th>
                                            <th>Rastreador</th>
                                        </thead>
                                        <tbody>
                                            {trackInfo.map((i) => {
                                                return (
                                                    <tr>
                                                        <td>{i.data}</td>
                                                        <td>{i.hora}</td>
                                                        <td>{i.latitude}</td>
                                                        <td>{i.longitude}</td>
                                                        <td>{i.placa}</td>
                                                        <td>{i.rastreador}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="container-fluid container-map">
                                    <MapContainer center={[-12.245056, -38.9458136]} zoom={15}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {trackInfo.map((i) => {
                                            return (
                                                <Marker position={[i.latitude, i.longitude]}>
                                                    <Popup>
                                                        <div class="card popup-card">
                                                            <div class="card-header">
                                                                {i.placa} - {i.rastreador}
                                                            </div>
                                                            <div class="card-body">
                                                                <table className="table table-striped">
                                                                    <thead>
                                                                        <th>Velocidade</th>
                                                                        <th>Ult. comunicação</th>
                                                                        <th>GPS status</th>
                                                                        <th>Ignição</th>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{i.velocidade}Km/h</td>
                                                                            <td>{i.hora} {i.data}</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            )
                                        })}
                                    </MapContainer>
                                </div>
                                <div className="container-button container-flex justify-content-center">
                                    <button className='btn btn-success'>Salvar</button>
                                    <button className='btn btn-secondary' onChange>Atualizar</button>
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