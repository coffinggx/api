import 'dotenv/config'
import connectDB from "./db/index.js";
import  app  from './app.js';

console.log(process.env.PORT);

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`The server is running at http://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Error connecting MONGODB: ", err);
})