/* version: 0.1.0 */
//观察点
var visual = {
	x: -100,
	y: -100,
	z: 400,
};
//canvas
var cvw = 300; var cvh = 300;
//偏移量
offsetX = cvw / 2-85;
offsetY = cvh / 2-75;
var ftp = 60; //帧数
//坐标
var pointMap = {
	A: [-50,  50,  50],
	B: [-50,  50, -50],
	C: [ 50,  50, -50],
	D: [ 50,  50,  50],
	E: [-50, -50,  50],
	F: [-50, -50, -50],
	G: [ 50, -50, -50],
	H: [ 50, -50,  50],
};


//canvas初始化
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = cvw;
canvas.height = cvh;
var ctx = canvas.getContext('2d');

render();

//性能优化
function render() {
	window.setTimeout(function() {
		requestAnimationFrame(render);
		animationFrame();
	}, 1000 / ftp)
}

//图像旋转函数(Y轴)
function animationFrame() {
	var rotationAngle = 1;
	for (var key in pointMap) {
		var point = pointMap[key];
		// 保存x,y,z坐标
		var x = point[0];
		var y = point[1];
		var z = point[2];
		// 变换后的x坐标
		point[0] = x * Math.cos(rotationAngle / 180 * Math.PI) - z * Math.sin(rotationAngle / 180 * Math.PI);
		// 绕y轴旋转，y左边不会发生变化
		point[1] = y;
		// 变换后的z坐标
		point[2] = z * Math.cos(rotationAngle / 180 * Math.PI) + x * Math.sin(rotationAngle / 180 * Math.PI);
	}
	draw();
}

//绘制函数
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var P = pointMap;
	var point;
	// 绘制矩形ABCD
	ctx.beginPath();
	point = transformCoordinatePoint(P.A);ctx.moveTo(point.x, point.y);
	point = transformCoordinatePoint(P.B);ctx.lineTo(point.x, point.y);
	point = transformCoordinatePoint(P.C);ctx.lineTo(point.x, point.y);
	point = transformCoordinatePoint(P.D);ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.stroke();
	// 绘制矩形EFGH
	ctx.beginPath();
	point = transformCoordinatePoint(P.E);ctx.lineTo(point.x, point.y);
	point = transformCoordinatePoint(P.F);ctx.lineTo(point.x, point.y);
	point = transformCoordinatePoint(P.G);ctx.lineTo(point.x, point.y);
	point = transformCoordinatePoint(P.H);ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.stroke();
	// 绘制直线BF
	ctx.beginPath();
	point = transformCoordinatePoint(P.B);ctx.moveTo(point.x, point.y);
	point = transformCoordinatePoint(P.F);ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.stroke();
	// 绘制直线EA
	ctx.beginPath();
	point = transformCoordinatePoint(P.E);ctx.moveTo(point.x, point.y);
	point = transformCoordinatePoint(P.A);ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.stroke();
	// 绘制直线CG
	ctx.beginPath();
	point = transformCoordinatePoint(P.C);ctx.moveTo(point.x, point.y);
	point = transformCoordinatePoint(P.G);ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.stroke();
	// 绘制直线HD
	ctx.beginPath();
	point = transformCoordinatePoint(P.H);ctx.lineTo(point.x, point.y);
	point = transformCoordinatePoint(P.D);ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.stroke();
}

//坐标点转换函数
function transformCoordinatePoint(point) {
	var x = point[0];
	var y = point[1];
	var z = point[2];
	return {
		x: (x - visual.x) * visual.z / (visual.z - z) + offsetX,
		y: (y - visual.y) * visual.z / (visual.z - z) + offsetX
	};
}
