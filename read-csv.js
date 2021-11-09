import fs from "fs";
import path from "path";
import csv from "fast-csv";
import Camera from "./camera.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = 'data/cameras-defb.csv'
const ROW_INDEX_NAME = 'Camera;Latitude;Longitude'
const CAMERA_ID_REGEX = /^([A-Z]{3}-[A-Z]{2}-)([0-9]{3})/

function parseAndCleanData(row) {
    const rowValue = row[ROW_INDEX_NAME]
    const splitRowValue = rowValue.split(';')
    const id_match = splitRowValue[0].match(CAMERA_ID_REGEX)
    if (id_match) {
        return new Camera(
            id_match[2],
            splitRowValue[0],
            splitRowValue[1],
            splitRowValue[2]
        )
    }
}

export async function readCsv() {
    let dataArray = []
    /* Credits: https://c2fo.github.io/fast-csv/docs/introduction/example */
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve(__dirname, CSV_PATH))
            .pipe(csv.parse({headers: true}))
            .on('data', row => {
                const data = parseAndCleanData(row)
                if (data) dataArray.push(data)
            })
            .on('error', error => console.error(error))
            .on('end', () => {
                resolve(dataArray)
            });
    });
}



