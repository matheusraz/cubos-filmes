// import express from 'express'
const express = require('express');
const server = express();
const routes = require('./routes');
let port = 3000;

server.use(routes);

server.listen(3000, (err) => {
    if(err) {
	    console.log("Não foi possivel levantar servidor!");
    } else {
        console.log(`Servidor rodando na porta ${port}!`);
    }
      
})
