/* TRAER EXPRESS */
const express = require("express");
/* TRAER MODELO AGENDA */
const Cita = require("../modelos/Cita");
/* TRAER MODELO DE USUARIO */
const User = require("../modelos/User");
/* TRAER EXPRESS ROUTER */
const citaRouter = express.Router();

/* RUTA AGENDA " INICIO VER CITAS" */
citaRouter.get("/citainicio", async (req, res) => {
  let cita;
  try {
    cita = await Cita.find().sort({
      fechaHora:1,
    })
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : conexion con BD ",
    });
    return;
  }
  res.json({ cita: cita });
});

/* RUTA AGENDA "CREAR CITA" */
citaRouter.post("/crearcita", async (req, res) => {
  let cliente = req.body.cliente;
  let contacto = req.body.contacto;
  let work = req.body.work;
  let zona = req.body.zona;
  let fechaHora = req.body.fechaHora;
  let id = req.userId;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    res.json({
      mensaje:
        " ha ocurrido el siguiente error: error al buscar el ID de usuario  ",
    });
    return;
  }
  let nuevaCita;
  try {
    nuevaCita = await Cita.create({
      cliente: cliente,
      usuario: id,
      contacto: contacto,
      work: work,
      zona: zona,
      fechaHora: fechaHora,
     
    });
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : error al crear la cita ",
    });
    return;
  }
  try {
    await User.findByIdAndUpdate(id, {
      $push: {
        citas: nuevaCita._id,
      } /* ( $push: metodos de arrays de mongoose  )  */,
    });
  } catch (error) {
    res.json({
      mensaje:
        "ha ocurrido el siguiente error : error al agregar la cita al usuario  ",
    });
    return;
  }
  res.json({
    mensaje: " cita creada correctamente ",
  });
});

/* RUTA AGENDA "EDITAR CITA" */
citaRouter.put("/editarcita/:id", async (req, res) => {
  let cliente = req.body.cliente;
  let contacto = req.body.contacto;
  let work = req.body.work;
  let zona = req.body.zona;
  let fechaHora = req.body.fechaHora;
  let userId = req.userId;
  let id = req.params.id
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    res.json({
      mensaje:
        " ha ocurrido el siguiente error: error al buscar el ID de usuario  ",
    });
  }
  let esSuyo = false;
  for (let i = 0; i < user.citas.length; i++) {
    if (id == user.citas[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede editar la cita ",
    });
  }
  try {
    await Cita.findByIdAndUpdate(id, {
      cliente: cliente,
      contacto: contacto,
      work: work,
      zona: zona,
      fechaHora: fechaHora,
      
    });
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : error al editar la cita ",
    });
    return;
  }

  res.json({
    mensaje: " cita editada correctamente",
  });
});

/* RUTA AGENDA "ELIMINAR CITA " */
citaRouter.delete("/eliminarcita/:id", async (req, res) => {
  let cita = req.body.cita;
  let id = req.params.id;
  let userId = req.userId;
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    res.json({
      mensaje:
        "ha ocurrido el siguiente error: error al buscar el ID del usuario ",
    });
  }
  let esSuyo = false;

  for (let i = 0; i < user.citas.length; i++) {
    if (id == user.citas[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede eliminar su cita ",
    });
  }
  try {
    await Cita.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, {
      $pull:{citas:id}
    })
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : error al eliminar la cita ",
    });
  }

  res.json({
    mensaje: " cita eliminada correctamente",
  });
});

module.exports = citaRouter;
