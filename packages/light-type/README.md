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

* Value Preprocessing
* Value Postprocessing
* Calculated values
* Value coersion
* Object Unions / Discriminated Unions
* Tuple type
* Maps & Sets
* ISO Date parsing
* .partial("deep" | "shallow")
* .required("deep" | "shallow")
* Validators (min, max, length, string.regex, )
* String Template Literals
