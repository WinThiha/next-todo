import React from 'react'

export default function TodoCard(props) {
  const { children, edit, handleDelete, handleEditTodo, handleAddEdit, edittedValue, setEdittedValue, todoKey } = props
  return (
    <div className='p-2 relative border flex items-stretch border-white border-solid'>
      <div className='flex-1 flex'>
        {!(edit === todoKey) ? <>{children}</> : (
          <input className='bg-inherit flex-1 text-white p-2 outline-none' value={edittedValue} onChange={(e) => setEdittedValue(e.currentTarget.value)} />
        )}
       
      </div>
      <div className='flex items-center'>
        {(edit === todoKey) ? <i onClick={handleEditTodo} className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"></i> :
          <i onClick={handleAddEdit(todoKey)} className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"></i>}
        <i onClick={handleDelete(todoKey)} className="fa-sharp fa-solid fa-trash px-2 duration-300 hover:scale-125 max-w-fit cursor-pointer"></i>

      </div>
    </div>
  )
}
