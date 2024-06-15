import express from "express";
import "dotenv/config";
import UserRoutes from "./Infraestructure/Routes/UserRoutes";


const app = express();

app.use(express.json());

app.use('/api/v1/users', UserRoutes);

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING IN http://localhost:${process.env.PORT}`);
});