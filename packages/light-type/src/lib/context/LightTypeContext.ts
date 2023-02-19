import { Issue } from './Issue'

export interface LightTypeContext {
  NEVER: never
  addIssue(issue: Issue): never
}
