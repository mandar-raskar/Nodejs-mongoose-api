const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://node-api:' + process.env.MONGO_ATLAS_PW + '@cluster0-jpdvz.mongodb.net/test',
{
    useMongoClient : true
}
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req,res,next)=>{
    res.headers('Access-Control-Allow-Origin','*');
    res.headers('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.headers('Access-Control-Allow-Headers','GET, POST, PATCH, DELETE');
    }
    next();
});

app.use((req,res,next)=>{
    const error = new error('not found');
    error.status = 404;
    next(error);

});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
        message : error.message
        }
    });
});

/*app.use((req,res,next)=>{
    res.status(200).json({
        message:"it works"
    });
});
*/

module.exports = app;