// import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { Dyson } from 'objects';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import { BasicLights } from 'lights';
// import CHUNG from './textures/chung/00.png';
import NEGX from './textures/Skybox/negx.jpg';
import POSX from './textures/Skybox/posx.jpg';
import NEGY from './textures/Skybox/negy.jpg';
import POSY from './textures/Skybox/posy.jpg';
import NEGZ from './textures/Skybox/negz.jpg';
import POSZ from './textures/Skybox/posz.jpg';
import NORMAL from './textures/normal/normal.jpg';
import { NormalAnimationBlendMode } from 'three';
// import EQUIRECT from './textures/equirectangular/royal_esplanade_1k.hdr';

class Scene extends THREE.Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],

        };

        const params = {
            color: 0xffa8b5,
            transmission: 0,
            opacity: 0.4,
            metalness: 0.5,
            roughness: 0,
            ior: 2,
            thickness: 0.01,
            specularIntensity: 1,
            specularColor: 0xffffff,
            envMap: envMap,


            clearcoat: 1,
            clearcoatRoughness: 0,

            exposure: 1
        };

        var envMap = new THREE.CubeTextureLoader()
            .load([
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
            ]);
        envMap.encoding = THREE.sRGBEncoding;

        let color = 0xe3a16d;
        // color = 0xfcba03;
        color = 0xba8d69;
        let emissive = 0x08697d;

        color = 0xb9ae84;
        emissive = 0x8d95b1;
        color = 0xffecbb;

        this.background = new THREE.Color(0xffffff);
        // this.background = envMap;

        const lights = new BasicLights();
        this.add(lights);

        let init = 50;
        const diff = 2;

        let dyson = new Dyson(this, envMap, 0, -180, 0, init);
        this.add(dyson);
        this.dyson = dyson;

        // const planeGeometry = new THREE.PlaneGeometry(200, 200);
        // const plane = new THREE.Mesh(planeGeometry, material);
        // plane.position.z = -20;
        // this.add(plane);

        // this.handleColorChange.bind(this);

        function generateTexture() {

            const canvas = document.createElement('canvas');
            canvas.width = 2;
            canvas.height = 2;

            const context = canvas.getContext('2d');
            context.fillStyle = 'white';
            context.fillRect(0, 0, 1, 2); // x, y, width, height

            return canvas;

        }


    }

    change_material_color(type, color) {

        this.dyson.change_material_color(type, color);
    }

    // handleColorChange(color, converSRGBToLinear = false) {

    //     return function(value) {
    //         console.log(value);

    //         if (typeof value === 'string') {

    //             value = value.replace('#', '0x');

    //         }

    //         color.setHex(value);

    //         if (converSRGBToLinear === true) color.convertSRGBToLinear();

    //     };

    // }



    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // this.mesh.rotation.x += 0.005;
        // this.mesh.rotation.y += 0.005;
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default Scene;