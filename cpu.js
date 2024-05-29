const canvasCPU = document.getElementById('cpuCanvas');
const ctxCPU = canvasCPU.getContext('2d');

const registers = {
    AX: 0x0000,
    AH: 0x00,
    AL: 0x00
};

const program = [
    { command: 'mov ah, 0x00', exec: () => { registers.AH = 0x00; updateAX(); } },
    { command: 'mov al, 0x03', exec: () => { registers.AL = 0x03; updateAX(); } },
    { command: 'int 0x10', exec: () => { /* Interrupts not implemented */ } }
];

let currentInstruction = 0;

function updateAX() {
    registers.AX = (registers.AH << 8) | registers.AL;
}

function drawCPU() {
    ctxCPU.clearRect(0, 0, canvasCPU.width, canvasCPU.height);
    
    // Draw CPU
    ctxCPU.strokeRect(50, 50, 700, 300);
    
    // Draw Registers
    ctxCPU.fillText(`AX: 0x${registers.AX.toString(16).padStart(4, '0')}`, 70, 100);
    ctxCPU.fillText(`AH: 0x${registers.AH.toString(16).padStart(2, '0')}`, 70, 140);
    ctxCPU.fillText(`AL: 0x${registers.AL.toString(16).padStart(2, '0')}`, 70, 180);
    
    // Draw Instructions
    ctxCPU.fillText('Instructions:', 300, 80);
    program.forEach((instr, index) => {
        ctxCPU.fillText(instr.command, 300, 120 + index * 20);
        if (index === currentInstruction) {
            ctxCPU.fillText('>', 280, 120 + index * 20);
        }
    });
}

function runProgram() {
    if (currentInstruction < program.length) {
        program[currentInstruction].exec();
        currentInstruction++;
        drawCPU();
        setTimeout(runProgram, 1000); // Move to next instruction after 1 second
    }
}

drawCPU();

const canvasBoot = document.getElementById('pcCanvas');
const ctxBoot = canvasBoot.getContext('2d');
const stepDetails = document.getElementById('stepDetails');

let bootStep = 0;
const bootSteps = [
    { label: 'Power On', details: 'The computer is powered on, and the power supply sends a signal to the motherboard.' },
    { label: 'POST', details: 'The BIOS runs a Power-On Self-Test (POST) to check the CPU, RAM, and other essential components.' },
    { label: 'BIOS Initialization', details: 'The BIOS initializes system hardware and configures settings.' },
    { label: 'Detect Boot Device', details: 'The BIOS detects the boot device (e.g., HDD, SSD, USB).' },
    { label: 'Load MBR', details: 'The BIOS loads the Master Boot Record (MBR) from the boot device.' },
    { label: 'Load Bootloader', details: 'The MBR loads the bootloader, which starts the OS loading process.' },
    { label: 'Bootloader Loads OS', details: 'The bootloader loads the operating system kernel into memory.' },
    { label: 'OS Initialization', details: 'The operating system initializes, setting up system processes and user interfaces.' }
];

let bootProcessTimeout;

