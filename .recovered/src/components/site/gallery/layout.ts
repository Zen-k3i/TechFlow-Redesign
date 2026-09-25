import { exhibits } from "../content";

export const CAMERA_START_Z = 8.5;
export const SPACING = 5;
export const FINAL_Z = -4 - exhibits.length * SPACING;
export const CAMERA_END_Z = FINAL_Z + 5.2;

export function exhibitPosition(index: number) {
  const left = index % 2 === 0;
  return {
    x: left ? -1.75 : 1.75,
    z: -4 - index * SPACING,
    rotY: left ? 0.42 : -0.42,
  };
}

/** Scroll progress (0–1) at which the camera stands in front of each exhibit. */
export const exhibitStops = exhibits.map((_, i) => {
  const viewZ = exhibitPosition(i).z + 3.6;
  return (CAMERA_START_Z - viewZ) / (CAMERA_START_Z - CAMERA_END_Z);
});
