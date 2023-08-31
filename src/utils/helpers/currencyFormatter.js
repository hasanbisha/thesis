export const currencyFormatter = (value, currency) => {
    return value?.toLocaleString("en-US", {
        style: "currency",
        currency: currency || "USD",
    });
};