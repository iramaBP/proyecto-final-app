/* Importo css mio Formulario 4  */
import "./Formulario4.css";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";
/* importo fondo pantalla */
import background from "../../imagenes/metro.jpg";
/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/*Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";

/* CREO COMPONENTE FORMULARIO 4 CREAR PEDIDO*/

const Formulario4 = () => {
  /* (NUEVO PEDIDO ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState */
  let [state, pedidoState] = useState({
    pedido: [],
  });

  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory y cambiar de ruta */
  let history = useHistory();

  /* Declaro el estado para que aparezca el mensaje de error   */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /* Declaro handleChange  */
  const handleChange = (e) => {
    e.preventDefault();
    pedidoState({ ...state, [e.target.name]: e.target.value });
  };

  /* Declaro funcion para el Click (para enviar imformación del formularío )  */
  const handleClick = async (evento) => {
    evento.preventDefault();
    /*AXIOX*/
    try {
      let response = await axios.post(
        "http://localhost:5000/api/pedido/newpedido",
        state,
        {
          headers: { token: window.localStorage.token },
        }
      );

      if (response.data.auth === true) {
        history.push("/material");
      } else {
        setmensaje({
          mensaje: response.data.mensaje,
        });
      }
    } catch (error) {
      setmensaje({
        mensaje: "Error del servidor",
      });
    }
  };

  /* FIN AXIOX */
  return (
    <div
      className="main-container"
      /* añado fondo de pantalla de home  */
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="formcontainer4">
        <form onSubmit={handleClick}>
          <p>
            Producto:
            <input type="text" name="producto" onChange={handleChange}></input>
          </p>
          <p>
            Cantidad:
            <input type="text" name="cantidad" onChange={handleChange}></input>
          </p>
          <p>
            Proveedor:
            <input type="text" name="proveedor" onChange={handleChange}></input>
          </p>
          <p>
            Contacto:
            <input type="text" name="contacto" onChange={handleChange}></input>
          </p>

          <button type="submit" className="btn btn-default">
            Crear
          </button>
          <span>{mensaje.mensaje}</span>
        </form>
      </div>
    </div>
  );
};

/* EXPORTO EL COMPONENTE DE FORMULARIO4 VER / CREAR */

export default Formulario4;
