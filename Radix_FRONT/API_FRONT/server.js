const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())
app.use(express.json())

var key = { "key": "vSgKMxLl9x2g" }

app.get('/statusRastreador', async (req, res) => {
    try {

        const { data } = await axios.post('http://radix-track.herokuapp.com/statusRastreador',
            {
                "key": "vSgKMxLl9x2g",
                "rastreador": "355227046892428"
            })

        return res.json(data)

    } catch (error) {
        console.error(error)
    }
})

app.get('/ultimosEventos', async (req, res) => {
    try {

        const { data } = await axios.post('http://radix-track.herokuapp.com/ultimosEventos',
            {
                "key": "vSgKMxLl9x2g",
                "quant": 40,
            })

        return res.json(data)

    } catch (error) {
        console.error(error)
    }
})

app.post('/novoVeiculo', async (req, res) => {

    info = Object.assign(key, req.body)
    try {

        const { data } = await axios.post('http://radix-track.herokuapp.com/novoVeiculo', info)
        console.log(req.body)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.post('/novoRastreador', async (req, res) => {

    info = Object.assign(key, req.body)
    console.log(req.body)
    try {

        const { data } = await axios.post('http://radix-track.herokuapp.com/novoRastreador', info)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.post('/novoChip', async (req, res) => {

    info = Object.assign(key, req.body)

    try {
        const { data } = await axios.post('http://radix-track.herokuapp.com/novoChip', info)
    } catch (error) {
        console.error(error)
    }
    console.log(req.body)
    res.status(200).send()
})

app.post('/novoCliente', async (req, res) => {

    info = Object.assign(key, req.body)

    try {
        const { data } = await axios.post('http://radix-track.herokuapp.com/novoCliente', info)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.post('/autocompleteChip', async (req, res) => {
    try {
        const { data } = await axios.post('http://radix-track.herokuapp.com/autocompleteChip', key)
        return res.json(data)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.post('/autocompleteRastreador', async (req, res) => {
    try {
        const { data } = await axios.post('http://radix-track.herokuapp.com/autocompleteRastreador', key)
        return res.json(data)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.post('/autocompleteVeiculos', async (req, res) => {
    try {
        const { data } = await axios.post('http://radix-track.herokuapp.com/autocompleteVeiculo', key)
        return res.json(data)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.post('/autocompleteClientes', async (req, res) => {
    try {
        const { data } = await axios.post('http://radix-track.herokuapp.com/autocompleteCliente', key)
        return res.json(data)
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})


app.listen('3001')

/*{
    "key" : "vSgKMxLl9x2g",
    "rastreador" : 1
}

http://radix-track.herokuapp.com/statusRastreador

*/