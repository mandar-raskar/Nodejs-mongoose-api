const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/',(req,res,next)=>{
   /* res.status(200).json({
        message :'handling the get request'
   });*/
   Product.find()
   .exec()
   .then(docs =>{
       console.log(docs);
       res.status(200).json(docs);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error : err});
   });
});

router.post('/',(req,res,next)=>{
        const product = new Product({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            price : req.body.price 
    });
    product.save()
    .then (result=>{
        console.log(result);
        res.status(200).json({
            message :'handling the post request',
            productDetails : product
        });

    })
    .catch(err => {
        console.log(err);
    });
   
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    product.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err});
    });
});

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message :'Updated details',
        id : req.params.productId
    });
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove(_id = id).exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
    

    });



module.exports = router;