

import { saleType } from "@/app/Types";
export const getSaleData = async () => {

    const sales=await fetch('http://localhost:5000/api/sales');
    const json=await sales.json();
    return json;
}

export const newSale = async (data:saleType) => {
     try{
        const sales=await fetch('http://localhost:5000/api/sales',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        const json=await sales.json();
        return json;
     }catch(err){
       return err;
     }
   
}