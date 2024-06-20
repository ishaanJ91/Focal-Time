let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let timeContainer = document.getElementById("timeContainer");

let lastDate = new Date().getDate();
let lastMinutes = -1;


function updateTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let currentDate = currentTime.getDate();

    if (currentDate !== lastDate) {
        hrs.innerHTML = "00";
        lastDate = currentDate; 
    } else {
        hrs.innerHTML = (hours < 10 ? "0" : "") + hours;
    }

    hrs.innerHTML = (hours < 10 ? "0" : "") + hours;

    if (minutes !== lastMinutes) {
        min.innerHTML = (minutes < 10 ? "0" : "") + minutes;

        timeContainer.classList.add('fade-in');

        setTimeout(function() {
            timeContainer.classList.remove('fade-in');
        }, 1000); 

        lastMinutes = minutes; 
    }
}


updateTime();
setInterval(updateTime, 1000);

document.getElementById("sidebarToggle").addEventListener("click", function() {
    toggleVis();
    toggleSidebar();
    moveCheckContainer(); // Call moveCheckContainer() here
    toggleTimerContainer();
});

function toggleTimerContainer() {
    const container = document.querySelector('.main-screen');
    container.classList.toggle('move-container');
}

function toggleVis() {
    const frm = document.getElementById("edit-timer");
    if (frm.style.visibility !== "visible") {
        frm.style.visibility = "visible";
    } else {
        frm.style.visibility = "hidden";
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("show-sidebar");
    moveCheckContainer(); // Call moveCheckContainer() here as well
}

document.addEventListener("click", function(e) {
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarButton = document.getElementById('toggleSidebarButton');
    const mainScreen = document.querySelector('.main-screen');

    if (e.target !== sidebar && e.target !== toggleSidebarButton && !sidebar.contains(e.target)) {
        sidebar.classList.remove('show-sidebar');
        mainScreen.classList.remove('move-container');
        moveCheckContainer(); // Call moveCheckContainer() here as well
    }
});

function moveCheckContainer() {
    const checkContainer = document.querySelector('.check-container');
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('show-sidebar')) {
        checkContainer.classList.add('move-top-right');
    } else {
        checkContainer.classList.remove('move-top-right');
    }
}

let closeSidebar = document.getElementById("edit-timer");

document.querySelector('.main-screen').onclick = e => {
    closeSidebar.style.display = "block";
    e.stopPropagation();
}

document.body.addEventListener("click", e => {
    if (!closeSidebar.contains(e.target)) {
        closeSidebar.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for the theme buttons
    const timerThemeButton = document.querySelector(".timer-theme");

    const timerContent = document.getElementById("timer-content");

    timerThemeButton.addEventListener("click", function() {
        activateThemeButton(this);
        timerContent.style.display = "block";
        console.log("Timer theme activated");
    });

    

    // Initially display Timer content
    timerThemeButton.click();
});

function activateThemeButton(button) {
    const themeButtons = document.querySelectorAll(".timer-theme");
    themeButtons.forEach(btn => btn.classList.remove("active-theme"));
    button.classList.add("active-theme");
}

document.getElementById('fullscreen-btn').addEventListener('click', function() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the user's selected theme from localStorage
    const selectedTheme = localStorage.getItem('selectedTheme');

    // Add the default background theme class to the body if no theme is stored
    if (!selectedTheme) {
        document.body.classList.add('theme-background-ambient');
        const ambientThemeButton = document.querySelector('[data-theme="theme-background-ambient"]');
        if (ambientThemeButton) {
            ambientThemeButton.classList.add('selected');
        }
    } else {
        // Apply the user's selected theme
        document.body.classList.add(selectedTheme);
        // Add .selected to the corresponding theme button
        const selectedThemeButton = document.querySelector(`[data-theme="${selectedTheme}"]`);
        if (selectedThemeButton) {
            selectedThemeButton.classList.add('selected');
        }
    }

    // Theme switching logic
    const themeButtons = document.querySelectorAll('.theme-pic');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove all previous theme classes
            document.body.classList.remove(
                'theme-background-ambient',
                'theme-background-aesthetic',
                'theme-background-lofi3',
                'theme-background-lofi1',
                'theme-background-lofi2',
                'theme-background-lofi4'
            );
            
            // Add the new theme class
            document.body.classList.add(theme);

            // Remove .selected from all theme buttons
            themeButtons.forEach(btn => btn.classList.remove('selected'));

            // Add .selected to the clicked theme button
            this.classList.add('selected');

            // Store the selected theme in localStorage
            localStorage.setItem('selectedTheme', theme);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Set default theme
    document.body.classList.add('theme-background-ambient');

    // Add click event listeners to theme buttons
    document.querySelectorAll('.theme-pic').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            changeTheme(theme);
        });
    });

    document.getElementById('minmalist-content').addEventListener('click', () => {
        // Navigate to minimalist.html with a default theme as a query parameter
        window.location.href = `minimalist.html?theme=theme-background-ambient`;
    });
});

function changeTheme(themeClass) {
    const body = document.body;
    const currentTheme = Array.from(body.classList).find(cls => cls.startsWith('theme-background-'));
    
    if (currentTheme !== themeClass) {
        if (currentTheme) {
            body.classList.remove(currentTheme);
        }
        body.classList.add(themeClass);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the Minimalist button
    document.getElementById('pomodoro-content').addEventListener('click', function(event) {
        console.log("Clicked on pomodoro-content"); // Add this line for debugging
        const themeButton = event.target.closest('.theme-pic');
        if (themeButton) {
            const selectedTheme = themeButton.getAttribute('data-theme');
            console.log("Selected theme:", selectedTheme); // Add this line for debugging
            window.location.href = `pomodoro.html?theme=${selectedTheme}`;
        }
    });
});
