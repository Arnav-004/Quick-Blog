import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import cors from 'cors'
import adminRouter from "./routes/adminRoutes.js"
import blogRouter from "./routes/blogRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())




// main routes
app.get("/", (req, res) => {res.send("API is working")})
app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)






// connect to database and start listening to port

const PORT = process.env.PORT || 3000


async function start_server() {
    try{
        // when connected to the database, log a message
        mongoose.connection.on('connected', () => console.log("Database connected Succesfully"))
        // connection to MongoDB
        await mongoose.connect(process.env.MONGO_URI + "BlogbyU")
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        })  
    }catch(err) {
        console.error("Error connecting to the database!!!", err)
    }
}

start_server()