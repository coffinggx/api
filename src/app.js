import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

import router from './routes/blogs.routes.js'
app.use("/api", router)
export default app