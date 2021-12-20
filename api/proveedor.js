/* TRAER EXPRESS */
const express = require("express");
/* TRAER MODELO PROVEEDOR */
const Proveedor = require("../modelos/Proveedor");
/* TRAER MODELO DE USUARIO */
const User = require("../modelos/User");
/* TRAER EXPRESS ROUTER */
const proveedorRouter = express.Router();

/* RUTA PROVEEDOR " INICIO VER PROVEEDORES" */
proveedorRouter.get("/inicioproveedor", async (req, res) => {
  let userId = req.userId;
  let usuario;
  try {
    usuario = await User.findById(userId).populate("proveedores");
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : conexion con BD ",
    });
    return;
  }
  console.log(usuario);
  res.json({ proveedores: usuario.proveedores });
});

/* RUTA PEDIDO "CREAR PROVEEDOR" */
proveedorRouter.post("/crearproveedor", async (req, res) => {
  let name = req.body.name;
  let contacto = req.body.contacto;
  let productos = req.body.productos;
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
  let nuevoProveedor;
  try {
    nuevoProveedor = await Proveedor.create({
      name: name,
      usuario: id,
      contacto: contacto,
      productos: productos,
    });
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : error al crear el proveedor  ",
    });
    return;
  }
  try {
    await User.findByIdAndUpdate(id, {
      $push: {
        proveedores: nuevoProveedor._id,
      } /* ( $push: metodos de arrays de mongoose  )  */,
    });
  } catch (error) {
    res.json({
      mensaje:
        "ha ocurrido el siguiente error : error al agregar el proveedor al usuario  ",
    });
    return;
  }
  res.json({
    mensaje: " proveedor creado correctamente ",
  });
});

/* RUTA PROVEEDOR "EDITAR PROVEEDOR" */
proveedorRouter.put("/editarproveedor/:id", async (req, res) => {
  let name = req.body.name;
  let contacto = req.body.contacto;
  let productos = req.body.productos;
  let id = req.params.id;
  let userId = req.userId;
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
  for (let i = 0; i < user.proveedores.length; i++) {
    if (id == user.proveedores[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede editar su proveedor ",
    });
  }

  try {
    await Proveedor.findByIdAndUpdate(id, {
      name: name,
      contacto: contacto,
      productos: productos,
    });
  } catch (error) {
    res.json({
      mensaje: "ha ocurrido el siguiente error : error al editar el proveedor ",
    });
    return;
  }

  res.json({
    mensaje: " proveedor editado correctamente",
  });
});

/* RUTA PROVEEDORES "ELIMINAR PROVEEDOR " */
proveedorRouter.delete("/eliminarproveedor/:id", async (req, res) => {
  let proveedor = req.body.proveedor;
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

  for (let i = 0; i < user.proveedores.length; i++) {
    if (id == user.proveedores[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede eliminar su proveedor ",
    });
  }
  try {
    await Proveedor.findByIdAndDelete(id, {
      proveedor: proveedor,
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { proveedores: id },
    });
  } catch (error) {
    res.json({
      mensaje:
        "ha ocurrido el siguiente error : error al eliminar el proveedor ",
    });
  }

  res.json({
    mensaje: " proveedor eliminado correctamente",
  });
});

module.exports = proveedorRouter;
