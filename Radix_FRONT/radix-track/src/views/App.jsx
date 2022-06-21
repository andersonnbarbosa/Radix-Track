import React from 'react'
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import Home from './Home'
import Veiculos from './Veiculo'
import Cliente from './Cliente'
import Rastreador from './Rastreador'
import Relatorios from './Relatorios'

export default function App(){

    return (
        <Router>
            <Switch>
                <Route path="/cliente" exact>
                    <Cliente />
                </Route>
                <Route path="/veiculos" exact>
                    <Veiculos />
                </Route>
                <Route path="/rastreadores" exact>
                    <Rastreador />
                </Route>
                <Route path="/relatorios" exact>
                    <Relatorios />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}