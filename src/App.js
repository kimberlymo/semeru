import './App.css';
import {Route, Switch} from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import Statistics from "./components/Statistics";
import FastButtonMenu from "./components/FastButtonMenu";
import CreateTask from "./components/CreateTask";
import RecordTimeForTask from "./components/RecordTimeForTask";
import Layout from "./components/Layout";
import {useEffect} from "react";
import {cleanup} from "@testing-library/react";
import SignUp from "./components/authentication/SignUp";
import firebase from "firebase";
import {Spinner} from "react-bootstrap";

/**
 * Hauptapplikation der Website.
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Loading}/>
                <Route path="/anmelden" component={SignIn}/>
                <Route path="/registrieren" component={SignUp}/>
                <Route path="/statistiken"><Layout component={<Statistics/>}/></Route>
                <Route path="/schnellmenu"><Layout component={<FastButtonMenu/>}/></Route>
                <Route path="/tätigkeit/erstellen"><Layout component={<CreateTask/>}/></Route>
                <Route path="/tätigkeit/erfassen"><Layout component={<RecordTimeForTask/>}/></Route>
                <Route path="/">404</Route>
            </Switch>
        </div>
    );
}

/**
 * kontrolliert, ob der Benutzer angemeldet ist oder nicht.
 * Leitet den Benutzer je nachdem zu einer anderen Seite.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
function Loading(props) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            props.history.push(user ? 'schnellmenu' : 'anmelden')
        });
        return () => {
            cleanup()
        }
    });

    return (
        <div>
            <Spinner animation="border" variant="secondary"/>
        </div>
    )
}

export default App;
