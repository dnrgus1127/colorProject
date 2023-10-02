
export const decimalToHex = (number) => {
    return Math.ceil(number).toString(16).padStart(2, "0");;
}
