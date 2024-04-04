const express = require('express');
const cors = require('cors');

const connection=require("./config/db")
const userRouter=require("./routes/user.route");
const auth = require('./middlewares/auth');
const category = require('./routes/category.route')
const product = require('./routes/product.route')

require("dotenv").config()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRouter)
app.use('/category', auth, category)
app.use('/product', auth, product)

const PORT = process.env.PORT ;

app.listen(PORT, async () => {
    try {
        await connection;

        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to mongodb")
        
    } catch (error) {

        console.log("error connecting to db")
        console.log(error)

    }
});
