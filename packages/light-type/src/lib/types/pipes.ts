/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChainableType } from '../chainable/ChainableType'
import { Context } from '../errors/IssueContext'
import { TypeInner } from './TypeInner'

export type PipeFunc<TInput = any, TOutput = any> = (
  input: TInput,
  issueContext: Context
) => TOutput

export type PipeType<TInput = any, TOutput = any> = ChainableType<
  TInput,
  TOutput
>

export type PipeElem<TInput = any, TOutput = any> =
  | PipeFunc<TInput, TOutput>
  | PipeType<TInput, TOutput>

export function createPipeFunction<TInput, TOutput>(
  t: TypeInner<TInput, TOutput>
) {
  function pipe<A extends TOutput, TFinalOutput>(
    a: PipeElem<A, TFinalOutput>
  ): ChainableType<TInput, TFinalOutput>

  function pipe<A extends TOutput, B, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, TFinalOutput>
  ): ChainableType<TInput, TFinalOutput>

  function pipe<A extends TOutput, B, C, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, TFinalOutput>
  ): ChainableType<TInput, TFinalOutput>

  function pipe<A extends TOutput, B, C, D, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, TFinalOutput>
  ): ChainableType<TInput, TFinalOutput>

  function pipe<A extends TOutput, B, C, D, E, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, E>,
    e: PipeElem<E, TFinalOutput>
  ): ChainableType<TInput, TFinalOutput>

  function pipe<A extends TOutput, B, C, D, E, F, TFinalOutput>(
    a: PipeElem<A, B>,
    b: PipeElem<B, C>,
    c: PipeElem<C, D>,
    d: PipeElem<D, E>,
    e: PipeElem<E, F>,
    f: PipeElem<F, TFinalOutput>
  ): ChainableType<TInput, TFinalOutput>

  // TODO: add more overloads 🙂

  function pipe(...funcs: PipeElem[]) {
    return new ChainableType<TInput, any>({
      parse(input, issueContext) {
        const nextInput = t.parse(input, issueContext)

        return funcs.reduce((acc, fn) => {
          if (typeof fn === 'function') {
            return fn(acc, issueContext)
          } else {
            return fn.t.parse(acc, issueContext)
          }
        }, nextInput)
      },
    })
  }

  return pipe
}
