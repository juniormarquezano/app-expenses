<template>
  <q-toolbar slot="header">
    <q-toolbar-title>
      Despesas em Dinheiro Vivo
    </q-toolbar-title>
    <q-btn @click="logout" flat>
      <q-icon name="exit_to_app" />
    </q-btn>
  </q-toolbar>
</template>

<script>
  import { QToolbar, QToolbarTitle, QBtn, QIcon } from 'quasar'

  export default {
    components: {
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon
    },
    methods: {
      logout () {
        this.$auth.signOut()
      }
    }
  }
</script>

<style scoped>
</style>