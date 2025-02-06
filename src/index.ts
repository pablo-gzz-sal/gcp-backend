import express from 'express';
import connectDB from './config/dbConn';
import router from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
