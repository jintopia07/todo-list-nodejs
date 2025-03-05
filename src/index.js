import bodyParser from "body-parser";
import express from "express";
import { router as todoRouter } from "./modules/controller";
import mongoose from "mongoose";



const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(todoRouter);


app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  await mongoose.connect('mongodb+srv://admin1:1234@cluster0.ihcsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
});


