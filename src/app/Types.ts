export type carType={
    number:Number,
    type:String,
    date:Date,
    available:Boolean,
}

export type inspectionType={
    id?:String,
    carNumber:Number,
    date:Date,
    faults:String[],
}

export type saleType={
    id?:String,
    carNumber:Number,
    date:Date,
    price:String,
}


export type filterContextType={
    carType:String,
    setCarType:any,
    available:boolean,
    setAvailable:any
}


export type saleFilterType={
    date:Date | null;
    setDate:any,
    price?:Number,
    setPrice?:any
}