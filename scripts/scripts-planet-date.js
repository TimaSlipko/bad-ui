window.addEventListener('load', function () {
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

            a = W / 2;
            b = H / 2;

            x0 = ellipse.getBoundingClientRect().left + W / 2;
            y0 = ellipse.getBoundingClientRect().top + H / 2;

            x2 = event.clientX - x0;
            y2 = y0 - event.clientY;

            k = y2 / x2;

            if (x2 > 0) {
                x = 1 / Math.sqrt(1 + Math.pow(k, 2));
                // x = Math.sqrt(Math.pow(a, 2) / (Math.pow(a, 2) + Math.pow(k, 2) * Math.pow(b, 2)));
            } else {
                x = -1 / Math.sqrt(1 + Math.pow(k, 2));
                // x = -Math.sqrt(Math.pow(a, 2) / (Math.pow(a, 2) + Math.pow(k, 2) * Math.pow(b, 2)));
            }
            
            y = k * x;

            // console.log(x, y);

            x1 = x * (W / 2)
            y1 = y * (H / 2)

            x3 = W / 2 + x1
            y3 = H / 2 - y1

            // console.log(x1, y1, x3, y3);

            earth.style.left = x3 - 25 + 'px';
            earth.style.top = y3 - 25 + 'px';

            // earth.style.left = event.clientX - 25 + 'px';
            // earth.style.top = event.clientY - 25 + 'px';
        }
    }
})