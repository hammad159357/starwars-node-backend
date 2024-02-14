const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./Routes/index');
const errorHandler = require('./middlewares/errorHandler')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// Middleware for error handling
app.use(errorHandler)

//Routes
// app.get('/',(req,res)=> res.send('Working'));
app.use('/api', routes);


//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Node App Running at http://localhost:${PORT}`));