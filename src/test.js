import firebase from 'firebase/compat/app'
import 'firebase/firestore'

const firestore = firebase.firestore()

firestore
  .collection('users')
  .doc('wR7fzDESr5KLhyd4ueHY')
  .collection('cartItems')
  .doc('wiQCzh8YAHCnBp0806wu')
