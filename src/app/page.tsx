"use client"
import Landing from "./Components/HomeComponents.tsx/Landing";
import CarForm from "./Components/carForm";
import { useState } from "react";
import InspectionForm from "./Components/inspectionForm";
import PurchaseForm from "./Components/purchaseForm";
export default function Home() {
  const [inspectioForm, setInspectionForm] = useState(false);
  const [newCartForm,setNewCartForm]=useState(false)
  const [purchase,setPurchase]=useState(false)

  return (
   <div>
    <Landing  visible={newCartForm  } setVisible={setNewCartForm} inspection={inspectioForm} setInspection={setInspectionForm} purchase={purchase} setPurchase={setPurchase} />
    <CarForm visible={newCartForm} setVisible={setNewCartForm}/>
    <InspectionForm visible={inspectioForm} setVisible={setInspectionForm} />
    <PurchaseForm visible={purchase} setVisible={setPurchase} />
   </div>
  );
}
