<template>
  <q-layout>
    <cc-header></cc-header>
    <div class="container">
      <form @submit.prevent="submit">
        <q-input
          ref="amount"
          v-model="expense.amount"
          type="text"
          stack-label="INFORME O VALOR"
          prefix="R$"
          :error="$v.expense.amount.$error"
          v-mask="'money'"
        />
        <q-input
          v-model="expense.description"
          type="text"
          stack-label="INFORME UMA DESCRIÇÃO"
          :error="$v.expense.description.$error"
        />
        <q-datetime
          v-model="expense.date"
          stack-label="VENCIMENTO"
          type="date"
          format="DD/MM/YYYY"
          ok-label="OK" clear-label="Limpar" cancel-label="Cancelar"
          :day-names="['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']"
          :month-names="['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']"
        />
        <q-btn icon="save" color="primary" class="full-width mb-10">
          Salvar
        </q-btn>
      </form>
      <q-btn color="red" @click="$router.push({ name: 'home' })" class="full-width">Cancelar</q-btn>
    </div>
  </q-layout>
</template>

<script>
import { QLayout, QInput, QBtn, QDatetime, date } from 'quasar'
import CcHeader from '../../../templates/header.vue'
import { required } from 'vuelidate/lib/validators'
import AwesomeMask from 'awesome-mask'
import _ from 'lodash'

export default {
  components: {
    QLayout,
    QInput,
    QBtn,
    QDatetime,
    CcHeader
  },
  directives: {
    'mask': AwesomeMask
  },
  data () {
    return {
      expense: {
        id: '',
        amount: '',
        description: '',
        date: new Date(),
        done: false
      }
    }
  },
  validations: {
    expense: {
      amount: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    submit () {
      // Verifico se existe algum erro no formulário
      this.$v.expense.$touch()
      if (this.$v.expense.$error) {
        return
      }
      // Formato a data antes de inserir no banco de dados do firebase
      this.expense.date = date.formatDate(this.expense.date, 'DD/MM/YYYY')
      // Mudamos a virgula com o ponto com a biblioteca lodash
      this.expense.amount = _.replace(this.expense.amount, ',', '.')
      // Faço a referência ao banco no firebase e dou um push no meu objeto expense
      this.$db.ref('expenses').push(this.expense)
      // Redireciono para a lista de despesas
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
  .container {
    padding: 20px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
</style>