function drawPC() {
    ctxBoot.clearRect(0, 0, canvasBoot.width, canvasBoot.height);
    
    // Draw Power Supply
    ctxBoot.strokeRect(50, 100, 100, 50);
    ctxBoot.fillText('Power Supply', 60, 130);
    
    // Draw CPU
    ctxBoot.strokeRect(200, 50, 100, 100);
    ctxBoot.fillText('CPU', 240, 100);
    
    // Draw RAM
    ctxBoot.strokeRect(350, 50, 20, 100);
    ctxBoot.fillText('RAM', 370, 100);
    ctxBoot.strokeRect(380, 50, 20, 100);
    ctxBoot.fillText('RAM', 400, 100);
    
    // Draw Discrete Video
    ctxBoot.strokeRect(450, 100, 150, 50);
    ctxBoot.fillText('Discrete Video', 460, 130);
    
    // Draw BIOS and Battery
    ctxBoot.strokeRect(50, 200, 30, 30);
    ctxBoot.fillText('BIOS', 60, 220);
    ctxBoot.strokeRect(90, 200, 30, 30);
    ctxBoot.fillText('Battery', 100, 220);
    
    // Draw Storage Device
    ctxBoot.strokeRect(200, 200, 100, 50);
    ctxBoot.fillText('Storage', 220, 230);
    
    // Draw Boot Device
    ctxBoot.strokeRect(350, 200, 100, 50);
    ctxBoot.fillText('Boot Device', 360, 230);
    
    // Draw Keyboard and Mouse
    ctxBoot.strokeRect(500, 200, 100, 50);
    ctxBoot.fillText('Keyboard', 520, 230);
    ctxBoot.strokeRect(500, 270, 20, 50);
    ctxBoot.fillText('Mouse', 520, 300);
    
    // Draw Connections (arrows)
    ctxBoot.beginPath();
    ctxBoot.moveTo(150, 125);
    ctxBoot.lineTo(200, 100);
    ctxBoot.stroke();
    
    ctxBoot.beginPath();
    ctxBoot.moveTo(300, 100);
    ctxBoot.lineTo(350, 100);
    ctxBoot.stroke();
    
    ctxBoot.beginPath();
    ctxBoot.moveTo(400, 100);
    ctxBoot.lineTo(450, 125);
    ctxBoot.stroke();
    
    ctxBoot.beginPath();
    ctxBoot.moveTo(200, 150);
    ctxBoot.lineTo(200, 200);
    ctxBoot.stroke();
    
    ctxBoot.beginPath();
    ctxBoot.moveTo(450, 150);
    ctxBoot.lineTo(450, 200);
    ctxBoot.stroke();
    
    ctxBoot.beginPath();
    ctxBoot.moveTo(300, 225);
    ctxBoot.lineTo(350, 225);
    ctxBoot.stroke();
}

function highlightComponent(component) {
    drawPC();
    ctxBoot.globalAlpha = 0.5;
    ctxBoot.fillStyle = 'yellow';
    switch(component) {
        case 'Power On':
            ctxBoot.fillRect(50, 100, 100, 50);
            break;
        case 'POST':
            ctxBoot.fillRect(200, 50, 100, 100); // CPU
            ctxBoot.fillRect(350, 50, 20, 100); // RAM 1
            ctxBoot.fillRect(380, 50, 20, 100); // RAM 2
            break;
        case 'BIOS Initialization':
            ctxBoot.fillRect(50, 200, 30, 30); // BIOS
            ctxBoot.fillRect(90, 200, 30, 30); // Battery
            break;
        case 'Detect Boot Device':
            ctxBoot.fillRect(350, 200, 100, 50); // Boot Device
            break;
        case 'Load MBR':
            ctxBoot.fillRect(350, 200, 100, 50); // Boot Device
            break;
        case 'Load Bootloader':
            ctxBoot.fillRect(200, 200, 100, 50); // Storage
            break;
        case 'Bootloader Loads OS':
            ctxBoot.fillRect(200, 200, 100, 50); // Storage
            break;
        case 'OS Initialization':
            ctxBoot.fillRect(500, 200, 100, 50); // Keyboard
            ctxBoot.fillRect(500, 270, 20, 50); // Mouse
            break;
    }
    ctxBoot.globalAlpha = 1.0;
    ctxBoot.fillStyle = 'black';
}

function startBootProcess() {
    bootStep = 0;
    drawPC();
    nextBootStep();
}

function nextBootStep() {
    if (bootStep < bootSteps.length) {
        const currentStep = bootSteps[bootStep];
        highlightComponent(currentStep.label);
        stepDetails.textContent = currentStep.details;
        bootStep++;
        bootProcessTimeout = setTimeout(nextBootStep, 2000); // Move to next step after 2 seconds
    }
}

function restartBootProcess() {
    clearTimeout(bootProcessTimeout);
    startBootProcess();
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Show the CPU simulation tab by default
showTab('cpuSimulation');

