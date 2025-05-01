import express from 'express';
import { carRouter ,inspectionRoute ,saleRoute } from './Routes/routes.mjs';
import cors from 'cors';

const app = express();

app.use(cors({
      origin:'http://localhost:3000',
      methods:['GET','POST','PUT','DELETE'],
}))

const port=process.env.PORT ;

app.listen((5000),()=>{
    console.log(`'hello from ${port}...`)
})
app.use(express.json());

app.use('/api/cars', carRouter);
app.use('/api/inspections', inspectionRoute);
app.use('/api/sales', saleRoute);


