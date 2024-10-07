
import { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const { title } = e.target;
    const createTask = {
      title: title.value,
      completed: false,
      id: nanoid(),
    };
    const copyTasks = [...tasks];
    copyTasks.push(createTask);
    setTasks(copyTasks);
    console.log("submitted");
    setTitle("");
  };
  // console.log(tasks)

  const toggleHandler = (index)=>{

    const updatedTasks = [...tasks];
    updatedTasks[index] = {
        ...updatedTasks[index],
        completed : !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  }

  const deleteHandler = (index)=>{
    let copyTasks = [...tasks];
    if (copyTasks[index].completed || confirm("are you want you delete the task?") ){
        copyTasks.splice(index, 1);
    } 
    else{
        alert("task is not deleted")
    }
    setTasks(copyTasks)

  }


  return (
    <div className="border-t-2 w-full h-screen bg-gradient-to-r from-[#1a202c] to-[#4a5568] flex items-center flex-col p-4 sm:p-8 lg:p-12">
      <div className="mt-10 w-full max-w-lg h-20 bg-gray-800 rounded-3xl flex justify-around items-center shadow-lg">
        <div className="text-yellow-100 text-center">
          <h1 className="text-3xl font-bold">LET'S TODO</h1>
          <p className="text-sm">Keep doing things</p>
        </div>
        <div className="text-4xl font-extrabold flex justify-center items-center w-24 h-24 rounded-full bg-orange-600 shadow-md">
          {tasks.filter((task) => task.completed !== false).length}/
          {tasks.length}
        </div>
      </div> 

      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg flex justify-between px-5 my-4"
      >
        <input
          placeholder="Write your next task..."
          className="px-5 py-3 text-yellow-100 outline-none w-4/5 rounded-xl bg-gray-700"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-12 h-12 rounded-full bg-orange-600 shadow-md transition-transform duration-300 hover:scale-105">
          <i className="ri-add-fill"></i>
        </button>
      </form>

      <ul className="list-none w-full max-w-lg">

        { tasks.length <= 0 ? <h1 className="mt-5 text-yellow-100 text-2xl font-extrabold text-center">
          No Task Found
        </h1> : tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="mb-5 flex justify-between items-center bg-gray-800 rounded-xl p-5 shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center">
                <div onClick={()=>toggleHandler(index)} className={` ${task.completed? " bg-green-500"  : "border border-orange-600"}     mr-4 rounded-full w-8 h-8 cursor-pointer`}></div>
                <h1 className={ ` ${task.completed?"line-through text-gray-400": "text-yellow-100"}  text-2xl font-bold`}>
                  {task.title}
                </h1>
              </div>
              <div className="flex gap-3 text-yellow-100">
                <i className="ri-file-edit-line text-xl cursor-pointer hover:text-orange-500 transition duration-200"></i>
                <button onClick={()=>deleteHandler(index)} className="text-red-500 text-xl">Delete</button>
              </div>
            </li>
          );
        })}

        
      </ul>
    </div>
  );
};

export default App;
