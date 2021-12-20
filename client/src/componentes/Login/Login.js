/* Importo css login boostrap */
import "bootstrap/dist/css/bootstrap.min.css";
/* Importo css mio Login  */
import "./Login.css";
/* importo fondo pantalla login*/
import background from "../../imagenes/login.jpg";
/* Importo useState y useEffect de react */
import { useState } from "react";
/*Importo useHistory de react router DOM*/
import { useHistory } from "react-router-dom";
/* Importo axios (sustituye fetch )*/
import axios from "axios";

/* CREO COMPONENTE DE LOGIN */
const Login = () => {
  /* Declaro el estado & la funcion de actualizar el estado ( guardo lo que devuelve useState )  */
  let [userStatus, setUser] = useState({
    name: "",
    password: "",
  });

  /* Declaro el estado para que aparezca el mensaje de error si me logueo mal  */
  let [mensaje, setmensaje] = useState({
    mensaje: "",
  });

  /* Declaro una variable de useHistory para guardar lo que devuelve useHistory y cambiar de ruta */
  let history = useHistory();

  /* Declaro funcion para Onchange de name & Declaro funcion para Onchange de password */
  /*(este NAME es le atributo name del input)  */
  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...userStatus, [e.target.name]: e.target.value });
  };
  /* Declaro función para el Click (para enviar imformación del formularío )  */
  const handleClick = async (evento) => {
    evento.preventDefault();

    /* AXIOS */
    try {
      let response = await axios.post(
        "http://localhost:5000/api/authLogin/login",
        userStatus
      );

      if (response.data.auth === true) {
        window.localStorage.token = response.data.token;

        history.push(
          "/home"
        ); /*La ruta a la que quiero mandarlo cuando se loguee bien */
      } else {
        setmensaje({
          mensaje: response.data.message,
        });
      }
    } catch (error) {
      setmensaje({
        mensaje: "Error del servidor",
      });
    }
  };
  /* FIN DEL  AXIOS */

  return (
    <div
      className="logincontainer"
      /* Añado fondo de pantalla de login  */
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div id="login">
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form
                  id="login-form"
                  className="form"
                  onSubmit={handleClick} /* Función click  */
                >
                  <h3 className="textologin1">LOGIN</h3>
                  <div className="form-group">
                    <label className="textologin">USERNAME:</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      id="username"
                      className="form-control"
                      onChange={
                        handleChange
                      } /* Manejamos los cambios que se produzcan en  el input
                       y cada vez que haya un cambio se va a ejecutar la funcion que hemos 
                       creado arriba para onChange  */
                    />
                  </div>
                  <div className="form-group">
                    <label className="textologin">PASSWORD:</label>
                    <br />
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="form-control"
                      onChange={
                        handleChange
                      } /* Manejamos los cambios que se produzcan en  el input
                      y cada vez que haya un cambio se va a ejecutar la funcion que hemos 
                      creado arriba para onChange  */
                    />
                  </div>
                  <div className="form-group">
                    <br />
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="Open"
                    />
                  </div>

                  <span>{mensaje.mensaje}</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* EXPORTO EL COMPONENTE DE LOGIN  */
export default Login;
