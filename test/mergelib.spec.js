const mergelib = require("../src/mergelib");
const {assert} = require("chai");

describe("Test Per-Address Priority methods", () =>{
  it("Should return an empty array with no input", () => {
    assert.deepEqual([], mergelib.merge([]));
    assert.deepEqual([], mergelib.merge());
  });

  it("Simple one universe.", () => {
    assert.deepEqual([1,2,3], mergelib.merge([{'values': [1,2,3], 'priority': 100}]));
    assert.deepEqual([1,2,3], mergelib.merge([{'values': [1,2,3], 'priority': 100, 'perAddressPriority': [1, 2, 3]}]));
  });

  it("Priority 0 should be replaced with 0s.", () => {
    assert.deepEqual([1, 0, 3], mergelib.merge([{
      'values': [1, 2, 3],
      'priority': 100,
      'perAddressPriority': [100, 0, 100]
    }]));
  })

  it("Missing priorities at the end should be replaced with 0s.", () => {
    assert.deepEqual([5, 10, 0, 0, 0, 0], mergelib.merge([{
      'values': [5, 10, 15, 20, 25, 30],
      'priority': 100,
      'perAddressPriority': [9, 8]
    }]))
  })

  it("Test mixed priorities", () => {
    assert.deepEqual([3, 3, 5, 5, 5, 3, 3], mergelib.merge([{
      'values': [3, 3, 3, 3, 3, 3, 3],
      'priority': 100, 
      'perAddressPriority': [100, 100, 100, 50, 50, 99, 200]
    },
    {
      'values': [5, 5, 5, 5, 5, 5, 5],
      'priority': 100, 
      'perAddressPriority': [10, 10, 200, 52, 99, 1]      
    }]))
  })

  it("HTP when priorities are equal", () => {
    assert.deepEqual([5, 4, 3, 4, 5], mergelib.merge([{
      'values': [1, 2, 3, 4, 5],
      'priority': 100,
      'perAddressPriority': [100, 100, 100, 100, 100]
    },
    {
      'values': [5, 4, 3, 2, 1],
      'priority': 100,
      'perAddressPriority': [100, 100, 100, 100, 100]
    }]))
  })

  it("Max length of 512", () => {
    arr = [];
    for (i = 0; i < 1000; i++)
    {
      arr[i] = 99;
    }
    assert.deepEqual(512, mergelib.merge([{
      'values': arr,
      'priority': 95,
      'perAddressPriority': arr
    }]).length);
  })

  it("If one universe does not have per-address priority, it should use the universe priority.", () => {
    assert.deepEqual([9, 7, 9], mergelib.merge([{
      'values': [9, 9, 9],
      'priority': 100,
      'perAddressPriority': [55,5,55]
    },
  {
    'values': [8, 7, 6],
    'priority': 50
  }]))
  })

  it("If per-address priority array is longer than values, ignore the extras.", () => {
    assert.deepEqual([1, 2, 3, 4], mergelib.merge([{
      'values': [1, 2, 3, 4],
      'priority': 100,
      'perAddressPriority': [9, 8, 7, 6, 5, 4, 3, 2, 1]
    }]));
  })

  it("Various lengths from different sources", () => {
    assert.deepEqual([1, 2, 3, 4, 5], mergelib.merge([{
      'values': [1, 2, 3],
      'priority': 100,
      'perAddressPriority': [200, 200, 200]
    }, 
    {
      'values': [9, 8, 3, 4, 5],
      'priority': 5,
      'perAddressPriority': [1, 1, 1, 1, 1]
    }]))
  })
})

describe("Test Per-Universe Priority methods", () => {

  it("Should return an empty array with no input", () => {
    assert.deepEqual([], mergelib.merge([], false));
    assert.deepEqual([], mergelib.merge());
  });
  it ("Simple one universe tests.", () => {
    assert.deepEqual([1,2,3], mergelib.merge([{'values':[1,2,3], 'priority': 100}], false));
    assert.deepEqual([1,2,3], mergelib.merge([{'values':[1,2,3]}], false));
    assert.deepEqual([1,2,3], mergelib.merge([{'values':[1,2,3], 'priority': 0}], false));
    
  });

  it ("If there are multiple universes at the same priority, we do an HTP merge.", () => {
    const universe_one = {'values': [1,2,3], 'priority': 100};
    universe_two = {'values': [4,5,6], 'priority': 100};
    const universe_three = {'values': [3, 2, 1], 'priority': 100};
    assert.deepEqual([4, 5, 6], mergelib.merge([universe_one, universe_two, universe_three], false));
    assert.deepEqual([3, 2, 3], mergelib.merge([universe_one, universe_three], false));
    universe_two['priority'] = 50; 
    assert.deepEqual([3, 2, 3], mergelib.merge([universe_one, universe_two, universe_three], false));
  });

  it ("We take the highest priority universe if there is one.", () => {
    const universe_one = {'values': [1,2,3], 'priority': 100};
    const universe_two = {'values': [4,5,6], 'priority': 99};
    assert.deepEqual([1, 2, 3], mergelib.merge([universe_one, universe_two], false));
  })

  it ("If a universe has higher priority but less addresses filled, fill the latter ones from the next highest priority universe.", () => {
    assert.deepEqual([1, 2, 3, 104, 205],
      mergelib.merge([{
        'values': [1, 2, 3],
        'priority': 100
      }, 
      {
        'values': [101, 102, 103, 104],
        'priority': 5
      }, 
      {
        'values': [201, 202, 203, 204, 205],
        'priority': 0
      }], false));
  })

})