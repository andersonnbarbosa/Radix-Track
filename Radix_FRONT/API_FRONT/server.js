const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())
app.use(express.json())

app.get('/statusRastreador', async(req,res) => {
    try{

        const {data} = await axios.post('http://radix-track.herokuapp.com/statusRastreador',
        {
            "key" : "vSgKMxLl9x2g",
            "rastreador" : "355227046892428"
        })
    
        return res.json(data)

    }catch (error){
        console.error(error)
    }
})

app.get('/ultimosEventos', async(req,res) => {
    try{

        const {data} = await axios.post('http://radix-track.herokuapp.com/ultimosEventos',
        {
            "key" : "vSgKMxLl9x2g",
            "quant": 40,
        })
    
        return res.json(data)

    }catch (error){
        console.error(error)
    }
})

app.post('/novoVeiculo', async(req,res) => {

    key =  {"key" : "vSgKMxLl9x2g"}
    info = Object.assign(key, req.body)
    try{

        const {data} = await axios.post('http://radix-track.herokuapp.com/novoVeiculo',info)

    }catch (error){
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