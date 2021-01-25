const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));

app.get('/cars', (req, res) => {
    res.send([
        {
            "id": "abcd",
            "title": "title",
            "content": "content"
        }
    ])
    
})

app.post('/car', (req, res, next, body) => {

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})