import express, { Application } from 'express'
import { rrolusu, rsideba } from '../router'

const routerApp: Application = express()

routerApp.use('/rolusu', rrolusu)
routerApp.use('/sideba', rsideba)

export default routerApp
