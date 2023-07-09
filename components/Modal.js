import React, { useState, useEffect } from "react";
import ReactDom from "react-dom" 

export default function Modal(props) {
  const { setOpenModal } = props
  const [_document, set_document] = useState(null)
  useEffect(() => {
    set_document(document);
  }, [])
  if (!_document) {
    return null
  }
  return ReactDom.createPortal(
        <div className="fixed w-screen h-screen top-0 left-0 bg-white text-slate-900 flex flex-col text-lg sm:text-xl">
          <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
            <h1 className="font-extrabold text-2xl sm:text-5xl select-none">MENU</h1>
            <i onClick={()=>setOpenModal(false)} className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm:text-3xl cursor-pointer"></i>
          </div>
          <div className="flex flex-col p-4 gap-3">
            <h2 className="select-none hover:pl-2 duration-300 cursor-pointer max-w-fit">Logout</h2>
          </div>
        </div> 
    ,
    _document.getElementById('portal')
  )
}
