/*eslint-disable */
var ease = require('./ease')
    // app = require("faction-client-site").App;

module.exports = {

    /**
     * Loops through all of the particles and can apply a filter
     * @param  {[type]}   particles [description]
     * @param  {[type]}   filter    [description]
     * @param  {Function} cb        [description]
     * @return {[type]}             [description]
     */

    loop: function(particles, filter, cb) {
        var c = particles.length,
            f = filter || this.filter.none,
            p;

        while(c--) {
            p = particles[c];
            if(f(p)) cb(p, c); // callback particle, index
        }
    },

    calc: function(particles, cb) {
            this.loop(particles, function(particle) {
                particle.x.calcMoves();
                particle.y.calcMoves();
                particle.z.calcMoves();
            });

            //cb();
    },

    /**
     * Moves the particles right
     * @param  {[type]} particles [description]
     * @param  {[type]} min       [description]
     * @param  {[type]} max       [description]
     * @param  {[type]} filter    [description]
     * @return {[type]}           [description]
     */

    right: function(particles, min, max, filter) {
        var t = this.range(min, max);

        this.loop(particles, filter, function(particle, index) {
            particle.queue('x', particle.range(700, 1400), t);
            particle.queue('y', particle.range(-1000, 1000), t);
            particle.queue('z', particle.range(100, 200), t);
        });

    },

    /**
     * Moves the particles left
     * @param  {[type]} particles [description]
     * @param  {[type]} min       [description]
     * @param  {[type]} max       [description]
     * @param  {[type]} filter    [description]
     * @return {[type]}           [description]
     */

    left: function(particles, min, max, filter) {
        var t = this.range(min, max);

        this.loop(particles, filter, function(particle, index) {
            particle.queue('x', particle.range(-700, -1400), t);
            particle.queue('y', particle.range(-1000, 1000), t);
            particle.queue('z', particle.range(100, 200), t);
        });

    },

    /**
     * Makes the particles buzz
     * @param  {[type]} particles [description]
     * @param  {[type]} filter    [description]
     * @return {[type]}           [description]
     */

    buzz: function(particles, filter) {
        this.loop(particles, filter, function(particle, index) {
            var x = particle.lastPositionInQueue('x'),
                y = particle.lastPositionInQueue('y'),
                t = this.range(10, 20);

            particle.queue('x', x + particle.range(10, 30), t);
            particle.queue('y', y + particle.range(10, 30), t);
            particle.queue('z', null, t);

            particle.queue('x', x + particle.range(-30, -10), t);
            particle.queue('y', y + particle.range(-30, -10), t);
            particle.queue('z', null, t);
        });
    },

    /**
     * Makes the particles rumble
     * @param  {[type]} particles [description]
     * @param  {[type]} filter    [description]
     * @return {[type]}           [description]
     */

    rumble: function(particles, filter) {
        this.loop(particles, filter, function(particle, index) {
            var x = particle.lastPositionInQueue('x'),
                y = particle.lastPositionInQueue('y'),
                t = this.range(20, 30);

            particle.queue('x', x + particle.range(10, 10), t);
            particle.queue('y', y + particle.range(10, 10), t);
            particle.queue('z', null, t);

            particle.queue('x', x + particle.range(-30, -30), t);
            particle.queue('y', y + particle.range(-30, -30), t);
            particle.queue('z', null, t);

            particle.queue('x', x + particle.range(-100, -100), t);
            particle.queue('y', y + particle.range(-100, -100), t);
            particle.queue('z', null, t);
        });
    },

    /**
     * Explodes the particles
     * @param  {[type]} particles [description]
     * @param  {[type]} min       [description]
     * @param  {[type]} max       [description]
     * @param  {[type]} filter    [description]
     * @return {[type]}           [description]
     */

    explode: function(particles, min, max, filter) {
        this.loop(particles, filter, function(particle, index) {
            particle.queue('y', particle.randomY(), particle.range(60, 100));
            particle.queue('x', particle.randomX(), particle.range(60, 100));
            particle.queue('z', particle.randomZ(), particle.range(60, 100));
        });
    },

    /**
     * Move the particles into an image
     * @param  {[type]} particles   [description]
     * @param  {[type]} coordinates [description]
     * @param  {[type]} min         [description]
     * @param  {[type]} max         [description]
     * @param  {[type]} filter      [description]
     * @param  {[type]} delay       [description]
     * @param  {[type]} index       [description]
     * @param  {[type]} canvas      [description]
     * @return {[type]}             [description]
     */

    image: function(particles, coordinates, min, max, filter, delay, index, canvas) {
        var t = this.range(min, max),
            p = false;

        function headlineIn() {
            // app.channel('homepage').trigger('headline:in', index);
        }

        function headlineOut() {
            if(index !== 5) {
                // app.channel('homepage').trigger('headline:out', index);
            }
        }

        this.loop(particles, filter, function(particle, index) {
            var coordinate = coordinates.getCoordinate();

            if(coordinate.r === true) {
                // floating particles outside of shape
                particle.queue('x', coordinate.x, min + delay);
                particle.queue('y', coordinate.y, min + delay);
                particle.queue('z', coordinate.z, min + delay);
            } else {
                // shape particles
                particle.queue('x', coordinate.x * (canvas ? 0.5 : 0.7), min, ease.easeOutQuint);
                particle.queue('y', coordinate.y * (canvas ? 0.5 : 0.7), min, ease.easeOutQuint);
                particle.queue('z', coordinate.z + (canvas ? particle.range(300, 600) : 0), min, ease.easeOutQuint);

                if(p === false) {
                    particle.queue('z', null, 1, null, headlineIn);
                }

                // hold shape
                particle.queue('x', null, delay, ease.noEasing); // to pad for ambience
                particle.queue('y', null, delay, ease.noEasing);
                particle.queue('z', null, delay, ease.noEasing);

                if(p === false) {
                    particle.queue('z', null, 1, null, headlineOut);
                    p = true;
                }

            }

        });
    },

    /**
     * Runs the image sequence
     * @param  {[type]} particles   [description]
     * @param  {[type]} coordinates [description]
     * @param  {[type]} canvas      [description]
     * @return {[type]}             [description]
     */

    imageSequence: function(particles, coordinates, canvas) {
        console.info('flow init')
        this.ambient(particles, 300, 300, true, function() {
            console.log("headline out");
            // app.channel('homepage').trigger('headline:out', 0);
        });

        // setTimeout(function() {
        //     app.channel('homepage').trigger('headline:in', 0);
        // }, 3000);

        this.image(particles, coordinates[0], 90, 100 , null, 200, 1, canvas);
        // this.explode(particles, 60, 60);
        //this.right(particles, 100, 100, this.filter.firstHalf);
        //this.left(particles, 100, 100, this.filter.secondHalf);
        //this.horizon(particles);
        //this.explode(particles, 120, 180);
        //this.ambient(particles, 500, 600);

        this.image(particles, coordinates[1], 90, 100, null, 200, 2, canvas);
        // this.explode(particles, 60, 60);

        // this.right(particles, 100, 100, this.filter.firstHalf);
        // this.left(particles, 100, 100, this.filter.secondHalf);

        //this.explode(particles, 120, 180);
        //this.ambient(particles, 500, 600);

        this.image(particles, coordinates[2], 90, 100, null, 200, 3, canvas);
        // this.explode(particles, 60, 60);
        // this.horizon(particles);
        //this.ambient(particles, 500, 600);

        this.image(particles, coordinates[3], 90, 100, null, 200, 4, canvas);
        // this.explode(particles, 60, 60);
        //this.right(particles, 100, 100, this.filter.firstHalf);
        //this.left(particles, 100, 100, this.filter.secondHalf)
        //this.explode(particles, 120, 180);
        //this.ambient(particles, 500, 600);
        // 第五张
        // this.image(particles, coordinates[4], 90, 100, null, 200, 5, canvas);
    },

    /**
     * Runs just the ambient particle animation (for the About page)
     * @param  {[type]} particles   [description]
     * @param  {[type]} canvas      [description]
     * @return {[type]}             [description]
     */

    ambientSequence: function(particles, canvas) {
        this.ambient(particles, 100, 1000);
    },

    /**
     * Move the particles to the horizon
     * @param  {[type]} particles [description]
     * @return {[type]}           [description]
     */

    horizon: function(particles) {
        var count = particles.length;


        while(count--) {
            var particle = particles[count];

            particle.queue('y', 0, particle.range(20, 40));
            // particle.queue('x', particle.lastPositionInQueue('x') + particle.range(-300, 300), particle.range(20, 40));
            particle.queue('y', particle.range(-10, 10), particle.range(25, 40));
            particle.queue('y', particle.range(-30, 30), particle.range(25, 40));
            particle.queue('y', particle.range(-100, 100), particle.range(25, 40));
            particle.queue('z', particle.range(100, 200), particle.range(50, 80));
            particle.queue('y', particle.range(-10, 10), particle.range(25, 40));
            particle.queue('y', particle.range(-30, 30), particle.range(25, 40));
            particle.queue('y', particle.range(-70, 70), particle.range(20, 40));
            particle.queue('z', null, 230);
            particle.queue('x', null, 230);

            particle.queue('x', particle.randomX(), particle.range(60, 100));
            particle.queue('y', particle.randomX(), particle.range(60, 100));
            particle.queue('z', particle.randomZ(), particle.range(60, 100));
        }


    },

    /**
     * Impose a delay
     * @param  {[type]} particles [description]
     * @param  {[type]} t         [description]
     * @return {[type]}           [description]
     */

    delay: function(particles, t) {
        var count = particles.length;

        while(count--) {
            var particle = particles[count];

            particle.queue('x', null, t);
            particle.queue('y', null, t);
            particle.queue('z', null, t);
        }
    },

    /**
     * Apply an ambient movement to the particles
     * @param  {[type]}   particles [description]
     * @param  {[type]}   min       [description]
     * @param  {[type]}   max       [description]
     * @param  {Function} cb        [description]
     * @return {[type]}             [description]
     */

    ambient: function(particles, min, max, firstRun, cb) {
        var t = this.range(min, max),
            p = false;

        this.loop(particles, null, function(particle, index) {
            var z = particle.lastPositionInQueue('z'),
                x = particle.lastPositionInQueue('x'),
                y = particle.lastPositionInQueue('y');

            if(p === false) {
                particle.queue('z', null, 1, null, function(){
                    // app.channel('homepage').trigger('headline:in', 0);
                });
                p = true;
            }

            particle.queue('x', x + particle.range(-100, 100), t);
            particle.queue('y', y + particle.range(-100, 100), t);
            particle.queue('z', z + particle.range(-300, 0), t);

            if(cb && index === 1) {
                particle.queue('z', null, 1, null, cb);
            }
        });
    },

    range: function(min, max) {
        return min + (Math.random() * (max - min));
    },

    filter: {
        none: function() {
            return true;
        },

        firstHalf: function(particle) {
            //if(particle.index < (config.PARTICLES/2)) {
                return true;
            //}

            return false;
        },

        secondHalf: function(particle) {
            //if(particle.index > (config.PARTICLES/2)) {
                return true;
            //}

            return false;
        }
    }
};
