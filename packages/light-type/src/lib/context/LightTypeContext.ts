import { Issue } from './Issue'

export interface LightTypeContext {
  issue(issue: Issue): void
}
