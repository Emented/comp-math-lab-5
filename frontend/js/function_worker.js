function getNewtonFunction(newton_coefficients) {
    return x => {
        const n = newton_coefficients.length;
        const h = difference;
        let result = points[0].y;

        for (let i = 1; i < n; i++) {
            let product = 1;
            for (let j = 0; j < i; j++) {
                product *= (x - points[j].x);
            }

            result += newton_coefficients[i] * product;
        }

        return result;
    }
}

function getLagrangeFunction(lagrange_coefficients) {
    return x => {
        const n = lagrange_coefficients.length;
        let result = 0;
        for (let i = 0; i < n; i++) {
            let product = 1;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    product *= (x - points[j].x);
                }
            }
            result += lagrange_coefficients[i] * product;
        }
        return result;
    }
}
