import expect from 'expect';

import * as utils from '../src/utils';

import kl350Data from './data/kl350data.json';

describe('parseGoldString()', () => {
  it('should work properly', () => {
    const testHelper = (inputString, expectedValue) => {
      expect(utils.parseGoldString(inputString)).toEqual(expectedValue);
    };

    testHelper('1a', 1000);
    testHelper('12a', 12000);
    testHelper('123a', 123000);
    testHelper('1.2a', 1200);
    testHelper('1.23a', 1230);
    testHelper('12.3a', 12300);
    testHelper('123.1a', 123100);
    testHelper('123.123a', 123123);
  });
});

describe('formatGoldString()', () => {
  it('should work properly', () => {
    const testHelper = (inputValue, expectedValue) => {
      expect(utils.formatGoldString(inputValue)).toEqual(expectedValue);
    };

    testHelper(100, '100');
    testHelper(1000, '1a');
    testHelper(12000, '12a');
    testHelper(123000, '123a');
    testHelper(1200, '1.2a');
    testHelper(1230, '1.23a');
    testHelper(12300, '12.3a');
    testHelper(123100, '123.1a');
    testHelper(123123, '123.123a');
    testHelper(123123123, '123.123b');
    testHelper(123123123123, '123.123c');
    testHelper(123123123123123, '123.123d');
  });
});

describe('assessProgress()', () => {
  it('should return a good assessment', () => {
    const progress = {
      totalMedals: '1.9j',
      percentage: 5.439221052631579,
      rate: '410.1h',
      kl: '350',
      userId: 'testId',
      username: 'testdata',
      timestamp: '2018-09-26T13:13:25.548Z',
    };

    const target = utils.assessProgress(progress, kl350Data.entities);

    expect(target.percentageIsGood).toEqual(true);
    expect(target.percentageAverage).toBeDefined();
  });

  it('should return a bad assessment', () => {
    const progress = {
      timestamp: '2018-09-02T21:20:33.526Z',
      totalMedals: '2.8j',
      percentage: 2.7990000000000004,
      rate: '311h',
      kl: '350',
      userId: 'testId',
      username: 'testdata',
    };

    const target = utils.assessProgress(progress, kl350Data.entities);

    expect(target.percentageIsGood).toEqual(false);
    expect(target.percentageAverage).toBeDefined();
    expect(target.n).toBeDefined();
  });
});
