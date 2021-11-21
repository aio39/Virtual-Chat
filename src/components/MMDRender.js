import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
// import Stats from 'three/examples/jsm/libs/stats';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

function onProgress(xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
}

const modelUrl = (model) => {
  return `http://localhost:3001/public/models/${model}/${model}.pmx`;
};

const MMDContainer = ({ order, model }) => {
  useEffect(() => {
    let container, stats, helper;
    let mesh, camera, scene, renderer, effect;
    let head, left_eye, right_eye;
    let angle_const = 3.1415926 / 180;
    let clock = new THREE.Clock();

    const aspect = 1;
    const width = parseInt(window.innerWidth / 3);
    const height = parseInt(window.innerWidth / 3);
    // const height = parseInt(window.innerHeight / 3);

    setTimeout(function () {
      requestAnimationFrame(() => animate({ euler: [0, 0, 0], eye: [0, 0] }));
    }, 2000);

    init();

    function init() {
      const parent = document.getElementById('mmd' + order);
      parent.innerHTML = ''; // 리액트 새로고침될때 초기화 시키기
      camera = new THREE.PerspectiveCamera(20, aspect, 1, 100);
      camera.position.set(0, 0, 16); // x y z 축  , == position.z = 16

      // scene
      console.log(modelUrl(model));
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      var ambient = new THREE.AmbientLight(0x666666);
      scene.add(ambient);

      var directionalLight = new THREE.DirectionalLight(0x887766);
      directionalLight.position.set(-1, 1, 1).normalize();
      scene.add(directionalLight);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height); // 랜더링될 크기 , 3번쨰 옵션  false주면 100% 크기에 해상도만 바뀜
      parent.appendChild(renderer.domElement);

      effect = new OutlineEffect(renderer);

      // // STATS

      // stats = new Stats();
      // parent.appendChild(stats.dom);

      const mmdLoader = new MMDLoader();
      helper = new MMDAnimationHelper({ afterglow: 0.0 });

      var modelFile =
        'http://localhost:3001/public/' + 'models/kizunaai/kizunaai.pmx';
      const filePath = modelUrl(model);
      console.log(modelUrl(model));
      console.log(modelFile);
      console.log(filePath == modelFile);

      mmdLoader.load(
        modelUrl(model),
        function (object) {
          // geometry + material => mesh
          mesh = object;
          mesh.position.y = -18;

          // mesh.rotation.y = 0.1;

          scene.add(mesh); // scene에다가 mesh 넣어주기

          helper.add(mesh, { physics: true });

          var ikHelper = helper.objects.get(mesh).ikSolver.createHelper();
          ikHelper.visible = true;
          scene.add(ikHelper);

          var physicsHelper = helper.objects.get(mesh).physics.createHelper();
          physicsHelper.visible = false;
          scene.add(physicsHelper);

          var bones = physicsHelper.physics.mesh.skeleton.bones;

          head = bones[8];
          left_eye = bones[86];
          right_eye = bones[88];
        },
        onProgress,
        null
      );
      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      console.log('resize window');
      // camera.aspect = aspect;
      camera.updateProjectionMatrix();
      effect.setSize(width, height);
    }

    function animate(result) {
      // stats.begin();
      render(result);
      // stats.end();
    }
    window.myData.animate = animate;

    function render(result) {
      var euler = result.euler;
      var eye_euler = result.eye;
      var mouth = result.mouth;
      var blink = result.blink;

      if (head) {
        head.rotation.x = Math.round(euler[0]) * angle_const;
        head.rotation.y = Math.round(euler[1]) * angle_const;
        head.rotation.z = Math.round(euler[2]) * angle_const;
      }

      if (left_eye) {
        left_eye.rotation.y = eye_euler[0];
        left_eye.rotation.x = eye_euler[1];
      }
      if (right_eye) {
        right_eye.rotation.y = eye_euler[0];
        right_eye.rotation.x = eye_euler[1];
      }

      var mouth_index, eye_index;

      if (mouth > 0.6) mouth_index = 9;
      else if (mouth > 0.4) mouth_index = 12;
      else if (mouth > 0.2) mouth_index = 11;

      if (blink) {
        if (blink[0] < 0.1 && blink[1] < 0.1) eye_index = 1;
        else if (blink[0] < 0.1) eye_index = 4;
        else if (blink[1] < 0.1) eye_index = 5;
      }

      if (mouth_index) {
        mesh.morphTargetInfluences[mouth_index] = 1;
      }

      if (eye_index) {
        mesh.morphTargetInfluences[eye_index] = 1;
      }

      helper.update(clock.getDelta());
      effect.render(scene, camera);

      if (mouth_index) {
        mesh.morphTargetInfluences[mouth_index] = 0;
      }

      if (eye_index) {
        mesh.morphTargetInfluences[eye_index] = 0;
      }
    }
  }, [model, order]);

  return <div></div>;
};

const MMDRender = ({ order, model }) => {
  if (!order) {
    return <Box>"aaaaaa"</Box>;
  }

  return (
    <div id={'mmd' + order}>
      <MMDContainer order={order} model={model} />
    </div>
  );
};

export default MMDRender;
