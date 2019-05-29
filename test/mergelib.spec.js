const calc = require("../src/mergelib");
const {assert} = require("chai");

describe("Test Per-Address Priority methods", () =>{
  it("Should return an empty array with no input", () => {
    assert.deepEqual([], calc.merge([]));
    assert.deepEqual([], calc.merge());
  });
  it("Should TEST", () => {
    assert.deepEqual([1,2,3], calc.merge([{'values': [1,2,3], 'priority': 100}]));
  });

})

describe("Test Per-Universe Priority methods", () => {

  it("Should return an empty array with no input", () => {
    assert.deepEqual([], calc.merge([], false));
    assert.deepEqual([], calc.merge());
  });
  it ("Simple one universe tests.", () => {
    assert.deepEqual([1,2,3], calc.merge([{'values':[1,2,3], 'priority': 100}], false));
    assert.deepEqual([1,2,3], calc.merge([{'values':[1,2,3]}], false));
    assert.deepEqual([1,2,3], calc.merge([{'values':[1,2,3], 'priority': 0}], false));
    
  });

  it ("If there are multiple universes at the same priority, we do an HTP merge.", () => {
    const universe_one = {'values': [1,2,3], 'priority': 100};
    universe_two = {'values': [4,5,6], 'priority': 100};
    const universe_three = {'values': [3, 2, 1], 'priority': 100};
    assert.deepEqual([4, 5, 6], calc.merge([universe_one, universe_two, universe_three], false));
    assert.deepEqual([3, 2, 3], calc.merge([universe_one, universe_three], false));
    universe_two['priority'] = 50; 
    assert.deepEqual([3, 2, 3], calc.merge([universe_one, universe_two, universe_three], false));
  });

  it ("We take the highest priority universe if there is one.", () => {
    const universe_one = {'values': [1,2,3], 'priority': 100};
    const universe_two = {'values': [4,5,6], 'priority': 99};
    assert.deepEqual([1, 2, 3], calc.merge([universe_one, universe_two], false));
  })

  it ("If a universe has higher priority but less addresses filled, fill the latter ones from the next highest priority universe.", () => {
    assert.deepEqual([1, 2, 3, 5],
      calc.merge([{
        'values': [1, 2, 3],
        'priority': 100
      }, 
      {
        'values': [101, 102, 103, 5],
        'priority': 5
      }], false));
  })

})