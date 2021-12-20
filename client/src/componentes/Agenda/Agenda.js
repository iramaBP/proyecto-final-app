/* Importo css mio Home  */
import "./Agenda.css";
/* Importo fondo pantalla Home*/
import background from "../../imagenes/agenda.jpg";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";

/* CREO COMPONENTE AGENDA */

const Agenda = () => {
  return(
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
      <h1 className="neonText">AGENDA PERSONAL </h1>
    </div>
  </div>
);
}



/* EXPORTO EL COMPONENTE DE HOME */
export default Agenda;
