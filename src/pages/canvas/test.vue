<template>
	<div>
		<canvas id='cas' width="1000" height="500">您的浏览器不支持canvas，请更新浏览器后再浏览</canvas>
		<div style="width:50px;margin:10px auto; display: none">
			<img id="tulip" src="../../assets/logo.png" alt="The Tulip" width="200" height="200" />
			<button id="controlBtn">停止</button>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
		};
	},
	components: {

	},
	mounted(){
		/*eslint-disable */
		var canvas = document.getElementById("cas"),
			ctx = canvas.getContext("2d"),
			vpx = canvas.width/2,
			vpy = canvas.height/2,
			Radius = 200,             //整体大球的坐标
			LayerBallNum = 12,        // 横向
			LayerIntervalUp = 12,    // layer 的数目
			balls = [],
			logos = [],
			angleX = Math.PI/60,
			angleY = Math.PI/60;
		var WIDTH = ctx.width = window.innerWidth;
		var HEIGHT = ctx.height = window.innerHeight;

		var _stratX = WIDTH / 2;
		var _stratY = HEIGHT / 2;

		window.addEventListener("mousemove" , function(event){
			var x = event.clientX - _stratX;
			var y = event.clientY - _stratY;
			_stratX = event.clientX;
			_stratY = event.clientY;
			angleY = Math.PI / 4 * (x / window.innerWidth);
			angleX = Math.PI / 4 * (y / window.innerHeight);

		});

		var Animation = function(){
			this.init();
		};

		Animation.prototype = {
			isrunning: false,
			init: function () {
				var num = LayerIntervalUp / 2; //layer 的数目    //假定每一层 间隔30  画上半球
				for (var i = 0; i <=num; i++) {
					var l = new layer(i, 1);
					l.draw();
					var l = new layer(i, -1);
					l.draw();
				}

			},

			start:function(){
				this.isrunning = true;
				animate();
			},
			stop:function(){
				this.isrunning = false;
			}
		}

		function animate(){
			ctx.clearRect(0,0,canvas.width , canvas.height);
			
			rotateX(angleX);
			rotateY(angleY);
			rotateZ(angleY);
			for(var i=0;i<balls.length;i++){
				balls[i].paint();
			}
			for(var i=0;i<logos.length;i++){
				logos[i].paint();
			}
			if(animation.isrunning) {
				if("requestAnimationFrame" in window){
					requestAnimationFrame(animate);
				}
				else if("webkitRequestAnimationFrame" in window){
					webkitRequestAnimationFrame(animate);
				}
				else if("msRequestAnimationFrame" in window){
					msRequestAnimationFrame(animate);
				}
				else if("mozRequestAnimationFrame" in window){
					mozRequestAnimationFrame(animate);
				}
			}
		}


		var layer = function (num, up) {
			// 半径
			this.radius = Radius * Math.sin(num * Math.PI / LayerBallNum)
			this.x = 0;
			this.y = 0;
			this.up = up;
		}

		layer.prototype = {
			setBalls: function (radius) {
				for(var i=0; i<LayerBallNum; i++){
					var angle =  2 * Math.PI / LayerBallNum * i;
					// x y z r
					var b = new ball(radius * Math.cos(angle), radius * Math.sin(angle), this.up * Math.sqrt(Math.pow(Radius, 2) - Math.pow(radius, 2)), 1.5);
					b.paint();
					balls.push(b);
				}
				
			},
			setLogo: function(radius){
				var img = document.getElementById("tulip");
				ctx.drawImage(img, WIDTH / 2 - 200/2, HEIGHT / 2 - 200/2);
				// 图片数据
				var imgData = ctx.getImageData(WIDTH / 2 - 200/2, HEIGHT / 2 - 200/2, 200, 200).data;
				// 遍历所有点 绘制图形
				var idx = null;
				var skip = 16;
				for(var y = 0; y < 200; y += skip) {
					for(var x = 0; x < 200; x += skip) {
						idx = (x + y * 200) * 4 - 1;
						if(imgData[idx] > 0) {
							var a = Math.PI * 2 * Math.random();
							var l = new logo(x - 200/2, y - 200/2, 50, 1);
							l.paint();
							logos.push(l);
						}
					}
				}
			},
			draw: function () {
				ctx.beginPath();
				ctx.arc(vpx, vpy, this.radius , 0, 2*Math.PI, true);
				ctx.strokeStyle = "#FFF";
				ctx.stroke();
				this.setBalls(this.radius);
				this.setLogo(this.radius);
			}
		}

		var ball = function(x , y , z , r){
			this.x = x;
			this.y = y;
			this.z = z;
			this.r = r;
			this.width = 2*r;
		}

		ball.prototype = {
			paint:function(){
				var fl = 2000 //焦距
				ctx.save();
				ctx.beginPath();
				var scale = fl / (fl - this.z);
				var alpha = (this.z+Radius)/(2*Radius);
				if(alpha > 0.5){
					alpha = 0.5;
				}else if(alpha<-0.5){
					alpha = -0.5;
				}
				ctx.arc(vpx + this.x, vpy + this.y, this.r*scale , 0 , 2*Math.PI , true);
				ctx.fillStyle = "rgba(255,255,255,"+(alpha+0.5)+")";
				ctx.fill();
				ctx.restore();
			}
		}
		var logo = function(x , y , z , r){
			this.x = x;
			this.y = y;
			this.z = z;
			this.r = r;
			this.width = r;
		}

		var renderLogo = {
			x: 0,
			y: 0,
			z: 0,
			r: 0,

			init: function(){
				for(var i=0;i<logos.length;i++){
					this.render(logos[i]);
				}
			},

			render: function(data){
				var fl = 200 //焦距
				ctx.save();
				ctx.beginPath();
				var scale = fl / (fl - z);
				var alpha = (data.z+Radius)/(2*Radius);
				if(alpha > 0.5){
					alpha = 0.5;
				}else if(alpha<-0.5){
					alpha = -0.5;
				}
				ctx.arc(vpx + data.x, vpy + data.y, data.r*scale , 0 , 2*Math.PI , true);
				ctx.fillStyle = "rgba(0,0,255,"+(alpha+0.5)+")";
				ctx.fill();
				ctx.restore();
			}
		}

		logo.prototype = {
			paint:function(){
				var fl = 200 //焦距
				ctx.save();
				ctx.beginPath();
				var scale = fl / (fl - this.z);
				var alpha = (this.z+Radius)/(2*Radius);
				if(alpha > 0.5){
					alpha = 0.5;
				}else if(alpha<-0.5){
					alpha = -0.5;
				}
				ctx.arc(vpx + this.x, vpy + this.y, this.r*scale , 0 , 2*Math.PI , true);
				ctx.fillStyle = "rgba(0,0,255,"+(alpha+0.5)+")";
				ctx.fill();
				ctx.restore();
			}
		}

		function rotateX(angle_x){
			var cos = Math.cos(angle_x);
			var sin = Math.sin(angle_x);
			for(var i=0;i<balls.length;i++){
				var y1 = balls[i].y * cos - balls[i].z * sin;
				var z1 = balls[i].z * cos + balls[i].y * sin;
				balls[i].y = y1;
				balls[i].z = z1;
			}
			for(var i=0;i<logos.length;i++){
				var y1 = logos[i].y * cos - logos[i].z * sin;
				var z1 = logos[i].z * cos + logos[i].y * sin;
				logos[i].y = y1;
				logos[i].z = z1;
			}
		}

		function rotateY(angle_y){
			var cos = Math.cos(angle_y);
			var sin = Math.sin(angle_y);
			for(var i=0;i<balls.length;i++){
				var x1 = balls[i].x * cos - balls[i].z * sin;
				var z1 = balls[i].z * cos + balls[i].x * sin;
				balls[i].x = x1;
				balls[i].z = z1;
			}
			for(var i=0;i<logos.length;i++){
				var x1 = logos[i].x * cos - logos[i].z * sin;
				var z1 = logos[i].z * cos + logos[i].x * sin;
				logos[i].x = x1;
				logos[i].z = z1;
			}
		}

		function rotateZ(angle_y){
			var cos = Math.cos(angle_y);
			var sin = Math.sin(angle_y);
			for(var i=0;i<balls.length;i++){
				var x1 = balls[i].x * cos - balls[i].y * sin;
				var y1 = balls[i].y * cos + balls[i].x * sin;
				balls[i].x = x1;
				balls[i].y = y1;
			}
			for(var i=0;i<logos.length;i++){
				var x1 = logos[i].x * cos - logos[i].y * sin;
				var y1 = logos[i].y * cos + logos[i].x * sin;
				logos[i].x = x1;
				logos[i].y = y1;
			}
		}

		var animation = new Animation();
		animation.start();

		document.getElementById("controlBtn").onclick = function(){
			this.innerText === "开始" ? this.innerText="停止" : this.innerText="开始";
			this.innerText === "开始" ? animation.stop() : animation.start();;
		}
	},
	methods: {

	}
}
</script>
<style scoped>
#cas{
	display: block;
	border:1px solid;
	margin:auto;
	background: #000;
}
</style>
