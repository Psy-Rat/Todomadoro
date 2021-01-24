export default {
  namespaced: true,
  state: {
    isOpenedDialog: false,
    dialogData: {
      date: '',
      description: '',
      projectId: ''
    },

    projects: [],
    tasks: [],
    milestones: [],
    notes: [],

    selectedTimeGroup: '',
    selectedProjectGroup: '',
  },
  getters: {
    count: state => state.count,
    isOpenedDialog: state =>
      state.dialogData.date ||
      state.dialogData.description ||
      state.dialogData.projectId,

    dialogData: state => state.dialogData,
    projects: state => state.projects,
    tasks(state) {
      let filteredProjects = []

      if (state.selectedProjectGroup === false) {
        filteredProjects = state.tasks.filter(
          task => task.projectId === state.projects.id
        )
      } else if (typeof state.selectedProjectGroup === 'string') {
        filteredProjects = state.tasks.filter(
          task => task.projectId === state.selectedProjectGroup
        )
      } else {
        filteredProjects = state.tasks
      }

      let d = new Date()
      let tomorow = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + 1
      ).getTime()
      let day2 = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + 2
      ).getTime()

      d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
      let nextMonday = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + 7
      ).getTime()

      switch (state.selectedTimeGroup) {
        case 0:
          filteredProjects = filteredProjects.filter(
            task => task.date <= tomorow
          )
          break
        case 1:
          filteredProjects = filteredProjects.filter(
            task => task.date >= tomorow && task.date <= day2
          )
          break
        case 2:
          filteredProjects = filteredProjects.filter(
            task => task.isWeekly && task.date <= nextMonday
          )
          break
        case 3:
          filteredProjects = filteredProjects.filter(
            task => task.date == undefined
          )
          break
      }

      return filteredProjects
    },
    selectedProjectGroup: state => state.selectedProjectGroup
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setDialog(state, dialogData = {}) {
      state.dialogData = dialogData
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setProjectGroup(state, selectedProjectGroup) {
      state.selectedProjectGroup = selectedProjectGroup
    },
    setTimeGroup(state, selectedTimeGroup) {
      state.selectedTimeGroup = selectedTimeGroup
    }
  },
  actions: {
    /**
     * Эта хуйня нужна только для адекватной разработки фронта с liveReload'ом
     * просто импортирую json-чик на dev моде
     */
    init(context) {
      let dataFetcher
      if (process.env.NODE_ENV === 'production') {
        dataFetcher = this.$api.getFakeInitData({ args: { userId: 'me' } })
      } else {
        dataFetcher = import('../../../../backend/services/data.json')
      }

      dataFetcher.then(data => {
        let projects = data.projects || []
        let tasks = data.tasks || []
        context.commit('setProjects', projects)
        context.commit('setTasks', tasks)
      })
    }
  }
}
