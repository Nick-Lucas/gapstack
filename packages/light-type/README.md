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

* probably more focus on being a drop-in Zod replacement is painful
* Convert Chainables to store a pipeline and simply return `this` but cast to the new generic type? Check performance impact!
  * Support object-based validator chaining if it doesn't compromise performance - dedicated classes for each supported type
* Object Discriminated Unions - later, they auto-discriminate just not at great runtime performance
* Custom error messages for validation errors
* String Template Literals
* Set up Runtime benchmarks
  * Consider changing all chainable methods to prototype methods if performance can be improved
* .extend should accept a record type (implement .and if necessary)
  * maybe implement .and?
  * maybe implement .open to 'open' a type for extension?
* Permit Parse to receive Unknown types
* .partial("deep" | "shallow")
* .required("deep" | "shallow")
* More validators (.assert(boolean, "message") string.regex|startsWith|endsWith|contains, arrays, sets, )
* Calculated values
* Allow "after" to receive a optional type parameter. Make "before" optional too
* Bundled before/after parsers or a recommended library/pattern
  * ISO Date parsing

Docs on performance:
- https://github.com/microsoft/TypeScript/wiki/Performance
