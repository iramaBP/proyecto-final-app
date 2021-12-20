/* TRAER MONGOOSE */
const mongoose = require("mongoose");
/* TRAER EXPRESS */
const express = require("express");
/* EXPRESS NOS DEVUELVE LA INFO AQUI */
const app = express();
/* TRAER TOKEN */
const jwt = require("jsonwebtoken");
/* TRAER CORS */
const cors = require("cors");


/* TRAER EL MODELO DE ROUTER QUE HE CREADO  EN API  */
const login = require("./api/authLogin");
const home = require("./api/home");
const notes = require("./api/notes");
const pedido = require("./api/pedido");
const proveedor = require("./api/proveedor");
const cita = require("./api/cita");
/* TRAER TOKEN */
const verificarToken = require("./middlewares/tokenauth");

/* CONECTO CON LA BASE DE DATOS  */
mongoose
  .connect(
    "mongodb+srv://iramaBP:Iramika141516@cluster0.v5pkk.mongodb.net/appagendaDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("estamos conectados");
  })
  .catch(() => {
    console.log("no estamos conectados");
  });

/* PARA QUE EL SERVIDOR PUEDA ENTENDER TODOS LOS BODYS DE LA PETICION */
app.use(express.json());
/* PARA QUE ENTIENDA EL MATERIAL PROCEDENTE DE FORMULARIOS */
app.use(express.urlencoded({ extended: true }));

/*  REQUERIR LOS ROUTERS EN EL DOCUMENTO PRINCIPAL DEL SERVIDOR (APP.JS) + MIDDLEWARE TOKEN + CORS  */
app.use(cors()); 
app.use("/api/authLogin", login);  
app.use("/api/home", home);   
app.use("/api/notes",verificarToken ,notes);  
app.use("/api/pedido",verificarToken, pedido);
app.use("/api/proveedor",verificarToken, proveedor);
app.use("/api/cita",verificarToken, cita);


/*ELIGO SERVIDOR & SERVIDOR A LA ESCUCHA */
app.listen(5000, () => {
  console.log("Servidor escuchando ");
});
