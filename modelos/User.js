/* TRAER MONGOOSE*/
const mongoose = require("mongoose");

/* EL ESQUEMA */
const Schema = mongoose.Schema;

/* CREAMOS PLANTILLA ESQUEMA / MODELO USUARIO */
const userSchema = new Schema({
  name: { type: String },
  password: { type: String },
  notes: [{ type: Schema.Types.ObjectId, ref: "Anuncio" }],
  pedidos: [{ type: Schema.Types.ObjectId, ref: "Pedido" }],
  proveedores: [{ type: Schema.Types.ObjectId, ref: "Proveedor" }],
  citas: [{ type: Schema.Types.ObjectId, ref: "Cita" }]
});

/* DECLARO EL MODELO  */
const User = mongoose.model("User", userSchema);

/*EXPORTO EL MODELO */
module.exports = User;
