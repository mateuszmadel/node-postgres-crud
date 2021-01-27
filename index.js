require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

const cors = require('cors');
const router = require('./routes/dbAPI')
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.use('/',router)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})