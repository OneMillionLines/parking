'use strict';
const pgp = require("pg-promise")(),
  dbConnection = require("../secrets/db_configuration"),
  db = pgp(dbConnection),
  redis = require("async-redis"),
  amqp = require("amqplib/callback_api"),
  client = redis.createClient();
const _ = require("lodash");
const Vehicle=require('../Vehicle');
const routes = [
  {
    //insert data as a json describing the mall structure
    
    method: "POST",
    path: "/parking",
    handler: async function(req, res) {
      let payload = req.payload;
      let result = [];
      let promises = [];
      let command = "INSERT INTO orgn(id, description) VALUES ($1,$2)";
      let values = [payload.id, payload];
      promises.push(
        db
          .any(command, values)
          .then(data => {
            result.push(payload.id+" is inserted");
          })
          .catch(error => (console.log("ERROR:", error),result.push("On inserting "+values+" we get error: "+error.detail)))
      );
      await Promise.all(promises);
      let vehicle=new Vehicle(payload);
      //console.log(vehicle.getData());
      return result;
    }
  },
  {
    method: "GET",
    path: "/parking",
    handler: async function(req, res) {
      console.log(req.query);
      const id=req.headers.id;
      console.log(req.headers.id);
      let result = [];
      let promises = [];
      let command = "select description from orgn where id='"+id+"'";
      let d='';
      promises.push(
        db
          .one(command)
          .then(data => {
            d=data;
            result.push(data);
          })
          .catch(error => (console.log("ERROR:", error),result.push("On getting "+id+" we get error: "+error.detail)))
      );
      await Promise.all(promises);
      let description=d.description.descr;
      console.log(description);
      console.log(req.query);
      return description;
    }
  },
  {
    method: "GET",
    path: "/parking-one",
    handler: async function(req, res) {
      console.log(req.query);
      const floor=req.query.floor;
      const vehicle_type=req.query.vehicle_type;
      const id=req.headers.id;
      console.log(req.headers.id);
      let result = [];
      let promises = [];
      let command = "select description from orgn where id='"+id+"'";
      let d='';
      promises.push(
        db
          .one(command)
          .then(data => {
            d=data;
            console.log(data);
            result.push(data);
          })
          .catch(error => (console.log("ERROR:", error),result.push("On getting "+id+" we get error: "+error.detail)))
      );
      await Promise.all(promises);
      let description=d.description.descr;
      return description[floor][vehicle_type];
    }
  },
  {
    method: "PUT",
    path: "/parking",
    handler: async function(req, res) {
      let payload = req.payload;
      const id=payload.id;
      console.log(req.headers.id);
      let result = [];
      let promises = [];
      let command = "select description from orgn where id='"+id+"'";
      let d='';
      promises.push(
        db
          .one(command)
          .then(data => {
            d=data;
            result.push(data);
          })
          .catch(error => (console.log("ERROR:", error),result.push("On getting "+id+" we get error: "+error.detail)))
      );
      await Promise.all(promises);
      let description=d.description.descr;
      result=[];
      promises=[];
      console.log(description);
      command = "update orgn set description=$1 where id=$2";
      values=[payload,payload.id];
      promises.push(
        db
          .any(command,values)
          .then(data => {
            result.push(payload.id);
          })
          .catch(error => (console.log("ERROR:", error),result.push("On posting "+id+" we get error: "+error.detail)))
      );
      await Promise.all(promises);

      return result;
    }
  },
  {
    method: "DELETE",
    path: "/parking",
    handler: async function(req, res) {
      let payload = req.payload;
      const id=payload.id;
      console.log(req.headers.id);
      let result = [];
      let promises = [];
      let command = "DELETE from orgn where id='"+id+"'";
      let d='';
      promises.push(
        db
          .any(command)
          .then(data => {
            d=data;
            result.push(data);
          })
          .catch(error => (console.log("ERROR:", error),result.push("On deleting "+id+" we get error: "+error.detail)))
      );
      await Promise.all(promises);
      let description=d[0].description.descr;
      console.log(description);
      return description;
    }
  },
]
module.exports = routes;