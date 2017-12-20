<template>
	<div>
		<div id="particles"></div>
		<!-- <div class="logo">VUE</div> -->
	</div>
</template>

<script>
/*eslint-disable */
// console.log('%c  HELLO  VUE %c Copyright \xa9 2016-%s', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;text-shadow: 6px 6px 5px #ccc,4px 4px 5px #c9c9c9,2px 2px 5px; #bbb;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;', 'font-size:12px;color:#999999;', (new Date()).getFullYear());
// console.log('%c 如有问题请联系： http://zhaowenjie.github.io', 'font-size:12px;color:#666;');

import particles from 'particles.js'

module.exports = {
	data: function(){
		return {
			msg: 'hello world'
		}
	},
	mounted(){
		particlesJS('particles', {
		  "particles": {
		    "number": {
		      "value": 160,
		      "density": {
		        "enable": true,
		        "value_area": 800
		      }
		    },
		    "color": {
		      "value": "#2db7f5"
		    },
		    "shape": {
		      "type": "circle",
		      "stroke": {
		        "width": 0,
		        "color": "#000000"
		      },
		      "polygon": {
		        "nb_sides": 5
		      },
		      "image": {
		        "src": "img/github.svg",
		        "width": 100,
		        "height": 100
		      }
		    },
		    "opacity": {
		      "value": 1,
		      "random": true,
		      "anim": {
		        "enable": true,
		        "speed": 1,
		        "opacity_min": 0,
		        "sync": false
		      }
		    },
		    "size": {
		      "value": 3,
		      "random": true,
		      "anim": {
		        "enable": false,
		        "speed": 4,
		        "size_min": 0.3,
		        "sync": false
		      }
		    },
		    "line_linked": {
		      "enable": false,
		      "distance": 150,
		      "color": "#ffffff",
		      "opacity": 0.4,
		      "width": 1
		    },
		    "move": {
		      "enable": true,
		      "speed": 1,
		      "direction": "none",
		      "random": true,
		      "straight": false,
		      "out_mode": "out",
		      "bounce": false,
		      "attract": {
		        "enable": false,
		        "rotateX": 600,
		        "rotateY": 600
		      }
		    }
		  },
		  "interactivity": {
		    "detect_on": "canvas",
		    "events": {
		      "onhover": {
		        "enable": true,
		        "mode": "bubble"
		      },
		      "onclick": {
		        "enable": true,
		        "mode": "repulse"
		      },
		      "resize": true
		    },
		    "modes": {
		      "grab": {
		        "distance": 400,
		        "line_linked": {
		          "opacity": 1
		        }
		      },
		      "bubble": {
		        "distance": 250,
		        "size": 0,
		        "duration": 2,
		        "opacity": 0,
		        "speed": 3
		      },
		      "repulse": {
		        "distance": 400,
		        "duration": 0.4
		      },
		      "push": {
		        "particles_nb": 4
		      },
		      "remove": {
		        "particles_nb": 2
		      }
		    }
		  },
		  "retina_detect": true
		}, function(){
			console.warn('ready')
		})
	}
}
</script>
<style scoped>
.logo {
	font-size: 150px;
	margin-top: 15%;
	margin-left: 40%;
	color: #2db7f5;
}
#particles {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 1.0);
	z-index: -1;
}
</style>
