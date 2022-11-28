import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './dyson.obj';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";


class Dyson extends THREE.Group {
    constructor(parent, envMap, x, y, z, scale) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // gui: parent.state.gui,
            bob: true,
            spin: this.spin.bind(this),
            twirl: 0,
        };

        // Load object
        let color = 0xff9cb8;

        const settings = {
            barrel_color: 0x303030,
            handle_color: 0x212121,
            // accent_color: 0x8a0037,
            accent_color: 0xff006f,
            filter_color: 0x141414,
            metalness: 1.0,
            roughness: 0.5,
            ambientIntensity: 0.2,
            aoMapIntensity: 1.0,
            envMapIntensity: 0.1,
            displacementScale: 2.436143, // from original model
            normalScale: 1.0
        };

        const accent_settings = {
            color: 0xff006f,
            metalness: 1.0,
            roughness: 0.5,
        }

        const handle_settings = {
            color: 0x212121,
            metalness: 1.0,
            roughness: 0.5,
            ambientIntensity: 0.2,
            envMapIntensity: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0
        }

        let barrel_material = new THREE.MeshStandardMaterial({
            color: settings.barrel_color,
            roughness: settings.roughness,
            metalness: settings.metalness,

            envMap: envMap,
            envMapIntensity: settings.envMapIntensity,
            // side: THREE.DoubleSide
        });

        let handle_material = new THREE.MeshPhysicalMaterial({
            color: handle_settings.color,
            roughness: handle_settings.roughness,
            metalness: handle_settings.metalness,

            envMap: envMap,
            envMapIntensity: handle_settings.envMapIntensity,
            // side: THREE.DoubleSide

            clearcoat: handle_settings.clearcoat,
            clearcoatRoughness: handle_settings.clearcoatRoughness
        });

        let filter_material = new THREE.MeshPhysicalMaterial({
            color: settings.filter_color,
            roughness: settings.roughness,
            metalness: settings.metalness,

            envMap: envMap,
            envMapIntensity: settings.envMapIntensity,
            // side: THREE.DoubleSide

            clearcoat: 1.0
        });

        let accent_material = new THREE.MeshStandardMaterial({
            color: accent_settings.color,
            roughness: accent_settings.roughness,
            metalness: accent_settings.metalness,

            envMap: envMap,
            envMapIntensity: settings.envMapIntensity,
            // side: THREE.DoubleSide
        });

        const loader = new OBJLoader();

        let mesh;

        // 0 -- inner barrel
        // 1 -- handle accent
        // 2 -- filter
        // 3 -- gray barrel
        // 4 -- handle        

        loader.load(MODEL, obj => {
            // mesh = obj.children[0];
            obj.scale.set(scale, scale, scale);
            // obj.rotation.set(Math.PI / 2, Math.PI / 2, 0);
            obj.rotation.set(0, 0, 0);
            obj.position.set(x, y, z);
            this.accent = obj.children[0];
            this.barrel = obj.children[3];
            this.handle = obj.children[4];
            obj.children[0].material = accent_material;
            obj.children[1].material = accent_material;
            obj.children[2].material = filter_material;
            obj.children[3].material = barrel_material;
            obj.children[4].material = handle_material;

            // console.log(this);
            this.obj = obj;

            this.add(obj);

        });

        // this.barrel_material = barrel_material;
        // this.accent_material = accent_material;
        // this.handle_material = handle_material;

        // Add self to parent's update list
        parent.addToUpdateList(this);

        this.change_material_color.bind(this);
        // Populate GUI
        // this.state.gui.add(this.state, 'bob');
        // this.state.gui.add(this.state, 'spin');
    }

    change_material_color(type, color) {
        if (type == "barrel") {
            this.barrel.material.color.set(color);
        } else if (type == "accent") {
            this.accent.material.color.set(color);
        } else if (type == "filter") {
            this.filter.material.color.set(color);
        } else if (type == "handle") {
            console.log('hanndle');
            this.handle.material.color.set(color);
        }
    }

    spin() {
        // Add a simple twirl
        this.state.twirl += 6 * Math.PI;

        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: 0 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        if (this.state.bob) {
            // Bob back and forth
            // this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        }

        if (this.barrel) {
            this.barrel.rotateY(-Math.PI / 48);
        }

        // if (this.obj) {
        //     this.obj.rotateY(Math.PI / 48);
        // }

        // if (this.obj) {
        //     let date = new Date();
        //     let scale = date.getSeconds();
        //     const grow = new TWEEN.Tween(this.scale)
        //         .to({ x: scale, y: scale, z: scale }, 1)
        //         // .easing(TWEEN.Easing.Quadratic.In);
        //         // this.obj.scale.set(scale, scale, scale);
        //     grow.start();
        // }


        // if (this.state.twirl > 0) {
        //     // Lazy implementation of twirl
        //     this.state.twirl -= Math.PI / 8;
        //     this.rotation.y += Math.PI / 8;
        // }
        // this.rotation.y += Math.PI / 48;
        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Dyson;