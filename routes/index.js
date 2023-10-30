import express from "express"
import { index,shorten } from "../controller/api.js";

const apiRoute = express.Router();

apiRoute.route("/").get(index) 
apiRoute.route("/shorten").post(shorten)


export default apiRoute;