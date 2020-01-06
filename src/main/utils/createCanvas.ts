export const createCanvas = (
  width = window.innerWidth,
  height = window.innerHeight
) => {
  const element = document.createElement('canvas');
  element.width = Math.floor(width / 2) * 2;
  element.height = Math.floor(height / 2) * 2;
  return element;
};
