sACNMergeLib is a javascript library to merge streams of streaming ACN to determine the values that should be output onto the DMX line. To use, first build following the directions below. Then include the resulting bundle file from the dist folder and call the `merge` function from it. See the example page for more details.

# About this ETCLabs Project

sACNMergeLib is designed to interact with ETC products, but it is not official ETC software. For challenges using, integrating, compiling, or modifying items in this project, we encourage posting on the Issues page. sACNMergeLib is a community-supported initiative, and the community is the best place to ask for help!

# Getting Started

## What you need

NodeJS (for NPM) [verison 10.x](https://nodejs.org/en/)

## Setting it up
```
git clone https://github.com/ETClabs/sACNMergeLib
cd sACNMergeLib
npm install
```

## Files

`./src/mergelib.js`: example implementation of the logic

`./test/mergelib.spec.js`: unit tests

`./example`: An example HTML page calling into the lib

## Build Targets

You can run any of the build targets running `npm run <target>`

### Targets

`test`: Run the unit tests and generate code coverage reports

`dist`: Creates the distribution of the module

`doc`: Generate HTML for JSDoc

`lint`: Runs the linter and generates a report

`lintFix`: Attempts to fix linting errors

`build`: Runs the linting, tests, build docs, and creates distribution
