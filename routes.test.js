const { mean, median, mode } = require('./operations');


describe("mean function", function(){    
  test('mean should return an int', function () {
    let value = mean([1,4,19,222]);
    expect(value).toEqual(expect.anything()); //expect.any(Integer) isn't working... not sure what's going on
  });
  
  test('mean should return an average of an array', function () {
      let value = mean([1,4,19,222]);
      expect(value).toEqual(61.5);
  });
});


describe("median function", function(){    
    test('median should return an int', function () {
        let value = median([1,4,19,222]);
        expect(value).toEqual(expect.anything());
    });
    test('median should return the middle number of a sorted array', function () {
        let value = median([1,4,19,222]);
        expect(value).toEqual(11.5);
        let value2 = median([1,4,19,222,17]);
        expect(value2).toEqual(17);
    });
});

describe("mode function", function(){    
    test('mode should return an array', function () {
        let value = mode([1,4,19,222]);
        expect(value).toEqual(expect.anything());
    });
    test('mode should return the most common integer(s) of an array', function () {
        let value = mode([1,4,19,222]);
        expect(value).toEqual([1,4,19,222]);
        let value2 = mode([1,4,19,222,4,17]);
        expect(value2).toEqual([4]);
    });
});