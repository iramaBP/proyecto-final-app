/* Importo css mio Formulario5  */
import "./Formulario5.css";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";
/* importo fondo pantalla */
import background from "../../imagenes/metro.jpg";
/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo usePAramas de react dom */
import { useParams } from "react-router-dom";
/*Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/* Importo Loading */
import Loading from "../Loanding/Loading";

/* CREO COMPONENTE FORMULARIO 5 EDITAR NOTA*/
const Formulario5 = () => {
  /* (EDITAR PEDIDO ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState */
  let [state, pedidoState] = useState({
    pedido: [],
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
    pedidoState({ ...state, [e.target.name]: e.target.value });
  };
  /* Declaro el estado para que aparezca el mensaje de error */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /*AXIOS*/

  const editpedido = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/api/pedido/pedido/${id.id.id}`,
        {
          headers: { token: window.localStorage.token },
        }
      );

      if (response.data.auth === true) {
        pedidoState({
          producto: response.data.pedido.producto,
          cantidad: response.data.pedido.cantidad,
          proveedor: response.data.pedido.proveedor,
          contacto: response.data.pedido.contacto,
          loading: false,
        });
      } else {
        history.push("/"); /* Le indico que me devuelva a LOGIN si sale mal */
      }
    } catch (error) {}
  };

  /* Declaro funcion para el Click (para enviar imformación del formularío )  */
  const handleClick = async (evento) => {
    evento.preventDefault();

    /*AXIOX*/
    try {
      let response = await axios.put(
        `http://localhost:5000/api/pedido/editpedido/${id.id.id}`,
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

  /* Controlo el numero de veces que se ejecuta con useEffect*/
  useEffect(() => {
    editpedido();
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
          <div className="formcontainer4">
            <form onSubmit={handleClick}>
              <p>
                Producto:
                <input
                  type="text"
                  name="producto"
                  onChange={handleChange}
                  value={state.producto}
                />
              </p>
              <p>
                Cantidad:
                <input
                  type="text"
                  name="cantidad"
                  onChange={handleChange}
                  value={state.cantidad}
                />
              </p>
              <p>
                Proveedor:
                <input
                  type="text"
                  name="proveedor"
                  onChange={handleChange}
                  value={state.proveedor}
                />
              </p>
              <p>
                Contacto:
                <input
                  type="text"
                  name="contacto"
                  onChange={handleChange}
                  value={state.contacto}
                />
              </p>

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

/*EXPOTO EL COMPONENTE DE FORMULARIO 5 EDITAR PEDIDO  */
export default Formulario5;
