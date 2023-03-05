#!/usr/bin/env sh

../../node_modules/.bin/tsc -p tsconfig.benchmarks.json --noEmit --incremental false --jsx react-jsx --allowSyntheticDefaultImports --generateTrace ./.trace
