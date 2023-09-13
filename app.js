import express from 'express'
import PostagemController from './controllers/PostagemController.js'
import rootController from './controllers/rootController.js'
import cors from 'cors'
const app = express()
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers","X-PINGOTHER,Content-Type, Authorization")
  app.use(cors())
  next()
})
app.use(express.json())
PostagemController(app)
rootController(app)
export default app