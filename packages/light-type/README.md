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

* .extend should accept a record type (implement .and if necessary)
* Object Unions / Discriminated Unions
* Support type unions like .union([string, number])
* Support literal strings being passed directly as types without wrapping in .literal([])
* Support object-based validator chaining if it doesn't compromise performance - dedicated classes for each supported type
* String Template Literals
* Set up Compiler benchmarks
* Set up Runtime benchmarks
* Permit Parse to receive Unknown types
* .partial("deep" | "shallow")
* .required("deep" | "shallow")
* More Validators (string.regex, arrays, sets, )
* Calculated values
* Allow "after" to receive a optional type parameter. Make "before" optional too
* Bundled before/after parsers or a recommended library/pattern
  * ISO Date parsing
