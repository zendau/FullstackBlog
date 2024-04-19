export const useArticleSettingStore = defineStore("articleSetting", () => {
  const listTypes = [
    {
      value: "pagination",
      label: "Pagination",
    },
    {
      value: "infinity",
      label: "Infinity load",
    },
  ]

  const viewTypes = [
    {
      value: "grid",
      label: "Grid with brief information",
    },
    {
      value: "singl",
      label: "A feed with extended information",
    },
  ]

  const currentList = useLocalStorage("listType", listTypes[0].value, {
    initOnMounted: true,
  })
  const currentView = useLocalStorage("viewType", viewTypes[0].value, {
    initOnMounted: true,
  })

  return { listTypes, viewTypes, currentList, currentView }
})
