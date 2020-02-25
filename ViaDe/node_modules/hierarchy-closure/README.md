[![NPM Version](https://badge.fury.io/js/hierarchy-closure.png)](https://npmjs.org/package/hierarchy-closure)
[![Build Status](https://travis-ci.org/ericprud/hierarchy-closure.svg?branch=master)](https://travis-ci.org/ericprud/hierarchy-closure)
[![Coverage Status](https://coveralls.io/repos/github/ericprud/hierarchy-closure/badge.svg?branch=master)](https://coveralls.io/github/ericprud/hierarchy-closure?branch=master)

# hierarchy-closure
Maintain simple hierarchy by adding members in any order.


## install

```
npm install --save hierarchy-closure
```

## create ()

This constructs a hierarchy.

``` javascript
// create hierarchy
myHierarchy = Hierarchy.create()
```

## add (parent, child)

Adding parent/child pairs builds a structure called `myHierarchy.roots` with the trees of added parent/child pairs.
It also creates two closures:
- *parents*: a mapping from child to its list of parents.
- *children*: a mapping from parent to its list of children.

### No order dependence

You can fill in your tree in any order and get the same closures:

``` javascript
// populating myHierarchy created above...
// add single entry B->C
myHierarchy.add('B', 'C')
// add single entry B->C
myHierarchy.add('B', 'C')
// add child C->D
myHierarchy.add('C', 'D')
// add disconnected entry F->G
myHierarchy.add('F', 'G')
// add parent E->F
myHierarchy.add('E', 'F')
// add middle D->E
myHierarchy.add('D', 'E')
// add top A->B
myHierarchy.add('A', 'B')
// add bottom G->H
myHierarchy.add('G', 'H')
// add redundant entry (no effect)
myHierarchy.add('A', 'B')
```

### add Exanple Results

``` javascript
{ add: myHierarchy.add,
  roots: {A: {B: {C: {D: {E: {F: {G: {H: {}}}}}}}}},
  parents: {
    A: [],
    B: ['A'],
    C: ['B', 'A'],
    D: ['C', 'B', 'A'],
    E: ['D', 'C', 'B', 'A'],
    F: ['E', 'D', 'C', 'B', 'A'],
    G: ['F', 'E', 'D', 'C', 'B', 'A'],
    H: ['G', 'F', 'E', 'D', 'C', 'B', 'A']
  },
  children: {
    A: ['B', 'C', 'D', 'E', 'F', 'G', 'H'],
    B: ['C', 'D', 'E', 'F', 'G', 'H'],
    C: ['D', 'E', 'F', 'G', 'H'],
    D: ['E', 'F', 'G', 'H'],
    E: ['F', 'G', 'H'],
    F: ['G', 'H'],
    G: ['H'],
    H: []
  }
}
```

## depthFirst (root, (parent, child) => { ... })

This calls you callback function with parent/child pairs starting with any children:

``` javascript
// create hierarchy
h2 = Hierarchy.create()
h2.add('A', 'AB1')
h2.add('AB1', 'AB1C1')
h2.add('AB1C1', 'AB1C1D1')
h2.add('AB1C1', 'AB1C1D2')
h2.add('AB1', 'AB1C2')
h2.add('AB1C2', 'AB1C2D1')
h2.add('A', 'AB2')
h2.add('AB2', 'AB2C1')
h2.add('AB2C1', 'AB2C1D1')
const seen = []
Hierarchy.depthFirst(t.roots, (l, r) => seen.push([l, r]))
```

### depthFirst Example Results

``` JSON
[
  [ "AB1C1D1", "AB1C1" ],
  [ "AB1C1D2", "AB1C1" ],
  [ "AB1C1", "AB1" ],
  [ "AB1C2D1", "AB1C2" ],
  [ "AB1C2", "AB1" ],
  [ "AB1", "A" ],
  [ "AB2C1D1", "AB2C1" ],
  [ "AB2C1", "AB2" ],
  [ "AB2", "A" ]
]
```
