<template>
  <q-layout>
    <q-toolbar class="q-toolbar">
      <q-toolbar-title>
        Autenticação
      </q-toolbar-title>
    </q-toolbar>
    <div class="container">
      <form @submit.prevent="submit">
        <q-input
          v-model="email"
          type="email"
          stack-label="INFORME SEU EMAIL"
        />
        <q-input
          v-model="password"
          type="password"
          stack-label="INFORME SUA SENHA"
        />
        <q-btn icon="lock_open" color="primary" class="full-width">
          ACESSAR
        </q-btn>
      </form>
    </div>
  </q-layout>
</template>

<script>
  import { QLayout, QInput, QBtn, QToolbar, QToolbarTitle } from 'quasar'

  export default {
    components: { QLayout, QInput, QBtn, QToolbar, QToolbarTitle },
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      submit () {
        const { email, password } = this
        if (email !== '' && password !== '') {
          // Autentica no firebase
          this.$auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
              console.log(error)
              // let errorCode = error.code
              // let errorMessage = error.message
            })
        }
      }
    },
    mounted () {
      // Se estiver autenticado redireciona
      this.$auth.onAuthStateChanged(user => {
        if (user) {
          // Redirecionar o usuário para rota de autenticação
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
  }
</style>