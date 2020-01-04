export const createCanvas = (
  width = window.innerWidth,
  height = window.innerHeight
) => {
  const element = document.createElement('canvas');
  Object.assign(element, {
    width: Math.floor(width / 2) * 2,
    height: Math.floor(height / 2) * 2
  });
  return element;
};
