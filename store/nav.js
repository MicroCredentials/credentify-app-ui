export const state = () => ({
  backUrl: '',
  title: '',
  sidebarOpen: false,
  menuItems: [
    {
      label: 'Achievements',
      url: '/achievements/',
      adminUrl: '/achievements/',
      icon: '/icons/achievements.svg'
    },
    {
      label: 'Credentials',
      url: '/credentials',
      adminUrl: '/credentials/all',
      icon: '/icons/credentials.svg'
    },
    {
      label: 'Users',
      url: '/users/requests',
      adminUrl: '/users/',
      icon: '/icons/participants.svg',
      requiredAbilities: [1014, 2010],
      number: null
    },
    {
      label: 'Institutions',
      url: '/institutions',
      adminUrl: '/institutions',
      icon: '/icons/institutions.svg'
    }
  ]
})

export const mutations = {
  setTitle(state, title) {
    state.title = title
  },
  setBackUrl(state, url) {
    state.backUrl = url
  },
  setRequests(state, number) {
    state.menuItems[2].number = number
  },
  toggleSidebar(state) {
    state.sidebarOpen = !state.sidebarOpen
  }
}

export const actions = {
  async getRequests({ commit }, data) {
    if (data) {
      commit('setRequests', data)
    } else {
      const requests = await this.$axios
        .get('/communities/requests')
        .then((res) => res.data.data)
      const pending = requests.filter((r) => r.status === 1).length
      commit('setRequests', pending)
    }
  }
}
