import "./Login.css"
import React, { useState }from 'react'
import radix from '../assets/radix.png'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        < div className="container-flex" >
            <div className="container-login">
                <div className="wrap-login">
                    <form action="" className="login-form">
                        <span className="login-form-title">
                            <img src={radix} alt="Radix Track" />
                        </span>
                        <span className="login-form-title">Bem Vindo!</span>
                        <div className="wrap-input">
                            <input className={email !== "" ? 'has-val input':'input'}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                            <span className="focus-input" data-placeholder="Email"></span>
                        </div>
                        <div className="wrap-input">
                            <input className={password !== "" ? 'has-val input':'input'}
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                            <span className="focus-input" data-placeholder="Password"></span>
                        </div>
                        <div className="container-login-form-btn">
                            <button className="login-form-btn">Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
}