function ggk (opts) {
	this.selector = opts.selector;
	this.cover = opts.cover;
	this.text = opts.text;
	this.coverColor = opts.color||"gray";
	this.radius = opts.radius||10;
	this.init();
}
ggk.prototype.init=function(){
	this.drawText();
	this.drawCover();
	this.addEvent();
};
ggk.prototype.drawText=function(){
	var selector = document.querySelector(this.selector);
	var ctx = selector.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(20,20);
		ctx.fillStyle="red";
		ctx.fillText(this.text,50,50);
		ctx.closePath();
		ctx.fill();
}
ggk.prototype.drawCover=function(){
	this.cover = document.querySelector(this.cover);
	this.cover.style.backgroundColor='transparent';
	this.cover_ctx = this.cover.getContext("2d");
	this.cover_ctx.beginPath();
	this.cover_ctx.fillStyle = 'gray';
	this.cover_ctx.fillRect(0, 0, 200, 200);
	this.cover_ctx.globalCompositeOperation = 'destination-out';
	this.cover_ctx.closePath();
	this.cover_ctx.fill();
}
ggk.prototype.addEvent=function(){
	var that = this;
	var startX,startY,endX,endY;
	this.cover.addEventListener("touchstart",function(event){
		startX = event.changedTouches[0].pageX;
		startY = event.changedTouches[0].pageY;
		that.drawPen(startX,startY);
	},false);
	this.cover.addEventListener("touchmove",function(event){
		endX = event.changedTouches[0].pageX;
		endY = event.changedTouches[0].pageY;
		that.drawPen(endX,endY);
	},false);
}
ggk.prototype.drawPen=function(x,y){
	this.cover_ctx.beginPath();
	this.cover_ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
	this.cover_ctx.closePath();
	this.cover_ctx.fill();
	this.cover_ctx.save();
}