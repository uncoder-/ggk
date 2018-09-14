/*
 * @Author: uncoder-fe 
 * @Date: 2018-09-11 14:33:26 
 * @Last Modified by: uncoder-fe
 * @Last Modified time: 2018-09-14 15:22:55
 */

const defaultConfig = {
    height: 200,
    width: 200,
    color: 'green',
    radius: 15
}

class GGK {
    constructor(param) {
        this.config = { ...defaultConfig, ...param };
        const { container, height, width } = this.config;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.setAttribute('height', `${height}px`);
        canvas.setAttribute('width', `${width}px`);
        this.ctx = ctx;
        this.canvas = canvas;
        container.appendChild(canvas);
        this.drawMask();
        this.addEvent();
    }
    drawMask() {
        const { ctx, config } = this;
        const { color, height, width } = config;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, height, width);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
    }
    drawText() {
        const { ctx, config } = this;
        const { text } = config;
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.font = "50px Arial";
        ctx.fillText(text, 50, 50);
    }
    drawPen(x, y) {
        const { ctx, config } = this;
        ctx.beginPath();
        ctx.arc(x, y, config.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.save();
        this.finish();
    }
    finish() {
        // 找寻5个点，有四个点是已选，可清空
        const testPoints = ['50,50', '150,150', '50,150', '100,100', '150,150'];
        const { ctx } = this;
        const imageData = ctx.getImageData(0, 0, 200, 200).data;
        let count = 0;
        testPoints.forEach(item => {
            const index = Number(item.split(',')[0]) + Number(item.split(',')[1]) * 200;
            // console.log("rgba", imageData[index * 4], imageData[index * 4 + 1], imageData[index * 4 + 2], imageData[index * 4 + 3]);
            if (imageData[index * 4 + 3] === 0) {
                count++;
            }
        })
        if (count >= 4) {
            console.log("oh 差不多了")
        }
    }
    addEvent() {
        const { canvas } = this;
        canvas.addEventListener("touchstart", (event) => {
            const startX = event.changedTouches[0].pageX;
            const startY = event.changedTouches[0].pageY;
            this.drawPen(startX, startY);
        }, false);
        canvas.addEventListener("touchmove", (event) => {
            const endX = event.changedTouches[0].pageX;
            const endY = event.changedTouches[0].pageY;
            this.drawPen(endX, endY);
        }, false);
        canvas.addEventListener("touchend", (event) => {
            this.finish();
        }, false);
    }
    refresh() {

    }
    setData() {

    }
}