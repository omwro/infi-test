const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Camera = require('./camera')
const { argv } = require('process');

const CSV_PATH = 'data/cameras-defb.csv'
const ROW_INDEX_NAME = 'Camera;Latitude;Longitude'
const AGG_NAME_REGEX = /^(name=)(\S+)$/
const CAMERA_ID_REGEX = /^([A-Z]{3}-[A-Z]{2}-)([0-9]{3})/
let dataArray = []

function parseAndCleanData(row) {
    const rowValue = row[ROW_INDEX_NAME]
    const splitRowValue = rowValue.split(';')
    const id_match = splitRowValue[0].match(CAMERA_ID_REGEX)
    if (id_match) {
        dataArray.push(new Camera(
            id_match[2],
            splitRowValue[0],
            splitRowValue[1],
            splitRowValue[2]
        ))
    }
}

/* Credits: https://c2fo.github.io/fast-csv/docs/introduction/example */
fs.createReadStream(path.resolve(__dirname, CSV_PATH))
    .pipe(csv.parse({ headers: true }))
    .on('data', row => parseAndCleanData(row))
    .on('error', error => console.error(error))
    .on('end', _ => search());

function search() {
    argv.forEach((val, _) => {
        const match = val.match(AGG_NAME_REGEX)
        if (!match) return
        const nameValue = match[2]
        dataArray
            .filter(cam => cam.camera.includes(nameValue))
            .forEach(cam => console.log(cam.toString()))
    });
}


