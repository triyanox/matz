const removeEmptyEl = (arr: any[]): any[] => {
  return arr.filter((el) => {
    return el !== null && el !== undefined && el !== "";
  });
};

export default removeEmptyEl;
