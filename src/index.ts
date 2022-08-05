import express from 'express'
require('dotenv').config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use( "/organization", require('./routes/organization.routes'));
app.use( "/metric", require('./routes/metric.routes'));
app.use( "/tribe", require('./routes/tribe.routes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})

export default { app }