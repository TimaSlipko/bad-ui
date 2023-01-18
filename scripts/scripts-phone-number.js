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
  a = 9.8 * (Math.sin(toRadians(angle)));
  speed += a;
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function calcSpeed () {
  if (document.getElementById('chbox').checked && document.getElementById('numberInput') != document.activeElement) {
    if (document.getElementById('numberInput').value == 0 || document.getElementById('numberInput').value == 9999999999) {
      speed *= -0.6;
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
