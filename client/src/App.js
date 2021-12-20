/* IMPORTAR LOGIN */
import Login from "./componentes/Login/Login";
/* IMPORTAR  HOME */
import Home from "./componentes/Home/Home";

/* IMPORTAR  NOTES */
import Notes from "./componentes/Notes/Notes";
/* IMPORTAR  FORMULARIO CREAR NOTE */
import Formulario1 from "./componentes/Formulario1/Formulario1";
/* IMPORTAR  FORMULARIO EDITAR NOTE*/
import Formulario2 from "./componentes/Formulario2/Formulario2";
/* IMPORTAR  FORMULARIO ELIMINAR NOTE */
import Formulario3 from "./componentes/Formulario3/Formulario3";

/* IMPORTAR  AGENDA */
import Agenda from "./componentes/Agenda/Agenda";

/* IMPORTAR  MATERIAL */
import Material from "./componentes/Material/Material";
/* IMPORTAR  FORMULARIO CREAR PEDIDO */
import Formulario4 from "./componentes/Formulario4/Formulario4";
/* IMPORTAR  FORMULARIO EDITAR PEDIDO */
import Formulario5 from "./componentes/Formulario5/Formulario5";
/* IMPORTAR  FORMULARIO ELIMINAR PEDIDO */
import Formulario6 from "./componentes/Formulario6/Formulario6";

/* IMPORTAR SWITCH */
/*(Sirve para que se cambie de un componente a otro enfuncion de la ruta ) */
/* IMPORTAR ROUTE */
/*Dentro de cada Route va una ruta y todas dentro de switch */
import { Switch, Route } from "react-router-dom";

/* COMPONENTE */
function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            /* para limpiar el token*/
            window.localStorage.clear();
            return <Login />;
          }}
        />
        <Route
          exact
          path="/home"
          render={() => {
            return <Home />;
          }}
        />
        <Route
          exact
          path="/notes"
          render={() => {
            return <Notes />;
          }}
        />
        <Route
          exact
          path="/newnote"
          render={() => {
            return <Formulario1/>;
          }}
        />
        <Route
          exact
          path="/editnote/:id"
          render={() => {
            return <Formulario2 />;
          }}
        />
        <Route
          exact
          path="/suprnote/:id"
          render={() => {
            return <Formulario3 />;
          }}
        />

        <Route
          exact
          path="/agenda"
          render={() => {
            return <Agenda />;
          }}
        />
        <Route
          exact
          path="/material"
          render={() => {
            return <Material />;
          }}
        />
         <Route
          exact
          path="/newpedido"
          render={() => {
            return <Formulario4 />;
          }}
        />
        <Route
          exact
          path="/editpedido/:id"
          render={() => {
            return <Formulario5 />;
          }}
        />
        <Route
          exact
          path="/suprpedido/:id"
          render={() => {
            return <Formulario6 />;
          }}
        />
      </Switch>
    </div>
  );
}

/* EXPORTO APP */
export default App;
