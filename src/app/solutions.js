function deepCopy(obj) {
    // fornull and undefined
    if (obj === null || obj === undefined) {
        return obj;
    }

    // For Dates
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // for Arrays
    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    // for Object literals
    if (typeof obj === 'object') {
        const copy = {};
        Object.keys(obj).forEach(key => {
            copy[key] = deepCopy(obj[key]);
        });
        return copy;
    }

    return obj;
}

function check(obj1, obj2) {
    // for  null and undefined cases
    if (obj1 === null || obj1 === undefined) {
        return obj2 === null || obj2 === undefined;
    }
    if (obj2 === null || obj2 === undefined) {
        return false;
    }

    // for Dates
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    // for different types
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    // for arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        return obj1.every((item, index) => check(item, obj2[index]));
    }

    // for objects
    if (typeof obj1 === 'object') {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        return keys1.every(key => {
            if (!obj2.hasOwnProperty(key)) {
                return false;
            }
            return check(obj1[key], obj2[key]);
        });
    }

    return obj1 === obj2;
}


function execute(code, variables = {}) {
    const $math = {
        sum: (a, b) => a + b,
        mul: (a, b) => a * b
    };

    const $logger = console.log;

    const allVariables = { ...variables, $math, $logger };
    
    const params = Object.keys(allVariables);
    const values = Object.values(allVariables);

    const functionName = 'executedCode_' + Math.random().toString(36).substr(2, 9);
    const func = new Function(...params, code);
    Object.defineProperty(func, 'name', { value: functionName });

    return func.apply(null, values);
}


const data1 = { a: 17, b: { c: 'Test', d: null } };
const data2 = { a: 17, b: { c: 'Test' } };
const data3 = { a: 17, b: null };

console.log('Test cases:');
console.log('check(data1, data2):', check(data1, data2)); 
console.log('check(data1, data3):', check(data1, data3)); 

execute('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 });
execute('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 }); 