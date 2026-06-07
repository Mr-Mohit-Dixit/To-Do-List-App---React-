import React, { useState } from "react";
import "./App.css";

const App = () => {
  let [todoItem, setTodoItem] = useState("");
  let [todoList, setTodoList] = useState([]);
  let [listFilter, setListFilter] = useState("all");

  // Filter List
  let displayList = todoList;
  if (listFilter === "active") {
    displayList = todoList.filter((item) => !item.completed);
  }

  if (listFilter === "completed") {
    displayList = todoList.filter((item) => item.completed);
  }

  //display count
  const completedCount = todoList.filter((item) => item.completed).length;
  const activeCount = todoList.filter((item) => !item.completed).length;

  const addTodoItem = () => {
    if (todoItem.trim() === "") {
      alert("Please Enter Task");
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        task: todoItem,
        completed: false,
      },
    ]);

    setTodoItem("");

    console.log(...todoList);
  };

  const deleteTodoItem = (id) => {
    const newList = todoList.filter((item) => {
      return item.id !== id;
    });

    setTodoList(newList);
  };

  const toggleSelect = (id) => {
    const toggledList = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    });

    setTodoList(toggledList);
  };

  const clearCompleted = () => {
    let completedRemoved = todoList.filter((item) => {
      return !item.completed;
    });

    setTodoList(completedRemoved);
  };

  return (
    <div className="container">
      <h1 className="title">To Do List App</h1>

      {/*Add To Do Section*/}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task"
          value={todoItem}
          onChange={(e) => {
            setTodoItem(e.target.value);
            {
              console.log(todoItem);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodoItem();
            }
          }}
        />

        <button className="add-btn" onClick={addTodoItem}>
          Add
        </button>
      </div>

      <div className="filter-section">
        <button
          className={listFilter === "all" ? "active-filter" : ""}
          onClick={() => setListFilter("all")}
        >
          All
        </button>

        <button
          className={listFilter === "active" ? "active-filter" : ""}
          onClick={() => setListFilter("active")}
        >
          Active
        </button>

        <button
          className={listFilter === "completed" ? "active-filter" : ""}
          onClick={() => setListFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="todo-section">
        {displayList.map((item) => (
          <div className="todo-item" key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleSelect(item.id)}
            />

            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.task}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteTodoItem(item.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {/* Footer */}
        <div className="footer">
          <p>{completedCount} task completed</p>
          <p>{activeCount} task pending</p>

          <button className="clear-btn" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
