const useIndex = () => {
    // get index of object by match keys value
  const getIndex = (dataHub, key, val) => {
    let index = -1;
    dataHub &&
      dataHub.forEach((x, i) => {
        if (x[key] == val) {
          index = i;
        }
      });
    return index;
  };
  return getIndex;
};
export default useIndex;
