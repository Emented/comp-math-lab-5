function loadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const lines = e.target.result.split('\n');

            if (validateFileData(lines)) {

                setRowCount(lines.length - 1);

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i - 1].trim().split(/\s+/);

                    const xInput = document.getElementsByName(`x${i}`)[0];
                    const yInput = document.getElementsByName(`y${i}`)[0];

                    xInput.value = parseFloat(values[0].replaceAll(',', '.'));
                    yInput.value = parseFloat(values[1].replaceAll(',', '.'));
                }
            }
        }
        reader.onerror = () => {
            document.getElementById('error_label').textContent = "Error during reading from file"
        }
        reader.readAsText(file);
    };
    input.click();
}

function validateFileData(lines) {
    let amountOfLines = lines.length - 1

    if (amountOfLines < 8 || amountOfLines > 12) {
        document.getElementById('error_label').textContent = "File should contain from 8 to 12 points," +
            " given: " + amountOfLines
        return false
    }

    for (let i = 0; i < amountOfLines; i++) {
        const values = lines[i].trim().split(/\s+/);

        if (values.length !== 2) {
            document.getElementById('error_label').textContent = "Each line should contain two coordinates"
            return false
        }

        if (isNaN(parseFloat(values[0])) || isNaN(parseFloat(values[1]))) {
            document.getElementById('error_label').textContent = "Coordinates should be floating point numbers"
            return false
        }
    }

    return true
}

