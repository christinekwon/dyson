import { Group, PointLight, SpotLight, AmbientLight, HemisphereLight, DirectionalLight } from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        let pointLight, ambientLight;

        ambientLight = new AmbientLight(0xffffff, 15);
        this.add(ambientLight);

        pointLight = new DirectionalLight(0xffffff, 1);
        pointLight.position.z = 50;
        this.add(pointLight);

        // const pointLight2 = new PointLight(0xff6666, 1);
        // camera.add(pointLight2);

        // const pointLight3 = new PointLight(0x0000ff, 0.5);
        // pointLight3.position.x = -10;
        // pointLight3.position.z = 10;
        // this.add(pointLight3);

    }
}

export default BasicLights;