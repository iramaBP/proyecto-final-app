/* TRAER MONGOOSE*/
const mongoose = require("mongoose");

/* EL ESQUEMA */
const Schema = mongoose.Schema;

/* CREAMOS PLANTILLA ESQUEMA / MODELO CITAS */
const citaSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "User" },
    cliente: { type: String },
    contacto: { type: String },
    work: { type: String },
    zona: { type: String },
    fechaHora: { type: Date },
    
  },
  {
    timestamps: true /* pone la fecha de creacion  */,
  }
);

/* DECLARO EL MODELO  */
const Cita = mongoose.model("Cita", citaSchema);

/*EXPORTO EL MODELO */
module.exports = Cita;