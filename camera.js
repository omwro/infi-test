export default class Camera {
    constructor(id, camera, latitude, longitude) {
        this.id = id;
        this.camera = camera;
        this.latitude = latitude
        this.longitude = longitude
    }
}

Camera.prototype.toString = function cameraToString() {
    return `${this.id} | ${this.camera} | ${this.latitude} | ${this.longitude}`;
};