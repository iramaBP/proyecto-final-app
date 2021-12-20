/* Importo css mio Formulario 2  */
import "./Formulario2.css";
/* importo fondo pantalla */
import background from "../../imagenes/fondoformulario.jpg";

/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo usePAramas de react dom */
import { useParams } from "react-router-dom";
/*Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";
/* Importo Loading */
import Loading from "../Loanding/Loading";

/* CREO COMPONENTE FORMULARIO 2 EDITAR NOTE*/
const Formulario2 = () => {
  /* (EDITAR PEDIDO ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState */
  let [state, textoState] = useState({
    texto: "",
    loading: true,
  });

  /* (EDITAR PEDIDO ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState */
  let [id, idState] = useState({
    id: useParams(),
  });
  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory y cambiar de ruta */
  let history = useHistory();

  /* Declaro handleChange  */
  const handleChange = (e) => {
    e.preventDefault();
    textoState({ ...state, [e.target.name]: e.target.value });
  };
  /* Declaro el estado para que aparezca el mensaje de error */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /*AXIOS*/

  const editnotes = async () => {
    let response = await axios.get(
      `http://localhost:5000/api/notes/note/${id.id.id}`,
      {
        headers: { token: window.localStorage.token },
      }
    );

    if (response.data.auth === true) {
      textoState({ texto: response.data.note.texto, loading: false });
    } else {
      history.push("/"); /* Le indico que me devuelva a LOGIN si sale mal */
    }
  };

  /* Declaro funcion para el Click (para enviar imformación del formularío )  */
  const handleClick = async (evento) => {
    evento.preventDefault();

    /*AXIOX*/
    try {
      let response = await axios.put(
        `http://localhost:5000/api/notes/editnote/${id.id.id}`,
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

  /* Controlo el numero de veces que se ejecuta getinfo con useEffect*/
  useEffect(() => {
    editnotes();
  }, []);

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
        {state.loading === true ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="formcontainer2">
            <form onSubmit={handleClick}>
              <label className="colorletra"> EDIT </label>
              <div className="form-group1">
                <textarea
                  rows="10"
                  cols="40"
                  type="text"
                  name="texto"
                  className="form-control"
                  onChange={handleChange}
                >
                  {state.texto}
                </textarea>
              </div>

              <button type="submit" className="btn btn-default">
                Edit
              </button>
              <span>{mensaje.mensaje}</span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

/*EXPOTO EL COMPONENTE DE FORMULARIO 2 EDITAR NOTE  */
export default Formulario2;
