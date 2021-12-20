/* TRAER MONGOOSE*/
const mongoose = require("mongoose");

/* EL ESQUEMA */
const Schema = mongoose.Schema;

/* CREAMOS PLANTILLA ESQUEMA / MODELO PROVEEDOR */
const proveedorSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    contacto: { type: String },
    productos: { type: String },
  },
  {
    timestamps: true /* pone la fecha de creacion  */,
  }
);

/* DECLARO EL MODELO  */
const Proveedor = mongoose.model("Proveedor", proveedorSchema);

/* EXPORTO EL MODELO */
module.exports = Proveedor;
