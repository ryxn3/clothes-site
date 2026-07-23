import * as THREE from "three";

const CACHE = new Map<string, THREE.CanvasTexture>();

/** Procedurally renders a ridged corduroy weave so we don't depend on external image assets. */
export function createCorduroyTexture(baseHex: string): THREE.CanvasTexture {
  const cached = CACHE.get(baseHex);
  if (cached) return cached;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, size, size);

  const ridgeWidth = 10;
  for (let x = 0; x < size; x += ridgeWidth) {
    const gradient = ctx.createLinearGradient(x, 0, x + ridgeWidth, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0.10)");
    gradient.addColorStop(0.45, "rgba(0,0,0,0.16)");
    gradient.addColorStop(0.55, "rgba(0,0,0,0.16)");
    gradient.addColorStop(1, "rgba(255,255,255,0.05)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, ridgeWidth, size);
  }

  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 10;
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise));
    imageData.data[i + 1] = Math.max(
      0,
      Math.min(255, imageData.data[i + 1] + noise)
    );
    imageData.data[i + 2] = Math.max(
      0,
      Math.min(255, imageData.data[i + 2] + noise)
    );
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  CACHE.set(baseHex, texture);
  return texture;
}

let bumpCache: THREE.CanvasTexture | null = null;

export function createCorduroyBumpMap(): THREE.CanvasTexture {
  if (bumpCache) return bumpCache;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  const ridgeWidth = 10;
  for (let x = 0; x < size; x += ridgeWidth) {
    const gradient = ctx.createLinearGradient(x, 0, x + ridgeWidth, 0);
    gradient.addColorStop(0, "#5a5a5a");
    gradient.addColorStop(0.5, "#f2f2f2");
    gradient.addColorStop(1, "#4a4a4a");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, ridgeWidth, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.needsUpdate = true;
  bumpCache = texture;
  return texture;
}
