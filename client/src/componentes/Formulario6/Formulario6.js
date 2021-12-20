/* Importo css mio Formulario 6 */
import "./Formulario6.css";
/* Importo  navbar */
import Navbar from "../Navbar/Navbar";
/* importo fondo pantalla */
import background from "../../imagenes/metro.jpg";

/* CREO COMPONENTE FORMULARIO 3 ELIMINAR NOTE*/
const Formulario6 = () => {
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
            ¿ Esta seguro que quiere eliminar el pedido ?
          </label>
          <div className="form-group1">
            <button type="submit" className="btn btn-default">
              Si
            </button>
            <button type="submit" className="btn btn-default">
              No
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/*EXPOTO EL COMPONENTE DE FORMULARIO3 ELIMINAR NOTE  */
export default Formulario6;
