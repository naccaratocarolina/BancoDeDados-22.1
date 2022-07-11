export function countArrObjectsByKey(arr, key) {
    const result = {};
    arr.forEach(element => {
      if (result[element[key]]) {
        result[element[key]]++;
      } else {
        result[element[key]] = 1;
      }
    });

    return result;
}

export function getLabelsAndData(obj) {
    const labels = [];
    const data = [];

    for(const [label, quantity] of Object.entries(obj)) {
        labels.push(label);
        data.push(quantity);
    }

    return [ labels, data ];
}

export function getLabelsAndDataFromArrOfObjects(arr, labelKey, dataKey) {
    const labels = [];
    const data = [];

    for(const obj of arr) {
        labels.push(obj[labelKey]);
        data.push(obj[dataKey]);
    }

    return [ labels, data ];
}

export function randomColors(numOfColors) {
    const bgColors = [];
    const borderColors = [];

    for(let i = 0; i < numOfColors; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        
        bgColors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
        borderColors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
    }

    return [bgColors, borderColors];
}