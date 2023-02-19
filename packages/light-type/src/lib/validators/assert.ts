import { Context } from '../errors/IssueContext'

export type Assertion<T> = (input: T, issueContext: Context) => T
