'use strict';
const parking=require('./park_alloc_dealloc')
class Van extends parking{
    constructor(vanData){
        super(vanData.Tcount);
        this.data=vanData;
        this.id=vanData.id;
        this.descr=vanData.descr;
        this.size=vanData.propo;
        this.price=vanData.price;
        this.Tcount=vanData.Tcount;
        this.floors=vanData.floors;
        this.floor_id=vanData.floor_id;
        this.print();
    }
    print(){
        console.log("\nVAN DATA");
        console.log(this.id,this.descr,this.size,this.price,this.Tcount);
        console.log("==========================");
    }
}
module.exports=Van;
