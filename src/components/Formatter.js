/**
 * Hier werden die Daten formatiert.
 * Je nachdem, was gebraucht wird, kann dies benutzt werden
 *
 * @author Kimberly Moorhouse
 */
export default class Formatter {

    /**
     * bekommt zwei Daten und berechnet die Differenz zwischen den zwei Daten
     * Diese werden formatiert zurückbekommen.
     *
     * @param date1
     * @param date2
     * @returns {string} formatiert nach: 09:02
     */
    calculateDifferenceDates(date1, date2) {
        let hours = Math.floor(((date1 - date2) % 86400000) / 3600000);
        let minutes = Math.floor((((date1 - date2) % 86400000) % 3600000) / 60000);
        return ((hours < 10) ? "0" : "") + hours + ":" + ((minutes < 10) ? "0" : "") + minutes;
    }

    /**
     * Formatiert eine Uhrzeit als String zu einem Datum
     * @param time z. B. 10:50
     * @returns {Date}
     */
    getDateFromHours(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    }

    /**
     * berechnet den Unterschied zwischen zwei Uhrzeiten und gibt die Anzahl Stunden zurück
     *
     * @param time1 z. B. 10:50, String
     * @param time2 z. B. 10:50, String
     * @returns {number}
     */
    subtractTimeInHours(time1, time2) {
        time1 = this.getDateFromHours(time1);
        time2 = this.getDateFromHours(time2);

        return ((time1 - time2) % 86400000) / 3600000;
    }

    showTask(task) {
        return task.name + " " + task.plannedFrom + "-" + task.plannedTill;
    }

    /**
     * gibt die Uhrzeit formatiert zurück (10:50)
     * @param date
     * @returns {string}
     */
    formatDate(date) {
        return ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
    }
}