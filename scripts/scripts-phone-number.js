var speed = 0;
var a = 0;
var isHidden = 0;


function calcNum() {
  if (isHidden == 0) {
    document.getElementById('rotate-range').hidden = true;
    isHidden = 1;
  }
  var numZeros = ""
  for (var i = 0; i < 10 - document.getElementById('numberInput').value.length; i++) {
   numZeros += "0"
  }
  var numStr = numZeros + document.getElementById('numberInput').value;
  numStr = numStr.substring(0, 3) + " " + numStr.substring(3, 10);
  numStr = numStr.substring(0, 7) + " " + numStr.substring(7, 11);
  numStr = numStr.substring(0, 10) + " " + numStr.substring(10, 12);

  numStr = "(+38) " + numStr;

  document.getElementById('num').value = numStr;
}

function calcScroll() {
  if (document.getElementById('chbox').checked) {
    document.getElementById('numberInput').style.transform = "rotate(" + document.getElementById('rotateInput').value + "deg)";
  }
}

function calcA(angle) {
  g = 9.8;
  rads = toRadians(angle);
  frictionCoef = 0.35;

  if (angle < -2 || angle > 2) {
    if ((angle < 0 && speed <= 0) || (angle > 0 && speed >= 0)) {
      // DOWN
      a = g * (Math.sin(rads) * frictionCoef * Math.cos(rads));

      speed += a;
    } else if ((angle < 0 && speed >= 0) || (angle > 0 && speed <= 0)) {
      // UP
      a = g * (Math.sin(rads) * frictionCoef * 1.2 * Math.cos(rads));

      speed += a;
    } else if (angle == 0) {
      if (Math.abs(speed) < 3) {
        speed = 0;
      } else {
        speed *= 0.992;
      }
    }
  } else {
    speed *= 0.994;
  }
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function calcSpeed () {
  if (document.getElementById('chbox').checked && document.getElementById('numberInput') != document.activeElement) {
    if (document.getElementById('numberInput').value == 0 || document.getElementById('numberInput').value == 9999999999) {
      speed *= -0.45;
    }
    calcA(document.getElementById('rotateInput').value);
    
    document.getElementById('numberInput').value = parseInt(document.getElementById('numberInput').value) + speed*180000;
    calcNum()
  }
}

function setNumRange() {
  document.getElementById('numberInput').style.transitionDuration = "0.7s";
  if (document.getElementById('chbox').checked) {
    document.getElementById('rotate-range').hidden = false;
    document.getElementById('numberInput').style.width = "32%";
  } else {
    document.getElementById('rotateInput').value = 0
    document.getElementById('rotate-range').hidden = true;
    speed = 0
    document.getElementById('numberInput').style.transform = "rotate(0deg)";
    document.getElementById('numberInput').style.width = "27%";
  }
  setTimeout('document.getElementById("numberInput").style.transitionDuration = "0.1s"', 900);
}

function resetFocus () {
  document.activeElement.blur()
}

let timer1 = setInterval(() => calcSpeed(), 0.01);
let timer2 = setInterval(() => calcScroll(), 0.01);
let timer3 = setInterval(() => calcNum(), 0.01);
