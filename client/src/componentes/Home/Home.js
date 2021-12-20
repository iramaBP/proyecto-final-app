/* Importo css mio Home  */
import "./Home.css";
/* Importo fondo pantalla Home*/
import background from "../../imagenes/home.jpg";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";
/* Importo useState y useEffect de react */
import { useState, useEffect } from "react";
/* Importo axios (sustituye fetch )*/
import axios from "axios";
/* Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";
/* Importo Loading */
import Loading from "../Loanding/Loading";

/*CREO EL COMPONENTE DE HOME  */
const Home = () => {
  /* Declaro el estado & la funcion de actualizar el estado / guardo lo que devuelve useState  */
  let [state, setState] = useState({
    usuario: "",
    loading: true,
  });

  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory & cambiar de ruta */
  let history = useHistory();

  /* AXIOS */
  const getinfo = async () => {
    let response = await axios.get("http://localhost:5000/api/home/homeuser", {
      headers: { token: window.localStorage.token },
    });

    if (response.data.auth === true) {
      setState({ usuario: response.data.mensaje, loading: false });
    } else {
      history.push("/"); /* Le indico que me devuelva a LOGIN si sale mal */
    }
  };

  /* FIN AXIOX */

  /* Controlo el numero de veces que se ejecuta getinfo con useEffect*/
  useEffect(() => {
    getinfo();
  }, []);

  /* Le indico cuando deve aparacer el loanding */
  if (state.loading === true) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
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

        <div className="homecontainer">
          <h1 className="neonText">Welcome {state.usuario}</h1>
        </div>
      </div>
    );
  }
};

/* EXPORTO EL COMPONENTE DE HOME */
export default Home;
