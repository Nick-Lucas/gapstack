/* eslint-disable @typescript-eslint/no-explicit-any */

import { LtType } from '../chainable/LtType'
import { LightTypeContext } from '../context/LightTypeContext'
import { LightType } from './LightType'
import { TypeInner } from './TypeInner'
import { SoftenInput } from './utils'

export type PipeFunc<TInput = any, TOutput = any> = (
  input: TInput,
  ctx: LightTypeContext
) => TOutput

export type PipeType<TInput = any, TOutput = any> = LightType<TInput, TOutput>

export type PipeElem<TInput = any, TOutput = any> =
  | PipeFunc<TInput, TOutput>
  | PipeType<SoftenInput<TInput>, TOutput>

export function createPipeFunction<TInitialInput, TInitialOutput>(
  t: TypeInner<TInitialInput, TInitialOutput>
) {
  function pipe<A extends TInitialOutput, TFinalOutput>(
    a: PipeElem<A, TFinalOutput>
  ): LtType<TInitialInput, TFinalOutput>

  function pipe<A extends TInitialOutput, B, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, TFinalOutput>
  ): LtType<TInitialInput, TFinalOutput>

  function pipe<A extends TInitialOutput, B, C, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, TFinalOutput>
  ): LtType<TInitialInput, TFinalOutput>

  function pipe<A extends TInitialOutput, B, C, D, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, TFinalOutput>
  ): LtType<TInitialInput, TFinalOutput>

  function pipe<A extends TInitialOutput, B, C, D, E, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, E>,
    e: PipeElem<E, TFinalOutput>
  ): LtType<TInitialInput, TFinalOutput>

  function pipe<A extends TInitialOutput, B, C, D, E, F, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, E>,
    e: PipeElem<E, F>,
    f: PipeElem<F, TFinalOutput>
  ): LtType<TInitialInput, TFinalOutput>

  // TODO: add more overloads 🙂

  function pipe(...funcs: PipeElem[]) {
    return new LtType<TInitialInput, any>({
      parse(input, ctx) {
        const nextInput = t.parse(input, ctx)

        return funcs.reduce((acc, fn) => {
          if (typeof fn === 'function') {
            return fn(acc, ctx)
          } else {
            return fn._t.parse(acc, ctx)
          }
        }, nextInput)
      },
    })
  }

  return pipe
}
