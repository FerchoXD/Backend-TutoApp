import express from "express";
import "dotenv/config";
import {router} from "./Infraestructure/Router/TutorRouter";


const app = express();

app.use(express.json());

app.use('/api/v1/tutors', router);

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING IN http://localhost:${process.env.PORT}`);
});