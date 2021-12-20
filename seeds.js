/* TRAER MONGOOSE */
const mongoose = require("mongoose");

/* TRAER  MODELO */
const User = require("./modelos/User");
const Notes = require("./modelos/Note");
const Pedido = require("./modelos/Pedido");
const Proveedor = require("./modelos/Proveedor");
const Cita = require("./modelos/Cita");

/* TRAER BCRYPT */
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10); /* le digo cuantas vueltas dar al has */

/* CONECTO CON LA BASE DE DATOS  */
mongoose
  .connect(
    "mongodb+srv://iramaBP:Iramika141516@cluster0.v5pkk.mongodb.net/appagendaDB?retryWrites=true&w=majority"
  )
  .then(() => {
    "estamos conectados";
  })
  .catch(() => {
    "no estamos conectados";
  });

/* USUARIOS */
let users = [
  {
    name: "Oleguer",
    password: "12345679",
    _id: "618931fc950a41d9523b1c36",
    notes: ["61890642d0e17761126d389e", "61890642d0e17761126d389f" , "61890642d0e17761126d38a0", "61890642d0e17761126d38a1"],
    pedidos: ["61890642d0e19991126d389e", "61890112d0e17761126d389e","61890642d0e17761126d322e","61890112d0e17761126d334e"],
    proveedores: ["61890642d0e19991126d389a"],
    citas :["12340112d0e17761126d388c", "56780112d0e17762345d388c" , "87650112d0e17761126d388c" ,
    "56780112d0e17761126d388c"],
  },
  {
    name: "Marta",
    password: "12345678",
    _id: "618931fc950a41d9523b1c37",
    notes: [],
    pedidos: ["61890112d0e17761126d389e"],
    proveedores: ["61880642d0e17761126d321b"],
    citas: [],
  },
  {
    name: "barbara",
    password: "12345677",
    _id: "618931fc950a41d9523b1c38",
    notes: [],
    pedidos: ["61890642d0e17761126d321e"],
    proveedores: ["61890112d0e17761126d388c"],
    citas:[],
  },
  {
    name: "edu",
    password: "12345676",
    _id: "618931fc950a41d9523b1c39",
    notes: [],
    pedidos: ["61890112d0e17761126d334e"],
    proveedores: ["61890112d0e17761126d376c"],
    citas: [],
  },
];

/* recorro el array y pido que me devuelva la contraseña gaseada */
for (let i = 0; i < users.length; i++) {
  users[i].password = bcrypt.hashSync(users[i].password, salt);
}

/* ANUNCIO TABLON */
let notes = [
  {
    texto: "Confirmar cita con Ana Lopez viernes 19 de diciembre  ",
    usuario: "618931fc950a41d9523b1c36" ,
    _id: "61890642d0e17761126d389e",
  },
  {
    texto: "Preparar lettring AMOR para Luis Garrido y confirmar diseño ",
    usuario: "618931fc950a41d9523b1c36" ,
    _id: "61890642d0e17761126d389f",
  },
  {
    texto: "Terminar diseño mariposa neotradicional y subir diseño a instagram  ",
    usuario: "618931fc950a41d9523b1c36" ,
    _id: "61890642d0e17761126d38a0",
  },
  {
    texto: "Confirmar cita con posible cliente (Marcos.V TLF:653491044) ",
    usuario: "618931fc950a41d9523b1c36" ,
    _id: "61890642d0e17761126d38a1",
  },
];

/* PEDIDO MATERIAL */
let pedidos = [
  {
    producto: " Tinta negra  ",
    cantidad: " 50 ml ",
    usuario: "618931fc950a41d9523b1c36",
    proveedor: "nombre del proveedor",
    contacto: "contacto del proveedor",
    _id: "61890642d0e19991126d389e",
  },
  {
    producto: " ahujas del 12 ",
    cantidad: " 50 unidades ",
    usuario: "618931fc950a41d9523b1c36",
    proveedor: "nombre del proveedor",
    contacto: "contacto del proveedor",
    _id: "61890112d0e17761126d389e",
  },
  {
    producto: " Tinta roja  ",
    cantidad: " 50 ml ",
    proveedor: "nombre del proveedor",
    usuario: "618931fc950a41d9523b1c36",
    proveedor: "nombre del proveedor",
    contacto: "contacto del proveedor",
    _id: "61890642d0e17761126d322e",
  },
  {
    producto: " cremas bepantol  ",
    cantidad: " 50 ml ",
    usuario: "618931fc950a41d9523b1c36",
    proveedor: "nombre del proveedor",
    contacto: "contacto del proveedor",
    _id: "61890112d0e17761126d334e",
  },
];
/* PROVEEDORES MATERIAL*/
let proveedor = [
  {
    name: " paco  ",
    contacto: " xxx ",
    productos: " tintas veganas usa ",
    usuario: "618931fc950a41d9523b1c36",
    _id: "61890642d0e19991126d389a",
  },
  {
    name: " oscar ",
    contacto: " xxx ",
    productos: " tintas berlin ",
    usuario: "618931fc950a41d9523b1c37",
    _id: "61880642d0e17761126d321b",
  },
  {
    name: " carlos ",
    contacto: " xxx ",
    productos: " ahujas 23l ",
    usuario: "618931fc950a41d9523b1c38",
    _id: "61890112d0e17761126d388c",
  },
  {
    name: " maria  ",
    contacto: " xx ",
    productos: " cremas bepantol ",
    usuario: "618931fc950a41d9523b1c39",
    _id: "61890112d0e17761126d376c",
  },
];

/* CITAS DE AGENDA*/
let citas = [
  {
    cliente: " Veronica  ",
    contacto: " xxx",
    work: " tatto corazon ",
    zona: " muñeca interior derecha ",
    fechaHora: "2022-01-01T22:00:00Z",
    usuario: "618931fc950a41d9523b1c36",
    _id: "12340112d0e17761126d388c",
  },
  {
    cliente: " Lucia  ",
    contacto: " xxx",
    work: " tatto pajaro ",
    zona: " nuca central ",
    fechaHora: "2022-01-01T10:00:00Z",
    usuario: "618931fc950a41d9523b1c36",
    _id: "56780112d0e17761126d388c",
  },
  {
    cliente: " Ricardo ",
    contacto: " xxx",
    work: " tatto escudo barca ",
    zona: " costillar izquierdo ",
    fechaHora: "2022-02-01T22:00:00Z",
    usuario: "618931fc950a41d9523b1c36",
    _id: "87650112d0e17761126d388c",
  },
  {
    cliente: " Valeria  ",
    contacto: " xxx",
    work: " tatto flor ",
    zona: " tobillo derecho",
    fechaHora: "2022-03-01T22:00:00Z",
    usuario: "618931fc950a41d9523b1c36",
    _id: "56780112d0e17762345d388c",
  },
];

/* Borramos contenido para limpiar BD + Creamos  + Desconectamos ((CON ASYNC & AWAIT ))*/
const asincrono = async () => {
  await User.deleteMany();
  await User.create(users);
  await Notes.deleteMany();
  await Notes.create(notes);
  await Pedido.deleteMany();
  await Pedido.create(pedidos);
  await Proveedor.deleteMany();
  await Proveedor.create(proveedor);
  await Cita.deleteMany();
  await Cita.create(citas);
  await mongoose.disconnect();
};

asincrono();
