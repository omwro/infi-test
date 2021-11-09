import {argv} from 'process';
import {readCsv} from './read-csv.js';

const AGG_NAME_REGEX = /^(name=)(\S+)$/
let dataArray = await readCsv()
argv.forEach((val, _) => {
    const match = val.match(AGG_NAME_REGEX)
    if (!match) return
    const nameValue = match[2]
    dataArray
        .filter(cam => cam.camera.includes(nameValue))
        .forEach(cam => console.log(cam.toString()))
});



