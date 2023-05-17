import * as THREE from "three";
import { Camera } from "./camera";

const camera = new Camera();

let scene = new THREE.Scene();

const color = 0xffffff;
const intensity = 6;
const light = new THREE.PointLight(color, intensity);
light.position.set(50, 20, 10);

const light2 = new THREE.PointLight(color, intensity);
light2.position.set(-50, -20, -10);
scene.add(light);
scene.add(light2);

const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

export { camera, scene, renderer };
