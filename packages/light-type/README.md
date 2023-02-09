# light-type

Experimental runtime type safety solution with the following goals:

* Be highly performant at both compile-time and run-time. No compromises just for more flexibility
* Be 1-1 compatible with typescript types
* Typescript types should be inferable and have both inputs and outputs
* Meet the interface expected by popular tools like tRPC
* Be type-safe when building types from un-controlled library or codegen types
