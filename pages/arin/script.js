const middleWindowContent = [
    {
        title: "Ang Bao / 红包",
        image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/hongbao.png",
        text: "This is the content for window 1",
        height: 400
    },
    {
        title: "XX / 红包",
        image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/lantern.png",
        text: "This is the content for window 2",
        height: 300
    },
    {
        title: "Window 3",
        image: "/pages/arin/assets/jianzhi.png",
        altImage: "/pages/arin/assets/jianzhi2.png",
        text: "This is the content for window 3",
        height: 300
    },
    {
        title: "Window 4",
        image: "/pages/arin/assets/p2.png",
        altImage: "/pages/arin/assets/p3.png",
        text: "This is the content for window 4",
        height: 300
    },
    {
        title: "Window 5",
        image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/hongbao.png",
        text: "This is the content for window 5",
        height: 300
    },
    {
        title: "Window 6",
        // image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/lantern.png",
        text: "Red envelopes are small red packets filled with money, usually given to children, unmarried adults, and employees during Chinese New Year. The color red symbolizes luck, protection, and warding off evil spirits. The act of giving 红包 is not just about money—it's a blessing of good fortune, longevity, and prosperity. The number of bills and the amount often avoids unlucky numbers (like 4) and favors lucky ones (like 8).",
        height: 100,
        width: 400,
    },
    {
        title: "Window 7",
        // image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/jianzhi2.png",
        text: "This is the content for window 7",
        height: 300
    },
];

function openWindowAtPosition(rightPos) {
    console.log('opening window at position:', rightPos);
        
    const openedWindow = window.open(
        "",
        "_blank",
        `width=200,height=100,left=${rightPos},top=0,menubar=no,toolbar=no,location=no,status=no`
    );

    if (openedWindow) {
        openedWindow.document.write(`
            <!DOCTYPE html>
            <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>春联</title>
                <link rel="stylesheet" href="/pages/arin/window-styles.css">
            </head>
            <body>
                <div class="windowCover">
                    <small>(DRAG DOWN TO REVEAL)</small>
                </div>
                <div class="windowBody">
                    <p id="storyText">${this.screenX <= 100 ? '春风<br>得意<br>财源<br>广' : '旭日<br>临门<br>福运<br>长'}</p>
                </div>
            </body>
            </html>
        `);

        openedWindow.addEventListener('resize', function() {
            
            // FIRST WINDOW -----------------------------------------------------------------------
            if (this.screenX <= 100 && // Check if it's the initial left window
                this.innerHeight >= this.screen.height * 0.70 && 
                !this.newWindowOpened) {
                this.newWindowOpened = true;
                if (this.opener && typeof this.opener.openWindowAtPosition === 'function') {
                    const rightPos = this.screen.width + this.screen.width * 0.1;
                    setTimeout(() => {
                        this.opener.openWindowAtPosition(rightPos);
                    }, 1000);
                }
            }
            
            // SPAM WINDOWS -----------------------------------------------------------------------
            if (this.screenX > this.screen.width/2 && 
                this.innerHeight >= this.screen.height * 0.70 && 
                this.opener && 
                typeof this.opener.openMiddleWindow === 'function' &&
                !this.middleWindowsOpened) {
                console.log('Opening middle windows!');
                this.middleWindowsOpened = true;

                // Change main background
                document.body.style.transition = 'background-color 3s ease-in-out';
                document.body.style.backgroundColor = '#fff0f0';

                document.body.style.backgroundImage = "url('/assets/red-paper-texture.jpg')";
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundPosition = 'center';

                const centerPaperText = document.querySelector('.centerPaperText');
                centerPaperText.style.fontSize = '8rem';
                centerPaperText.textContent = '福';
                centerPaperText.style.transform = 'rotate(180deg)';
                centerPaperText.style.display = 'block';
            
                const screenMiddle = this.screen.width/2;
                const windowWidth = 300;
                const spacing = 50;
                
                const positions = [
                    screenMiddle - windowWidth*3 - spacing*3,  // Far left
                    screenMiddle - windowWidth*2 - spacing*2,  // Left
                    screenMiddle - windowWidth - spacing,      // Left center
                    screenMiddle - spacing,                    // Center left
                    screenMiddle + spacing,                    // Center right
                    screenMiddle + windowWidth + spacing,      // Right center
                    screenMiddle + windowWidth*2 + spacing*2,  // Right
                    screenMiddle + windowWidth*3 + spacing*3   // Far right
                ];
                
                setTimeout(() => {
                    positions.forEach((pos, index) => {
                        setTimeout(() => {
                            this.opener.openMiddleWindow(index, pos);
                        }, Math.pow(1.5, index) * 50); // Exponential delay starting faster
                    // }, index * 200);
                    });
                                }, 2000);
                

            }
        });

        // Initialize flags on the opened window
        openedWindow.newWindowOpened = false;
        openedWindow.middleWindowsOpened = false;
    }
}

