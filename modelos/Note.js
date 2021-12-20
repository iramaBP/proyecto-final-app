/* TRAER MONGOOSE*/
const mongoose = require("mongoose");

/* TRAER ESQUEMA */
const Schema = mongoose.Schema;

/* CREAMOS PLANTILLA ESQUEMA / MODELO ANUNCIO TABLON */
const notesSchema = new Schema(
  {
    texto: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true /* pone la fecha de creacion  */,
  }
);

/* DECLARO EL MODELO  */
const Note = mongoose.model("Note", notesSchema);

/*EXPORTO EL MODELO */
module.exports = Note;
