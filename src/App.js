import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { addTodoList, getTodoList, updateDoneList, deleteList, updateItemList} from "./utils/firebase/firebase.utils";
import './App.css';
import FormTask from './components/form-task/formTask.components';
import ListOfItems from './components/list-of-items/listOfItems.components';

const date = require('date-and-time');

const App = ()=>{

  const [lists, setLists] = useState([]);
  const [uidText, setUidText] = useState('');
  const [inputTask, setInputTask] = useState('');
  const [inputTaskDetail, setInputTaskDetail] = useState('');
  const [showHide, setShowHide] = useState(faEye);
  const [mode, setMode] = useState('add');
  

const getFirebaseLists = async()=>{
  const retreivedLists = await getTodoList();
 // console.log('retreivedLists: ',retreivedLists);
  setLists(retreivedLists);
  console.log('getFirebaseLists was called');
}

  useEffect(()=>{
    getFirebaseLists();
    console.log('effect_firstMount');
  },[])


  const handleOnChange = (uid) => {
    const listUpdatedCheckedState = lists.map(list=>
      {
        if (list.uid === uid) {
        //list.done = !list.done // avoid assign value directly to the state use set...instead to ensure component will re-render
          updateDoneList(uid,!list.done)
          return {...list, done: !list.done};
        }else{
          return list
        }
      }
    )
    setLists(listUpdatedCheckedState);
    setTimeout(()=>{
      getFirebaseLists();
    },500)
  }

  const handleOnSubmit = (mode,e)=>{
    if (mode==='add') {
      addItem(e);
    } else if (mode==='edit') {
      editItem(e);
    } else {
      //after submit switch back to add mode
      console.log('error handelOnSubmit');
    }
  }


const handleClickDeleteItem = (uid)=>{
  setLists(lists.filter((list)=>{return list.uid !== uid}))
  deleteList(uid);
}

const handleClickEditItem = (uid,item,detail)=>{
  setMode('edit');
  window.scrollTo({
    top: 0, 
    left: 0, 
    behavior: 'smooth' 
   });
   //window.scrollTo(0,0)
   setUidText(uid)
   setInputTask(item)
   setInputTaskDetail(detail)
/*    setTimeout(() => {
     console.log(`uid:${uid}, item:${item}, detail:${detail} mode:${mode}`);
   }, 500); */
}

const addItem = async(e)=>{
    e.preventDefault();
    const uid = uuidv4();
    const item = e.target.item.value;
    let detail = e.target.detail.value;
    const createdAt = new Date();
    let done = false;

    if (!detail) {
      detail = '-';
    }

    await addTodoList({uid,item,detail,createdAt,done})
    clearForm();
  }

const editItem = async(e)=>{
  e.preventDefault();
  const uid = e.target.uidText.value
  const item = e.target.item.value
  const detail = e.target.detail.value
  /* console.log(`EDITITEM___uid:${uid}, item:${item}, detail:${detail}`); */
  await updateItemList(uid,item,detail)
  clearForm();
}

const clearForm = ()=>{
  setUidText('')
  setInputTask('');
  setInputTaskDetail('');
  setMode('add')
  getFirebaseLists();
 // console.log('clearForm');
}

const toggleShowHide = (showHide)=>{
  if (showHide === faEye) {
    setShowHide(faEyeSlash)
  } else {
    setShowHide(faEye)
  }
}

const convertDateTime = (dateTime) =>{
  const now = new Date()
  const dateTimejs = dateTime.toDate()

  const yesterdayRef = date.format(date.addDays(now, -1), 'DD/MM/YYYY');
  const dateText = date.format(dateTimejs, 'DD/MM/YYYY');
  const timeText = date.format(dateTimejs, 'h:mm A');

  if (date.isSameDay(now, dateTimejs)) {
    return `Today ${timeText}`
  } else if (dateText === yesterdayRef) {
    return `Yesterday ${timeText}`
  }else{
    return `${dateText} ${timeText}`
  }
}

  return(
    <div className='App'>
      <div className='header'><h1 style={{color:"#EFECEC"}}>To Do List</h1></div>
      <div className='content-container'>
      <FormTask 
        mode={mode}
        uidText={uidText}
        inputTask={inputTask}
        inputTaskDetail={inputTaskDetail}
        showHide={showHide}
        handleOnSubmit={handleOnSubmit}
        setInputTask={setInputTask}
        setInputTaskDetail={setInputTaskDetail}
        getFirebaseLists={getFirebaseLists}
        clearForm={clearForm}
        toggleShowHide={toggleShowHide}
      />
      <ListOfItems 
        lists={lists}
        showHide={showHide}
        convertDateTime={convertDateTime}
        handleClickDeleteItem={handleClickDeleteItem}
        handleOnChange={handleOnChange}
        handleClickEditItem={handleClickEditItem}
      />
      </div>
    </div>
  )
}
export default App;
