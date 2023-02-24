# light-type

Experimental runtime type safety solution with the following goals:

* Typescript first, performant for both code-intelligence and at runtime. If Typescript can do something natively, prefer utilising that.
* Be 1-1 compatible with typescript type system
* Types should be inferable and have both inputs and outputs
* Integrate well with tools like tRPC
* Be comfortable for a Zod user to move over from, most features should be a drop-in replacement

This project is very much a work in progress, the TODOs are even on this readme to prove it!

```sh
# Choose your package manager
npm install @gapstack/light-type
yarn add @gapstack/light-type
pnpm add @gapstack/light-type
```

### Usage:

```ts
// Most APIs are the same as zod
import { lt } from '@gapstack/light-type'

// Basic types are essentially identical
const obj = lt.object({
  num: lt.number().default(0),
  str: lt.string().optional(),
  bool: lt.boolean(),
  literal: lt.literal('foo')
})

// These are all essentially the same but with much better editor performance
const maskedObject = obj.merge().extend().omit().pick()

//
// Others have been consolidated or changed

// lt.pipe replaces `.preprocess` and accepts an arbitrary chain of functors/types
lt.pipe(unknownValue => String(unknownValue), lt.string())

// pipe also replaces .transform and the .refine family. it's the same as lt.pipe for usage
lt.string().pipe()

// Pipe can also raise validation errors, which will get aggregated up and throw by .parse
lt.string().pipe((numStr, ctx) => {
  const num = parseInt(numStr)
  if (!isNaN(num)) {
    return num
  }

  ctx.addIssue({
    // There are some pre-set type literals but you can pass any string
    type: 'custom_nan',
    message: 'Custom NaN Error',
    value: numStr
  })
})

// Some pipe validators are bundled out of the box
import { assert, strings, numbers } from '@gapstack/light-type/src/lib/validators'
lt.string().pipe(assert(v => v === "test", "String should have been 'test'"))

// .parse is the same
lt.string().parse("Hello world")

// But .check is new and works the same, except it's statically typed with the input
lt.string().check("Check knows this is a string")

// Also .satisfiesInput is new for when you're building for compatibility with types you don't control
lt.string().satisfiesInput<number>() // compile-error
```

There are some features missing still which are important. See the todo list below for information.



# TODO list:

<!-- Now -->
* Documentation
* Custom error messages for validation errors


<!-- Next -->
* strict and passthrough methods
* Structure of classes, options:
  * Convert Chainables to store a pipeline and simply return `this`?
    * https://stackoverflow.com/questions/44204129/extending-builder-in-typescript
  * Support object-based validator chaining if it doesn't compromise performance - dedicated classes for each supported type with specially implemented versions of each method
* Look at alternative merge/extends patterns, given benchmark differences with "spread" on merge/extend
* Object Discriminated Unions - later, they auto-discriminate just not at great runtime performance

<!-- After Next -->
* .extend should accept a record type (implement .and if necessary)
  * maybe implement .and?
  * maybe implement .open to 'open' a type for extension?
* String Template Literals
* Set up Runtime benchmarks
  * Consider changing all chainable methods to prototype methods if performance can be improved
* .partial("deep" | "shallow")
* .required("deep" | "shallow")
* Calculated values
* Bundled parsers or a recommended library/pattern
  * ISO Date parsing

Docs on performance:
- https://github.com/microsoft/TypeScript/wiki/Performance
