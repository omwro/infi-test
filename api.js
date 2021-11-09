import express from "express";
const  app = express();
import {readCsv} from './read-csv.js';

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("", async (req, res, next) => {
    res.json(await readCsv());
})