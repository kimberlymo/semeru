import {useState} from "react";

/**
 * Hier wird die Stoppuhr implementiert und wird momentan in zwei Komponenten gebraucht.
 * Die Formatierung muss noch erledigt werden!!
 *
 * @param stopwatch die Stoppuhr wird mitgegeben, damit im Parent diese an- oder ausschalten kann
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function StopwatchView({stopwatch}) {
    const [duration, setDuration] = useState(0);
    stopwatch.onTime(time => setDuration(time.ms));

    return (
        <div>
            <h5>
                {millisToDuration(duration)}
            </h5>
        </div>
    )
}

function millisToDuration(millis) {
    let hours = Math.floor(millis / 3600000 % 24);
    let minutes = Math.floor(millis / 60000 % 60);
    let seconds = Math.floor(millis / 1000 % 60);

    hours = ((hours < 10) ? '0' : '') + hours;
    minutes = ((minutes < 10) ? '0' : '') + minutes;
    seconds = ((seconds < 10) ? '0' : '') + seconds;

    return hours + ':' + minutes + ':' + seconds
}