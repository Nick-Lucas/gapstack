import { Issue } from './Issue'

export interface LightTypeContext {
  addIssue(issue: Issue): void
}
