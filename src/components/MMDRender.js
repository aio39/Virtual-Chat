import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
// import Stats from 'three/examples/jsm/libs/stats';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

const defaultBones = {
  miku: {
    head_num: 17,
    left_eye_num: 98,
    right_eye_num: 99,
    right_arm_num: 20,
    left_arm_num: 60,
  },
  kizunaai: {
    head_num: 8,
    left_eye_num: 86,
    right_eye_num: 88,
    right_arm_num: 99,
    left_arm_num: 99,
  },
};

// # Angry, Disgusted, Fearful, Happy, Neutral, Sad and Surprised
// 분노, 　怒り　눈썹
// 역겨움, 　じと目  + 困る　＋ ｷﾘｯ２
// 두려움,　(瞳小) ▲
// 행복,  笑い 눈 にやり にこり
// 중립,
// 슬프고  　涙미쿠,　悲しい
// 놀라움　びっくり

function onProgress(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
}

const modelUrl = (model) => {
  return `${
    process.env.REACT_APP_URL ?? ''
  }/public/models/${model}/${model}.pmx`;
};

const MMDContainer = ({ name, model }) => {
  useEffect(() => {
    let container, stats, helper;
    let mesh, camera, scene, renderer, effect;
    let head, left_eye, right_eye, left_arm, right_arm, center;
    const ANGLE_CONST = 3.1415926 / 180;
    const clock = new THREE.Clock();

    const aspect = 1;
    const width = parseInt(window.innerWidth / 3);
    const height = parseInt(window.innerWidth / 3);
    // const height = parseInt(window.innerHeight / 3);

    function frame() {
      helper.update(clock.getDelta());
      effect.render(scene, camera);
      requestAnimationFrame(frame);
    }

    setTimeout(function () {
      requestAnimationFrame(() => {
        animate({ euler: [0, 0, 0], eye: [0, 0] });
        // frame();
      });
    }, 2000);

    init();

    function init() {
      const parent = document.getElementById('mmd' + name);
      parent.innerHTML = ''; // 리액트 새로고침될때 초기화 시키기
      camera = new THREE.PerspectiveCamera(20, aspect, 1, 100);
      camera.position.set(0, -0.3, 14); // x y z 축  , == position.z = 16

      // scene
      console.log(modelUrl(model));
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      const ambient = new THREE.AmbientLight(0x666666);
      scene.add(ambient);

      const directionalLight = new THREE.DirectionalLight(0x887766);
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

      mmdLoader.load(
        modelUrl(model),
        function (object) {
          // geometry + material => mesh
          mesh = object;
          mesh.position.y = -18;

          // mesh.rotation.y = 0.1;

          scene.add(mesh); // scene에다가 mesh 넣어주기

          helper.add(mesh, { physics: true });

          const ikHelper = helper.objects.get(mesh).ikSolver.createHelper();
          ikHelper.visible = false;
          scene.add(ikHelper);

          const physicsHelper = helper.objects.get(mesh).physics.createHelper();
          physicsHelper.visible = false;
          scene.add(physicsHelper);

          const bones = physicsHelper.physics.mesh.skeleton.bones;
          console.log(bones);
          console.log(physicsHelper);
          console.log(mesh);

          let head_num,
            left_eye_num,
            right_eye_num,
            right_arm_num,
            left_arm_num,
            center_num;

          bones.slice(0, 200).forEach((bone, idx) => {
            switch (bone.name) {
              case '頭':
                head_num = idx;
                break;
              case '右目':
                right_eye_num = idx;
                break;
              case '"左目"':
                left_eye_num = idx;
                break;
              case '右腕':
                right_arm_num = idx;
                break;
              case '左腕':
                // 左肩C;
                left_arm_num = idx;
                break;
              case '全ての親':
                center_num = idx;
                break;
              default:
                break;
            }
          });

          head = bones[head_num];
          left_eye = bones[left_eye_num];
          right_eye = bones[right_eye_num];

          center = bones[center_num];

          right_arm = bones[right_arm_num];
          left_arm = bones[left_arm_num];

          // right_arm.rotateY(THREE.Math.degToRad(20));
          // right_arm.rotateZ(THREE.Math.degToRad(-30));
          right_arm.rotation.z = +0.5;
          right_arm.rotation.y = +0.4;

          // left_arm.rotateY(THREE.Math.degToRad(-20));
          // left_arm.rotateZ(THREE.Math.degToRad(30));
          left_arm.rotation.z = -0.5;
          left_arm.rotation.y = -0.4;

          // helper.update(clock.getDelta());
          // effect.render(scene, camera);
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

    function animate(result, emotion_label) {
      // stats.begin();
      render(result, emotion_label);
      // stats.end();
    }

    function render(result, emotion_label) {
      const euler = result.euler;
      const eye_euler = result.eye;
      const mouth = result.mouth;
      const blink = result.blink;
      const move = result.move;

      if (center && center.position && move) {
        center.position.x += result.move[0] / 100;
        center.position.y += result.move[1] / 100;
      }

      if (head) {
        head.rotation.x = Math.round(euler[0]) * ANGLE_CONST;
        head.rotation.y = Math.round(euler[1]) * ANGLE_CONST;
        head.rotation.z = Math.round(euler[2]) * ANGLE_CONST;
      }

      if (left_eye) {
        left_eye.rotation.y = eye_euler[0];
        left_eye.rotation.x = eye_euler[1];
      }
      if (right_eye) {
        right_eye.rotation.y = eye_euler[0];
        right_eye.rotation.x = eye_euler[1];
      }

      let mouth_index, eye_index;
      const emotion_index = [];

      if (mouth > 0.5) mouth_index = mesh.morphTargetDictionary['あ'];
      else if (mouth > 0.3) mouth_index = mesh.morphTargetDictionary['え'];
      else if (mouth > 0.1) mouth_index = mesh.morphTargetDictionary['う'];

      switch (emotion_label) {
        case 'Angry':
          emotion_index.push(mesh.morphTargetDictionary['怒り']);
          break;
        case 'Disgusted':
          emotion_index.push(mesh.morphTargetDictionary['じと目']);
          emotion_index.push(mesh.morphTargetDictionary['困る']);
          emotion_index.push(mesh.morphTargetDictionary['ｷﾘｯ２']);
          break;
        case 'Fearful':
          // emotion_index.push(mesh.morphTargetDictionary['▲']); 비정상적으로 확률이 높음
          break;
        case 'Happy':
          emotion_index.push(mesh.morphTargetDictionary['笑い']);
          emotion_index.push(mesh.morphTargetDictionary['にやり']);
          emotion_index.push(mesh.morphTargetDictionary['にこり']);
          break;
        case 'Sad':
          emotion_index.push(mesh.morphTargetDictionary['涙']);
          emotion_index.push(mesh.morphTargetDictionary['悲しい']);
          break;
        case 'Surprised':
          emotion_index.push(mesh.morphTargetDictionary['びっくり']);
          break;
        default:
          break;
      }

      if (!['Happy'].includes(emotion_label)) {
        if (blink) {
          if (blink[0] < 0.3 && blink[1] < 0.3)
            eye_index = mesh.morphTargetDictionary['まばたき'];
          else if (blink[0] < 0.22)
            eye_index = mesh.morphTargetDictionary['ウィンク２'];
          else if (blink[1] < 0.22)
            eye_index = mesh.morphTargetDictionary['ｳｨﾝｸ２右'];
        }
      }

      if (mouth_index) {
        mesh.morphTargetInfluences[mouth_index] = 1;
      }

      if (eye_index) {
        mesh.morphTargetInfluences[eye_index] = 1;
      }

      emotion_index.forEach((index) => {
        if (index) {
          mesh.morphTargetInfluences[index] = 1;
        }
      });

      helper.update(clock.getDelta());
      effect.render(scene, camera);

      //
      if (mouth_index) {
        mesh.morphTargetInfluences[mouth_index] = 0;
      }

      if (eye_index) {
        mesh.morphTargetInfluences[eye_index] = 0;
      }

      emotion_index.forEach((index) => {
        if (index) {
          mesh.morphTargetInfluences[index] = 0;
        }
      });
    }

    function resetMove() {
      if (center && center.position) {
        center.position.x = 0;
        center.position.y = 0;
      }
      helper.update(clock.getDelta());
      effect.render(scene, camera);
    }

    function renderByGui(data) {
      camera.position.x = data.cameraX;
      camera.position.z = data.cameraZ;
      camera.position.y = data.cameraY;

      mesh.rotation.x = data.meshRotateX;
      mesh.rotation.z = data.meshRotateZ;
      mesh.rotation.y = data.meshRotateY;

      helper.update(clock.getDelta());
      effect.render(scene, camera);
    }
    window.myData.renderByGui = renderByGui;
    window.myData.animates[name] = animate;
    window.myData.resetMove[name] = resetMove;
  }, [model, name]);

  return <div></div>;
};

const MMDRender = ({ name, model }) => {
  const handleResetMove = () => {
    window.myData.resetMove[name]();
  };

  return (
    <Box position="relative">
      <Box id={'mmd' + name}>
        <MMDContainer name={name} model={model} />
      </Box>
      <Box position="absolute" bottom="0" fontSize="1rem" color="black">
        {name}
      </Box>
      <Box
        position="absolute"
        top="0"
        fontSize="1rem"
        color="black"
        id={name + 'emotion'}
      >
        감정
      </Box>
      <Button
        position="absolute"
        bottom="-10"
        right="0"
        color="black"
        size="sm"
        onClick={handleResetMove}
      >
        위치 리셋
      </Button>
    </Box>
  );
};

export default MMDRender;
