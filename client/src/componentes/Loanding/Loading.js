/* Importo css mio Login  */
import "./Loading.css";
/* Importo fondo pantalla Home*/
import background from "../../imagenes/cables.jpg";

/* CREO EL COMPONENTE DE LOANDING */
const loading = () => {
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
        <h1>LOADING.....</h1>
        <h1>ESPERE MIENTRAS CARGAMOS EL CONTENIDO</h1>
      </div>
    </div>
  );
};


/* EXPORTO COMPONENTE DE LOANDING */
export default loading;
