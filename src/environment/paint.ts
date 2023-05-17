import { scene } from "./renderer";
import * as THREE from "three";

const boxes = new Array(256).fill(new THREE.BoxGeometry(1, 1, 1));

const lines = boxes.map((box, i) => {
  const depthMesh = new THREE.MeshPhongMaterial({ color: 0x666666 });

  const mesh = new THREE.Mesh(box, depthMesh);
  mesh.position.x = i * 1.2;

  mesh.scale.y = i + 0.5;
  mesh.rotateX(10);
  scene.add(mesh);
  return mesh;
});

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

      scriptNode = audioContext.createScriptProcessor(256, 1, 1);
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

    mediaStream.getTracks().forEach(function (track: any) {
      track.stop();
    });
    audioContext.close();
  }
}

function processAudio(event: any) {
  const inputBuffer = event.inputBuffer;
  const inputData = inputBuffer.getChannelData(0);

  inputData.map((newNum: number, i: number) => {
    lines[i].scale.x = newNum * 200;
  });
}
(window as any).startRecording = startRecording;
(window as any).stopRecording = stopRecording;
