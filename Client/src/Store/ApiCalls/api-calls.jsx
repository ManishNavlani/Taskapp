import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// while using get all data query
const typeAllQuery = (result, tagType) => {
  return result
    ? [
        ...result.map(({ _id }) => ({ type: tagType, id: _id })),
        { type: tagType, id: "LIST" },
      ]
    : [{ type: tagType, id: "LIST" }];
};

// while using {updateOne,deleteOne,getOne}
const typeOneQuery = (tagType, id) => {
  return [{ type: tagType, id: "LIST" }];
};

// while using post or creating user or task
const typeOneCreate = (tagType) => {
  return [{ type: tagType, id: "LIST" }];
};

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Users", "Tasks"],

  endpoints: (builder) => ({
    //Users
    //User login
    login: builder.mutation({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: typeOneCreate("Users"),
    }),

    // User Register
    register: builder.mutation({
      query: (body) => ({
        url: "users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: typeOneCreate("Users"),
    }),

    ///////////////////////////////////////////////////////////////////////
    //tasks

    //get all tasks
    getAllTasks: builder.query({
      query: (completed) => `tasks?completed=${completed}`,
      providesTags: (result, error, arg) => typeAllQuery(result, "Tasks"),
    }),

    // create task
    createTasks: builder.mutation({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: typeOneCreate("Tasks"),
    }),

    // update Task
    updateTask: builder.mutation({
      query({ body, id }) {
        return {
          url: `tasks/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: (result, error, id) => typeOneQuery("Tasks"),
    }),

    // delete task
    deleteTask: builder.mutation({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => typeOneQuery("Tasks"),
    }),
  }),
});

export const {
  //Users requests
  useLoginMutation,
  useRegisterMutation,

  // Tasks requests

  useUpdateTaskMutation,
  useCreateTasksMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useGetTasksByIdQuery,

  // api
  reducer: apiReducer,
} = taskApi;
