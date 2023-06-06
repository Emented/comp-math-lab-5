function loadFunc() {

    const a = parseInt(document.getElementById("input-a").value);
    const b = parseInt(document.getElementById("input-b").value);
    let n = parseInt(document.getElementById("input-n").value);
    const option = document.querySelector('input[name="toggle-option"]:checked').id;

    document.getElementById('error_label').textContent = ''


    if (isNaN(a) || a < -1000000 || a > 999999) {
        document.getElementById("input-a").classList.add('error');
        document.getElementById('error_label').textContent = "A must be an integer in range [-1000000, 999999]"
    } else {
        document.getElementById("input-a").classList.remove('error');
    }

    if (isNaN(b) || b < -999999 || b > 1000000) {
        document.getElementById("input-b").classList.add('error');
        document.getElementById('error_label').textContent = "B must be an integer in range [-999999, 1000000]"
    } else {
        document.getElementById("input-b").classList.remove('error');
    }

    if (a >= b) {
        document.getElementById('error_label').textContent = "A must be less then B"
        document.getElementById("input-a").classList.remove('error');
        document.getElementById("input-b").classList.remove('error');
    } else {
        document.getElementById("input-a").classList.remove('error');
        document.getElementById("input-b").classList.remove('error');
    }

    if (isNaN(n) || n < 8 || n > 12) {
        document.getElementById("input-n").classList.add('error');
        document.getElementById('error_label').textContent = "N must be an integer in range [8, 12]"
    } else {
        document.getElementById("input-n").classList.remove('error');
    }

    if (isNaN(a) || isNaN(b) || isNaN(n) || a >= b || n < 8 || n > 12) {
        return;
    }

    setRowCount(n);

    const arr = [];
    const step = (b - a) / (n - 1);

    for (let i = 0; i < n; i++) {
        const x = a + i * step;
        let y = 0;
        if (option === "cos-option") {
            y = Math.cos(x);
        } else if (option === "square-option") {
            y = Math.pow(x, 2) - x
        }

        arr.push(y);

        const xInput = document.getElementsByName(`x${i + 1}`)[0];
        const yInput = document.getElementsByName(`y${i + 1}`)[0];

        checkRowLimits();

        xInput.value = isValid(x) ? x.toFixed(2) : "gg";
        yInput.value = isValid(y) ? y.toFixed(2) : "gg";

    }



    console.log(arr);

}
