const middleWindowContent = [
    {
        title: "红包 / Red envelopes",
        image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/hongbao.png",
        text: "The color red symbolizes luck, protection, and warding off evil spirits. The act of giving 红包 is not just about money—it's a blessing of good fortune, longevity, and prosperity. The number of bills and the amount often avoids unlucky numbers (like 4) and favors lucky ones (like 8).<br>红色象征着好运、保护和驱邪。赠送红包不仅是金钱上的馈赠，更是对好运、长寿和繁荣的祝福。红包的金额通常会避开不吉利的数字（如 4），偏爱吉利的数字（如 8）。",
        hoverText: "",
        height: 400
    },
    {
        title: "灯笼 / Lanterns",
        image: "/pages/arin/assets/p3.png",
        altImage: "/pages/arin/assets/lantern.png",
        text: "Lanterns are commonly used during Chinese New Year to light up the streets and homes, symbolizing reunion and hope for the future.<br><br>灯笼常在春节期间悬挂，用来点亮街道和家园，象征团圆和对未来的希望。",
        hoverText: "Traditional Chinese New Year decorations bring luck",
        height: 300
    },
    {
        title: "灯笼 / Lanterns",
        image: "/pages/arin/assets/p3.png",
        altImage: "/pages/arin/assets/lantern2.png",
        text: "Lanterns are commonly used during Chinese New Year to light up the streets and homes, symbolizing reunion and hope for the future.<br><br>灯笼常在春节期间悬挂，用来点亮街道和家园，象征团圆和对未来的希望。",
        hoverText: "Traditional Chinese New Year decorations bring luck",
        height: 300
    },
    {
        title: "剪纸 / Paper cutting",
        image: "/pages/arin/assets/p2.png",
        altImage: "/pages/arin/assets/jianzhi2.png",
        text: "These are pasted on windows, doors, and walls. The most common symbol is the character 福 (fú, meaning blessing or fortune)—often pasted upside down to imply 福到了 (fortune has arrived, since 倒 and 到 are homophones).<br><br>剪纸通常贴在窗户、门和墙上。最常见的图案是字，经常倒贴，寓意福到了（因倒和到同音）。",
        hoverText: "",
        height: 300
    },
    {
        title: "剪纸 / Paper cutting",
        image: "/pages/arin/assets/p2.png",
        altImage: "/pages/arin/assets/jianzhi.png",
        text: "Symbolically, paper cuttings are a way to invite abundance, harmony, and joy into the home and ward off evil spirits through the use of red and traditional motifs.<br><br>剪纸象征着引入富足、和谐与喜悦，同时借助红色与传统图案驱邪避灾。",
        hoverText: "",
        height: 300
    },
    {
        title: "红包 / Red envelopes",
        image: "/pages/arin/assets/pHongbao.png",
        altImage: "/pages/arin/assets/hongbao.png",
        text: "Red envelopes are small red packets filled with money, usually given to children, unmarried adults, and employees during Chinese New Year.<br><br>红包是装有钱的小红包，春节期间通常赠送给小孩、未婚成年人和员工。",
        hoverText: "",
        height: 300
    },
    {
        title: "剪纸 / Paper cutting",
        image: "/pages/arin/assets/p2.png",
        altImage: "/pages/arin/assets/jianzhi3.png",
        text: "Paper cutting art is often used on red paper to create designs that symbolize good fortune and prosperity<br><br>剪纸艺术常用红纸剪出象征吉祥与繁荣的图案。",
        hoverText: "",
        height: 300
    },
    {
        title: "福 / Fu",
        image: "/pages/arin/assets/fu.png",
        altImage: "/pages/arin/assets/fu.png",
        text: "The most common symbol is the character 福 (fú, meaning blessing or fortune)—often pasted upside down to imply 福到了 (fortune has arrived, since 倒 and 到 are homophones).<br><br>最常见的象征是福字，经常倒贴，寓意福到了（因倒和到发音相同）。",
        hoverText: "",
        height: 300
    }    
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
                <title> ${rightPos <= 100 ? '春联 / 上聯' : '春联 / 下聯'} </title>
                <link rel="stylesheet" href="/pages/arin/window-styles.css">
            </head>
            <body>
                <div class="windowCover">
                    <small>(Drag down to reveal)</small>
                    <p id="storyText">${rightPos <= 100 ? '春风<br>得意<br>财源<br>广' : '旭日<br>临门<br>福运<br>长'}</p>
                </div>
            </body>
            </html>
        `);

        openedWindow.addEventListener('resize', function() {
            // RIGHT WINDOW -----------------------------------------------------------------------
            if (rightPos > 100 && // Check if it's the right window
                this.innerHeight >= this.screen.height * 0.70 && 
                !this.newWindowOpened) {
                this.newWindowOpened = true;
                if (this.opener && typeof this.opener.openWindowAtPosition === 'function') {
                    const leftPos = 0;
                    setTimeout(() => {
                        this.opener.openWindowAtPosition(leftPos);
                    }, 1000);
                }
            }
            
            // LEFT WINDOW -----------------------------------------------------------------------
            if (rightPos <= 100 && // Check if it's the left window
                this.innerHeight >= this.screen.height * 0.80 && 
                !this.middleWindowsOpened) {
                console.log('Opening middle windows!');
                this.middleWindowsOpened = true;

                const centerPaper = document.querySelector('.centerPaperText');
                if (centerPaper) centerPaper.classList.add('hideOpacity');
                
                const doorsImg = document.querySelector('.doorsImg');
                if (doorsImg) {
                    // Change to door2.png
                    doorsImg.src = '/pages/arin/assets/door2.png';
                    
                    // After 1.5 seconds, hide the door and start the transition
                    setTimeout(() => {
                        doorsImg.classList.add('hide');
                        
                        // CHANGE BACKGROUND -----------------------------------------------------------------------
                        document.body.style.transition = 'background-color 3s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
                        document.body.style.backgroundColor = '#fff0f0';

                        // Create a background container for fade effect
                        const bgContainer = document.createElement('div');
                        bgContainer.style.position = 'fixed';
                        bgContainer.style.top = '0';
                        bgContainer.style.left = '0';
                        bgContainer.style.width = '100%';
                        bgContainer.style.height = '100%';
                        bgContainer.style.backgroundImage = "url('/pages/arin/assets/background_paper.png')";
                        bgContainer.style.backgroundSize = 'auto';
                        bgContainer.style.backgroundRepeat = 'repeat';
                        bgContainer.style.backgroundPosition = 'center';
                        bgContainer.style.opacity = '0';
                        bgContainer.style.transition = 'opacity 3s ease-in-out';
                        document.body.appendChild(bgContainer);

                        // Start fade in after a short delay
                        setTimeout(() => {
                            bgContainer.style.opacity = '1';
                        }, 500);
                        
                        setTimeout(() => {
                            const n = middleWindowContent.length;
                            const winW = 300;
                            const winH = 250;
                            const centerX = window.innerWidth / 2 - winW / 2;
                            const centerY = window.innerHeight / 2 - winH / 2;
                            // left, top
                            const percentOffsets = [
                                [0.25, 0.25], // top left
                                [0.4, 0.05],  // top middle
                                [0.6, 0.05],  // top middle
                                [0.75, 0.25], // top right
                                [0.25, 0.75], // bottom left
                                [0.6, 0.95],  // bottom middle
                                [0.75, 0.75], // bottom right
                            ];
                            for (let index = 0; index < n; index++) {
                                setTimeout(() => {
                                    let left, top;
                                    if (index === n - 1) { //last one
                                        left = window.innerWidth / 2 - 200;  // half of 400px width
                                        top = window.innerHeight / 2 - 200;  // half of 400px height
                                    } else {
                                        const [px, py] = percentOffsets[index % percentOffsets.length];
                                        left = window.innerWidth * px - winW / 2;
                                        top = window.innerHeight * py - winH / 2;
                                    }
                                    this.opener.openMiddleWindow(index, left, top);
                                }, Math.pow(1.5, index) * 50);
                            }
                        }, 2000);
                    }, 1500);
                }
            }
        });

        // Initialize flags on the opened window
        openedWindow.newWindowOpened = false;
        openedWindow.middleWindowsOpened = false;
    }
}

function openMiddleWindow(contentIndex, leftPos, topPos) {
    const content = middleWindowContent[contentIndex];
    if (!content) return;

    const openedWindow = window.open(
        "",
        "_blank",
        `width=${contentIndex === middleWindowContent.length - 1 ? 400 : 300},height=${contentIndex === middleWindowContent.length - 1 ? 400 : (contentIndex % 2 === 0 ? 250 : 300)},left=${leftPos},top=${topPos},menubar=no,toolbar=no,location=no,status=no`
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
                <link rel="stylesheet" href="/pages/arin/assets/fonts/fonts.css">
            </head>
            <body>
                <div class="middleWindow">
                    <div class="imageContainer">
                        <img src="${content.image}" alt="${content.title}" id="windowImage">
                    </div>
                    <div class="textContainer">
                        <p>${content.text}</p>
                    </div>
                </div>
                <script>
                    const windowImage = document.getElementById('windowImage');
                    let isOriginalImage = true;

                    if (windowImage) {
                        windowImage.addEventListener('click', () => {
                            if (isOriginalImage) {
                                windowImage.src = '${content.altImage}';
                                windowImage.classList.add('clicked');
                            }
                        });
                    }
                </script>
            </body>
            </html>
        `);
    }
}

