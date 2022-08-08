import express from 'express'
import ResponseDTO from "./types/dtos/response.dto";
import Utils from './utils/utils';
require('dotenv').config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use("/api/organization", require('./routes/organization.routes'));
app.use("/api/metric", require('./routes/metric.routes'));
app.use("/api/tribe", require('./routes/tribe.routes'));
app.use("/api/repository", require('./routes/repository.routes'));

app.get('/VerificationType', async (_req, res) => {
  Utils.setMock()
  const resutl = await Utils.GetVerificationType()
  
  res.status(200).json(new ResponseDTO(true, 'Success', resutl));
});

app.get('*', (_req, res) => {
  res.status(404).json(new ResponseDTO(false, 'Invalid endpoint', null));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}...`)
})

export { app, server }