import express from 'express';
import authRouter from "./Routes/routes.js";
import cors from 'cors';
import gptRouters from './Routes/gptRouters.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/gpt', gptRouters);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});