function openMiddleWindow(contentIndex, leftPos) {
    const content = middleWindowContent[contentIndex];
    if (!content) return;

    const openedWindow = window.open(
        "",
        "_blank",
        `width=300,height=${contentIndex % 2 === 0 ? 300 : 400},left=${leftPos},top=${Math.floor(Math.random() * (window.innerHeight * 0.9 - 100) + 100)},menubar=no,toolbar=no,location=no,status=no`
    );

    if (openedWindow) {
        console.log('MIDDLE WINDOW OPENED');
        openedWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${content.title}</title>
                <link rel="stylesheet" href="/pages/arin/middle-window.css">

                <style>
                    .tooltip {
                        position: fixed;
                        background-color: rgba(0, 0, 0, 0.8);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 12px;
                        pointer-events: none;
                        z-index: 1000;
                        display: none;
                    }
                    .imageContainer {
                        cursor: pointer;
                        transition: transform 0.3s ease;
                    }
                </style>
            </head>
            <body>
                <div class="tooltip">Click to cut</div>
                <div class="middleWindow">
                    <div class="imageContainer">
                        <img src="${content.image}" alt="${content.title}" id="windowImage">
                    </div>
                    <div class="textContainer">
                        <p>${content.text}</p>
                    </div>
                </div>
                <script>
                    const tooltip = document.querySelector('.tooltip');
                    const windowImage = document.getElementById('windowImage');
                    let isOriginalImage = true;

                    document.addEventListener('mousemove', (e) => {
                        tooltip.style.display = 'block';
                        tooltip.style.left = (e.clientX + 10) + 'px';
                        tooltip.style.top = (e.clientY + 10) + 'px';
                    });

                    document.addEventListener('mouseleave', () => {
                        tooltip.style.display = 'none';
                    });

                    windowImage.addEventListener('click', () => {
                        if (isOriginalImage) {
                            windowImage.src = '${content.altImage}';
                        }
                    });
                </script>
            </body>
            </html>
        `);
    }
}

// Expose openMiddleWindow to child windows
window.openMiddleWindow = openMiddleWindow;

// Spawn initial window (banner) on the right with 2s delay
setTimeout(() => {
    openWindowAtPosition(window.innerWidth - window.innerWidth*0.1);
}, 2000);

// Simple spawn tracking using localStorage
const spawnTracker = {
    getCount: function() {
        return parseInt(localStorage.getItem('spawnCount') || '0');
    },
    increment: function() {
        const count = this.getCount();
        localStorage.setItem('spawnCount', (count + 1).toString());
        return count + 1;
    }
};

// Window state management
const windowState = {
    leftWindowSpawned: false,
    rightWindowSpawned: false,
    middleWindowsSpawned: false,
    setLeftWindowSpawned: function() {
        console.log('Setting left window spawned');
        this.leftWindowSpawned = true;
    },
    setRightWindowSpawned: function() {
        console.log('Setting right window spawned');
        this.rightWindowSpawned = true;
    },
    setMiddleWindowsSpawned: function() {
        console.log('Setting middle windows spawned');
        this.middleWindowsSpawned = true;
    },
    canSpawn: function(isLeftWindow) { 
        if (isLeftWindow) {
            return !this.leftWindowSpawned;
        } else {
            return !this.rightWindowSpawned && !this.middleWindowsSpawned;
        }
    }
};

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}