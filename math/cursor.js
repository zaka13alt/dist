

(() => {
    const cursor = document.createElement("div");

    cursor.style.position = "fixed";
    cursor.style.width = "24px";
    cursor.style.height = "24px";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "999999";
    cursor.style.display = "none";
    cursor.style.transform = "translate(-2px, -2px)";

    // 
    cursor.innerHTML = `
    <?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="19.000000pt" height="54.000000pt" viewBox="0 0 49.000000 54.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,54.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M160 260 c0 -149 2 -170 16 -170 9 0 29 14 44 30 33 35 40 37 40 10
0 -11 5 -20 10 -20 6 0 10 -7 10 -16 0 -18 23 -44 40 -44 17 0 40 26 40 44 0
9 -4 16 -10 16 -5 0 -10 9 -10 20 0 11 -4 20 -10 20 -5 0 -10 5 -10 10 0 6 18
10 40 10 29 0 40 4 40 15 0 13 -222 245 -235 245 -3 0 -5 -76 -5 -170z m125
35 c52 -52 95 -97 95 -100 0 -3 -18 -5 -40 -5 -33 0 -40 -3 -40 -20 0 -11 5
-20 10 -20 6 0 10 -9 10 -20 0 -11 5 -20 10 -20 6 0 10 -9 10 -20 0 -13 -7
-20 -20 -20 -13 0 -20 7 -20 20 0 11 -4 20 -10 20 -5 0 -10 7 -10 16 0 8 -7
22 -15 31 -14 13 -18 11 -44 -16 -16 -17 -32 -31 -35 -31 -3 0 -6 63 -6 140 0
77 2 140 5 140 3 0 48 -43 100 -95z"/>
</g>
</svg>


    `;

    document.body.appendChild(cursor);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    function updateCursor() {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    }

    // 
    document.addEventListener("mousemove", (e) => {
        if (document.pointerLockElement) {
            x += e.movementX;
            y += e.movementY;

            // 
            x = Math.max(0, Math.min(window.innerWidth, x));
            y = Math.max(0, Math.min(window.innerHeight, y));

            updateCursor();
        }
    });

    // 
    document.addEventListener("click", () => {
        if (!document.pointerLockElement) {
            document.body.requestPointerLock();
        }

        cursor.style.display = "block";
        document.body.style.cursor = "none";

        updateCursor();
    });

    // 
    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement) {
            cursor.style.display = "block";
            document.body.style.cursor = "none";
        } else {
            cursor.style.display = "none";
            document.body.style.cursor = "default";
        }
    });

    // Hide fake cursor when tab is inactive
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cursor.style.display = "none";
        } else if (document.pointerLockElement) {
            cursor.style.display = "block";
        }
    });
})();
