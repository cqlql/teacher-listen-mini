import { httpV1 } from '@/utils/http'
import type { ProfileResult, UserSubjectGroupsResult } from './model/userModel'

/**用户信息 */
const api_profile = '/lecture/v1/profile'
/*  */
const api_subjectGroups = '/lecture/v1/subjectGroups'

/**用户信息 */
export function profile(): Promise<ProfileResult> {
  return httpV1.get({
    url: api_profile,
  })
}

/**用户所属科组 */
export function userSubjectGroups(): Promise<UserSubjectGroupsResult> {
  return httpV1.get({
    url: api_subjectGroups,
  })
}
