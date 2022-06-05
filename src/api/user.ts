import { httpV1 } from '@/utils/http'
import type { ProfileResult, UserSubjectGroupsResult } from './model/userModel'

/**用户信息 */
export function profile(): Promise<ProfileResult> {
  return httpV1.get({
    url: '/lecture/v1/profile',
  })
}

/**用户所属科组 */
export function userSubjectGroups(): Promise<UserSubjectGroupsResult> {
  return httpV1.get({
    url: '/lecture/v1/subjectGroups',
  })
}

/**角色类型 */
export function getRoleType(): Promise<{
  role: [
    {
      /**角色类型  0：个人   1：科组   2：校领导*/
      role_type: '0' | '1' | '2'
      /**0：普通权限，1：组长权限(领导权限)*/
      power: '0' | '1'
      /**科目ID，不是必填项*/
      subject: string
    },
  ]
}> {
  return httpV1.get({
    url: '/lecture/v1/role',
  })
}
