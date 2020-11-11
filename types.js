export const CommunityRequestRole = {
  STUDENT: 1,
  TEACHER: 2,
  ADMIN: 3,
  CUSTOM: 4,
  NONE: 5
}

export const CommunityPermissionKinds = {
  READ: 2001,
  UPDATE: 2002,
  DELETE: 2003,
  CREATE_KEY: 2004,
  DELETE_KEY: 2005,
  CREATE_ABILITY: 2010,
  DELETE_ABILITY: 2011,
  READ_ABILITY: 2012,
  READ_KEY: 2013,
  CREATE_KEY_ABILITY: 2014,
  DELETE_KEY_ABILITY: 2015,
  CREATE_ACHIEVEMENT: 2016,
  DELETE_ACHIEVEMENT: 2017,
  UPDATE_ACHIEVEMENT: 2018,
  READ_ACHIEVEMENT: 2019,
  READ_CREDENTIAL: 2020,
  CREATE_CREDENTIAL: 2021,
  DELETE_CREDENTIAL: 2022,
  MANAGE_REQUEST_CREDENTIAL: 2023,
  FINALIZE_CREDENTIAL: 2024,
  READ_USER: 2025
}

export const admin = [
  CommunityPermissionKinds.READ,
  CommunityPermissionKinds.UPDATE,
  CommunityPermissionKinds.DELETE,
  CommunityPermissionKinds.CREATE_KEY,
  CommunityPermissionKinds.DELETE_KEY,
  CommunityPermissionKinds.CREATE_ABILITY,
  CommunityPermissionKinds.DELETE_ABILITY,
  CommunityPermissionKinds.READ_ABILITY,
  CommunityPermissionKinds.READ_KEY,
  CommunityPermissionKinds.CREATE_KEY_ABILITY,
  CommunityPermissionKinds.DELETE_KEY_ABILITY,
  CommunityPermissionKinds.CREATE_ACHIEVEMENT,
  CommunityPermissionKinds.DELETE_ACHIEVEMENT,
  CommunityPermissionKinds.UPDATE_ACHIEVEMENT,
  CommunityPermissionKinds.READ_ACHIEVEMENT,
  CommunityPermissionKinds.READ_CREDENTIAL,
  CommunityPermissionKinds.CREATE_CREDENTIAL,
  CommunityPermissionKinds.DELETE_CREDENTIAL,
  CommunityPermissionKinds.MANAGE_REQUEST_CREDENTIAL,
  CommunityPermissionKinds.FINALIZE_CREDENTIAL,
  CommunityPermissionKinds.READ_USER
]

export const teacher = [
  CommunityPermissionKinds.READ,
  CommunityPermissionKinds.CREATE_ACHIEVEMENT,
  CommunityPermissionKinds.DELETE_ACHIEVEMENT,
  CommunityPermissionKinds.UPDATE_ACHIEVEMENT,
  CommunityPermissionKinds.READ_ACHIEVEMENT
]

export const student = [
  CommunityPermissionKinds.READ,
  CommunityPermissionKinds.READ_ACHIEVEMENT
]
