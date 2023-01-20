var planetDate = new Date(2006, 1, 4);

window.addEventListener('load', function () {
    dateEl = document.getElementById("planet-date");

    setDateElVal(planetDate);

    earth = document.getElementById("earth");
    sun = document.getElementById("sun");
    ellipse = document.getElementById("ellipse");

    mouseDown = false;

    ellipse.onmousedown = function() { 
        mouseDown = true;
    };

    document.onmouseup = function() {
        mouseDown = false;
    }

    document.onmousemove = function() {
        if (mouseDown === true) {
            H = 200;
            W = 370;
            
            a = H / 2;
            b = W / 2;

            x0 = ellipse.getBoundingClientRect().left + W / 2;
            y0 = ellipse.getBoundingClientRect().top + H / 2;

            x2 = event.clientX - x0;
            y2 = y0 - event.clientY;

            
            k = y2 / x2;
            
            x = b * Math.sqrt(a**2 / (a**2 + k**2 * b**2));
            
            y = b * k * Math.sqrt(a**2 / (a**2 + (k**2) * (b**2)));
                        
            if (x2 < 0 && y2 <= 0){x = -x}
            if (x2 < 0 && y2 > 0){x = -x}
            if (x2 > 0 && y2 > 0){y = -y}
            if (x2 > 0 && y2 < 0){y = -y}

            earth.style.left = x + b - 25 + 'px';
            earth.style.top = y + a - 25 + 'px';
        }
    }
})

function setDateElVal(date) {
    dateEl.innerHTML =`<p>${1900 + date.getYear()}-${formatDate2Symbols(date.getMonth())}-${formatDate2Symbols(date.getDate())}</p>`;
}

function formatDate2Symbols(s) {
    if (s < 10) {
        return '0' + s
    }

    return s
}