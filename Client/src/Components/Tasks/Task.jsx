import React from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../Store/ApiCalls/api-calls";

function Tasks({ task }) {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const markCompleteHandler = async () => {
    try {
      const body = {
        completed: true,
      };
      const updatedTask = await updateTask({ body, id: task._id }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHandler = async () => {
    try {
      const deletedTask = await deleteTask(task._id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-indigo-200  md:w-[24%] w-full mx-2  p-4 md:mx-1.5 my-2 rounded">
      <p className="font-bold">{task?.description}</p>

      <div>
        {!task.completed && (
          <button
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-2 mr-2 py-1 rounded text-white"
            onClick={markCompleteHandler}
          >
            Mark As Complete
          </button>
        )}

        <button
          className="border border-indigo-500  text-indigo-500 hover:border-indigo-700 rounded bg-indigo-50 hover:bg-indigo-100 p-1 shadow-lg shadow-indigo-500/50"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Tasks;
