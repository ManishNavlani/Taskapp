import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../Store/action-creator/user-actions";

import Model from "../Components/Model/Model";
import Task from "../Components/Tasks/Task";
import {
  useCreateTasksMutation,
  useGetAllTasksQuery,
} from "../Store/ApiCalls/api-calls";

function Home() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn]);

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const { data } = useGetAllTasksQuery(location);
  const [createTask] = useCreateTasksMutation();

  const user = useSelector((state) => state.user.currentUser);

  const taskSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = {
        description: task,
      };
      const submittedTask = await createTask(body).unwrap();
      setTask("");
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* header or navbar */}
      <header className="flex justify-between px-4 py-2 items-center text-l shadow-md">
        <div className="flex-1">
          <img className="w-10" src="../../src/favicon.svg" alt="logo" />
        </div>
        <div className="flex-2 flex justify-between items-center text-center">
          <span className="text-indigo-500 font-medium text-lg ">
            Hi {user?.name},
          </span>
          <button
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-2 py-1 mx-2 rounded text-white"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>
          <button
            className="border border-indigo-500 text-indigo-500 hover:border-indigo-700 rounded bg-indigo-50 hover:bg-indigo-100 p-1 shadow-lg shadow-indigo-500/50"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </header>

      {/* task selection */}
      <div className="px-4 flex text-center text-[16px] ">
        <NavLink
          to="/false"
          className={({ isActive }) =>
            "hover:border-indigo-800 flex-1 h-12 border-indigo-600 pt-2 border-b-2 mr-1" +
            (isActive ? " bg-indigo-200" : "")
          }
        >
          Incomplete Tasks
        </NavLink>
        <NavLink
          to="/true"
          className={({ isActive }) =>
            "hover:border-indigo-800 flex-1 h-12 border-indigo-600 border-b-2 pt-2 mr-1" +
            (isActive ? " bg-indigo-200" : "")
          }
        >
          Completed Tasks
        </NavLink>
      </div>

      {/* tasks */}
      <div className="p-4 flex flex-wrap">
        {data?.map((task) => (
          <Task task={task} key={task._id} />
        ))}
      </div>

      <Model visible={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-white w-96 mx-4 p-5 rounded">
          <h1 className="font-bold text-2xl text-indigo-500 mb-2">Task App</h1>

          <textarea
            rows="5"
            className="appearance-none mb-2 rounded relative block w-full px-3 py-2 border border-gray-300
             placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
             focus:z-10 sm:text-sm resize-none"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-2 mr-2 py-1 rounded text-white"
            onClick={taskSubmitHandler}
          >
            Add Task
          </button>
          <button
            className="border border-indigo-500 text-indigo-500 hover:border-indigo-700 rounded bg-indigo-50 hover:bg-indigo-100 p-1 shadow-lg shadow-indigo-500/50"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </Model>
    </>
  );
}

export default Home;
