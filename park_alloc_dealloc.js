'use strict';

const SortedArray= require("sorted-array");
const range = require("range");
const _ = require("lodash");

class Parking{
    constructor(count){
        this.N=count;
        this.unallocated_slots=new SortedArray(range.range(0,this.N));
        this.allocated_slots = new SortedArray([]);
        this.isfull=false;
    }
    status(){
        console.log("\nStatus:\n")
        console.log(this.unallocated_slots);
        console.log(this.allocated_slots);
    }

    allocate(){
        if(!this.isfull && this.unallocated_slots.array.length>=1){
            this.allocated_slots.insert(this.unallocated_slots.array[0]);
            console.log("allocated at position "+this.unallocated_slots.array[0]);
            this.unallocated_slots.remove(this.unallocated_slots.array[0]);
            console.log("capacity remaining: "+this.unallocated_slots.array.length);
            status();
        }
        else{
            console.log("cannot allocate");
            this.isfull=true;
        }
    }

    deallocate(value){
        this.unallocated_slots.insert(value);
        console.log("Deallocated at position "+value);
        this.allocated_slots.remove(value);
        console.log("capacity remaining: "+this.unallocated_slots.array.length);
        if(this.isfull){
            this.isfull=false;
        }
        status();
    }


    getN(){
        return this.N;
    }
}
module.exports=Parking;