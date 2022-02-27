import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: 'AIzaSyCdN1M36vELrfxXU89AyIaeUhtjp854UpQ',
  authDomain: 'zeynep-boutique.firebaseapp.com',
  projectId: 'zeynep-boutique',
  storageBucket: 'zeynep-boutique.appspot.com',
  messagingSenderId: '9545670175',
  appId: '1:9545670175:web:4111d11783c3b2eec47f2a',
  measurementId: 'G-TEZMPSG0TZ',
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
