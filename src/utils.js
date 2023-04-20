
const functionToString = (func) => {
    let funcAsString = '(' + func + ')();'; // here is the trick to convert the above fucntion to string
    funcAsString = funcAsString.replace('"use strict";', ''); // firefox adds "use strict"; to any function which might block worker execution so knock it off
    return funcAsString
}

/**
 * create a worker that will execute a function
 * the function will be converted into a string and blobbed
 */
const makeWorker = (dataObj) => {
    if(typeof dataObj === 'function') dataObj = functionToString(dataObj)
    if(typeof dataObj === 'string') {
        const blob = new Blob([dataObj], { type: 'application/javascript' }) // eslint-disable-line
        const objectURL = URL.createObjectURL(blob)
        const worker = new Worker(objectURL) // eslint-disable-line
        return worker
    }
    throw new Error('Only use string or functions')
}

export { functionToString, makeWorker }