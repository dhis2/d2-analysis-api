import numberToFixed from 'd2-utilizr/lib/numberToFixed';
import isNumber from 'd2-utilizr/lib/isNumber';
import isBoolean from 'd2-utilizr/lib/isBoolean';

/** @description round number if needed.
 *  @param   {number} number 
 *  @param   {number} precision 
 *  @returns {number}
 */
export const roundIf = (number, precision) => {
    number = parseFloat(number);
    precision = parseFloat(precision);

    if (isNumber(number) && isNumber(precision)) {
        var numberOfDecimals = getNumberOfDecimals(number);
        return numberOfDecimals > precision ? numberToFixed(number, precision) : number;
    }

    return number;
};

/** @description gets integer representation of given string.
 *  @param   {string} str 
 *  @returns {number}
 */
export const getValue = (str) => {
    var n = parseFloat(str);

    if (isBoolean(str)) {
        return 1;
    }

    if (!isNumber(n) || n != str) {
        return 0;
    }

    return n;
};

/** @description turns array of arrays into a single row.
 *  @param   {array} array 
 *  @returns {array}
 */
export const toRow = (array) => {
    let row = new Array(array[0].length);

    for(let i=0; i < row.length; i++) {
        row[i] = [];
    }

    for (let i=0; i < array.length; i++) {
        for (let j=0; j < array[i].length; j++) {
            row[j].push(array[i][j]);
        }
    }
    
    return row;
}

/** @description returns the number of decumal of given float
 *  @param   {number} number 
 *  @returns {number}
 *  @deprecated should switch to use function located in d2-utilizr
 */
export const getNumberOfDecimals = (number) => {
    var str = new String(number);
    return (str.indexOf('.') > -1) ? (str.length - str.indexOf('.') - 1) : 0;
};

/** @description returns the rounded value of the given float.
 *  @param   {number} value 
 *  @param   {number} [dec=2] 
 *  @returns {number}
 */
export const getRoundedHtmlValue = (value, dec=2) => {
    return parseFloat(roundIf(value, 2)).toString();
};

/** @description get percentage representation of value.
 *  @param   {number} value 
 *  @param   {number} total 
 *  @returns {string}
 */
export const getPercentageHtml = (value, total) => {
    return getRoundedHtmlValue((value / total) * 100) + '%';
};

/** @description Builds a 2D array with the given dimensions
 *  @param   {number} rows
 *  @param   {number} columns
 *  @returns {array}  
 */ 
export const buildTable2D = (rows, columns, fill) => {
    let table2D = new Array(rows);
    
    for (let i=0; i < rows; i++) {
        table2D[i] = new Array(columns);
        if (typeof fill !== 'undefined') table2D[i].fill(fill);
    }

    return table2D;
};