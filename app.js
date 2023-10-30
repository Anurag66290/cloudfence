
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose'

import path from "path";
import bodyParser from "body-parser";




import fileUpload from "express-fileupload"
const __dirname = path.resolve();
// console.log("directory-name ", __dirname);
// console.log(path.join(__dirname, "public"), ">>>>>>");
import  fs  from "fs"
import  util  from "util"
import apiRoute from "./routes/index.js";





console.error = console.log;

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());


//--------------------------------
// Set View Engine
//--------------------------------
app.set("view engine", "ejs");
app.set("views", "views");


app.use(fileUpload({
  useTempFiles : true,

}));

// app.use(express.static(path.join(__dirname, "public")));






// client live
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://rajan:kumar@cluster0.vvtoxbl.mongodb.net/demo',{
  useNewUrlParser: true,
     useUnifiedTopology: true
}).then(con=>{
  console.log('Db Connected.....')
}).catch(err=>{
  console.log(err,'=========err=========')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', express.static(path.join(__dirname, 'frontend/build')));
app.use('/*', express.static(path.join(__dirname, 'frontend/build')));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", apiRoute);




const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
