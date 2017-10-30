<template>
  <q-layout ref="layout">
    <cc-header></cc-header>
    <div class="container">
      <q-btn class="full-width" color="green" icon="note_add" @click="$router.push({name: 'add'})">Nova Despesa</q-btn>
      <hr v-show="list.length > 0">
      <cc-list :list="list" v-if="list.length"></cc-list>
      <div v-else>
        <q-alert
          color="info"
          icon="payment"
          enter="bounceInLeft"
          leave="bounceOutRight"
          class="mt-20"
        >
          Nenhuma despesa cadastrada!
        </q-alert>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { QLayout, QBtn, QAlert, QSideLink, QItemMain } from 'quasar'
import CcList from './expenses/List.vue'
import CcHeader from '../../templates/header.vue'
import _ from 'lodash'

export default {
  components: {
    QLayout,
    QBtn,
    QAlert,
    QSideLink,
    CcList,
    CcHeader,
    QItemMain
  },
  data () {
    return {
      list: [] // Propriedade Pai
    }
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (!user) {
        // Redirecionar o usuário para rota de autenticação
        this.$router.push({ name: 'auth' })
      }
    })
    // Faz a referência ao banco no firebase
    // Escuta ao evento value .on('value', data => {})
    this.$db.ref('expenses').on('value', data => {
      // Para ter acesso as informações
      const obj = data.val()
      // map (lodash) transforma um objeto em um array javascript para colocar na list
      // para passar ao componente
      this.list = _.map(obj, (expense, index) => {
        // index corresponde a cada Id do objeto (registro) vindo do firebase
        // Atribui esse Id ao expense.id
        expense.id = index
        return expense
      })
    })
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
