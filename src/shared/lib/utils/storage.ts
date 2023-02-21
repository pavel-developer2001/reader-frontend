export const storage = {
  setItem: (name: string, item: unknown) => {
    window.localStorage.setItem(name, JSON.stringify(item))
  },
  getItem: (name: string) => {
    const item = typeof window !== "undefined" && localStorage.getItem(name)
    if (item) {
      return JSON.parse(item)
    }
  },
}
