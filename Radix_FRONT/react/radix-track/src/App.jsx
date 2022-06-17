import React from 'react'
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import Home from './Home'
import Veiculos from './Veiculo'
import Cliente from './Cliente'
import Rastreador from './Rastreador'


export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/cliente">
                    <Cliente />
                </Route>
                <Route path="/veiculos">
                    <Veiculos />
                </Route>
                <Route path="/rastreadores">
                    <Rastreador />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}