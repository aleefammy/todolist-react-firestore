import './listOfItems.style.scss'
import Items from '../items/items.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { v4 as uuidv4 } from 'uuid';

const ListOfItems = ({lists, showHide, convertDateTime, handleClickDeleteItem, handleOnChange, handleClickEditItem})=>{

  const createModLists = (lists, showHide)=>{
    if (showHide === faEye) {
      return lists
    } else {
      return lists.filter((list)=>{return !list.done})
    }
  }

    return(
     <div className='list-container'>    
            {createModLists(lists, showHide).map((list)=>{
              return (
                <Items 
                    list={list}
                    convertDateTime={convertDateTime}
                    handleClickDeleteItem={handleClickDeleteItem}
                    handleOnChange={handleOnChange}
                    handleClickEditItem={handleClickEditItem}
                    key={uuidv4()}
                />)})}
      </div>
    )
}

export default ListOfItems