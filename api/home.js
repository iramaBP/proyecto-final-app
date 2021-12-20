/* TRAER EXPRESS */
const express = require("express");
/* TRAER MODELO USUARIO */
const User = require("../modelos/User");
/* TRAER EXPRESS ROUTER */
const homeRouter = express.Router();
/* TRAER TOKEN */
const verificarToken = require("../middlewares/tokenauth");

/* RUTA INICIO "PERSONALIZADO" / BUSCAR X ID DE USUARIO */

homeRouter.get("/homeuser", verificarToken, async (req, res) => {
  let id = req.userId;
  let user;

  try {
    user = await User.findById(id);
  } catch (error) {
    res.json({
      auth : false,
      mensaje: "ha ocurrido el siguiente  error : conexion BD  ",
    });
  }
  res.json({ 
    auth : true,
    mensaje: user.name });
});

module.exports = homeRouter;
/* he añadido middlewares token como ejemplo para poder observar donde se pone ,
 lo he requerido y luego lo he añadido en medio  */ 