"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaAddressCard } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { newCar } from "@/DataFunctions/car";

const CarForm = ({
  visible,
  setVisible,
  setAlert
}: {
  visible: boolean;
  setVisible: any;
  setAlert:any
}) => {
  const [formData, setFormData] = useState({
    carNumber: 0,
    carType: "",
    date: new Date(),
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel=()=>{
    formData.carNumber=0;
    formData.date=new Date();
    formData.carType=''

}

  const handleSubmit = (e: any) => {
    e.preventDefault();
    newCar({
      number: formData.carNumber,
      type: formData.carType,
      date: formData.date,
      available: true,
    });
    setTimeout(() => {
      setVisible(false);
      setAlert({visible:true,message:'New car has been seccessfully created'})
      handleCancel()

    }, 500);

  
   
    
  };

  return (
    <div
      className={`flex items-center py-12  px-12 rounded-xl   justify-center  bg-white  absolute z-10 left-[50%] -translate-x-[50%] top-[50%] transition-all duration-800 shadow-lg border-2 border-yellow-500 ${
        visible ? "-translate-y-[50%]" : "-translate-y-[1000px]"
      }`}
    >
      <MdCancel
        onClick={() => {
          setVisible(false);
          handleCancel()
        }}
        className=" text-2xl text-black absolute right-3 top-3 cursor-pointer hover:text-red-500 hover:scale-105"
      />
      <div className="w-full max-w-md  rounded-lg text-black ">
        <form onSubmit={handleSubmit} className="space-y-2 ">
          <div className={`space-y-2 `}>
            <label htmlFor="carNumber" className="block text-md font-semibold">
              Car number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <FaAddressCard />
              </div>
              <input
                type="Number"
                id="carNumber"
                name="carNumber"
                value={formData.carNumber}
                onChange={handleChange}
                placeholder="Identity number"
                className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                required
              />
            </div>
          </div>

          <div className={`space-y-2 `}>
            <label htmlFor="carType" className="block text-md font-semibold">
              car type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <MdHomeRepairService />
              </div>
              <select
                id="carType"
                name="carType"
                onChange={handleChange}
                value={formData.carType}
                className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                required
              >
                <option value=""> </option>
                <option value="luxury">luxury</option>
                <option value="electric">electric</option>
                <option value="economical">economical</option>
              </select>
            </div>
          </div>

          <div className={`space-y-2 `}>
            <label htmlFor="date" className="block text-md font-semibold">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <BsCalendar2DateFill />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date.toString().split("T")[0]}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-yellow-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-1 mt-4 bg-amber-400  text-black font-medium rounded transition-colors   ${
              formData.carNumber && formData.carType && formData.date
                ? " bg-yellow-500 hover:bg-yellow-400 hover:scale-105 cursor-pointer"
                : "bg-gray-600"
            } `}
          >
            Confirm
          </button>

          <p className="text-xs text-neutral-500 mt-1">
            By creating an account, you agree to the{" "}
            <Link href="/terms" className="text-neutral-400 hover:underline">
              Terms of Service
            </Link>
            . We'll occasionally send you account-related emails.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
