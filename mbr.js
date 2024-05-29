const canvasMBR = document.getElementById('mbrCanvas');
const ctxMBR = canvasMBR.getContext('2d');
const mbrDetails = document.getElementById('mbrDetails');

const mbrSteps = [
    { label: 'BIOS', details: 'BIOS: Basic Input/Output System, initializes hardware and loads the bootloader from the boot device.' },
    { label: 'Boot Device', details: 'Boot Device: The device (e.g., HDD, SSD) from which the BIOS loads the MBR.' },
    { label: 'Sector 0', details: 'Sector 0: The first sector of the boot device, contains the MBR.' },
    { label: 'MBR', details: 'MBR: Master Boot Record, located in the first sector of the boot device.' },
    { label: 'BootLoader Code', details: 'BootLoader Code: Code within the MBR that loads the operating system.', 
      code: [
        '[org 0x7c00] ; Set the origin to 0x7c00, which is where the BIOS loads the boot sector',
        'times 510-($-$$) db 0 ; Fill the rest of the boot sector with zeros',
        'dw 0xAA55 ; Boot sector signature'
      ]
    }
];

let mbrStep = 0;
let mbrProcessTimeout;

function drawMBRDetail() {
    ctxMBR.clearRect(0, 0, canvasMBR.width, canvasMBR.height);
    
    // Draw BIOS
    ctxMBR.strokeRect(50, 150, 100, 100);
    ctxMBR.fillText('BIOS', 90, 200);

    // Draw Boot Device
    ctxMBR.strokeRect(200, 50, 100, 50);
    ctxMBR.fillText('Boot Device', 210, 80);

    // Draw Sector 0 and MBR
    ctxMBR.strokeRect(200, 100, 100, 50);
    ctxMBR.fillText('Sector 0', 220, 120);
    ctxMBR.strokeRect(200, 150, 100, 50);
    ctxMBR.fillText('MBR', 230, 180);
    ctxMBR.fillText('Master Boot Record', 210, 170);

    // Draw Bootloader Code
    ctxMBR.strokeRect(200, 200, 100, 125);
    ctxMBR.fillText('BootLoader Code', 210, 230);
    ctxMBR.fillText('[org 0x7c00] ;', 210, 270);
    ctxMBR.fillText('times 510-($-$$) db 0  ;', 210, 290);
    ctxMBR.fillText('dw 0xAA55              ; ', 210, 310);

    // Draw Storage Device
    ctxMBR.strokeRect(350, 50, 200, 300);
    ctxMBR.fillText('Storage Drive', 400, 200);

    // Draw CPU
    ctxMBR.strokeRect(600, 50, 150, 100);
    ctxMBR.fillText('CPU', 675, 100);
    ctxMBR.fillText('AH', 610, 80);
    ctxMBR.fillText('AL', 610, 120);
    ctxMBR.fillText('SI', 725, 100);

    // Draw RAM
    ctxMBR.strokeRect(600, 200, 150, 100);
    ctxMBR.fillText('RAM', 675, 250);
}

function highlightMBRComponent(component, codeLine = null) {
    drawMBRDetail();
    ctxMBR.globalAlpha = 0.5;
    ctxMBR.fillStyle = 'yellow';
    switch(component) {
        case 'BIOS':
            ctxMBR.fillRect(50, 150, 100, 100);
            mbrDetails.innerHTML = 'BIOS: Basic Input/Output System, initializes hardware and loads the bootloader from the boot device.';
            break;
        case 'Boot Device':
            ctxMBR.fillRect(200, 50, 100, 50);
            mbrDetails.innerHTML = 'Boot Device: The device (e.g., HDD, SSD) from which the BIOS loads the MBR.';
            break;
        case 'Sector 0':
            ctxMBR.fillRect(200, 100, 100, 50);
            mbrDetails.innerHTML = 'Sector 0: The first sector of the boot device, contains the MBR.';
            break;
        case 'MBR':
            ctxMBR.fillRect(200, 150, 100, 50);
            mbrDetails.innerHTML = 'MBR: Master Boot Record, located in the first sector of the boot device.';
            break;
        case 'BootLoader Code':
            ctxMBR.fillRect(200, 200, 100, 125);
            mbrDetails.innerHTML = `<h4>BootLoader Code:</h4><pre>${codeLine}</pre>`;
            break;
        case 'CPU':
            ctxMBR.fillRect(600, 50, 150, 100);
            mbrDetails.innerHTML = 'CPU: Central Processing Unit, executes instructions.';
            break;
        case 'RAM':
            ctxMBR.fillRect(600, 200, 150, 100);
            mbrDetails.innerHTML = 'RAM: Random Access Memory, temporary storage for running programs.';
            break;
    }
    ctxMBR.globalAlpha = 1.0;
    ctxMBR.fillStyle = 'black';
}

function startMBRProcess() {
    mbrStep = 0;
    drawMBRDetail();
    nextMBRStep();
}

function nextMBRStep() {
    if (mbrStep < mbrSteps.length) {
        const currentStep = mbrSteps[mbrStep];
        if (currentStep.label === 'BootLoader Code') {
            highlightMBRComponent(currentStep.label, currentStep.code[mbrStep % currentStep.code.length]);
            mbrStep++;
            mbrProcessTimeout = setTimeout(nextMBRStep, 2000); // Move to next line after 2 seconds
        } else {
            highlightMBRComponent(currentStep.label);
            mbrDetails.innerHTML = currentStep.details;
            mbrStep++;
            mbrProcessTimeout = setTimeout(nextMBRStep, 2000); // Move to next step after 2 seconds
        }
    }
}

function restartMBRProcess() {
    clearTimeout(mbrProcessTimeout);
    startMBRProcess();
}

document.getElementById('startMBRProcess').addEventListener('click', startMBRProcess);
document.getElementById('restartMBRProcess').addEventListener('click', restartMBRProcess);
