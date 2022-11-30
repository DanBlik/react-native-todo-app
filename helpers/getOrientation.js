export const getOrientation = ({ width, height }) => {
  if (width < height) {
    return "vertical";
  }

  return "horizontal";
};
