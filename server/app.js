const express = require('express');
const app = express();
const connect = require('./db/connect').connect;
const authRoutes = require('./router/authRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


//Database connection
connect();

//CORS
app.use(cors());

//Parsing form datas
app.use(express.urlencoded({extended : false}));

//Parsing JSON Datas
app.use(express.json());

//Authorization Routes
app.use(authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});