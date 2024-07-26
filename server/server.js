const express = require('express')

const app  = express()
const port = 3000

app.listen(port, ()  => {
    console.log(`A szerver fut a ${port}-es porton!`)
})