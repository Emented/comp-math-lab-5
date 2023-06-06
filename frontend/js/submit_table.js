let points;
let lagrangeFunction;
let newtonFunction;
let firstGaussFunction;
let secondGaussFunction
let min_x;
let max_x;
let difference = NaN;
function submitForm(event) {
    difference = NaN;
    const inputs1 = document.getElementsByTagName('input');
    document.getElementById('error_label').textContent = ''
    let error = false;
    let errorText = "";
    let set = new Set();

    for (let i = 0; i < rows * 2; i++) {
        const val = parseFloat(inputs1[i].value);
        if (isNaN(val) || val < -1000000 || val > 1000000) {
            inputs1[i].classList.add('error');
            error = true;
            errorText = 'All coordinates must be provided in range [-1000000; 1000000]';
        } else {
            if (i > 0 && i % 2 === 0) {
                const prevVal = parseFloat(inputs1[i - 2].value);
                const curDiff = val - prevVal;
                if (isNaN(difference)) {
                    difference = curDiff;
                }
                if (prevVal > val) {
                    errorText = 'Values must be sorted';
                    inputs1[i].classList.add('error');
                    inputs1[i - 2].classList.add('error');
                    error = true;
                    break;
                }
            }
            inputs1[i].classList.remove('error');
            if (set.has(val) && i % 2 === 0) {
                for (j = 0; j < rows * 2; j += 2) {

                    const new_val = parseFloat(inputs1[j].value);

                    if (new_val === val) {
                        inputs1[j].classList.add('error');
                        errorText = 'X values must be unique';
                    }

                }
                error = true;
            }
            if (i % 2 === 0){
                set.add(val);
            }
        }
    }
    if (error) {
        document.getElementById('error_label').textContent = errorText
        return;
    }

    difference = difference.toFixed(2);

    event.preventDefault();
    const form = document.querySelector('form');
    const inputs = Array.from(form.querySelectorAll('input[type="number"]'));
    const values = inputs.map(input => parseFloat(input.value));

    points = parseTable(values);

    $.ajax({
        type: 'POST',
        url: backendUrl + "/api/submit",
        contentType: "application/json",
        data: JSON.stringify(points),
        dataType: 'json',
        success: (data) => {
            console.log(data);
            build_table(data.n, data.finiteDifference);

            min_x = points[0].x;
            max_x = points[0].x;

            let min_y = points[0].y;
            let max_y = points[0].y;

            points.forEach((point) => {
                min_x = Math.min(min_x, point.x);
                max_x = Math.max(max_x, point.x);

                min_y = Math.min(min_y, point.y);
                max_y = Math.max(max_y, point.y);
            });

            let mid_x_index = points.length / 2;

            board = JXG.JSXGraph.initBoard('jxgbox', {
                boundingbox: [min_x - 2, max_y + 2, max_x + 2, min_y - 2],
                axis: true,
                showCopyright: false
            });

            lagrangeFunction = getLagrangeFunction(data.lagrangeCoefficients);
            newtonFunction = getNewtonFunction(data.newtonCoefficients);

            board.create('functiongraph', [lagrangeFunction, min_x, max_x]);
            board.create('functiongraph', [newtonFunction, min_x, max_x], {strokecolor:'red'});

            $("#lagrange_result").text('');
            $("#newton_result").text('');
            draw_points(board, points);
        },
        error: (error) => {
            document.getElementById('error_label').textContent = "Error during communicating with backend"
        }
    });
}

function countX(){
    const target_x = parseFloat(document.getElementById("input-X").value);
    if (target_x < min_x || target_x > max_x) {
        document.getElementById("input-X").classList.add('error');
        return
    } else {
        document.getElementById("input-X").classList.remove('error');
    }
    $("#lagrange_result").text(lagrangeFunction(target_x).toFixed(5));
    $("#newton_result").text(newtonFunction(target_x).toFixed(5));
}




