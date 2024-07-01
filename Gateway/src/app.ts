import express, {Application} from "express";
import morgan from "morgan";

import "dotenv/config"
import {Signale} from "signale";
import proxy from "express-http-proxy";

const app:Application = express();
const signale = new Signale();

app.use(morgan('dev'));

const PORT = 3000 || process.env.PORT;
const AUTHPORT = 3001 || process.env.AUTH;
const STUDENTPORT = 3002 || process.env.STUDENT;
const TUTORPORT = 3003 || process.env.TUTOR;

app.use('/api/v1/auth',proxy(`http://localhost:${AUTHPORT}`));
app.use('/api/v1/students',proxy(`http://localhost:${STUDENTPORT}`));
app.use('/api/v1/tutors',proxy(`http://localhost:${TUTORPORT}`));

app.listen(PORT, () => {
    signale.success(`Servicio corriendo en http://localhost:${PORT}`);
});