// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import './App.css';

function App() {
  const [isCompletede, setIsCompleted] = useState(false)
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index)
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);

  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filterdItem = {
      ...allTodos[index],
      completedOn: completedOn

    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filterdItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
  };

  const handleDeleteCompletedTodo =(index)=>{
    let reducedTodo = [...completedTodos]
    reducedTodo.splice(index)
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }

  }, [])


  return (
    <div className="App">
      <h1>Todo-List</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="what's the task title?"></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="what's the task discription?"></input>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>

        </div>
        <div className='btn-area'>
          <button className={`secondbtn ${isCompletede === false && 'active'}`}
            onClick={() => setIsCompleted(false)}>Todo</button>
          <button className={`secondbtn ${isCompletede === true && 'active'}`}
            onClick={() => setIsCompleted(true)}>Comleted</button>
        </div>
        <div className='todo-list'>
          {isCompletede === false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icons' onClick={() => handleDeleteTodo(index)} title='delete?' />
                  <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} title='Complete?' />

                </div>
              </div>
            )
          })}


          {isCompletede === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Comleted On :{item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icons' onClick={() => handleDeleteCompletedTodo(index)} title='delete?' />
                  {/* <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} title='Complete?' /> */}

                </div>
              </div>
            )
          })}

        </div>

      </div>
    </div>
  );
}

export default App;
