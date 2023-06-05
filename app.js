const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000 ;
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.get('/',(req, res)=>{
      res.send("Welcome to e-commerce backend ")
})


app.listen(PORT,()=>{
    console.log("App listening at PORT ", PORT);
})