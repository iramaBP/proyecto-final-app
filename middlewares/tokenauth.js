/* TRAER TOKEN */
const jwt = require("jsonwebtoken");

/* CREAMOS UNA FUNCION PARA EL TOKEN */
const verificarToken = (req, res, next) => {
  let token = req.headers.token; /*el token llega por headers */
  if (!token) {
    res.json({ mensaje: "no hay token", auth: false });
    return;
  }
  jwt.verify(token, "secretword", (error, tokendecoded) => {
    /*sirve para verificar el token  */

    if (error) {
      res.json({ mensaje: "token incorrecto", auth: false });
      return;
    } else {
      req.userId = tokendecoded.id;
      next();
    }
  });
};

module.exports = verificarToken;
