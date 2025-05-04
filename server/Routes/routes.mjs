import express from 'express';
import fs from 'fs/promises'; 
import { v4 as uuidv4 } from 'uuid';



export const carRouter=express.Router();
export const inspectionRoute=express.Router();
export const saleRoute=express.Router();




carRouter.get('/',async(req,res)=>{
       
    try {
        // Asynchronously read the content of the cars.json file
        const data = await fs.readFile('./Data/cars.json', 'utf8');
    
        // Parse the JSON string into a JavaScript object or array
        const cars = JSON.parse(data);
    
        // Send the parsed car data as a JSON response
       return res.status(200).send(JSON.stringify(cars));
       
    
      } catch (error) {
        console.error('Error reading cars.json:', error);
        res.status(500).json({ error: 'Failed to retrieve car data.' });
      }


})

carRouter.post('/',async(req,res)=>{
       
    try {

        const newCar=req.body;
        // Asynchronously read the content of the cars.json file
        const data = await fs.readFile('./Data/cars.json', 'utf8');
        const cars= JSON.parse(data);

       cars.push(newCar)

       await fs.writeFile('./Data/cars.json', JSON.stringify(cars, null, 2), 'utf8');


       return res.status(200).send(JSON.stringify(newCar));
       
    
      } catch (error) {
        console.error('Error reading cars.json:', error);
        res.status(500).json({ error: 'Failed to retrieve car data.' });
      }


})


carRouter.delete('/:id',async(req,res)=>{
       
  try {
            const {id}=req.params;
            console.log('argentina')
    

      // Asynchronously read the content of the cars.json file
      const data = await fs.readFile('./Data/cars.json', 'utf8');
      const cars= JSON.parse(data);

       const cars_=cars.filter((car)=>(car.number).toString() !== id.toString())

     await fs.writeFile('./Data/cars.json', JSON.stringify(cars_, null, 2), 'utf8');


     return res.status(200).send();
     
  
    } catch (error) {
      console.error('Error reading cars.json:', error);
      res.status(500).json({ error: 'Failed to retrieve car data.' });
    }


})
//------------------------------------------------------------------------------------


inspectionRoute.get('/',async(req,res)=>{
  try{


       const data = await fs.readFile('./Data/inspection.json', 'utf8');
        // Parse the JSON string into a JavaScript object or array
        const inspections = JSON.parse(data);
    
        // Send the parsed car data as a JSON response
       return res.status(200).send(JSON.stringify(inspections));
  }catch(error){
      console.error('Error reading cars.json:', error);
      res.status(500).json({ error: 'Failed to retrieve car data.' });
  }
})

inspectionRoute.post('/',async(req,res)=>{
  try{
    

    var newInspection=req.body;
    newInspection.id=uuidv4()

    // Asynchronously read the content of the cars.json file
    const data = await fs.readFile('./Data/inspection.json', 'utf8');
    const inspections= JSON.parse(data);

    inspections.push(newInspection)

   await fs.writeFile('./Data/inspection.json', JSON.stringify(inspections, null, 2), 'utf8');


   return res.status(200).send(JSON.stringify(newInspection));
   
  }catch(error){
      console.error('Error reading inspection.json:', error);
      res.status(500).json({ error: 'Failed to retrieve inspection data.' });
  }
})


//------------------------------------------------------------------------------------

saleRoute.get('/',async(req,res)=>{
  try{


       const data = await fs.readFile('./Data/sales.json', 'utf8');
        // Parse the JSON string into a JavaScript object or array
        const sales = JSON.parse(data);
    
        // Send the parsed car data as a JSON response
       return res.status(200).send(JSON.stringify(sales));
  }catch(error){
      console.error('Error reading cars.json:', error);
      res.status(500).json({ error: 'Failed to retrieve sales data.' });
  }
})


saleRoute.post('/',async(req,res)=>{
  try{
    

    var newSale=req.body;
    newSale.id=uuidv4()

    // Asynchronously read the content of the cars.json file
    const data = await fs.readFile('./Data/sales.json', 'utf8');
    const sales= JSON.parse(data);

    const cars = await fs.readFile('./Data/cars.json', 'utf8');
    
    // Parse the JSON string into a JavaScript object or array
    const cars_ = JSON.parse(cars);
    
    cars_.map((car,i)=>{
      console.log(car.number,newSale.carNumber)
           if(car.number==newSale.carNumber){
            console.log("ccc")
                car.available=false;
                return car
           }else{
            return car;
           }
    })
    sales.push(newSale)

   await fs.writeFile('./Data/sales.json', JSON.stringify(sales, null, 2), 'utf8');


   await fs.writeFile('./Data/cars.json', JSON.stringify(cars_, null, 2), 'utf8');


   return res.status(200).send(JSON.stringify(sales));
   
  }catch(error){
      console.error('Error reading inspection.json:', error);
      res.status(500).json({ error: 'Failed to retrieve sale data.' });
  }
})