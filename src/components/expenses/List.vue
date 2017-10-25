<template>
  <!--
  <q-list v-show="list.length">
    <q-item v-for="expense in list" :key="expense.id" @click="toggle(expense)" separator class="cursor-pointer">
      <q-item-main>
        <q-item-tile :class="{ done: expense.done }" label>
          {{ expense.date }} - R$ {{ expense.amount }}
        </q-item-tile>
        <q-item-tile :class="{ done: expense.done }" sublabel>{{ expense.description }}</q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-btn color="red" @click.prevent="askRemove(expense)" small>Remover</q-btn>
      </q-item-side>
    </q-item>
  </q-list>
  -->
  <div>
    <q-list v-show="list.length" v-for="expense in list" :key="expense.id">
      <q-item @click="toggle(expense)" separator class="cursor-pointer">
        <q-item-main>
          <q-item-tile :class="{ done: expense.done }" label>
            {{ expense.date }} - R$ {{ expense.amount }}
          </q-item-tile>
          <q-item-tile :class="{ done: expense.done }" sublabel>{{ expense.description }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-btn color="red" @click.prevent="askRemove(expense)" small>Remover</q-btn>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QBtn,
    Dialog
  } from 'quasar'
  import { setDone } from '../../services'

  export default {
    components: { QList, QItem, QItemMain, QItemSide, QItemTile, QBtn },
    data () {
      return {}
    },
    computed: {
      list () {
        return this.$store.state.Expenses.list
      }
    },
    methods: {
      askRemove (expense) {
        const self = this
        Dialog.create({
          title: '<span style="font-size: 16px">Tem certeza que deseja excluir?</span>',
          message: '<span style="font-size: 13px">Essa operação é irreversível!</span>',
          buttons: [
            {
              label: 'Cancelar',
              handler () {
                self.expense.done = !self.expense.done
              }
            },
            {
              label: 'Confirmar',
              color: 'negative',
              handler () {
                self.remove(expense)
              }
            }
          ]
        })
      },
      remove (expense) {
        this.$store.commit('REMOVE_EXPENSE', expense)
      },
      toggle (expense) {
        expense.done = !expense.done
        setDone(expense)
      }
    }
  }
</script>

<style>
  .done {
    text-decoration: line-through;
    color: #ccc;
  }
  .mt-5 {
    margin-top: 5px;
  }
  .q-list + .q-list {
    margin-top: 10px;
  }
</style>
