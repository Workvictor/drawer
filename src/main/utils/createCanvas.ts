export const createCanvas = (
  width = window.innerWidth,
  height = window.innerHeight
) => {
  const element = document.createElement('canvas');
  Object.assign(element, { width, height });
  return element;
};
