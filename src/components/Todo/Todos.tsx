import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firbase';
import { getToken } from '../../helper/getToke';
import { AddTodo } from './AddTodo';
import { Row } from './Row';

type Todo = {
  id: string;
  name: string;
  status: string;
  description: string;
  user?: string
};

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  const todoLength = todos.length;
  const hasTodos = todos.length > 0;
  const collectionRef = collection(db, 'todo');
  const userToken = getToken()


  const getData = async () => {
    const customeQuery = query(collectionRef, where("user", "==", userToken));
    const data = await getDocs(customeQuery)
    return data
  }

  useEffect(() => {
    getData().then((res: any) => {
      let todoData = res.docs.map((doc: any) => ({ ...doc.data(), }))
      setTodos(todoData)
    },)
  }, [])

  const handleSubmitTodo = async (e: { name: string; description: string; status: string }) => {
    const todo = {
      id: uuidv4(),
      name: e.name,
      description: e.description,
      status: e.status,
      user: userToken
    };

    const test = await addDoc(collectionRef, todo)
    setTodos([...todos, todo])

  };

  const handleDeleteTodo = async(id: string) => {
    const UpdatedTask = todos.findIndex((e: Todo) => e.id === id)
    const UpdatedObj = todos[UpdatedTask]
    UpdatedObj.status = 'Deleted'
    const customeQuery = query(collectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(customeQuery);
    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(collectionRef, docSnapshot.id);
      const newData = {
        status: 'Deleted'
      };
      updateDoc(docRef, newData)
    });
    const tempTodo = [...todos]
    tempTodo[UpdatedTask] = UpdatedObj
    setTodos(tempTodo)
  };

  const handleCheckTodo = async (id: string) => {
    const UpdatedTask = todos.findIndex((e: Todo) => e.id === id)
    const UpdatedObj = todos[UpdatedTask]
    UpdatedObj.status = 'Completed'
    const customeQuery = query(collectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(customeQuery);
    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(collectionRef, docSnapshot.id);
      const newData = {
        status: 'Completed'
      };
      updateDoc(docRef, newData)
    });
    const tempTodo = [...todos]
    tempTodo[UpdatedTask] = UpdatedObj
    setTodos(tempTodo)
  };

  const handleUpdate = async(e: Todo) => {
    const toBeUpdate = todos.findIndex((ele) => ele.id === e.id)
    let tempData = [...todos]
    tempData[toBeUpdate] = e

    const q = query(collectionRef, where("id", "==", e.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(collectionRef, docSnapshot.id);
      const newData = e;
      updateDoc(docRef, newData)
    });
    setTodos(tempData)
  }

  return (
<>
<AddTodo 
        task={task}
        handleSubmitTodo={handleSubmitTodo}
      />
    <div className={`mx-auto w-[90%] lg:w-1/2 xl:w-10/12 flex flex-col items-center`}>
      
      {todos.map((todo) => (
        <Row
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleCheckTodo={handleCheckTodo}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
    </>
  );
};
