// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFIoepx5ToHAoUqqpBjrvmM0bdJ1WxHKM",
    authDomain: "todolist-7d79b.firebaseapp.com",
    projectId: "todolist-7d79b",
    storageBucket: "todolist-7d79b.appspot.com",
    messagingSenderId: "858363352115",
    appId: "1:858363352115:web:9edc661c9b8771c1d87f46"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

const addTodoList = async (addedList) => {
    try {
        //const docRef = await addDoc(collection(db, `to-do-lists`), addedList);
        const docRef = await setDoc(doc(db, `to-do-lists`, addedList.uid), addedList);
        //console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getTodoList = async () => {
    let allLists = []
    const q = query(collection(db, "to-do-lists"), orderBy("done"), orderBy("createdAt"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        allLists.push(doc.data())
    });
    return allLists;
}

const deleteList = async (uid) => {
    await deleteDoc(doc(db, "to-do-lists", uid));
}

const updateDoneList = async (uid,done)=>{
    await updateDoc(doc(db, "to-do-lists", uid), {done});
}

const updateItemList = async (uid,item,detail)=>{
    await updateDoc(doc(db, "to-do-lists", uid), {item});
    await updateDoc(doc(db, "to-do-lists", uid), {detail});
}


export { addTodoList, getTodoList, deleteList, updateDoneList, updateItemList}