declare module "meshline" {
  import { BufferGeometry, Material } from "three";

  export class MeshLine {
    geometry: BufferGeometry;
    setPoints(points: Array<number | [number, number, number]>): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: Record<string, unknown>);
  }
}
