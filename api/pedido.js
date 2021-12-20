/* TRAER EXPRESS */
const express = require("express");
/* TRAER MODELO PEDIDOS */
const Pedido = require("../modelos/Pedido");
/* TRAER MODELO DE USUARIO */
const User = require("../modelos/User");
/* TRAER EXPRESS ROUTER */
const pedidoRouter = express.Router();

/* RUTA PEDIDOS " INICIO VER PEDIDOS" */

pedidoRouter.get("/homematerial", async (req, res) => {
  
  let userId = req.userId;
  let usuario;
  try {
    usuario = await User.findById(userId).populate("pedidos");
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : conexion con BD ",
    });
    return;
  }
  res.json({
    auth: true , 
     pedidos: usuario.pedidos });
});

/* RUTA PEDIDO "CREAR PEDIDO" */
pedidoRouter.post("/newpedido", async (req, res) => {
  let producto = req.body.producto;
  let cantidad = req.body.cantidad;
  let proveedor = req.body.proveedor ;
  let contacto = req.body.contacto ;
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
  let nuevoPedido;
  try {
    nuevoPedido = await Pedido.create({
      producto: producto,
      usuario: id,
      cantidad: cantidad,
      proveedor : proveedor ,
      contacto : contacto , 
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : error al crear pedido  ",
    });
    return;
  }
  try {
    await User.findByIdAndUpdate(id, {
      $push: {
        pedidos: nuevoPedido._id,
      } /* ( $push: metodos de arrays de mongoose  )  */,
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje:
        "ha ocurrido el siguiente error : error al agregar el pedido al usuario  ",
    });
    return;
  }
  res.json({
    auth: true,
    mensaje: " pedido creado correctamente ",
  });
});

/* RUTA PEDIDO "EDITAR PEDIDO" */
pedidoRouter.put("/editpedido/:id", async (req, res) => {
  let producto = req.body.producto;
  let cantidad = req.body.cantidad;
  let proveedor = req.body.proveedor ;
  let contacto = req.body.contacto ;
  let id = req.params.id;
  let userId = req.userId;
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    res.json({
      auth: false,
      mensaje:
        " ha ocurrido el siguiente error: error al buscar el ID de usuario  ",
    });
  }
  let esSuyo = false;
  for (let i = 0; i < user.pedidos.length; i++) {
    if (id == user.pedidos[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      auth: false,
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede editar su pedido ",
    });
  }

  try {
    await Pedido.findByIdAndUpdate(id, {
      producto: producto,
      cantidad: cantidad,
      proveedor : proveedor,
      contacto : contacto , 
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : error al editar el pedido ",
    });
    return;
  }

  res.json({
    auth: true,
    mensaje: " pedido editado correctamente",
  });
});

/* RUTA PEDIDOS "ELIMINAR PEDIDO " */
pedidoRouter.delete("/suprpedido/:id", async (req, res) => {
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

  for (let i = 0; i < user.pedidos.length; i++) {
    if (id == user.pedidos[i]) {
      esSuyo = true;
    }
  }
  if (esSuyo === false) {
    return res.json({
      auth: true,
      mensaje:
        "ha ocurrido el siguiente error : solo el usuario puede eliminar su pedido ",
    });
  }
  try {
    await Pedido.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, {
      $pull: {
        pedidos: id,
      },
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "ha ocurrido el siguiente error : error al eliminar el pedido ",
    });
  }

  res.json({
    auth: true,
    mensaje: " pedido eliminado correctamente",
  });
});

/* RUTA PEDIDO  " SELECCIONAR 1 PEDIDO" */
pedidoRouter.get("/pedido/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    let idPedido = req.params.id;
    let pedido = await Pedido.findById(idPedido);
    res.json({
      auth: true,
      pedido,
    });
  } catch (error) {
    res.json({
      auth: false,
      mensaje: "Error de servidor",
    });
  }
});

module.exports = pedidoRouter;
