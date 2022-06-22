import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import './styles/Relatorios.css'
import desligado from '../assets/desligado.png'
import ligado from '../assets/ligado.png'

export default function Relatorio() {
    const [trackInfo, setTrackinfo] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [periodo, setPeriodo] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        setPeriodo(values => ({ ...values, [name]: value }))
    }

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
        return (
            <div>
                <span>Loading...  </span>
                <div class="spinner-border text-dark" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid main">
            <div className="container">
                <div className="container-relatorio">
                    <div className="container-flex">
                        <h1>Relatorios</h1>
                        <form onSubmit={queryData} className="form-group container-top">
                            <input type="datetime-local" name="inicio" value={periodo.inicio} onChange={handleChange} className="form-group" />
                            <input type="datetime-local" name="final" value={periodo.final} onChange={handleChange} className="form-group" />
                            <input type="submit" value={"Pesquisar"} className="btn btn-dark" />
                        </form>
                    </div>
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
                                                                            <td>{!i.gps_status ? <img alt="Icon" src={ligado} /> : <img alt="Icon" src={desligado} />}</td>
                                                                            <td>{!i.ignicao ? <img alt="Icon" src={ligado} /> : <img alt="Icon" src={desligado} />}</td>
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