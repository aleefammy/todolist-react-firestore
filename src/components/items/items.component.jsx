import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import './items.style.scss'

const Items = ({list, convertDateTime, handleClickDeleteItem, handleOnChange, handleClickEditItem})=>{
    const {item, detail, uid, done, createdAt} = list;
    return(
    <div className={`list-item-box done-bg-${done}`}>
        <div className='list-item'>
          <input className='list-item-chkbox' type='checkbox' onChange={()=>handleOnChange(uid)} checked={done}/>
          <div className={`list-item--content done-${done}`}>
            <p>{item}</p>
            <p>{detail}</p>
          </div>
          <div className='list-item-edit'>
            <FontAwesomeIcon className={`list-item-edit--pen`} icon={faPen} onClick={()=>handleClickEditItem(uid,item,detail)}/>
            <FontAwesomeIcon size="lg" icon={faTrash} onClick={()=>handleClickDeleteItem(uid)}/>
          </div>
        </div>
        <div className={`list-item-time done-${done}`}>
          <div><span style={{fontSize: "0.6rem"}}>Created on </span>{`${convertDateTime(createdAt)}`}</div>
        </div>
    </div>
    )
}

export default Items