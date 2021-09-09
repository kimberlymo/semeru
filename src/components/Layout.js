import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

/**
 * erstellt eine Vorgabe der Website.
 * Es ist eine Navigationbar einbegriffen und diese navigiert zu den anderen Komponenten
 *
 * @param component
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function Layout({component}) {
    return (
        <Container>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <NavLink to="/schnellmenu" className="navbar-brand">Semeru</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/statistiken">Statistiken</NavLink>
                            <NavLink className="nav-link" to="/tätigkeit/erfassen">Zeiten erfassen</NavLink>
                            <NavLink className="nav-link" to="/tätigkeit/erstellen">Tätigkeit erfassen</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            {component}
        </Container>
    )
}