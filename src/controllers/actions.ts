import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, renderer } from "../environment/renderer";

//__________________________________ WINDOW RESIZE _________________________________________

function resizeRendererToDisplaySize(renderer: any) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

const checkForResize = () => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.camera.updateProjectionMatrix();
  }
};

const controls = new OrbitControls(camera.camera, renderer.domElement);

controls.target.set(0, 0.5, 0);

controls.update();
controls.enablePan = false;

//__________________________________ AUDIO _________________________________________

let audioContext: any;
let mediaStream: any;
let audioSource: any;
let scriptNode: any;

function startRecording() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      audioContext = new AudioContext();
      mediaStream = stream;

      audioSource = audioContext.createMediaStreamSource(stream);

      scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
      scriptNode.onaudioprocess = processAudio;

      audioSource.connect(scriptNode);
      scriptNode.connect(audioContext.destination);
    })
    .catch(function (err) {
      console.error("Error accessing microphone:", err);
    });
}

function stopRecording() {
  if (audioContext) {
    audioSource.disconnect(scriptNode);
    scriptNode.disconnect(audioContext.destination);

    mediaStream.getTracks().forEach(function (track) {
      track.stop();
    });
    audioContext.close();
  }
}

function processAudio(event: any) {
  const inputBuffer = event.inputBuffer;
  // Access and process the audio data here
  const inputData = inputBuffer.getChannelData(0);
  console.log(inputData);
}
(window as any).startRecording = startRecording;
(window as any).stopRecording = stopRecording;

export const actions = (time: number) => {
  time *= 0.0001;
  checkForResize();
  controls.update();
};
