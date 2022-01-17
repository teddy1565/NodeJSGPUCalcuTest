const {GPU} = require("gpu.js");
const gpu = new GPU();

function normalMatrix(a,b) {
    const outputLength = a.length*b.length;
    const multiplyMatrix = gpu.createKernel(function (a, b) {
        let sum = 0;
        for (let i = 0; i < 512; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
    }).setOutput([512,512]);

    return multiplyMatrix(a,b);
}
let a = [];
let b = [];
for (let i=0;i<512;i++) {
    a.push(parseInt(Math.random()*100));
    b.push(parseInt(Math.random()*100));
}

let result = normalMatrix(a,b);
console.log(result);