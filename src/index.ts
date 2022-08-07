import express from 'express'
require('dotenv').config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use( "/api/organization", require('./routes/organization.routes'));
app.use( "/api/metric", require('./routes/metric.routes'));
app.use( "/api/tribe", require('./routes/tribe.routes'));
app.use( "/api/repository", require('./routes/repository.routes'));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})

export { app, server } //https://www.englishtag.com/tests/level_test.asp