const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./database');
const bookRoutes = require("./routes/book");
const {swaggerDocs: v1SwaggerDocs} = require('./swagger');

app.use(cors()); // Permite todas las conexiones, se debe modificar para permitir unicamente una ip o las deseadas

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use('/api', bookRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to juju API");
});

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
    v1SwaggerDocs(app,3000);
});