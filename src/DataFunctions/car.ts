import { carType } from "@/app/Types"
export const getCars=async()=>{
   const cars=await  fetch('http://localhost:5000/api/cars')
   const json=await cars.json()
   return json
}



export const newCar=async(newCar:carType)=>{
    const cars=await  fetch('http://localhost:5000/api/cars',{method:'POST',headers:{
        'Content-Type':'application/json'
    },body:JSON.stringify(newCar)
    })
    const json=await cars.json()
    return json
 }