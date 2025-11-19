const config=require('../backend/config');
const express=require('express');
const {PrismaClient}=require('@prisma/client');
const prisma= new PrismaClient();
const app=express();

async function checkDatabase(){
    try{
        await prisma.$connect();
        console.log(`connected to database on port${config.DB_PORT}`)
    }
    catch(err){
       console.log('error while connecting to database:',err);
    }
}
app.listen(config.SERVER_PORT,async()=>{
    await checkDatabase();
    console.log(`server is listening at port:${config.SERVER_PORT}`);
})
