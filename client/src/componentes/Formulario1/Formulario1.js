/* Importo css mio Formulario  */
import "./Formulario1.css";
/* importo fondo pantalla */
import background from "../../imagenes/fondoformulario.jpg";
/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/*Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";

/* CREO COMPONENTE FORMULARIO CREAR NOTA*/

const Formulario1 = () => {
  /* (NUEVA NOTA ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState */
  let [state, textoState] = useState({
    texto: "",
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
    textoState({ ...state, [e.target.name]: e.target.value });
  };

  /* Declaro funcion para el Click (para enviar imformación del formularío )  */
  const handleClick = async (evento) => {
    evento.preventDefault();
    /*AXIOX*/
    try {
      let response = await axios.post(
        "http://localhost:5000/api/notes/newnote",
        state,
        {
          headers: { token: window.localStorage.token },
        }
      );

      if (response.data.auth === true) {
        history.push("/notes");
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

      <div className="formcontainer1">
        <form onSubmit={handleClick}>
          <label className="colorletra"> NEW NOTE </label>
          <div>
            <textarea
              rows="10"
              cols="40"
              type="text"
              name="texto"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-default">
            Crear
          </button>
          <span>{mensaje.mensaje}</span>
        </form>
      </div>
    </div>
  );
};

/* EXPORTO EL COMPONENTE DE FORMULARIO CREAR NOTE */

export default Formulario1;
