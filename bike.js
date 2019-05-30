'use strict';

const parking=require('./park_alloc_dealloc')
class Bike extends parking{
    constructor(bikeData){
        super(bikeData.Tcount);
        this.data=bikeData;
        this.id=bikeData.id;
        this.descr=bikeData.descr;
        this.size=bikeData.propo;
        this.price=bikeData.price;
        this.Tcount=bikeData.Tcount;
        this.print();
    }
    print(){
        console.log("\nBIKE DATA");
        console.log(this.id,this.descr,this.size,this.price,this.Tcount);
        console.log("==========================");
    }
}
module.exports=Bike;
