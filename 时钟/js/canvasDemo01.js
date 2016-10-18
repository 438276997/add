/**
 * Created by TYG on 13-11-18.
 */
var canvas = document.getElementById("canvas01")
    , context = canvas.getContext("2d")
    , canvas2 = document.getElementById("canvas02")
    , context2 = canvas2.getContext("2d")
    , canvas3 = document.getElementById("canvas02")
    , context3 = canvas3.getContext("2d")
    , canvasW = canvas.width
    , canvasH = canvas.height
    , radius = canvasW * 0.4
    , secondsPulse = 0
    , color  // 彩色值
    , colourRGB = []
    , cl = false; //清除彩色线条开关


/**Dial 表盘刻度-------------------------------------------------------------------------*/
function dial() {
    context2.beginPath();
    context2.lineWidth = 1;
    context2.strokeStyle = "rgba(100,100,100,0.5)";
    context2.translate(canvasW/2, canvasH/2);
    for (var k = 0; k < 300; k++) {
        context2.rotate(2*Math.PI/300);
        context2.moveTo(0, -radius);
        context2.lineTo(0, -radius - 2);
    }
    context2.stroke();
    context2.beginPath();
    context2.lineWidth = 2;
    context2.strokeStyle = "rgb(0,0,0)";

    context2.font = '12px Arial';
    context2.textAlign = 'center';
    context2.textBaseline = 'middle';

    for (var j = 0; j < 60; j++) {
        context2.rotate(2*Math.PI/60);
        context2.fillText(j + 1 + "", 0, -radius - 20);
        context2.moveTo(0, -radius);
        context2.lineTo(0, -radius - 4);
    }
    context2.stroke();
    context2.beginPath();
    context2.lineWidth = 4;
    for(var i = 0; i < 12; i++) {
        context2.rotate(2*Math.PI/12);
        context2.moveTo(0, -radius);
        context2.lineTo(0, -radius - 6);
    }
    context2.stroke();
    context2.translate(-canvasW/2, -canvasH/2);

}
/**Pointer 绘制指针-------------------------------------------------------------------------*/
/**
 * @param num
 * @param pointerType ----hours/minutes/seconds
 */
function drawPointer(num, pointerType) {
    context.save();
    context.beginPath();
    context.translate(canvasW/2, canvasH/2);
    if (pointerType == "hours") {
        context.strokeStyle = "rgb(0,0,0)";
        context.lineWidth = 8;
        context.rotate(2*num*Math.PI/12);
        context.moveTo(0, 20);
        context.lineTo(0, -radius*0.6);
        context.stroke();
    }
    if (pointerType == "minutes") {
        context.strokeStyle = "rgb(66,66,66)";
        context.lineWidth = 6;
        context.rotate(2*num*Math.PI/60);
        context.moveTo(0, 20);
        context.lineTo(0, -radius*0.7);
        context.stroke();
    }
    if (pointerType == "seconds") {
        context.fillStyle = "rgb(" + color + ")";
        context.rotate(2*num*Math.PI/(60 * 1000));
        context.moveTo(0, -radius*0.95 - secondsPulse);
        context.lineTo(5, -radius*0.95 - 6 - secondsPulse);
        context.lineTo(-5, -radius*0.95 - 6 - secondsPulse);
        context.closePath();
        context.fill();
    }
    context.restore();
}
function drawPointers() {
    var date = new Date()
        , h, m, mm, s, ms;
    s = date.getSeconds()*1000;
    m = date.getMinutes();
    ms = date.getMilliseconds() + s;
    mm = m + ms/60000;
    h = date.getHours() + m/60;

    secondsPulse = 0;

    if (ms - s > 960) {
        secondsPulse = 8;
        color = GetColour();
    }
    if (mm - m <= 6.9/10000) {
        cl = true;
    }
    drawColorLine(ms, color);
    drawPointer(ms, "seconds");
    drawPointer(mm, "minutes");
    drawPointer(h, "hours");
}

