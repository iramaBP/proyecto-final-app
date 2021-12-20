/* TRAER EXPRESS */
const express = require("express");
/* TRAER MODELO ANUNCIO */
const Note = require("../modelos/Note");
/* TRAER MODELO DE USUARIO */
const User = require("../modelos/User");
/* TRAER EXPRESS ROUTER */
const notesRouter = express.Router();

/* RUTA NOTA  "HOME NOTES" */
notesRouter.get("/homenotes", async (req, res) => {
  let notes;
  let userId = req.userId;

  try {
    notes = await Note.find({ usuario: userId }).sort({
      updatedAt: -1,
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : conexion con BD ",
    });
    return;
  }
  res.json({
    auth: true,
    notes: notes,
  });
});

/* RUTA NOTA "CREAR NOTA" */
notesRouter.post("/newnote", async (req, res) => {
  let texto = req.body.texto;
  let id = req.userId;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    res.json({
      auth: false,
      mensaje:
        " ha ocurrido el siguiente error: error al buscar el ID de usuario  ",
    });
    return;
  }
  let newNote;
  try {
    newNote = await Note.create({ texto: texto, usuario: id });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : error al crear anuncio  ",
    });
    return;
  }
  try {
    await User.findByIdAndUpdate(id, {
      $push: {
        notes: newNote._id,
      } /* ( $push: metodos de arrays de mongoose  ) */,
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje:
        "ha ocurrido el siguiente error : error al agregar al anuncio al usuario  ",
    });
    return;
  }
  res.json({
    auth: true,
    mensaje: " anuncio creado correctamente ",
  });
});

/* RUTA NOTA "EDITAR NOTA" */
notesRouter.put("/editnote/:id", async (req, res) => {
  let texto = req.body.texto;
  let id = req.params.id;
  let userId = req.userId;
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    res.json({
      auth:false,
      mensaje:
        " ha ocurrido el siguiente error: error al buscar el ID de usuario  ",
    });
  }
  let esSuyo = false;
  for (let i = 0; i < user.notes.length; i++) {
    if (id == user.notes[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      auth:false,
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede editar su nota ",
    });
  }

  try {
    await Note.findByIdAndUpdate(id, {
      texto: texto,
    });
  } catch (error) {
    res.json({
      auth:false,
      mensaje: "ha ocurrido el siguiente error : error al editar la nota ",
    });
    return;
  }

  res.json({
    auth:true,
    mensaje: " nota editada correctamente",
  });
});

/* RUTA NOTE "ELIMINAR NOTE " */
notesRouter.delete("/suprnote/:id", async (req, res) => {
  let id = req.params.id;
  let userId = req.userId;
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    res.json({
      auth: false,
      mensaje:
        "ha ocurrido el siguiente error: error al buscar el ID del usuario ",
    });
  }
  let esSuyo = false;

  for (let i = 0; i < user.notes.length; i++) {
    if (id == user.notes[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      auth: false,
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede eliminar su nota ",
    });
  }
  try {
    await Note.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, {
      $pull: { notes: id },
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : error al eliminar su nota ",
    });
    return;
  }

  res.json({
    auth: true,
    mensaje: " nota eliminada correctamente",
  });
});

/* RUTA NOTA  " SELECCIONAR 1 NOTE" */
notesRouter.get("/note/:id", async (req, res) => {
  try {
    let idNote = req.params.id;
    let note = await Note.findById(idNote);
    res.json({
      auth: true,
      note,
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "Error de servidor",
    });
  }
});

module.exports = notesRouter;
