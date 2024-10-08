import express, { Request, Response, NextFunction } from 'express'
import { AppError } from './Errors/AppError'
import { routes } from './Routes'
import connectDB from './db/conn'
var cors = require('cors')

import 'dotenv/config'
import 'express-async-errors'
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

app.listen(process.env.PORT, () => {
    console.log("🚀 Server on port: " + process.env.PORT)
})

export { app }