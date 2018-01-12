/*eslint-disable */
var ease = require('./ease');

function ParticlePositionTracker(pos) {
    this.c = pos; // current position
    this.t = pos; // the destination
    this.a = pos; // at when starting tween
    this.d = 0; // duration of the tween
    this.i = 0; // tick
    this.f = pos; // final destination
    this.q = []; // queue for animation
    this.cb = null;
    this.moves = [];
}

ParticlePositionTracker.prototype.tick = function() {
    if(this.i < this.d) {
        this.i++;
        this.c = ease.easeOutSine(this.i, this.a, this.t, this.d);
        //this.moves.push(this.c);
        return this.c;
    }

    if(this.q.length > 0) {
        var animation = this.q.shift();
        this.destination(animation.t, animation.d, animation.e, animation.cb);

        if(this.cb) {
            this.cb();
        }
    }

    return this.c;
};

ParticlePositionTracker.prototype.difference = function(a, d) {
    return a < d ? d - a : (a - d) * -1;
};

ParticlePositionTracker.prototype.destination = function(t, d, e, cb) {
    this.d = d;
    this.i = 0;
    this.a = this.c;
    this.c = this.c;
    this.t = t ? this.difference(this.c, t) : 0;
    this.f = t || this.f;
    this.cb = cb || null;
};

ParticlePositionTracker.prototype.calcMoves = function() {
    while(this.q.length > 0) {
        this.tick();
    }
}

module.exports = ParticlePositionTracker;
