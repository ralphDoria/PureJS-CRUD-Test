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
    insertNewRecord(formData);
    resetForm();
}

function readFormData() {
    let formData = {}
    formData["fullName"] = elements.fullName.value;
    formData["email"] = elements.email.value;
    formData["birthdate"] = elements.birthdate.value;
    formData["gender"] = elements.gender.value;
    formData["country"] = elements.country.value;
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
                        <a>Delete</a>`;
}

function resetForm() {
    console.log("Resetting form")
    for (const element of Object.values(elements)) {
        element.value = "";
    }
}

function onEdit(tableData) {
    const selectedRow = tableData.parentElement.parentElement;
    // Repopulate form with the selected row's values for each column
    for (let i = 0; i < tableCategories.length; i++) {
        elements[tableCategories[i]].value = selectedRow.cells[i].innerHTML;
    }
}