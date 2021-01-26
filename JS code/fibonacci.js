// fibonacci 배열에 피보나치 수를 유지하는 프로그램
// fibonacci funcion에 fibonacci 배열의 길이보다 작은 인자가 넘어오면 fibonacci 업데이트 X

let fibonacci = []
let threshold = 0
let f1, f2, f3

console.log(fibonacciGenerator(10))

for (let i = 1; i <= 12; i++) {
    console.log(fibonacciGenerator(i))
    console.log("fibonacci: " + fibonacci)
}

for (let i = 15; i >= 1; i--) {
    console.log(fibonacciGenerator(i))
    console.log("fibonacci: " + fibonacci)
}

function fibonacciGenerator (n) {
    if (n <= threshold) {
        return fibonacci.slice(0, n)
    } else {
        if (n == 1)
            fibonacci.push(0)
        else if (n == 2) {
            if (threshold == 0) {
                fibonacci.push(0)
                fibonacci.push(1)   
            } else {
                fibonacci.push(1)
            }
        } else {
            if (threshold <= 1) {
                if (threshold == 1) {
                    fibonacci.push(1)
                } else {
                    fibonacci.push(0)
                    fibonacci.push(1)
                }
                threshold = 2
            }
            for (let j = threshold; j < n; j++) {
                f1 = fibonacci[j - 2]
                f2 = fibonacci[j - 1]
                f3 = f1 + f2
                fibonacci.push(f3)
            }
        }
        threshold = n

        return fibonacci
    }
}