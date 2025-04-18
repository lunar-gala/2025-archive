const middleWindowContent = [
    {
        title: "Ang Bao / 红包",
        image: "path/to/image1.jpg",
        text: "This is the content for window 1",
        height: 400
    },
    {
        title: "XX / 红包",
        image: "path/to/image2.jpg",
        text: "This is the content for window 2",
        height: 300
    },
    {
        title: "Window 3",
        image: "path/to/image3.jpg",
        text: "This is the content for window 3",
        height: 300
    },
    {
        title: "Window 4",
        image: "path/to/image4.jpg",
        text: "This is the content for window 4",
        height: 300
    },
    {
        title: "Window 5",
        image: "path/to/image5.jpg",
        text: "This is the content for window 5",
        height: 300
    },
    {
        title: "Window 6",
        image: "path/to/image6.jpg",
        text: "This is the content for window 6",
        height: 300
    },
    {
        title: "Window 7",
        image: "path/to/image7.jpg",
        text: "This is the content for window 7",
        height: 300
    },
    {
        title: "Window 8",
        image: "path/to/image8.jpg",
        text: "This is the content for window 8",
        height: 300
    }
];

function openWindowAtPosition(leftPos) {
    console.log('opening window at position:', leftPos);
        
    const openedWindow = window.open(
        "",
        "_blank",
        `width=200,height=100,left=${leftPos},top=0,menubar=no,toolbar=no,location=no,status=no`
    );

    if (openedWindow) {
        openedWindow.document.write(`
            <!DOCTYPE html>
            <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>新年快乐</title>
                <link rel="stylesheet" href="/pages/arin/window-styles.css">
            </head>
            <body>
                <div class="windowCover">
                    <small>(DRAG DOWN TO REVEAL)</small>
                </div>
                <div class="windowBody">
                    <p id="storyText">好<br>生<br>意<br>年<br>年</p>
                </div>
            </body>
            </html>
        `);

        openedWindow.addEventListener('resize', function() {
            
            // LEFT WINDOWS -----------------------------------------------------------------------
            if (this.screenX <= 100 && // Check if it's the initial left window
                this.innerHeight >= this.screen.height * 0.70 && 
                !this.newWindowOpened) {
                console.log('Opening right window!');
                this.newWindowOpened = true;
                if (this.opener && typeof this.opener.openWindowAtPosition === 'function') {
                    const rightPos = this.screen.width - 300;
                    setTimeout(() => {
                        this.opener.openWindowAtPosition(rightPos);
                    }, 1000);
                }
            }
            
            // RIGHT WINDOWS -----------------------------------------------------------------------
            if (this.screenX > this.screen.width/2 && 
                this.innerHeight >= this.screen.height * 0.70 && 
                this.opener && 
                typeof this.opener.openMiddleWindow === 'function' &&
                !this.middleWindowsOpened) {
                console.log('Opening middle windows!');
                this.middleWindowsOpened = true;

                // Change background in styles.css
                document.body.style.transition = 'background-color 3s ease-in-out';
                document.body.style.backgroundColor = '#fff0f0';

                // rotate text sepatately 
                const centerPaperText = document.querySelector('.centerPaperText');
                if (centerPaperText) {
                    centerPaperText.style.fontSize = '8rem';
                    centerPaperText.textContent = '福';
                }

                
                
                // Open all 5 middle windows with proper spacing
                const screenMiddle = this.screen.width/2;
                const windowWidth = 300;
                const spacing = 50; // Space between windows
                
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
                
                // Open each window at its calculated position with 1s delay between each
                positions.forEach((pos, index) => {
                    setTimeout(() => {
                        this.opener.openMiddleWindow(index, pos);
                    }, index * 200);
                });
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
                <link rel="stylesheet" href="/pages/arin/window-styles.css">
            </head>
            <body>
                <div class="middleWindow">
                    <div class="imageContainer">
                        <img src="${content.image}" alt="${content.title}">
                    </div>
                    <div class="textContainer">
                        <p>${content.text}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
}

// Expose openMiddleWindow to child windows
window.openMiddleWindow = openMiddleWindow;

// Open initial window
openWindowAtPosition(100);





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