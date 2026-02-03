import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { router } from "./routes/productRoute";
dotenv.config({ path: '.env' })
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use('/api', router)
mongoose.connect(process.env.MONGO_URL as string)
.then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});
app.listen(port, () => {
    console.log(`app listening on ${port} `)
})
export default app