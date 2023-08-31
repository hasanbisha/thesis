import { numberWithCommas } from "./string";

export const renderDurationAsFormat = (duration, format = "HH:mm:ss") => {
    // const totalSeconds = Math.floor(duration / 1000);

    const hours = Math.floor(duration / 3600).toString();
    const minutes = Math.floor((duration % 3600) / 60).toString();
    const seconds = Math.floor((duration % 3600) % 60).toString();

    let fixedHours;
    let fixedMinutes;
    let fixedSeconds;

    if (duration <= 0) {
        fixedHours = "00";
        fixedMinutes = "00";
        fixedSeconds = "00";
    } else {
        fixedHours = hours.length > 1 ? numberWithCommas(parseInt(hours)) : `0${hours}`;
        fixedMinutes = minutes.length > 1 ? minutes : `0${minutes}`;
        fixedSeconds = seconds.length > 1 ? seconds : `0${seconds}`;
    }

    switch (format) {
        case "hh:mm A":
        case "HH:mm": {
            return `${fixedHours}:${fixedMinutes}`;
        }

        default:
        case "hh:mm:ss A":
        case "HH:mm:ss": {
            return `${fixedHours}:${fixedMinutes}:${fixedSeconds}`;
        }
    }
};