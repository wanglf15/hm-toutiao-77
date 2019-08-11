const KEY = 'hm-toutiao-77-wlf'
export default {
  // 存储用户信息
  setUser (user) {
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
