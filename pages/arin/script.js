// Include the main window code
const script = document.createElement('script');
script.src = '/pages/arin/mainWindow.js';
document.head.appendChild(script);

const middleWindowContent = [
    {
        title: "Window 1",
        image: "path/to/image1.jpg",
        text: "This is the content for window 1"
    },
    {
        title: "Window 2",
        image: "path/to/image2.jpg",
        text: "This is the content for window 2"
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
            // console.log('Window position:', this.screenX);
            // console.log('Screen width:', this.screen.width);
            // console.log('Window height:', this.innerHeight);
            // console.log('Screen height:', this.screen.height);
            // console.log('85% of screen height:', this.screen.height * 0.85);
            
            // LEFT WINDOWS
            if (this.screenX <= 100 && // Check if it's the initial left window
                this.innerHeight >= this.screen.height * 0.80 && 
                !this.newWindowOpened) {
                console.log('Opening right window!');
                this.newWindowOpened = true;
                if (this.opener && typeof this.opener.openWindowAtPosition === 'function') {
                    const rightPos = this.screen.width - 300;
                    this.opener.openWindowAtPosition(rightPos);
                }
            }
            
            // RIGHT WINDOWS
            if (this.screenX > this.screen.width/2 && 
                this.innerHeight >= this.screen.height * 0.80 && 
                this.opener && 
                typeof this.opener.openMiddleWindow === 'function' &&
                !this.middleWindowsOpened) {
                console.log('Opening middle windows!');
                this.middleWindowsOpened = true;
                this.opener.openMiddleWindow(0, this.screen.width/2 - 300);
                this.opener.openMiddleWindow(1, this.screen.width/2 + 100);
                this.opener.openMiddleWindow(1, this.screen.width/2 - 100);

                this.opener.openMiddleWindow(1, this.screen.width/2 + 560);

                this.opener.openMiddleWindow(1, this.screen.width/2 + 50);

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
        `width=300,height=300,left=${leftPos},top=100,menubar=no,toolbar=no,location=no,status=no`
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
            </head>
            <body>
                <div class="middleWindow">
                    <div class="imageContainer">
                        <img src="${content.image}" alt="${content.title}">
                    </div>
                    <div class="textContainer">
                        <h2>${content.title}</h2>
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
