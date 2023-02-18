/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChainableType } from './ChainableType'
import { ChainableArray } from './ChainableArray'
import { ChainableObject } from './ChainableObject'
import { LightType } from '../types/LightType'
import { TypeInner } from '../types/TypeInner'
import { LiteralBase } from '../types/utils'

export type PipeFunc<TInput = any, TOutput = any> = (input: TInput) => TOutput

export type PipeType<TInput = any, TOutput = any> = LightType<TInput, TOutput>

export type PipeElem<TInput = any, TOutput = any> =
  | PipeFunc<LiteralBase<TInput>, TOutput>
  | PipeType<LiteralBase<TInput>, TOutput>

export function createPipeFunction<TInput, TOutput>(
  t: TypeInner<TInput, TOutput>
) {
  function pipe<
    A extends TOutput,
    TFinalOutput,
    TFinalPipeElem extends PipeElem<A, TFinalOutput>
  >(
    a: TFinalPipeElem
  ): TFinalPipeElem extends PipeType<unknown, unknown>
    ? TFinalPipeElem
    : ChainableType<TInput, TFinalOutput>

  function pipe<
    A extends TOutput,
    B,
    TFinalOutput,
    TFinalPipeElem extends PipeElem<B, TFinalOutput>
  >(
    a: PipeElem<A, B>,
    b: TFinalPipeElem
  ): TFinalPipeElem extends PipeType<unknown, unknown>
    ? TFinalPipeElem
    : ChainableType<TInput, TFinalOutput>

  function pipe<
    A extends TOutput,
    B,
    C,
    TFinalOutput,
    TFinalPipeElem extends PipeElem<C, TFinalOutput>
  >(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: TFinalPipeElem
  ): TFinalPipeElem extends PipeType<unknown, unknown>
    ? TFinalPipeElem
    : ChainableType<TInput, TFinalOutput>

  function pipe<
    A extends TOutput,
    B,
    C,
    D,
    TFinalOutput,
    TFinalPipeElem extends PipeElem<D, TFinalOutput>
  >(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: TFinalPipeElem
  ): TFinalPipeElem extends PipeType<unknown, unknown>
    ? TFinalPipeElem
    : ChainableType<TInput, TFinalOutput>

  function pipe<
    A extends TOutput,
    B,
    C,
    D,
    E,
    TFinalOutput,
    TFinalPipeElem extends PipeElem<E, TFinalOutput>
  >(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, E>,
    e: TFinalPipeElem
  ): TFinalPipeElem extends PipeType<unknown, unknown>
    ? TFinalPipeElem
    : ChainableType<TInput, TFinalOutput>

  function pipe<
    A extends TOutput,
    B,
    C,
    D,
    E,
    F,
    TFinalOutput,
    TFinalPipeElem extends PipeElem<F, TFinalOutput>
  >(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, E>,
    e: PipeElem<E, F>,
    f: TFinalPipeElem
  ): TFinalPipeElem extends PipeType<unknown, unknown>
    ? TFinalPipeElem
    : ChainableType<TInput, TFinalOutput>

  // TODO: add more overloads 🙂

  function pipe(...funcs: PipeElem[]) {
    const last = funcs[funcs.length - 1]

    const tNext: TypeInner<TInput, any> = {
      parse(input) {
        const nextInput = t.parse(input)

        return funcs.reduce((acc, fn) => {
          if (typeof fn === 'function') {
            return fn(acc)
          } else {
            return fn.parse(acc)
          }
        }, nextInput)
      },
    }

    if (typeof last === 'function' || last instanceof ChainableType) {
      return new ChainableType<TInput, any>(tNext)
    }
    if (last instanceof ChainableObject) {
      //
    }
    if (last instanceof ChainableArray) {
      //
    }

    throw new Error(
      `LightType Pipe instantiation error. Expected function or ${
        ChainableType.name
      }, received ${typeof last}`
    )
  }

  return pipe
}
