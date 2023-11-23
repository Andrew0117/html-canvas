let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
let deviceFrames = document.getElementById("devices");
let tubeFrames = document.getElementById("tubes");
let canvasChart = document.getElementById("chart").getContext("2d");

const xValues = [0, 10, 20, 30, 40, 50, 60];
let options = {
    type: 'line',
    data: {
        labels: xValues,
        datasets: [{
            data: [100, 110, 105, 95, 100, 90, 105],
            borderColor: "green",
            fill: false,
            label: 'Speed'
        }, {
            data: [50, 60, 40, 55, 45, 50, 60],
            borderColor: "blue",
            fill: false,
            label: 'Pressure'
        }]
    },
    options: {
        legend: { display: true }
    }
}
new Chart(canvasChart, options);

let deviceImageLocations = [
    { x: 34, y: 83 },
    { x: 91, y: 83 },
    { x: 147, y: 83 },
    { x: 215, y: 83 },
    { x: 206, y: 264 },
    { x: 209, y: 210 },
    { x: 210, y: 217 },
];

let tubeImageLocations = [
    { x: 19, y: 170 },
    { x: 91, y: 168 },
    { x: 19, y: 170 },
    { x: 215, y: 83 },
    { x: 22, y: 181 },
];

let block = 20;
let devices = [];
let tubes = [];

let gameLoop = () => {
    if (canvas !== null) {
        draw();
    }
};

let draw = () => {
    canvasContext.beginPath();
    canvas_arrow(canvasContext, 30, 245, 70, 245);
    canvas_arrow(canvasContext, 370, 245, 410, 245);
    canvasContext.stroke();

    drawDevice();
    drawTube();
};

let createDevices = () => {
    devices = [];
    let newDevice = new Device(220, 227, block, block, deviceImageLocations[6].x, deviceImageLocations[6].y, 60, 57);
    devices.push(newDevice);
};

let createTubes = () => {
    tubes = [];
    let newTube = new Tube(172, 235, block, block, tubeImageLocations[4].x, tubeImageLocations[4].y, 53, 55);
    tubes.push(newTube);
    newTube = new Tube(124, 235, block, block, tubeImageLocations[4].x, tubeImageLocations[4].y, 53, 55);
    tubes.push(newTube);
    newTube = new Tube(76, 235, block, block, tubeImageLocations[4].x, tubeImageLocations[4].y, 53, 55);
    tubes.push(newTube);
    newTube = new Tube(267, 235, block, block, tubeImageLocations[4].x, tubeImageLocations[4].y, 53, 55);
    tubes.push(newTube);
    newTube = new Tube(316, 235, block, block, tubeImageLocations[4].x, tubeImageLocations[4].y, 53, 55);
    tubes.push(newTube);
};

createDevices();
createTubes();
gameLoop();

function canvas_arrow(context, fromx, fromy, tox, toy) {
    let headlen = 10;
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

canvas.addEventListener('click', function (event) {
    if (event.offsetX > devices[0].x && event.offsetX < devices[0].x + devices[0].imageWidth
        &&
        event.offsetY > devices[0].y && event.offsetY < devices[0].y + devices[0].imageHeight) {
        
        let dialog = document.getElementById('dialog');
        let spanClose = document.getElementsByClassName("close")[0];
        dialog.style.display = "block";
        spanClose.onclick = function () {
            dialog.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target === dialog) {
                dialog.style.display = "none";
            }
        }
    }
}, false);
