const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000 ;
const cors = require('cors');
const allRoutes = require('./routes/index.js')
const connectDB = require('./config/dbConnection')
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler.js');

dotenv.config()

connectDB(process.env.DB_URL)

app.use(cors());
app.use(express.json());


app.use('/api', allRoutes)

app.get('/',(req, res)=>{
      res.send("Welcome to e-commerce backend ")
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("App listening at PORT ", PORT);
})