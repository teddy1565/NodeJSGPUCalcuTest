const {GPU} = require("gpu.js");
const gpu = new GPU();

function normalMatrix(a,b) {
    const outputLength = a.length*b.length;
    const multiplyMatrix = gpu.createKernel(function (a, b) {
        let sum = 0;
        const ThePowerOfN = 2;
        for (let i = 0; i < 2**ThePowerOfN; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
    }).setOutput([outputLength]);

    return multiplyMatrix(a,b);
}

let result = normalMatrix([1,2],[3,4]);
console.log(result);