const express=require('express');
const router=express.Router();
router.get('/healthz',(req,res)=>{
    res.json({ok:true,version:"1.0",uptime:process.uptime()});
})
export default router;