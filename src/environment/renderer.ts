import * as THREE from "three";
import { Camera } from "./camera";

const camera = new Camera();

let scene = new THREE.Scene();

const color = 0xffffff;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light);

const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

export { camera, scene, renderer };
