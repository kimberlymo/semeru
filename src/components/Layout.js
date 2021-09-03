import {Container, Nav, Navbar} from "react-bootstrap";

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
                    <Navbar.Brand href="/schnellmenu">Semeru</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/statistiken">Statistiken</Nav.Link>
                            <Nav.Link href="/tätigkeit/erfassen">Zeiten erfassen</Nav.Link>
                            <Nav.Link href="/tätigkeit/erstellen">Tätigkeit erfassen</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            {component}
        </Container>
    )
}