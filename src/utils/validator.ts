interface RuleType {
  require?: boolean
  error?: () => void
  pattern?: RegExp

  validator?: (val: string) => boolean
}

function validate(role: RuleType, formValue: any) {
  const tests = {
    require(value: any) {
      return Boolean(value)
    },
    pattern(reg: RegExp, value: any) {
      return reg.test(value)
    },
  }

  if (role.require) {
    return tests.require(formValue)
  }
  if (role.pattern) {
    return tests.pattern(role.pattern, formValue)
  }
  if (role.validator) {
    return role.validator(formValue)
  }
}

export default async function validator(
  rules: Record<string, RuleType | RuleType[]>,
  form: Record<string, any>,
): Promise<boolean | undefined> {
  // eslint-disable-next-line prefer-const
  for (let [field, roles] of Object.entries(rules)) {
    if (!Array.isArray(roles)) {
      roles = [roles]
    }

    const formValue = form[field]
    for (let index = 0, len = roles.length; index < len; index++) {
      const role = roles[index]

      if (validate(role, formValue) === false) {
        role.error?.()
        // 有错误将不再继续循环
        return Promise.reject(false)
      }
    }
  }
}
