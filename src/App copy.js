import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { addTodoList, getTodoList, updateDoneList, deleteList } from "./utils/firebase/firebase.utils";
import './App.css';

const date = require('date-and-time');

const App = ()=>{
  
  const [lists, setLists] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [inputTaskDetail, setInputTaskDetail] = useState('');
  const [makeChangeToFirebaseList, setMakeChangeToFirebaseList] = useState(false);

const getFirebaseLists = async()=>{
  const retreivedLists = await getTodoList();
 // console.log('retreivedLists: ',retreivedLists);
  setMakeChangeToFirebaseList(false); // reset make change
  setLists(retreivedLists);
}

  useEffect(()=>{
    getFirebaseLists();
    console.log('effect_firstMount');
  },[])

  useEffect(()=>{
    getFirebaseLists();
    console.log('effect_addFirebaseList');
  },[makeChangeToFirebaseList])


  const addItem = (e)=>{
    e.preventDefault();
    const item = e.target.item.value;
    let detail = e.target.detail.value;
    const createdAt = new Date();
    let done = false;

    if (!detail) {
      detail = '-';
    }

    addTodoList({uid:uuidv4(),item,detail,createdAt,done})
    setInputTask('');
    setInputTaskDetail('');
    setMakeChangeToFirebaseList(true);
  }


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
    setLists(listUpdatedCheckedState)
    setMakeChangeToFirebaseList(true);
/*     updateDoneList(uid,!done)
    setMakeChangeToFirebaseList(true);
    console.log('target: ',uid); */
  }

const handleClickDeleteItem = (uid)=>{
  setLists(lists.filter((list)=>{return list.uid !== uid}))
  deleteList(uid);
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
        <form onSubmit={addItem} className='input-container'>
          <input name='item' type='text' className='item' placeholder='รายการ' value={inputTask} onChange={(e)=>setInputTask(e.target.value)} autoComplete="off"/>
          <input name='detail' type='text' className='detail' placeholder='รายละเอียด' value={inputTaskDetail} onChange={(e)=>{setInputTaskDetail(e.target.value)}} autoComplete="off"/>
          <button type='submit'>บันทึก</button>
        </form>
        <div className='list-container'>
          {lists.map((list)=>{
            const {item, detail, uid, done, createdAt} = list;
            return(
            <div className='list-item-box' key={uuidv4()}>
                <div className='list-item'>
                  <input className='list-item-chkbox' type='checkbox' onChange={()=>handleOnChange(uid)} checked={done}/>
                  <div className={`list-item--content done-${done}`}>
                    <p>{item}</p>
                    <p>{detail}</p>
                    <FontAwesomeIcon size="lg" icon={faTrash} style={{color: "#001157",cursor: 'pointer'}} onClick={()=>handleClickDeleteItem(uid)}/>
                  </div>
                </div>
                <div className='list-item-time'>
                  <div><span style={{fontSize: "0.6rem"}}>Created on </span>{`${convertDateTime(createdAt)}`}</div>
                </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}
export default App;
