# light-type

Experimental runtime type safety solution with the following goals:

* Typescript first, performant for both code-intelligence and at runtime. No compromises just for more flexibility
* Be 1-1 compatible with typescript types
* Typescript types should be inferable and have both inputs and outputs
* Integrate with tools like tRPC
* Be comfortable for a Zod user to move over from
* Don't do anything which JS/TS can do natively, like literal unions from `["foo", "bar"] as const`

New feature goals:

* Be able to "implement" a type from an un-controlled library or codegen types, in a type-safe way
* Be able to map in reverse

TODO list:

* probably more focus on being a drop-in Zod replacement as this is painful

<!-- Now -->
* Doc comments on everything
* Custom error messages for validation errors
* Allow before to be chained the same as pipe - maybe just rename to pipe?

<!-- Next -->
* Structure of classes, options:
  * Convert Chainables to store a pipeline and simply return `this`?
    * https://stackoverflow.com/questions/44204129/extending-builder-in-typescript
  * Support object-based validator chaining if it doesn't compromise performance - dedicated classes for each supported type with specially implemented versions of each method
* Object Discriminated Unions - later, they auto-discriminate just not at great runtime performance
* More validators (.assert(boolean, "message") string.regex|startsWith|endsWith|contains, arrays, sets, )

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
