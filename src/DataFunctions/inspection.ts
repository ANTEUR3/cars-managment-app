import { inspectionType } from "@/app/Types";



export const getInspections=async()=>{
    const inspections=await  fetch('http://localhost:5000/api/inspections')
    const json=await inspections.json()
    return json
}

export const newInspection=async(data:inspectionType)=>{
   const newInspection= await fetch('http://localhost:5000/api/inspections',{body:JSON.stringify(data),method:'POST',headers:{'Content-Type':'application/json'}})
   const json=await newInspection.json()
   return json
}