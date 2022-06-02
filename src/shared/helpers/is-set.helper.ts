const isSet = (value) => {

    if (typeof value === "number") {
        return !isNaN(value);
    }

    return value !== undefined && value !== null;
}

export default isSet;