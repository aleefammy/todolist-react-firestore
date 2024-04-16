import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; */
import './formTask.style.scss';

const FormTask = ({handleOnSubmit, clearForm, mode, inputTask, inputTaskDetail ,setInputTask, setInputTaskDetail, uidText, showHide, toggleShowHide})=>{

  const handleOnClickCancel = (e)=>{
      e.preventDefault();
      clearForm();
  }
    return(
        <form onSubmit={(e)=>{handleOnSubmit(mode,e);}} className='input-container'>
            <input name='uidText' type='text' defaultValue={uidText} hidden/>
            <input name='item' type='text' className='item' placeholder='รายการ' value={inputTask} onChange={(e)=>setInputTask(e.target.value)} autoComplete="off"/>
            <input name='detail' type='text' className='detail' placeholder='รายละเอียด' value={inputTaskDetail} onChange={(e)=>{setInputTaskDetail(e.target.value)}} autoComplete="off"/>
            <div className='controller'>
              <FontAwesomeIcon icon={showHide} size='2xl' style={{color:'#EFECEC', cursor:'pointer'}} onClick={()=>{toggleShowHide(showHide)}}/>
              <button type='submit'>บันทึก</button>
              <button type='cancel' onClick={(e)=>handleOnClickCancel(e)}>ยกเลิก</button>
            </div>  
        </form>
    )
}

export default FormTask