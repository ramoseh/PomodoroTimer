let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkMode = true;
const WORK_TIME = 25 * 60;
const REST_TIME = 5 * 60;
const beepSound = document.getElementById('beep');

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const modeIndicator = document.getElementById('mode-indicator');

/**
 * Updates the timer display on the page
 * Formats minutes and seconds with leading zeros
 * Updates both the display elements and the page title
 */
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `${timeString} - ${isWorkMode ? 'Work' : 'Rest'} Pomodoro`;
}

/**
 * Starts the countdown timer
 * Creates an interval that decrements timeLeft every second
 * Plays a sound and shows an alert when timer reaches zero
 * Does nothing if timer is already running
 */
function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                beepSound.play();
                alert('¡Tiempo terminado!');
            }
        }, 1000);
    }
}

/**
 * Pauses the currently running timer
 * Clears the interval and resets the timer ID
 */
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

/**
 * Toggles between work and rest modes
 * Clears any running timer
 * Updates the time left based on the new mode
 * Updates UI elements to reflect the current mode
 */
function toggleMode() {
    // Clear any running timer
    clearInterval(timerId);
    timerId = null;
    
    // Toggle the mode
    isWorkMode = !isWorkMode;
    
    // Set the appropriate time
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    
    // Update UI
    toggleButton.textContent = isWorkMode ? 'Switch to Rest' : 'Switch to Work';
    modeIndicator.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
    
    // Update the timer display
    updateTimer();
}

/**
 * Resets the timer to the initial value based on current mode
 * Clears any running timer
 * Updates the display to show the reset time
 */
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    updateTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);

// Initialize the display
updateTimer(); 