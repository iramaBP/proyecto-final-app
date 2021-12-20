/* Importo css mio Notes  */
import "./Notes.css";
/* importo fondo pantalla Notes*/
import background from "../../imagenes/notes.jpg";
/* importo NavBar */
import Navbar from "../Navbar/Navbar";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";

/*CREO EL COMPONENTE DE HOME  */
const Notes = () => {
  /* (HOME NOTAS ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState  */
  let [state, setState] = useState({
    notes: "",
    loading: true,
  });

  /*Declaro estado para guardar ID  de la nota seleccionada */
  let [idNote, setId] = useState({
    id: "",
  });

  /* Declaro el estado para que aparezca el mensaje de error si me logueo mal  */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory y cambiar de ruta */
  let history = useHistory();

  /*Declaro funcion para seleccionar nota */
  const selectNote = (e) => {
    let text = e.target.innerHTML;
    let arr = text.split("!");
    setId({
      id: arr[1],
    });
  };

  /*AXIOX*/
  const getnotes = async () => {
    let response = await axios.get(
      "http://localhost:5000/api/notes/homenotes",
      {
        headers: { token: window.localStorage.token },
      }
    );
    if (response.data.auth === true) {
      setState({ notes: response.data.notes, loading: false });
    } else {
      history.push("/"); /* Le indico que me devuelva a LOGIN si sale mal */
    }
  };
  /* FIN AXIOX  */

  /* Controlo el numero de veces que se ejecuta getinfo con useEffect*/
  useEffect(() => {
    getnotes();
  }, []);

  return (
    <div
      className="main-container"
      /* añado fondo de pantalla de notes  */
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

      <div className="titulocontainer">
        <h1 className="neonText">NOTEBOOK</h1>
      </div>
      <div className="x">
        <div className="tablonmedidascontenedor">
          <div className="tabloncontainer1">
            <div className="table-container">
              <table className="table">
                <thead>
                  <span>{mensaje.mensaje}</span>
                </thead>

                <tbody id="tbody">
                  {/* Bucle : Le indico con map que recorra el Array y me saque las TODAS las notas al incio */}
                  {state.notes !== "" ? (
                    state.notes.map((nota) => {
                      return (
                        <tr key={nota._id} className="colortext">
                          <td onClick={selectNote}>
                            {nota.texto}
                            <span className="oculto">!{nota._id}!</span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="estilobutton">
          <button
            onClick={() => {
              history.push("/newnote");
            }}
          >
            {/* Le indico que cambie de ruta al pulsar el boton & le indico la ruta que quiero  */}
            new
          </button>
          <button
            onClick={() => {
              if (idNote.id === "") {
                setmensaje({
                  mensaje: "Seleccione una nota ",
                });
              } else {
                history.push(`/editnote/${idNote.id}`);
              }
            }}
          >
            edit
          </button>
          <button
            onClick={() => {
              if (idNote.id === "") {
                setmensaje({
                  mensaje: "Seleccione una nota ",
                });
              } else {
                history.push(`/suprnote/${idNote.id}`);
              }
            }}
          >
            supr
          </button>
        </div>
      </div>
    </div>
  );
};

/* EXPORTO EL COMPONENTE DE NOTES */
export default Notes;
