import React, { useState } from "react";
import './Chip.css'

export default function Chip({viewChip}) {
    const [input, setInput] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        setInput(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            fetch('http://localhost:3001/novoChip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            });
            viewChip(false)
        } catch {
            console.log("Erro")
        }

    }

    return (
        <div className="container-fluid container-chip">
            <form action="" className="form-group">
                <label htmlFor="iccid">ICCID</label>
                <input type="text" name="iccid" value={input.iccid} onChange={handleChange} className="form-group" />
                <label htmlFor="linha">Linha</label>
                <input type="text" name="linha" value={input.linha} onChange={handleChange} className="form-group" />
                <label htmlFor="operadora">Operadora</label>
                <input type="text" name="operadora" value={input.operadora} onChange={handleChange} className="form-group" />
                <input className="btn" onClick={handleSubmit} value={"Cadastrar"}/>
            </form>
        </div>
    )
}