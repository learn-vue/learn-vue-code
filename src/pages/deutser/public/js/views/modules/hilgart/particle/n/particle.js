/*eslint-disable */
var ParticlePositionTracker = require('./particle.position'),
    ease = require('./ease');

function ParticleAnimator(x, y, z) {
    this.x = new ParticlePositionTracker(x);
    this.y = new ParticlePositionTracker(y);
    this.z = new ParticlePositionTracker(z);

    this.queue('y', Math.random() * 2000 - 1000, this.range(70, 100), ease.easeOutCubic);
    this.queue('x', Math.random() * 2000 - 1000, this.range(70, 100), ease.easeOutCubic);
    this.queue('z', Math.random() * 2000 - 1000, this.range(70, 100), ease.easeOutCubic);
}

ParticleAnimator.prototype.range = function(min, max) {
    return min + (Math.random() * (max - min));
};

ParticleAnimator.prototype.animateX = function() {
    return this.x.tick();
};

ParticleAnimator.prototype.animateZ = function() {
    return this.z.tick();
};

ParticleAnimator.prototype.animateY = function() {
    return this.y.tick();
};

ParticleAnimator.prototype.lastPositionInQueue = function(p) {
    var prop = this[p];

    if(prop.q[0]) {
        return prop.q[prop.q.length - 1].f || prop.f;
    }

    return prop.f;
};

ParticleAnimator.prototype.queue = function(p, t, d, e, cb) {
    this[p].q.push({
        t: t,
        f: t,
        d: d,
        e: e,
        cb: cb
    });
};

module.exports = ParticleAnimator;
