/**
 * PARTICLE CLASS
 */
import * as THREE from 'three'
import TWEEN from 'tween'
var app = require('faction-client-site').App,
	GetCoordinate = require('./util/get.coordinate'),
	coordinates = null,
	Coordinate = require('./util/coordinate');

function Particle(imageDatas, startPos) {
	this.indx = 0;
	this.stationary = true;
	this.vertex = new THREE.Vector3();
	if (startPos === 'center') {
		this.vertex.x = 0;
		this.vertex.y = 0;
		this.vertex.z = 0;
	} else {
		this.vertex.x = 2000 * Math.random() - 1000;
		this.vertex.y = window.innerHeight * 2;
		this.vertex.z = 2000 * Math.random() - 1000;
	}
	this.color = new THREE.Color(0x777779);
	if (!coordinates) {
		coordinates = [];
		for (var i = 0; i < imageDatas.length; i++) {
			coordinates.push(new Coordinate(imageDatas[i]));
		}
	}

	this.coordinates = [];

	for (var l = 0; l < imageDatas.length; l++) {
		this.coordinates.push(coordinates[l].getCoordinate());
	}
}

Particle.prototype.displace = function() {
	var self = this;
	if (this.stationary && self.indx < self.coordinates.length) {
		var tween = new TWEEN.Tween(self.vertex)
			.to({
				x: this.coordinates[self.indx].x,
				y: this.coordinates[self.indx].y,
				z: this.coordinates[self.indx].z }, 500)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onComplete(function(){

			})
			.start();
	}
}

Particle.prototype.animateParticle = function() {
	var self = this;
	this.stationary = false;
	app.channel('homepage').trigger('headline:out', self.indx);
	setTimeout(function(){
		var tween = new TWEEN.Tween(self.vertex)
			.to({
				x: self.coordinates[self.indx].x,
				y: self.coordinates[self.indx].y,
				z: self.coordinates[self.indx].z }, 500)
			.easing(TWEEN.Easing.Cubic.InOut) // Linear.None
			.onComplete(function(){
				self.stationary = true;
				self.indx++;
				setTimeout(function(){
					app.channel('homepage').trigger('headline:in', self.indx);
				}, 800);

				if (self.indx < self.coordinates.length) {
					self.animateParticleTimer = setTimeout(self.animateParticle.bind(self), 5000);
				}
			})
			.start();
	}, 800);
}

Particle.prototype.startSequence = function() {
	var self = this;
	this.stationary = false;
	var tween = new TWEEN.Tween(self.vertex)
		.to({
			x: 3000 * Math.random() - 1500,
			y: 1800 * Math.random() - 1000,
			z: 1800 * Math.random() - 1000 }, 4000)
		.easing(TWEEN.Easing.Cubic.InOut) // Linear.None
		.onComplete(function(){
			self.stationary = true;
			if (self.coordinates.length > 0) {
				app.channel('homepage').trigger('headline:in', self.indx);
				self.startSequenceTimer = setTimeout(self.animateParticle.bind(self), 5000);
			}
		})
		.start();
};

Particle.prototype.destroy = function() {
	coordinates = null;
	clearTimeout(this.animateParticleTimer);
	clearTimeout(this.startSequenceTimer);
};

module.exports = Particle;
