import express from 'express'
import { router } from './routes/routes'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 2000
app.use(express.json({limit: '50mb'}))
app.use(cors({
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }))
app.use('/api', router)
app.all('/', (req, res) => {
    res.status(200).send('API server id active...!')
})
app.all("*", (req, res) => {
    res.status(404).send('(¯\\_(ツ)_/¯) : API not found...!')
})
app.listen(port, () => console.log(`Listening on port ${port}`))