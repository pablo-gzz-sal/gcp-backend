import express from 'express';
import connectDB from './config/dbConn';
import router from './routes/auth';
import dotenv from 'dotenv'
import cors from "cors";
import { setupSwagger } from './swagger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json())

connectDB()

app.use('/api/auth', router);

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
