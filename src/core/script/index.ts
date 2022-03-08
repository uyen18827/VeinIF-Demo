import { getName } from "../player/playerInfo"
import { showPronounDialogue } from "../player/pronouns"
import { updateParagraph } from "../paragraphs/paragraphFunctions";
import { autoLoad, exportSave, exportStorageSave, getSaveDesc, loadSave, loadSaveCode, newSave } from "./saveScript";
import { restartGame } from "./settings";
import { getStat, showAllStatHTML } from "../player/statInfos";

///////////////////Initialize game///////////////////
window.onload = function () {
    //check if autoSave exits?
    let autoSave = localStorage.getItem('autoSave');
    if (autoSave) {
        autoLoad();
    }
    else {
        updateParagraph("start");
        showAllStatHTML(getStat());
    }
}
// Add event listener to HTML element input with id = "playerName"
const nameInput = document.querySelector("#playerName");
if (nameInput) {
    nameInput.addEventListener('keyup', getName);
};

////////////////////button!!!!!!!!!!!!/////////////
const button = document.querySelector("#coolbutton");

function doThing(thing?: any) {
    console.log("thing!");
}

if (button) {
    button.addEventListener('click', doThing);
}

///////////////////////////////////////////////////
showPronounDialogue();

// Add event listener to all Save buttons
const saveButton = document.querySelectorAll(".save");
saveButton.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        newSave(slotNumber!)
    }
    );
});

// Add event listener to all Load buttons
const loadButton = document.querySelectorAll(".load");
loadButton.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        loadSave(slotNumber!);
    })
})

// Add event listener to all Load buttons
const exportLocalSaveBtn = document.querySelectorAll(".export");
exportLocalSaveBtn.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        exportStorageSave(slotNumber!);
    })
})

// Add event listener to export save button
const exportSaveBtn = document.querySelector(".exportSave");
exportSaveBtn?.addEventListener('click', function () {
    exportSave();
})

// Add event listener to import save button
const importSaveBtn = document.querySelector(".importSave");
importSaveBtn?.addEventListener(`click`, function () {
    loadSaveCode();
})

// Add event listener to restart game button
const restartBtn = document.querySelector(".restartBtn");
restartBtn?.addEventListener('click', function () { restartGame() });

// Load save Description, from slot 1 to 3
for (let i = 1; i < 4; i++){
    if (localStorage.getItem(`slot-${i}`)) {
        getSaveDesc(`slot-${i}`);
    }
}