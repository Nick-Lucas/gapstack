# light-type

Experimental runtime type safety solution with the following goals:

* Be highly performant at both compile-time and run-time. No compromises just for more flexibility
* Be 1-1 compatible with typescript types
* Typescript types should be inferable and have both inputs and outputs
* Integrate with tools like tRPC
* Be comfortable for a Zod user to move over from
* Don't do anything which JS/TS can do natively, like literal unions from `["foo", "bar"] as const`

New feature goals:

* Be able to "implement" a type from an un-controlled library or codegen types, in a type-safe way
* Be able to map in reverse

TODO list:

* Support validator chaining - right now only one can be added at a time
* .default and .optional should make the property optional like `abc?: number`, not *just* undefined
* .extend should accept a record type (implement .and if necessary)
* Object Unions / Discriminated Unions
* Support type unions like .union([string, number])
* Support literal strings being passed directly as types without wrapping in .literal([])
* Permit Parse to receive Unknown types
* String Template Literals
* Set up Compiler benchmarks
* Set up Runtime benchmarks
* .partial("deep" | "shallow")
* .required("deep" | "shallow")
* Validators (string.regex)
* Calculated values
* Allow "after" to receive a optional type parameter. Make "before" optional too
* Bundled before/after parsers or a recommended library/pattern
  * ISO Date parsing
