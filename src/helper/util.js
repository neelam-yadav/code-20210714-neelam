const convert = require('convert-units')
const constants = require('./constants');

overwightCount = 0;

function GetPeopleData(peopleData) {
    for(let i in peopleData){
        let height = peopleData[i].HeightCm;
        let weight = peopleData[i].WeightKg;
        let bmi = GetBmi(height, weight);
        peopleData[i].BmiKgm2 = bmi;
        let [category, risk] = GetBmiDetails(bmi);
        peopleData[i].BmiCategory = category;
        peopleData[i].HealthRisk = risk;
    }
    peopleData.OverWeightCount = overwightCount;
    return peopleData;
}


function GetBmi(height, weight) {
    height = convert(height).from('cm').to('m');
    let bmi = (weight/(height*height)).toFixed(2);
    return Number(bmi);
}


function GetBmiDetails(bmi) {
    let category, risk;

    if(bmi<=18.4)
    {
        category = constants.UW;
        risk = constants.MR;
    }
    else if (bmi>=18.5 && bmi<=24.9)
    {
        category = constants.NW;
        risk = constants.LR;
    }
    else if (bmi>=25 &&  bmi<=29.9)
    {
        category = constants.OW;
        risk = constants.ER;
        overwightCount ++;
    }
    else if (bmi>=30 &&  bmi<=34.9)
    {
        category = constants.MOW;
        risk = constants.MR;
    }
    else if (bmi>=35 &&  bmi<=39.9)
    {
        category = constants.SOW;
        risk = constants.HR;
    }
    else
    {
        category = constants.VSOW;
        risk = constants.VHR;
    }

    return [
        category,
        risk
    ];
}

module.exports = {
    GetPeopleData,
    GetBmi,
    GetBmiDetails
};
