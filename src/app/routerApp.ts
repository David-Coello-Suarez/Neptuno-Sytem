import express, { Application } from 'express'
import { rrolusu } from '../router'

const routerApp: Application = express()

routerApp.use('/rolusu', rrolusu)

export default routerApp
