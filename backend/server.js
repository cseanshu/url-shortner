const config=require('../backend/config');
const express=require('express');
const server=express();
server.listen(config.PORT,()=>{
    console.log(`server is listening at port:${config.PORT}`);
})
