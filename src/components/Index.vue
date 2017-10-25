<template>
  <q-layout ref="layout" slot="layout">
    <cc-header></cc-header>
    <div class="container">
      <q-btn class="full-width" color="green" icon="note_add" @click="$router.push({name: 'add'})">Nova Despesa</q-btn>
      <hr v-show="list.length > 0">
      <cc-list v-if="list.length"></cc-list>
      <q-alert
        v-else
        color="info"
        icon="payment"
        enter="bounceInLeft"
        leave="bounceOutRight"
        class="mt-20"
      >
        Nenhuma despesa cadastrada!
      </q-alert>
    </div>
  </q-layout>
</template>

<script>
import { QLayout, QBtn, QAlert, QSideLink } from 'quasar'
import CcForm from './expenses/Form.vue'
import CcList from './expenses/List.vue'
import CcHeader from '../../templates/header.vue'
import { getExpenses } from '../services'

export default {
  components: {
    QLayout,
    QBtn,
    QAlert,
    QSideLink,
    CcForm,
    CcList,
    CcHeader
  },
  mounted () {
    this.$store.commit('SET_EXPENSES', getExpenses())
  },
  computed: {
    list () {
      return this.$store.state.Expenses.list
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 20px;
  }

  .mt-20 {
    margin-top: 20px;
  }
</style>
