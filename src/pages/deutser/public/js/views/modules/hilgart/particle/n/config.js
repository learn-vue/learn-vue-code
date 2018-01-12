/*eslint-disable */
module.exports = function() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    return {
        ANGLE: 45,
        ASPECT: WIDTH / HEIGHT,
	    NEAR:1,
	    FAR:3000,
        FIELD_OF_VIEW: 60,
        PARTICLES: 5500, // 5500 for desktop, 2500 for mobile
        PARTICLES_TOUCH: 2500,
        CANVAS_PARTICLES: 2500,
        CANVAS_PARTICLES_TOUCH: 1400,
        WIDTH: WIDTH,
        HEIGHT: HEIGHT,
        CAMERA_Z: 1400,
        FOG_HEX: 0x000000,
        FOG_DENSITY: 0.0004,
        HALF_HEIGHT: HEIGHT/2,
        HALF_WIDTH: WIDTH/2,
        BASE_PARTICLE_SIZE: 12, // 12 for desktop, 18 for mobile
        MOBILE_PARTICLE_SIZE: 18,
        PARTICLE_COLOR: 0x5c5c5c,
        IMAGE_SCALE: 2,
        IMAGE_DATAS: {},
        MAX_DISTANCE: 1000,
    };
};
