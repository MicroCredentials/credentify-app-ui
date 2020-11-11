export const state = () => ({
  id: 0,
  name: '',
  description: '',
  keys: [],
  addons: [],
  role: null
})

export const mutations = {
  loadInstitution(state, institution) {
    state.id = institution.id
    state.name = institution.name
    state.description = institution.description
    state.keys = institution.keys
    state.addons = institution.addons
    state.role = institution.role
  },
  addKey(state, key) {
    state.keys.push(key)
  },
  addAddon(state, addon) {
    state.addons.push(addon)
  },
  updateIntitution(state, updated) {
    state.name = updated.name
    state.description = updated.description
  }
}
