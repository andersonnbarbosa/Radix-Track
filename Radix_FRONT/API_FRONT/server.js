const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/statusRastreador', async(req,res) => {
    try{

        const {data} = await axios.post('http://radix-track.herokuapp.com/statusRastreador',
        {
            "key" : "vSgKMxLl9x2g",
            "rastreador" : 1
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
            "data" : "220618"
        })
    
        return res.json(data)

    }catch (error){
        console.error(error)
    }
})

app.listen('3001')

/*{
    "key" : "vSgKMxLl9x2g",
    "rastreador" : 1
}

http://radix-track.herokuapp.com/statusRastreador

*/