// Expose openMiddleWindow to child windows
window.openMiddleWindow = openMiddleWindow;

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

function fadeInElement(el) {
  if (!el) return;
  el.classList.remove('fade');
  el.classList.add('show');
}

function fadeOutElement(el) {
  if (!el) return;
  el.classList.remove('show');
  el.classList.add('fade');
}

document.addEventListener("DOMContentLoaded", () => {
  const enterLink = document.getElementById('enter-link');
  if (enterLink) {
    enterLink.addEventListener('click', function(event) {
      event.preventDefault();
      const mainText = document.querySelector('.centerPaperText.mainText');
      const introText = document.querySelector('.centerPaperText:not(.mainText)');
      if (mainText) fadeInElement(mainText);
      if (introText) introText.classList.add('hide');
      
    });
  }

  const enterButton = document.querySelector('.centerPaperText.button');
  if (enterButton) {
    enterButton.addEventListener('click', function(event) {
      const introText = document.getElementById('introText');
      const doorsImg = document.querySelector('.doorsImg');

      fadeOutElement(introText);
      fadeOutElement(enterButton);

      setTimeout(() => {
        if (introText) {
          introText.innerHTML = 'Couplets are red banners written with auspicious poetic lines in black or gold ink, expressing wishes for prosperity, happiness, harmony, health, and are meant to welcome spring and drive away bad luck.';
          fadeInElement(introText);
          fadeInElement(doorsImg);

        }
      }, 600); 


      let testWin = window.open('', '', 'width=1,height=1,left=0,top=0');
      if (testWin) {
        testWin.close();
        setTimeout(() => {
          openWindowAtPosition(window.innerWidth - window.innerWidth*0.1);
        }, 200);
      } else {
        alert('Please enable pop-ups for this site to continue.');
      }
    });
  }
});