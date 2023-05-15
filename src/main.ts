import "./style/main.css";
import { scene, camera, renderer } from "./environment/renderer";
import "./environment/paint";
import "./controllers/listeners";
import { actions } from "./controllers/actions";

let render = function (time: number) {
  actions(time);
  renderer.render(scene, camera.camera);
  requestAnimationFrame(render);
};
requestAnimationFrame(render);
