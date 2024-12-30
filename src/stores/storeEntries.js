import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStoreEntries = defineStore('entries', () => {

  // state
  const entries = ref([])

  // getters
  const balance = computed(() => {
    return entries.value.reduce((accumulator, {amount}) => {
      return accumulator + amount
    }, 0)
  })

  //action
  const addEntry = addEntryForm => {
    const id = entries.value.length + 1
    const entry = Object.assign({}, addEntryForm, { id })
    entries.value.push(entry)
  }

  const removeEntry = (entry) => {
    const index = entries.value.findIndex(e => e.id === entry.id)
    entries.value.splice(index, 1)
  }

  return {entries, addEntry, removeEntry, balance}
})


// const balance = computed(() => {
//   let total = 0
//   entries.value.forEach(e => {
//     total += e.amount
//   })

//   return total
// })
