import { getStorage } from '../storage'

export function hasLogin() {
  try {
    const value = getStorage('token')
    if (value) {
      return true
    }
  } catch (e) {
    // Do something when catch error
  }
}

export function isRole(
  role:
    | 'XT'
    | 'BD'
    | 'Cou'
    | 'Stat'
    | 'Stat_01'
    | 'BD_001'
    | 'Cou_001'
    | 'Stat_02'
    | 'Stat_03'
    | 'Stat_04'
    | 'XT_001_001'
    | 'XT_001_004'
    | 'XT_003_001'
    | 'XT_004_001'
    | 'XT_006_001'
    | 'XT_006_002'
    | 'XT_006_003'
    | 'XT_006_004'
    | 'XT_005_001'
    | 'XT_005_001'
    | 'Cou_001_001'
    | 'XT_001_002'
    | 'XT_001_003'
    | 'XT_002_001'
    | 'XT_002_002'
    | 'XT_003_002'
    | 'XT_004_002'
    | 'Cou_001_002'
    | 'XT_003_003'
    | 'XT_004_003'
    | 'Cou_001_003'
    | 'XT_002_003'
    | 'XT_002_004'
    | 'XT_003_004'
    | 'XT_001'
    | 'XT_002'
    | 'XT_003'
    | 'XT_004'
    | 'XT_005'
    | 'XT_006',
) {
  const roleCodes = getStorage('roleCodes')

  return new RegExp(role + ',').test(roleCodes + ',')
}
