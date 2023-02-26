#!/usr/bin/env sh

yarn run rimraf ../../dist/packages/light-type
yarn run tsc --project tsconfig.lib.esm.json
yarn run tsc --project tsconfig.lib.cjs.json
yarn run tsc --project tsconfig.lib.dts.json
cp *.md ../../dist/packages/light-type/
cp package.json ../../dist/packages/light-type/package.json
