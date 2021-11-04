/**
 * @typedef {{ h: 'left' | 'right'; v: 'top' | 'bottom'; text: string; }} ScreenshotCaption
 * @typedef {{
 *  captions: ScreenshotCaption[];
 * }} ScreenshotConfig
 */

/**
 *
 * @param {HTMLCanvasElement | CanvasRenderingContext2D} target Canvas on which the screenshot is drawn
 * @param {HTMLVideoElement} videoDomElement Source video element from which the screenshot is taken
 * @param {ScreenshotConfig} config
 */
export function drawCanvas(target, videoDomElement, config) {
  const [targetCanvas, context] =
    target instanceof HTMLCanvasElement
      ? [target, target.getContext('2d')]
      : [target.canvas, target];

  targetCanvas.width = videoDomElement.videoWidth;
  targetCanvas.height = videoDomElement.videoHeight;

  context.drawImage(videoDomElement, 0, 0, targetCanvas.width, targetCanvas.height);

  const unitHeight = targetCanvas.height / 1080;
  const textPad = 10 * unitHeight;

  context.font = `${Math.floor(25 * unitHeight)}px Arial`;
  context.fillStyle = "#FFFFFF";
  context.shadowBlur = 5;
  context.shadowColor = "black";

  for (const caption of config.captions) {
    const x = caption.h === 'left' ? textPad : targetCanvas.width - textPad;
    const y = caption.v === 'top' ? textPad : targetCanvas.height - textPad;

    context.textAlign = caption.h;
    context.fillText(caption.text, x, y);
  }
}
