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
        <q-btn icon="save" color="primary" class="full-width">
          Salvar
        </q-btn>
      </form>
    </div>
  </q-layout>
</template>

<script>
import { QLayout, QInput, QBtn, QDatetime, uid, date } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import CcHeader from '../../../templates/header.vue'
import AwesomeMask from 'awesome-mask'

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
      this.$v.expense.$touch()
      if (this.$v.expense.$error) {
        // Alert.create({html: 'Por favor preencha os campos!'})
        return
      }
      // Para clonar o objeto para que ele não seja subscrito
      const cloned = JSON.parse(JSON.stringify(this.expense))
      cloned.id = uid()
      cloned.date = date.formatDate(this.expense.date, 'DD/MM/YYYY')
      this.$store.commit('ADD_EXPENSE', cloned)
      this.reset()
      this.$router.push({path: '/'})
    },
    reset () {
      this.expense.amount = ''
      this.expense.description = ''
      this.expense.date = new Date()
      // Informa que o focus vai para o input amount
      // this.$refs.amount.focus()
    }
  }
}
</script>

<style>
  .container {
    padding: 20px;
  }
</style>
