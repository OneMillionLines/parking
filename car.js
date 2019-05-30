'use strict';

const parking=require('./park_alloc_dealloc')
class Car extends parking{
    constructor(carData){
        super(carData.Tcount);
        this.data=carData;
        this.id=carData.id;
        this.descr=carData.descr;
        this.size=carData.propo;
        this.price=carData.price;
        this.Tcount=carData.Tcount;
        this.floors=carData.floors;
        this.floor_id=carData.floor_id;
        this.print();
    }
    print(){
        console.log("\nCAR DATA");
        console.log(this.id,this.descr,this.size,this.price,this.Tcount);
        console.log("==========================");
    }

}
module.exports=Car;


// let car = new Car(3,30);
// car.check();
// car.status();

// // let park=new parking(10);
// // park.status();