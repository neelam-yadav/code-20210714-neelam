/**
 * This module provides BMI and health details of the people
 */

const fs = require('fs');
const json = require('big-json')
const util = require('./helper/util');

let peopleData;
const inputPath = 'data.json'
const outputPath = 'output/output-data.json'

const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath, {
    flags: 'w'
});

const parseStream = json.createParseStream();

parseStream.on('data', function(data) {
    peopleData = util.GetPeopleData(data);
    writeStream.write(JSON.stringify(peopleData));
});

readStream.pipe(parseStream);
