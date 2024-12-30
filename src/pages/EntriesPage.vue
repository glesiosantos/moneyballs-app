<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator v-if="store.entries.length > 0">
        <q-slide-item
            @right="onEntrySlideRight($event, entry)"
            left-color="positive"
            right-color="negative"
            v-for="entry in store.entries" :key="entry.id"
          >
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section
              class="text-weight-bold"
              :class="useAmountColor(entry.amount)">
              {{entry.name}}
            </q-item-section>

            <q-item-section side
              class="text-weight-bold"
              :class="useAmountColor(entry.amount)">
              {{useCurrency(entry.amount)}}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
      <p v-else> Nenhuma entrada registrada</p>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-px-md q-py-md shadow-up-2">
        <div class="col text-grey-7 text-h6">Balanço</div>
        <div class="col text-h6 text-right"
        :class="useAmountColor(store.balance)">{{ useCurrency(store.balance) }}</div>
      </div>
      <q-form @submit.prevent="addEntryFormSubmit" class="row q-pa-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input v-model="addEntryForm.name" label="Decrição do montante" outlined dense bg-color="white"/>
        </div>
        <div class="col">
          <q-input label="Valor do montante" v-model="addEntryForm.amount" type="number" step="0.01" outlined dense bg-color="white"/>
        </div>
        <div class="col col-auto">
          <q-btn type="submit" color="primary" icon="add" round/>
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import useCurrency from '../hooks/use_currency'
import useAmountColor from '../hooks/use_amount_color'
import { useQuasar } from 'quasar'
import { useStoreEntries } from 'src/stores/storeEntries'

  const $q = useQuasar()
  const store = useStoreEntries()

  const addEntryForm = reactive({
    name: '',
    amount: null
  })

  const addEntryFormSubmit = () => {
    store.addEntry({
      name: addEntryForm.name,
      amount: Number.parseFloat(addEntryForm.amount)
    })
    addEntryForm.name = ''
    addEntryForm.amount = null
  }

  function deleteEntry (id) {
    const index = store.entries.value.findIndex(entry => entry.id === id)
    store.entries.value.splice(index, 1)
    $q.notify({
      message: 'Entry deleted on success!',
      position: 'top'
    })
  }

  const onEntrySlideRight = ({ reset }, entry) => {
    $q.dialog({
        title: 'Delete Entry',
        message: `
          Delete this entry?
          <div class="q-mt-md text-weight-bold ${useAmountColor(entry.amount)}">
              ${entry.name}: ${useCurrency(entry.amount)}
          </div>
        `,
        persistent: true,
        html: true,
        ok: {
          label: 'Delete',
          color: 'negative',
          noCaps: true
        },
        cancel: {
          color: 'primary',
          noCaps: true
        }
      }).onOk(() => {
        deleteEntry(entry.id)
      }).onCancel(() => {
        reset()
      })
  }

</script>


<!-- const balance = computed(() => {
  let total = 0
  entries.value.forEach(e => {
    total += e.amount
  })

  return total
}) -->
