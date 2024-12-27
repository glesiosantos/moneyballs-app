<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
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
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-px-md q-py-md shadow-up-2">
        <div class="col text-grey-7 text-h6">Balanço</div>
        <div class="col text-h6 text-right"
        :class="useAmountColor(balance)">{{ useCurrency(balance) }}</div>
      </div>
      <div class="row q-pa-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input label="Decrição do montante" outlined dense bg-color="white"/>
        </div>
        <div class="col">
          <q-input label="Valor do montante" type="number" step="0.01" outlined dense bg-color="white"/>
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" round/>
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useCurrency from '../hooks/use_currency'
import useAmountColor from '../hooks/use_amount_color'
import { computed } from 'vue';

const entries = ref([
  {
    id: 1,
    name: 'Salario',
    amount: 3500
  },
  {
    id: 2,
    name: 'Escola da Yasmin',
    amount: -650
  },
  {
    id: 3,
    name: 'Natação da Yasmin',
    amount: -85
  },
  {
    id: 4,
    name: 'Conserto do carro',
    amount: -3000
  },
  {
    id: 5,
    name: 'Venda de Site',
    amount: 5000
  }
])

  const balance = computed(() => {
    return entries.value.reduce((accumulator, {amount}) => {
      return accumulator + amount
    }, 0)
  })

</script>


<!-- const balance = computed(() => {
  let total = 0
  entries.value.forEach(e => {
    total += e.amount
  })

  return total
}) -->
