/* TRAER MONGOOSE*/
const mongoose = require("mongoose");

/* EL ESQUEMA */
const Schema = mongoose.Schema;

/* CREAMOS PLANTILLA ESQUEMA / MODELO PEDIDO */
const pedidoSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "User" },
    producto: { type: String },
    cantidad: { type: String },
    proveedor: { type: String },
    contacto: { type: String },
  },
  {
    timestamps: true /* pone la fecha de creacion  */,
  }
);

/* DECLARO EL MODELO  */
const Pedido = mongoose.model("Pedido", pedidoSchema);

/*EXPORTO EL MODELO */
module.exports = Pedido;
