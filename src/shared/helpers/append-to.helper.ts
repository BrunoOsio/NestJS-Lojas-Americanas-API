const appendTo = (query: object, newProperty: object) => {
  return {
    ...query,
    ...newProperty,
  };
}

export default appendTo;