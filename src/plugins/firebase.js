import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCnQKVWt1DPGRtmlQ4FuW4qnKp9RKS8uNY',
  authDomain: 'expenses-34dbb.firebaseapp.com',
  databaseURL: 'https://expenses-34dbb.firebaseio.com',
  projectId: 'expenses-34dbb',
  storageBucket: 'expenses-34dbb.appspot.com',
  messagingSenderId: '374869979839'
}

const connection = Firebase.initializeApp(config)
// O acesso ao banco de dados Firebase está nessa constante
const DB = connection.database()
// Guardo em uma constante o Auth do Firebase
const AUTH = connection.auth()

// Criando um plugin Vuejs
export default function install (Vue) {
  // Incluindo uma novo propriedade no prototype do Vue
  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    }
  })
}
