<template>
  <div>
    <q-list v-show="list.length" v-for="expense in orderedList" :key="expense.id">
      <q-item @click="toggle(expense)" separator class="cursor-pointer">
        <q-item-main>
          <q-item-tile :class="{ done: expense.done }" label>
            {{ expense.date }} - R$ {{ expense.amount.replace('.', ',') }}
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
  import _ from 'lodash'

  export default {
    components: { QList, QItem, QItemMain, QItemSide, QItemTile, QBtn },
    props: ['list'],
    computed: {
      orderedList: function () {
        return _.orderBy(this.list, 'date', 'desc')
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
              label: 'Cancelar'
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
        // Pego uma referência e acesso um determinado registro
        // Paço a função remove() do firebase para remover o registro
        this.$db.ref(`expenses/${expense.id}`).remove() // string ES2015
      },
      toggle (expense) {
        expense.done = !expense.done
        this.$db.ref(`expenses/${expense.id}`).update(expense)
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
