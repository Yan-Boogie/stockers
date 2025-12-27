// @flow

export const STORE_USER_MODULES = 'USER/STORE_USER_MODULES';

export function storeUserModules(modules) {
  return {
    type: STORE_USER_MODULES,
    modules,
  };
}
