export const firstToUpper = (str) =>
    str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : "";


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}