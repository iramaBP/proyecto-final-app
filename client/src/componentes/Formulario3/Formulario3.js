/* Importo css mio Formulario 3  */
import "./Formulario3.css";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";
/* importo fondo pantalla */
import background from "../../imagenes/fondoformulario.jpg";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/* Importo useState y useEffect de react */
import { useState } from "react";
/* Importo usePAramas de react dom */
import { useParams } from "react-router-dom";
/*Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";

/* CREO COMPONENTE FORMULARIO 3 ELIMINAR NOTE*/
const Formulario3 = () => {
  /* (SUPR NOTA ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState */
  let [id, idState] = useState({
    id: useParams(),
  });
  /* Declaro el estado para que aparezca el mensaje de error  */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory y cambiar de ruta */
  let history = useHistory();

  /*Declaro funcion onClick*/
  let noBorrar = () => {
    history.push("/notes");
  };

  /*AXIOX*/
  const suprNote = async (evento) => {
    evento.preventDefault();
    let response = await axios.delete(
      `http://localhost:5000/api/notes/suprnote/${id.id.id}`,

      {
        headers: { token: window.localStorage.token },
      }
    );
    console.log(response);
    if (response.data.auth === true) {
      history.push("/notes");
    } else {
      setmensaje({
        mensaje: response.data.mensaje,
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

      <div className="formcontainer3">
        <form>
          <label className="colorletra">
            {" "}
            ¿ Esta seguro que quiere eliminar la nota ?{" "}
          </label>
          <div className="form-group1">
            <button
              onClick={suprNote}
              type="submit"
              className="btn btn-default"
            >
              Si
            </button>
            <button
              onClick={noBorrar}
              type="submit"
              className="btn btn-default"
            >
              No
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/*EXPOTO EL COMPONENTE DE FORMULARIO3 ELIMINAR NOTE  */
export default Formulario3;
