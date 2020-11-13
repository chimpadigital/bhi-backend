import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import pkg from '../package.json'
import dontenv from 'dotenv'

import { createRole } from './libs/initial'

import routesAuth from './routes/auth.routes'

const app = express()
dontenv.config()
createRole()

app.set('pkg', pkg)
app.set('port', process.env.PORT || 7000)

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/api', (req, res) => res.json({
  name: app.get('pkg').name,
  author: app.get('pkg').author,
  version: app.get('pkg').version
}))

app.use('/api/auth', routesAuth)
 
export default app