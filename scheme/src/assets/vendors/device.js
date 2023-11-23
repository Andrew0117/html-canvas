class Device {
    constructor(
        x,
        y,
        width,
        height,
        imageX,
        imageY,
        imageWidth,
        imageHeight
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
    }

    draw() {
        canvasContext.save();
        canvasContext.drawImage(
            deviceFrames,
            this.imageX,
            this.imageY,
            this.imageWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.width + 30,
            this.height + 30
        );
    }
}

let drawDevice = () => {
    for (let i = 0; i < devices.length; i++) {
        devices[i].draw();
    }
};