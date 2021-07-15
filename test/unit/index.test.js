const { GetPeopleData, GetBmi, GetBmiDetails } = require('../../helper/util')
const constants = require('../../helper/constants');
const assert = require('assert');

const input = [{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 },  {"Gender": "Female",
    "HeightCm": 167, "WeightKg": 82}]

describe('GetPeopleData', () => {
    it('it should return people details', () => {
        let data = GetPeopleData(input);
        assert.strictEqual(data.length, 2);
        assert.strictEqual(data.OverWeightCount, 1);
    });
})

describe('GetBmi', () => {
    it('it should return 32.83', () => {
        let bmi = GetBmi(170, 96);
        assert.strictEqual(bmi, 32.83);
    });

    it('it should return 29.40', () => {
        let bmi = GetBmi(167, 82);
        assert.strictEqual(bmi, 29.40);
    });
})

describe('GetBmiDetails', () => {
    it('it should return Moderately Obese and Malnutrition risk', () => {
        let [category, risk] = GetBmiDetails(32.83);
        assert.strictEqual(category, constants.MOW);
        assert.strictEqual(risk, constants.MR);
    });

    it('it should return Overweight and Enhanced risk', () => {
        let [category, risk] = GetBmiDetails(29.40);
        assert.strictEqual(category, constants.OW);
        assert.strictEqual(risk, constants.ER);
    });
})
