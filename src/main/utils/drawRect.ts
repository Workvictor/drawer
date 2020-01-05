import { Renderer } from 'main/com/Renderer';

interface Options {
  strokeStyle: string;
  fillStyle: string;
  radius: number;
  lineWidth: number;
}

export const drawRect = (w: number, h: number, options: Partial<Options> = {}) => {
  const {
    strokeStyle = '#121212',
    fillStyle = '#4a0e11',
    radius = 8,
    lineWidth = 2
  } = options;
  const padding = [radius * 2, radius];
  const buffer = new Renderer(w, h);
  buffer.ctx.strokeStyle = strokeStyle;
  buffer.ctx.fillStyle = fillStyle;
  buffer.ctx.lineWidth = lineWidth;
  buffer.ctx.beginPath();
  buffer.ctx.moveTo(padding[1], 0);
  buffer.ctx.lineTo(buffer.width - padding[0], 0);
  buffer.ctx.arcTo(buffer.width, 0, buffer.width, padding[0], padding[1]);
  buffer.ctx.lineTo(buffer.width, buffer.height - padding[0]);
  buffer.ctx.arcTo(
    buffer.width,
    buffer.height,
    buffer.width - padding[0],
    buffer.height,
    padding[1]
  );
  buffer.ctx.lineTo(padding[0], buffer.height);
  buffer.ctx.arcTo(0, buffer.height, 0, buffer.height - padding[0], padding[1]);
  buffer.ctx.lineTo(0, padding[0]);
  buffer.ctx.arcTo(0, 0, padding[0], 0, padding[1]);
  buffer.ctx.fill();
  buffer.ctx.stroke();

  return buffer.canvas;
};
