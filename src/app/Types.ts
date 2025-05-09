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
    date:Date | String;
    setDate:any,
    price?:Number,
    setPrice?:any
}

export type inspectationFilterType={
    carNumber:Number | " ",
    setCarNumber:any
}