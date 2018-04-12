const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message : "it handles the get request"
    });

});

router.post('/',(req,res,next)=>{
    var order =new order({
        _id = mongoose.Types.objectId,
        productId : req.body.productId,
        quantity : req.body.quantity
    });
    order.save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message : "handling the post request",
            orderDetails : order
        })
    .catch(err => {
        console.log(err);
    });
    });
    res.status(200).json({
        message : "it handles the get request",
        orderDetails : orders
    });

});

router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    order.findById(id)
    .exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
        
        })
    .catch(err => {
        res.status(500).json(err);
    });
    })
   
   /* res.status(200).json({
        message : "Order details",
        orderId : req.params.orderId
    });*/



router.delete('/:orderId',(req,res,next)=>{
    var id = req.params.orderId;
    order.remove(_id = id).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
   
   /* res.status(200).json({
        message : "Order deleted",
        orderId : req.params.orderId
    });*/

});




module.exports = router;