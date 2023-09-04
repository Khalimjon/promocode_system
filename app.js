const express = require('express');
const app = express()
const routes = require('./routes');
const {Router} = require("express");



const myMiddleware = (req, res, next) => {
    // Perform some middleware tasks here
    console.log('Middleware function executed');
    next();
};

app.use(myMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", routes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
