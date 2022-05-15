const GeodeData = require('../api/data/geodes.json');

const {geodeList: Geodes} = GeodeData;

const _getRandomInt = (min, max) => Math.random() * (max - min) + min;
const _inRange = (x, min, max) => (x - min) * (x - max) <= 0;

const findGeodeById = (_id) => Geodes.find((geode) => geode.id === _id) || {};

const getMiningResult = (level, geodeId, times = 1) => {
  const {chances} = findGeodeById(geodeId);
  return _calculateGeodes(level, chances, times);
};

const _calculateGeodes = (level, chance, times) => {
  const intervals = Math.ceil(_getRandomInt(level / 2, level)) * times; // level keer het aantal minepogingen voor meerdere keren minen

  const unubtaniumEndRange = chance.unubtanium - 1; // chance.unubtanium (want JSON), zou ook endRange terug kunnen krijgen
  const suriliumEndRange = chance.unubtanium + chance.surilium - 1;
  const daliumEndRange =
    chance.unubtanium + chance.surilium + chance.dalium - 1;
  const blarniumEndRange =
    chance.unubtanium + chance.surilium + chance.dalium + chance.blarnium - 1;
  return _getMiningResources(
    intervals,
    unubtaniumEndRange,
    suriliumEndRange,
    daliumEndRange,
    blarniumEndRange
  );
};

const _getMiningResources = (
  loops,
  unubtaniumEndRange,
  suriliumEndRange,
  daliumEndRange,
  blarniumEndRange
) => {
  const resultArray = [
    {name: 'Unubtanium', amount: 0},
    {name: 'Surilium', amount: 0},
    {name: 'Dalium', amount: 0},
    {name: 'Blarnium', amount: 0},
    {name: 'Empty', amount: 0},
    {name: 'Total', amount: 0},
  ];

  for (let i = 0; i < loops; i++) {
    const calcChance = _getRandomInt(0, 99);

    if (_inRange(calcChance, 0, unubtaniumEndRange)) {
      resultArray.find((el) => el.name === 'Unubtanium').amount++;
      resultArray.find((el) => el.name === 'Total').amount++;
      continue;
    }

    if (_inRange(calcChance, (unubtaniumEndRange + 1), suriliumEndRange)) {
      resultArray.find((el) => el.name === 'Surilium').amount++;
      resultArray.find((el) => el.name === 'Total').amount++;
      continue;
    }

    if (_inRange(calcChance, (suriliumEndRange + 1), daliumEndRange)) {
      resultArray.find((el) => el.name === 'Dalium').amount++;
      resultArray.find((el) => el.name === 'Total').amount++;
      continue;
    }

    if (_inRange(calcChance, (daliumEndRange + 1), blarniumEndRange)) {
      resultArray.find((el) => el.name === 'Blarnium').amount++;
      resultArray.find((el) => el.name === 'Total').amount++;
      continue;
    }

    if (_inRange(calcChance, (blarniumEndRange + 1), 99)) {
      resultArray.find((el) => el.name === 'Empty').amount++;
      continue;
    }
  }

  return resultArray;
};

module.exports = {
  findGeodeById,
  getMiningResult,
};
