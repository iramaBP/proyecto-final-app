/* Importo css mio Home  */
import "./Material.css";
/* importo fondo pantalla Notes*/
import background from "../../imagenes/material2.jpg";
/* importo NavBar */
import Navbar from "../Navbar/Navbar";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";

/*CREO EL COMPONENTE DE HOME  */
const Material = () => {
  /* (HOME PEDIDOS ) Declaro el estado y la funcion de actualizar el estado y guardo lo que devuelve useState  */
  let [state, setState] = useState({
    pedidos: [],
    loading: true,
  });

  /*Declaro estado para guardar ID  de la nota seleccionada */
  let [idPedido, setId] = useState({
    id: "",
  });

  /* Declaro el estado para que aparezca el mensaje de error si me logueo mal  */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory y cambiar de ruta */
  let history = useHistory();

  /*Declaro funcion para seleccionar nota */
  const selectPedido = (e) => {
    let text = e.target.innerHTML;
    let arr = text.split("!");
    setId({
      id: arr[1],
    });
  };

  /*AXIOX*/
  const getPedido = async () => {
    let response = await axios.get(
      "http://localhost:5000/api/pedido/homematerial",
      {
        headers: { token: window.localStorage.token },
      }
    );

    if (response.data.auth === true) {
      setState({ pedidos: response.data.pedidos, loading: false });
    } else {
      history.push("/"); /* Le indico que me devuelva a LOGIN si sale mal */
    }
  };
  /* FIN AXIOX  */

  /* Controlo el numero de veces que se ejecuta getinfo con useEffect*/
  useEffect(() => {
    getPedido();
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
        <h1 className="neonText">LISTADO MATERIAL</h1>
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
                  {state.pedidos.map((pedido) => {
                    return (
                      <tr key={pedido._id} className="colortext">
                        <td onClick={selectPedido}>
                          {pedido.producto}
                          <span className="oculto">!{pedido._id}!</span>
                        </td>

                        <td>{pedido.cantidad}</td>
                        <td>{pedido.proveedor}</td>
                        <td>{pedido.contacto}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="estilobutton">
          <button
            onClick={() => {
              history.push("/newpedido");
            }}
          >
            new
          </button>
          <button
            onClick={() => {
              if (idPedido.id === "") {
                setmensaje({
                  mensaje: "Seleccione un pedido ",
                });
              } else {
                history.push(`/editpedido/${idPedido.id}`);
              }
            }}
          >
            edit
          </button>
          <button>supr</button>
        </div>
      </div>
    </div>
  );
};

/* EXPORTO EL COMPONENTE DE MATERIAL */
export default Material;
