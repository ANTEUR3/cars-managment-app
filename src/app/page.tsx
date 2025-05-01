"use client"
import Landing from "./Components/HomeComponents.tsx/Landing";
import CarForm from "./Components/carForm";
import { useEffect, useState , useContext,createContext } from "react";
import InspectionForm from "./Components/inspectionForm";
import PurchaseForm from "./Components/purchaseForm";
import { carType } from "./Types";
import { getCars } from "@/DataFunctions/car";
export default function Home() {
  const [inspectioForm, setInspectionForm] = useState(false);
  const [newCartForm,setNewCartForm]=useState(false)
  const [purchase,setPurchase]=useState(false)
  const [alert,setAlert]=useState({visible:false,message:""})
  const [cars,setCars]=useState<carType[]>([])

useEffect(()=>{
  getCars().then((res)=>{
    setCars(res)
      }
  )
},[])

  return (
   <div>
    <Landing alert={alert}  visible={newCartForm  } setVisible={setNewCartForm} inspection={inspectioForm} setInspection={setInspectionForm} purchase={purchase} setPurchase={setPurchase} />
    <carsContext.Provider value={cars}>
        <CarForm setAlert={setAlert} visible={newCartForm} setVisible={setNewCartForm}/>
        <InspectionForm setAlert={setAlert} visible={inspectioForm} setVisible={setInspectionForm} />
        <PurchaseForm setAlert={setAlert} visible={purchase} setVisible={setPurchase} />
    </carsContext.Provider>
  
   </div>
  );
}

const carsContext=createContext<carType[] | []>([])

export const useCarContext=()=>{
  const context=useContext(carsContext);
  if(!context){
    throw new Error ('car context not vaailbale')
  }
  return context

}