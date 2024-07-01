import express from "express";
import "dotenv/config";
import StudentRoutes from "./Infraestructure/Routes/StudentRoutes";
import { consumeFromQueue } from "./Infraestructure/services/rabitMQConsumer";

const app = express();

app.use(express.json());

app.use('/api/v1/students', StudentRoutes);

const PORT = process.env.STUDENT_SERVICE_PORT || 3002;
app.listen(PORT, () => {
    console.log(`Service running on http://localhost:${PORT}`);
    consumeFromQueue(); 
});
