import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore'

var _0x70fb = [
  '\x41\x49\x7A\x61\x53\x79\x43\x64\x4E\x31\x4D\x33\x36\x76\x45\x4C\x72\x66\x78\x58\x55\x38\x39\x41\x79\x49\x61\x65\x55\x68\x74\x6A\x70\x38\x35\x34\x55\x70\x51',
  '\x7A\x65\x79\x6E\x65\x70\x2D\x62\x6F\x75\x74\x69\x71\x75\x65\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D',
  '\x7A\x65\x79\x6E\x65\x70\x2D\x62\x6F\x75\x74\x69\x71\x75\x65',
  '\x7A\x65\x79\x6E\x65\x70\x2D\x62\x6F\x75\x74\x69\x71\x75\x65\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D',
  '\x39\x35\x34\x35\x36\x37\x30\x31\x37\x35',
  '\x31\x3A\x39\x35\x34\x35\x36\x37\x30\x31\x37\x35\x3A\x77\x65\x62\x3A\x34\x31\x31\x31\x64\x31\x31\x37\x38\x33\x63\x33\x62\x32\x65\x65\x63\x34\x37\x66\x32\x61',
  '\x47\x2D\x54\x45\x5A\x4D\x50\x53\x47\x30\x54\x5A',
]

const firebaseConfig = {
  apiKey: _0x70fb[0],
  authDomain: _0x70fb[1],
  projectId: _0x70fb[2],
  storageBucket: _0x70fb[3],
  messagingSenderId: _0x70fb[4],
  appId: _0x70fb[5],
  measurementId: _0x70fb[6],
}
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)
