import React from 'react'
import {useState} from 'react'
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToPastes, updateToPastes } from "../store/pasteSlice";

const Home = () => {
    const [title ,setTitle] = useState('')
    const [value ,setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteid");
    const dispatch = useDispatch();

function createPaste(){
    const paste={
        title:title,
        content:value,
        _id:pasteId ||
              Date.now().toString(36),
              createdAt: new Date().toISOString(),
    }

    if(pasteId){ 
        // update
        dispatch(updateToPastes(paste));
        toast.success("Paste updated successfully");

    }else{
        // create
        dispatch(addToPastes(paste));
        toast.success("Paste created successfully");
    }

    // after creation and updation 
    setTitle('');
    setValue('');
    setSearchParams({});
}

  return (
    <div>
    <div className='flex flex-row gap-7'>
       <input
       id="title"
       name="title"
       className='p-2 rounded-2xl mt-2 w-[70%] pl-4'
       type="text"
       placeholder="Enter your note..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
        />

        <button
        onClick={createPaste} 
        className='p-2 rounded-2xl mt-2'>
            {
                pasteId ? "Update My Paste" : "Create My Paste"
            }
        </button>
    </div>
    <div>
         <textarea 
         id="content"
         name="content"
         className='rounded-2xl mt-2 p-4 min-w-[500] min-h-[300]'
         value={value}
         onChange={(e) => setValue(e.target.value)}
         placeholder="Enter your note..."
         rows={25}
         />
    </div>
    </div>
  )
}

export default Home
 