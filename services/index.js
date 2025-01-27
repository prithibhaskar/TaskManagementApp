import express, { json } from 'express';
import cors from 'cors';
const app = express();
import userRouter from './routes/users.js';
import loginRouter from './routes/auth.js';
const PORT = process.env.PORT || 3000;

app.use(cors({origin: 'http://localhost:8000'}));

app.use(json());

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Internal Server Error"});
});

app.listen(PORT, () => {
    console.log("Listening on", PORT);
});
