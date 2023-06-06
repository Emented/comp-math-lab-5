function build_table(n, arr) {
    generateTable(n, arr);
    $('#x-input').css('display', 'block');
    console.log(arr);
}

function generateTable(n, arr) {
    const tableContainer = document.getElementById("tableContainer");
    while (tableContainer.firstChild) {
        tableContainer.firstChild.remove();
    }

    // Create a table element
    const table = document.createElement("table");

    // Create the table header row
    const headerRow = table.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    headerCell1.innerHTML = "X";
    const headerCell2 = headerRow.insertCell(1);
    headerCell2.innerHTML = "Y";
    for (let i = 0; i < n-1; i++) {
        const headerCell = headerRow.insertCell(i + 2);
        headerCell.innerHTML = "Y" + (i + 1);
    }

    // Loop to create rows and columns
    for (let i = 0; i < n; i++) {
        const row = table.insertRow(i + 1);
        for (let j = 0; j < n + 1; j++) {
            const cell = row.insertCell(j);
            cell.innerHTML = arr[j][i].toFixed(2);
        }
    }

    // Append the table to the div
    document.getElementById("tableContainer").appendChild(table);
}
