'use strict';

const Car=require('./car')
const Bike=require('./bike')
const Van=require('./van')
const _  =require('lodash')

class Vehicle{
    constructor(value){
        //full json input from payload from user
        this.data=value;
        this.distributor();
    }
    getData(){
        console.log(this.data);
    }
    distributor(){
        //splitting input into each vehicle
        let carData = this.getVehicleData("car");
        let bikeData= this.getVehicleData("bike");
        let vanData = this.getVehicleData("van");

        // console.log("\nCAR DATA");
        // console.log(carData);
        // console.log("==========================");

        // console.log("\nBIKE DATA");
        // console.log(bikeData);
        // console.log("==========================");

        // console.log("\nVAN DATA");
        // console.log(vanData);
        // console.log("==========================");

        let car = new Car(carData);
        let bike = new Bike(bikeData);
        let van = new Van(vanData);
    }

    getVehicleData(value){
        let val=value;
        let Data=this.data;
        let id=Data.id;
        let distribution=[];
        let mycount=0;
        _.each(Data.floor_id,f_id=>{
            let key_val=Data.descr[f_id][val];
            mycount+=key_val.count;
            distribution.push({[f_id]:key_val});
        });
        let priceVal=Data.price[val];
        let propo=Data.propo[val];
        return {"id":id,"descr":distribution,"price":priceVal,"propo":propo,"Tcount":mycount,"floor_id":Data.floor_id,"floors":Data.floors};
    }
}
//To check vehicle work independently
// let inp_Data= { "id": "EA", "name": "EA", "floors": 3, "floor_id": [ "B1", "B2", "B3" ], "propo":{"car":3,"bike":1,"van":6}, "descr": { "B1": { "car": { "count": 20, "d_id": [ "B1C1", "B1C2", "B1C3", "B1C4" ], "dist": { "B1C1": 10, "B1C2": 5, "B1C3": 3, "B1C4": 2 } }, "bike": { "count": 50, "d_id": [ "B1B1", "B1B2", "B1B3", "B1B4" ], "dist": { "B1B1": 10, "B1B2": 5, "B1B3": 15, "B1B4": 20 } }, "van": { "count": 5, "d_id": [ "B1V1", "B1V2" ], "dist": { "B1V1": 2, "B1V2": 3 } } } ,  "B2": { "car": { "count": 20, "d_id": [ "B2C1", "B2C2", "B2C3", "B2C4" ], "dist": { "B2C1": 10, "B2C2": 5, "B2C3": 3, "B2C4": 2 } }, "bike": { "count": 50, "d_id": [ "B2B1", "B2B2", "B2B3", "B2B4" ], "dist": { "B2B1": 10, "B2B2": 5, "B2B3": 15, "B2B4": 20 } }, "van": { "count": 5, "d_id": [ "B2V1", "B2V2" ], "dist": { "B2V1": 2, "B2V2": 3 } } } ,  "B3": { "car": { "count": 20, "d_id": [ "B3C1", "B3C2", "B3C3", "B3C4" ], "dist": { "B3C1": 10, "B3C2": 5, "B3C3": 3, "B3C4": 2 } }, "bike": { "count": 50, "d_id": [ "B3B1", "B3B2", "B3B3", "B3B4" ], "dist": { "B3B1": 10, "B3B2": 5, "B3B3": 15, "B3B4": 20 } }, "van": { "count": 5, "d_id": [ "B3V1", "B3V2" ], "dist": { "B3V1": 2, "B3V2": 3 } } } } , "price": { "car": { "h0": 30, "step": 20 }, "bike": { "h0": 30, "step": 20 }, "van": { "h0": 30, "step": 20 } } };
// let vehicle = new Vehicle(inp_Data);

module.exports=Vehicle;