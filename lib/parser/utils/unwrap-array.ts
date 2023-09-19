const unWrapArr = <T>(arr: T[]): T[] => {
  if (arr.length === 1 && Array.isArray(arr[0])) {
    return unWrapArr(arr[0]);
  }
  return arr;
};

export default unWrapArr;
