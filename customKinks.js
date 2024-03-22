function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};

const toNode = (str) => document.createRange().createContextualFragment(str)

function exportCustomKinks() {
    textData = `Kink, Description, Category \n`;
    list_of_kinks = document.querySelectorAll(".CustomKink")
    list_of_kinks.forEach(customKinks => {
        textData += '"' + customKinks.children[2].value + '","' + customKinks.children[4].value + '",' + customKinks.children[5].value + '\n';
    });

    // Convert the text data to a Blob object with proper encoding
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), textData], { type: 'text/csv;charset=utf-8;' });
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "data.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    // Clean up by revoking the temporary URL to release resources
    URL.revokeObjectURL(url);
}

function importCustomKinks() {
    let csvFile = document.querySelector("#CustomKinksInput").files[0];
    const reader = new FileReader();
    reader.readAsText(csvFile);
    reader.addEventListener('load', () => {
        arrayResultOfCSVToArray = csvToArray(reader.result)
        console.log(arrayResultOfCSVToArray);
        populateKinks(arrayResultOfCSVToArray);
    });
}

function populateKinks(array_of_kinks) {
    if (array_of_kinks[array_of_kinks.length-1].length < 2) {
        array_of_kinks.splice(-1, 1)
    }
    array_of_kinks.splice(0,1);
    console.log(array_of_kinks);

    while ((document.querySelectorAll(".CustomKink").length-1) < array_of_kinks.length) {
        FList.CharEditor_addKink();
    }

    customKinkBoxes = document.querySelectorAll(".CustomKink")
    for (let i = 0; i < customKinkBoxes.length-1; i++) {
        console.log(i);
        const customKinkBox = customKinkBoxes[i];
        customKinkBox.children[2].value = array_of_kinks[i][0];
        customKinkBox.children[4].value = array_of_kinks[i][1];
        customKinkBox.children[5].value = array_of_kinks[i][2].toLowerCase();
    }
    
}

let HTMLexportButton = `<a id="export-kinks-button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" style="margin: 0 10px;"><span class="ui-button-icon-primary ui-icon ui-icon-extlink"></span><span class="ui-button-text">Export Custom Kinks</span></a>`;
const exportButton = toNode(HTMLexportButton);

let HTMLImportInput = `<input id="CustomKinksInput" style="padding-left: 10px;" type="file" accept="text/csv"></input>`;
// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet - This is for accepting excel sheets
const importInput = toNode(HTMLImportInput);

let HTMLimportButton = `<a id="import-kinks-button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthickstop-1-w"></span><span class="ui-button-text">Import Custom Kinks</span></a>`;
const importButton = toNode(HTMLimportButton);

customsAddButton = document.getElementById("customs-button-add");
customsAddButton.after(importInput)
customsAddButton.after(importButton);
customsAddButton.after(exportButton);

document.querySelector("#export-kinks-button").addEventListener('click', function(e){
    return exportCustomKinks();
})
document.querySelector("#import-kinks-button").addEventListener('click', function(e){
    return importCustomKinks();
})