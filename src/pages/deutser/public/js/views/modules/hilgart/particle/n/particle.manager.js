/*eslint-disable */
import * as THREE from 'three'
import TWEEN from 'tween'

var CONFIG = require('./config'),
    Config = require('./config')(),
    imageData = require('../img-process/image.parser'),
	imagesLoaded = require('imagesloaded'),
    flow = require('./flow'),
    ParticleAnimator = require('./particle'),
    ease = require('./ease');

function ParticleManager(shapes, container, isCanvas) {
    console.info(shapes);
    this.images = [];
    this.isCanvas = isCanvas || false;
    this.container = container;

    if(shapes) {
        for (var i = 0; i < shapes.length; i++) {
            this.images[i] = new Image();
            this.images[i].src = shapes[i];
        }

        imagesLoaded(this.images,this.onImagesLoaded.bind(this,true));
    } else {
        this.onImagesLoaded(false);
    }

   //app.channel('homepage').trigger('particles:loaded');
   //this.setup();
}

ParticleManager.prototype.onImagesLoaded = function(hasShapes) {
    this.coordinates = hasShapes ? imageData(this.images) : null; // creates an array of coordinates of the shapes if there are shapes
    console.info('imageReady')
    if(this.isCanvas) {
        this.setupCanvas();
    } else {
        this.setup(this.coordinates);
    }
};

ParticleManager.prototype.onResize = function(event) {
	Config = CONFIG();
    // To accomidate the difference in height with the fixed nav bar
    var height = Config.WIDTH < 768 ? Config.HEIGHT - 59 : Config.HEIGHT;

    if(!this.isCanvas) {
        this.camera.aspect = Config.WIDTH / height;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize(Config.WIDTH, height);
    } else {
        this.canvas.width = Config.WIDTH;
        this.canvas.height = height;

    }


};

ParticleManager.prototype.setup = function(shapes) {

    this.oddTick = false;

    this.materials = [];
    this.positions = [];

    this.mouseX = 0;
    this.mouseY = 0;

    this.total = Config.PARTICLES;

    this.camera = new THREE.PerspectiveCamera(Config.ANGLE, Config.ASPECT, Config.NEAR, Config.FAR );
    this.camera.position.z = 1400;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

    this.geometry = new THREE.Geometry();

    var sprite = THREE.ImageUtils.loadTexture( "/static/images/canvas/circle.png" );
    for ( var i = 0; i < this.total; i ++ ) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Config.HEIGHT;
        vertex.z = Math.random() * 2000 - 1000;

        this.geometry.vertices.push( vertex );
        this.positions.push(new ParticleAnimator(vertex.x, vertex.y, vertex.z));
    }

    var material = new THREE.PointCloudMaterial( { size: Config.BASE_PARTICLE_SIZE, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } ),
        particles = new THREE.PointCloud( this.geometry, material );
        this.scene.add( particles );


    this.renderer = new THREE.WebGLRenderer();
    console.info(this.renderer)
    // this.renderer.setPixelRatio( window.devicePixelRatio );
    // this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setSize( 1000, 500 );
    //this.container.appendChild( this.renderer.domElement );

    $('#WebGL-output').append(this.renderer.domElement);

    document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );

    console.info('flow')
    if(!shapes) {
        flow.ambientSequence(this.positions);
    } else {
         flow.imageSequence(this.positions, this.coordinates);
    }

    // app.channel('browser').on('resize', this.onResize, this);
    this.animate();

};

ParticleManager.prototype.stats = function() {
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.container.appendChild( this.stats.domElement );
};

ParticleManager.prototype.animate = function() {
    if(this.alive !== false) {
        requestAnimationFrame(this.animate.bind(this));

        this.render();
    }
};

ParticleManager.prototype.onMouseMove = function(event) {
    this.mouseX = event.clientX - (window.innerWidth / 2);
    this.mouseY = event.clientY - (window.innerHeight / 2);
};

ParticleManager.prototype.destroy = function() {
    this.alive = false; // stop the request animation frame..
    // app.channel('browser').off('mousemove', this.onMouseMove, this);
	//app.channel('browser').off('touchstart', this.onTouchStart, this);
	//app.channel('browser').off('touchmove', this.onTouchMove, this);
	// app.channel('browser').off('resize', this.onResize, this);
};

ParticleManager.prototype.render = function() {

    this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
    this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.05;

    this.camera.lookAt( this.scene.position );

    var start = this.oddTick === false ? 0 : this.geometry.vertices.length/2;
    var end = this.oddTick === false ? this.geometry.vertices.length/2 : this.geometry.vertices.length;

    for (var i = 0; i < this.geometry.vertices.length; i ++ ) {

        var object = this.geometry.vertices[ i ],
            mover = this.positions[ i ];

        object.y = mover.animateY();
        object.x = mover.animateX();
        object.z = mover.animateZ();


    }

    this.oddTick = this.oddTick === false ? true : false;

    this.geometry.verticesNeedUpdate = true;

    this.renderer.render(this.scene, this.camera);
};


ParticleManager.prototype.animateCanvas = function() {
    if(this.alive !== false) {
        requestAnimationFrame(this.animateCanvas.bind(this));
        this.renderCanvas();
    }
};

ParticleManager.prototype.renderCanvas = function() {

    var count = this.total;
    var context = this.canvas.getContext( '2d' );

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.positions.length; i ++ ) {

        var mover = this.positions[ i ];

        mover.animateX();
        mover.animateY();
        mover.animateZ();

        this.canvasDrawParticle(context, mover);


    }

};

ParticleManager.prototype.canvasDrawParticle = function(context, mover) {
    var particleSize = 10,
        pX = mover.x.c,
        pY = Config.HEIGHT - mover.y.c,
        pZ = mover.z.c,

        x = (pX + Config.HALF_WIDTH),
        y = (pY - Config.HALF_HEIGHT),
    //y = pY,
        pZ = mover.z.c/80,
        z = pZ < 2 ? 2 : pZ,
        rX = x,//this.roundIt(x, 1),
        rY = y, //this.roundIt(y, 1),
        rZ = z, //this.roundIt(z, 1),
        gA = rZ/10;

        if(gA > .90) {
            gA = .90;
        }


        if(rZ < 10) {
            context.globalAlpha = gA;
            context.drawImage(this.particleImg, 0, 0, 16, 16, rX, rY, rZ, rZ);
        } else {
            context.globalAlpha = gA;
            context.drawImage(this.particleImg, 0, 0, 16, 16, rX, rY, rZ, rZ);
        }
};

ParticleManager.prototype.setupCanvas = function() {

    this.oddTick = false;

    this.isCanvas = true;
    this.total = Config.CANVAS_PARTICLES;
    this.oddCycle = true;

    this.positions = [];

    var particle,
        i;

    for (var i = 0; i < this.total; i++) {

        var vertex = {};
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Config.HEIGHT;
        vertex.z = Math.random() * 2000 - 1000;

        particle = new ParticleAnimator(vertex.x, vertex.y, vertex.z);
        this.positions.push(particle);
    }

    this.canvas = document.createElement( 'canvas' );
    this.canvas.width = Config.WIDTH;
    this.canvas.height = Config.HEIGHT;
    this.particleImg = document.getElementById("particle-image");
    //this.particleImg70 = document.getElementById("particle-image-70");

    $('#particles').append(this.canvas);

    if(this.coordinates) {
        flow.imageSequence(this.positions, this.coordinates, true);
    } else {
        flow.ambientSequence(this.positions, true);
    }

    this.animateCanvas();

    // app.channel('browser').on('resize', this.onResize, this);

};

module.exports = ParticleManager;
