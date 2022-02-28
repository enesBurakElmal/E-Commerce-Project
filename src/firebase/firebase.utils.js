import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

var _0x70fb = [
  '\x41\x49\x7A\x61\x53\x79\x43\x64\x4E\x31\x4D\x33\x36\x76\x45\x4C\x72\x66\x78\x58\x55\x38\x39\x41\x79\x49\x61\x65\x55\x68\x74\x6A\x70\x38\x35\x34\x55\x70\x51',
  '\x7A\x65\x79\x6E\x65\x70\x2D\x62\x6F\x75\x74\x69\x71\x75\x65\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D',
  '\x7A\x65\x79\x6E\x65\x70\x2D\x62\x6F\x75\x74\x69\x71\x75\x65',
  '\x7A\x65\x79\x6E\x65\x70\x2D\x62\x6F\x75\x74\x69\x71\x75\x65\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D',
  '\x39\x35\x34\x35\x36\x37\x30\x31\x37\x35',
  '\x31\x3A\x39\x35\x34\x35\x36\x37\x30\x31\x37\x35\x3A\x77\x65\x62\x3A\x34\x31\x31\x31\x64\x31\x31\x37\x38\x33\x63\x33\x62\x32\x65\x65\x63\x34\x37\x66\x32\x61',
  '\x47\x2D\x54\x45\x5A\x4D\x50\x53\x47\x30\x54\x5A',
]
const config = {
  apiKey: _0x70fb[0],
  authDomain: _0x70fb[1],
  projectId: _0x70fb[2],
  storageBucket: _0x70fb[3],
  messagingSenderId: _0x70fb[4],
  appId: _0x70fb[5],
  measurementId: _0x70fb[6],
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