/**colorLine 彩色线条-------------------------------------------------------------------------*/
function drawColorLine (num, color) {
    var colour = "rgba(255,0,0,0.06)";
    if (color) {
        colour = "rgba(" + color +  ",0.06)";
    }
    if (cl) {
        context3.fillStyle = "#fff";
        context3.arc(canvasW/2, canvasH/2, radius*0.95, 0, Math.PI * 2, true);
        context3.fill();
        cl = false;
    }
    var randomNum;
    context3.save();
    context3.beginPath();
    context3.translate(canvasW/2, canvasH/2);
    context3.rotate(2*num*Math.PI/(60 * 1000));
    context3.lineWidth = 1;
    context3.strokeStyle = colour;
    context3.moveTo(0, -radius*0.95);
    randomNum = GetRandomNum(1,9) * 5;
    context3.quadraticCurveTo(randomNum, -radius/2, 0, 0);
    context3.moveTo(0, -radius*0.95);
    randomNum = GetRandomNum(1,9) * 5;
    context3.quadraticCurveTo(randomNum, -radius/2 + randomNum, 0, 0);
    context3.moveTo(0, -radius*0.95);
    randomNum = GetRandomNum(1,9) * 5;
    context3.quadraticCurveTo(randomNum, -radius/2, 0, 0);
    context3.moveTo(0, -radius*0.95);
    randomNum = GetRandomNum(1,9) * 5;
    context3.quadraticCurveTo(randomNum, -radius/2 - randomNum, 0, 0);
    context3.stroke();
    context3.restore();
}

function animate() {
    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(canvas2, 0, 0, canvasW, canvasH);
    context.drawImage(canvas3, 0, 0, canvasW, canvasH);
    drawPointers();
    window.requestNextAnimationFrame(animate);
}
dial();//表盘只绘制一次节省资源
window.requestNextAnimationFrame(animate);

function GetRandomNum(Min,Max) //随机数
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

/**
 * @return {string}
 */
function GetColour() { //获取色彩
    var R, G, B, rgb, rgbs;
    if (colourRGB[0] == null) {
        colourRGB[0] = GetRandomNum(238, 255);
        colourRGB[1] = 0;
        colourRGB[2] = 0;
    } else {
        rgbs = 240;
        if (colourRGB[1] < rgbs && colourRGB[2] == 0) {
            colourRGB[1] += rgbs/10;
            if(colourRGB[1] >= rgbs) {
                colourRGB[1] = rgbs;
            }
        } else if (colourRGB[1] >= rgbs && colourRGB[2] == 0 && colourRGB[0] != 0) {
            colourRGB[0] -= rgbs/10;
            if (colourRGB[0] <= 0) {
                colourRGB[0] = 0;
            }
        } else if (colourRGB[1] >= rgbs && colourRGB[0] == 0 && colourRGB[2] < rgbs) {
            colourRGB[2] += rgbs/10;
            if(colourRGB[2] >= rgbs) {
                colourRGB[2] = rgbs;
            }
        } else if (colourRGB[2] >= rgbs && colourRGB[0] == 0 && colourRGB[1] != 0) {
            colourRGB[1] -= rgbs/10;
            if (colourRGB[1] <= 0) {
                colourRGB[1] = 0;
            }
        } else if (colourRGB[2] >= rgbs && colourRGB[1] == 0 && colourRGB[0] < rgbs) {
            colourRGB[0] += rgbs/10;
            if(colourRGB[0] >= rgbs) {
                colourRGB[0] = rgbs;
            }
        } else if (colourRGB[0] >= rgbs && colourRGB[1] == 0 && colourRGB[2] != 0) {
            colourRGB[2] -= rgbs/10;
            if (colourRGB[2] <= 0) {
                colourRGB[2] = 0;
            }
        }
    }
    R = colourRGB[0];
    G = colourRGB[1];
    B = colourRGB[2];

    rgb = R + "," + G + "," + B;

    console.log(rgb);
    return rgb;
}