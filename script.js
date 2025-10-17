import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tosmgcjiekdswubxvpml.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function loadData() {
    const allRecordInfoRows = supabase.from('recordInfo').select('*');    
    for (let row of allRecordInfoRows) {
        Object.entries(row).forEach(([key, value]) => {
            console.log(`${key}, ${value}`);
        })
    }
}

loadData();

let selectedRow = null;

let elements = {
    "fullName": document.getElementById("fullName"),
    "email": document.getElementById("email"),
    "birthdate": document.getElementById("birthdate"),
    "gender": document.getElementById("gender"),
    "country": document.getElementById("country")
}
let tableCategories = ["fullName", "email", "birthdate", "gender", "country"];

function onFormSubmit() {
    let formData = readFormData();
    if (isValid()) {
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    let formData = {}
    for (const [key, value] of Object.entries(elements)) {
        formData[key] = value.value
    }
    return formData
}

function insertNewRecord(formData) {
    let table = document.getElementById("employeeList").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.length);
    for (let i = 0; i < tableCategories.length; i++) {
        let newCell = newRow.insertCell(i);
        newCell.innerHTML = formData[tableCategories[i]];
    }
    let newCell = newRow.insertCell(tableCategories.length);
    newCell.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    for (const element of Object.values(elements)) {
        element.value = "";
    }
    selectedRow = null;
}

function onEdit(anchorElement) {
    selectedRow = anchorElement.parentElement.parentElement;
    // Repopulate form with the selected row's values for each column
    for (let i = 0; i < tableCategories.length; i++) {
        elements[tableCategories[i]].value = selectedRow.cells[i].innerHTML;
    }
}
2
function updateRecord(formData) {
    for (let i = 0; i < tableCategories.length; i++) {
        let cellToUpdate = selectedRow.cells[i];
        let newSubmissionValue = formData[tableCategories[i]];
        if (cellToUpdate.innerHTML != newSubmissionValue) {
            cellToUpdate.innerHTML = newSubmissionValue;
        }
    }
}

function onDelete(anchorElement) {
    let rowToDelete = anchorElement.parentElement.parentElement;
    if (confirm(`Are you sure you want to permanently delete this record?`)) {
        rowToDelete.remove();
    }
}

function isValid() {
    let isValid = true;
    // Full name field is required, so check if it's empty
    let validationErrorElementClassList = document.getElementById("fullNameValidationError").classList
    if (elements.fullName.value ==  "") {
        isValid = false;
        validationErrorElementClassList.remove("hide");
    } else {
        if (!validationErrorElementClassList.contains("hide")) {
            validationErrorElementClassList.add("hide");
        }
    }

    return isValid;
}