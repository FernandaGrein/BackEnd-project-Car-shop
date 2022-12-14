import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoutes';
import motoRoutes from './Routes/MotoRoutes';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motoRoutes);
app.use(ErrorHandler);

export default app;
