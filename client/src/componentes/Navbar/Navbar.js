/* Importo css mio Login  */
import "./Navbar.css";
/* Importo css login boostrap */
import "bootstrap/dist/css/bootstrap.min.css";

/* IMPORTO COMPONENTES DE BOOTSTRAP */

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";

/*CREO EL COMPONENTE DE HOME  */
const NavBar = () => {
  return (
    <div>
      <Navbar className="navigation" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#" className="neon-nav-element nav-element">
            10 KM TATTO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                SECCIONES:
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/agenda">Agenda</Nav.Link>
                <Nav.Link href="/material">Material</Nav.Link>
                <Nav.Link href="/notes">NoteBook</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className="bottom-nav"></div>
    </div>
  );
};

/* EXPORTO EL COMPONENTE DE HOME */
export default NavBar;
