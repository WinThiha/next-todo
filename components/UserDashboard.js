import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from "@/firebase";
import useFetchTodos from "@/hooks/fetchTodos";
export default function UserDashboard() {

    const { userInfo, currentUser } = useAuth()
    console.log(currentUser)
    const [addTodo, setAddTodo] = useState(false)
    const [todo, setTodo] = useState('')
    const [edit, setEdit] = useState(null)
    const [edittedValue, setEdittedValue] = useState('')
    const { todos, loading, error, setTodos } = useFetchTodos()
    useEffect(() => {
        if (!userInfo || Object.keys(userInfo).length === 0) {
            setAddTodo(true)
        }
    }, [userInfo])
    function handleDelete(todoKey) {
        return async () => {
            const tempObject = { ...todos }
            delete tempObject[todoKey]
            setTodos(tempObject)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                'todos': {
                    [todoKey]: deleteField()
                }
            }, { merge: true }
            )
        }
    }
    async function handleAddTodo() {
        if (!todo) {
            return
        }
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
        setTodos({ ...todos, [newKey]: todo })

        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: todo
            }
        }, { merge: true }
        )
        setTodo('')
    }
    function handleAddEdit(todoKey) {
        return () => {
            setEdit(todoKey)
            setEdittedValue(todos[todoKey])
        }
    }
    async function handleEditTodo() {
        if (!edittedValue) {
            return
        }
        const newKey = edit
        setTodos({ ...todos, [newKey]: edittedValue })

        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: edittedValue
            }
        }, { merge: true }
        )
        setEdit(null)
        setEdittedValue('')
    }
    return (
        <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">


           {addTodo && <div className="flex items-stretch">
                <input type="text" value={todo} placeholder="Enter todo" onChange={
                    (e) => setTodo(e.currentTarget.value)
                } className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"></input>
                <button onClick={handleAddTodo} className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40">
                    ADD
                </button>
            </div>}
            {loading && (<div className="flex-1 grid place-items-center">
                <i className="fa-solid fa-spinner animate-spin text-5xl"></i>
            </div>)}
            {!loading && (
                <>
                    {Object.keys(todos).map((todo, i) => {

                        return <TodoCard key={i} handleDelete={handleDelete} handleEditTodo={handleEditTodo} edit={edit} handleAddEdit={handleAddEdit} todoKey={todo} edittedValue={edittedValue} setEdittedValue={setEdittedValue}>
                            {todos[todo]}
                        </TodoCard>
                    })}
                </>
            )}

            {!addTodo &&
                <button onClick={() => setAddTodo(true)} className="text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase duration-300 hover:opacity-30">ADD TODO</button>

            }        </div>

    )
}