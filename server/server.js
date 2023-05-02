const express = require('express')
const app = express()
const PORT = 8000 //will be stored in .env
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config() //will allow us to store PORT variable in .env file

app.use(express.json(), express.urlencoded({ extended: true })) //json middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())

require('./config/mongoose.config')
require('./routes/user.routes')(app) //user routes


app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`))