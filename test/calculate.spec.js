const calc = require("../src/calculate");
const {assert} = require("chai");

describe("Example of testing a module", () => {

  it("Should return a number", () => {

    const testObj = {
      num: 4,
    }

    const rtn = calc.calculate([testObj]);
    assert.equal(rtn.length, 1, "Should have one element");
    assert.equal(rtn[0], 6);

  });

  it("Should return an empty array if the input is undefined", () => {

    const rtn = calc.calculate(undefined);
    assert.equal(rtn.length, 0);

  });

  it("Should return an empty array if the input is null", () => {

    const rtn = calc.calculate(null);
    assert.equal(rtn.length, 0);
    
  });

})