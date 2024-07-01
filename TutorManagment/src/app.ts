import express from "express";
import "dotenv/config";
import {router} from "./Infraestructure/Router/TutorRouter";
import { consumeFromQueue } from "./Infraestructure/services/rabitMQConsumer";


const app = express();

app.use(express.json());

app.use('/api/v1/tutors', router);

const PORT = process.env.STUDENT_SERVICE_PORT || 3003;
app.listen(PORT, () => {
    console.log(`Service running on http://localhost:${PORT}`);
    consumeFromQueue(); 
});
