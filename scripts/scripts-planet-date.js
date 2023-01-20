var planetDate = new Date(2006, 0, 1);
var turnCounter = 0;
var lastPosition = 0;
var isStart = true;

window.addEventListener('load', function () {
    dateEl = document.getElementById("planet-date");

    earth = document.getElementById("earth");
    sun = document.getElementById("sun");
    ellipse = document.getElementById("ellipse");

    setDateElVal(planetDate);

    mouseDown = false;

    ellipse.onmousedown = function() { 
        mouseDown = true;
    };

    document.onmouseup = function() {
        mouseDown = false;
    }

    document.onmousemove = function() {
        if (mouseDown === true) {
            calcEarth(event.clientX, event.clientY);
        }
    }
})

function calcEarth(clientX, clientY) {
    H = 200;
    W = 370;
    
    a = H / 2;
    b = W / 2;

    x0 = ellipse.getBoundingClientRect().left + W / 2;
    y0 = ellipse.getBoundingClientRect().top + H / 2;

    x2 = clientX - x0;
    y2 = y0 - clientY;
    
    k = y2 / x2;
    
    x = b * Math.sqrt(a**2 / (a**2 + k**2 * b**2));
    
    y = b * k * Math.sqrt(a**2 / (a**2 + (k**2) * (b**2)));

    sin = y / Math.sqrt(x**2 + y**2);
                
    if (x2 < 0 && y2 <= 0){x = -x; position = 3 + (1 - Math.abs(sin));}
    if (x2 < 0 && y2 > 0){x = -x; position = Math.abs(sin);}
    if (x2 > 0 && y2 > 0){y = -y; position = 1 + (1 - Math.abs(sin))}
    if (x2 > 0 && y2 < 0){y = -y; position = 2 + Math.abs(sin);}

    newYear = planetDate.getFullYear();

    if (isStart) {
        lastPosition = position;
        isStart = false;
    }

    if (lastPosition > 3 && position < 1) {
        turnCounter++;
        newYear++;
    } else if (lastPosition < 1 && position > 3) {
        turnCounter--;
        newYear--;
    }

    planetDate = calcDate(position, newYear);

    setDateElVal(planetDate);

    earth.style.left = x + b - 25 + 'px';
    earth.style.top = y + a - 25 + 'px';

    lastPosition = position;
}

function calcDate(position, year) {
    maxDays = 365;
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        maxDays = 366;
    }

    dayOfYear = Math.floor((position * (maxDays - 1) / (4 / maxDays * (maxDays - 1))) + 1);

    var newDate = new Date();
    newDate.setFullYear(2006 + turnCounter, 0, dayOfYear);
    return newDate

}

function setDateElVal(date) {
    dateEl.innerHTML =`<p>${date.getFullYear()}-${formatDate2Symbols(date.getMonth() + 1)}-${formatDate2Symbols(date.getDate())}</p>`;
}

function formatDate2Symbols(s) {
    if (s < 10) {
        return '0' + s
    }

    return s
}