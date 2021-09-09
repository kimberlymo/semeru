import {Alert} from "react-bootstrap";
import {useState} from "react";

/**
 * erstellt einen Countdown-timer und sobald die Zeit vorbei ist wird eine Meldung angezeigt.
 * Das graphische Aussehen ist noch in Bearbeitung
 *
 * @param timer
 * @param startValue Zeit in Millisekunden
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function TimerView({timer, startValue}) {
    const [duration, setDuration] = useState();
    timer.onTime(time => setDuration(startValue - time.ms));

    return (
        <div>
            <Alert variant='warning'>
                <h4>{(duration === 0) ? 'Ihre eingeplante Zeit ist vorbei ' : millisToDuration(duration)}</h4>
            </Alert>
        </div>
    )
}

/**
 * formatiert die Millisekunden in Stunden, Minuten und Sekunden.
 * Falls diese nicht berechnet werden können, gibt es 00:00:00 zurück.
 *
 * @param millis
 * @returns {string}
 */
function millisToDuration(millis) {
    let hours = Math.floor(millis / 3600000 % 24);
    let minutes = Math.floor(millis / 60000 % 60);
    let seconds = Math.floor(millis / 1000 % 60);

    hours = ((hours < 10) ? '0' : '') + hours;
    minutes = ((minutes < 10) ? '0' : '') + minutes;
    seconds = ((seconds < 10) ? '0' : '') + seconds;

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return '00:00:00';

    return hours + ':' + minutes + ':' + seconds;
}