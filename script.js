const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
    yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
            
        let isInLeft = 
          parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = 
        (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `perspective(2300px) translateZ(${
            zValue * speedz
        }px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${
                -xValue * speedx
            }px))  translateY(calc(-50% + ${yValue * speedy}px))`;
    });
}

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree =( xValue / (window.innerHeight / 2)) * 20;   

   update(e.clientX);
});


// mouse chapta effect when move the cursor
function customMouseChapta() {
    var xprev = 0;
    var yprev = 0;

    var timeout;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        var xDiff = Math.abs(dets.clientX - xprev);
        var yDiff = Math.abs(dets.clientY - yprev);

        var xscale = gsap.utils.clamp(0.7, 1.2, xDiff);
        var yscale = gsap.utils.clamp(0.7, 1.2, yDiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#custom-mouse").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(0.9, 0.9)`;

        }, 100);
    });
}

// custom mouse follow
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#custom-mouse").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

customMouseChapta();

