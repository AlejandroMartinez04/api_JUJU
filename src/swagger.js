const { version } = require("mongoose");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "JUJU Books Api", version: "1.0.0" },
    },
    apis: ['src/routes/book.js','src/database.js']
};


const swaggerSpec = swaggerJSdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json',(req,res)=>{
        res.setHeader('Content-Type','application/json');
        res.send(swaggerSpec);
    });

    console.log('version 1 are available at http://localhost:3000}/api/docs')
};

module.exports = { swaggerDocs };