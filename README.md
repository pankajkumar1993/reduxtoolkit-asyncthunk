# Summary
------------------------------------------------------------------------------------------
1. Create a Redux store with configureStore
configureStore accepts a reducer function as a named argument
configureStore automatically sets up the store with good default settings

2. Provide the Redux store to the React application components
Put a React Redux <Provider> component around your <App />
Pass the Redux store as <Provider store={store}>

3. Create a Redux "slice" reducer with createSlice
Call createSlice with a string name, an initial state, and named reducer functions
Reducer functions may "mutate" the state using Immer
Export the generated slice reducer and action creators

4. Use the React Redux useSelector/useDispatch hooks in React components
Read data from the store with the useSelector hook
Get the dispatch function with the useDispatch hook, and dispatch actions as needed



# What's the Difference between reducers and extraReducers?
------------------------------------------------------------------------------------------
The reducers and extraReducers fields inside of createSlice serve different purposes:

# reducer
The reducers field is normally an object. For every case reducer defined in the reducers object, createSlice will automatically generate an action creator with the same name, as well as an action type string to show in the Redux DevTools. Use reducers to define new actions as part of the slice.

# extraReducers
extraReducers accepts a function with a builder parameter, and the builder.addCase() and builder.addMatcher() methods are used to handle other action types, without defining new actions. Use extraReducers to handle actions that were defined outside of the slice.

# Thunk
"thunk" is a programming term that means "a piece of code that does some delayed work".
"thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

A thunk function is a function that accepts two arguments: the Redux store dispatch method, and the Redux store getState method. Thunk functions are not directly called by application code. Instead, they are passed to store.dispatch():

<script>
const thunkFunction = (dispatch, getState) => {
  // logic here that can dispatch actions or read state
}

store.dispatch(thunkFunction)
</script>

A thunk function may contain any arbitrary logic, sync or async, and can call dispatch or getState at any time.

# Why Use Thunks?
------------------------------------------------------------------------------------------
Thunks allow us to write additional Redux-related logic separate from a UI layer. This logic can include side effects, such as async requests or generating random values, as well as logic that requires dispatching multiple actions or access to the Redux store state.

Redux reducers must not contain side effects, but real applications require logic that has side effects. Some of that may live inside components, but some may need to live outside the UI layer. Thunks (and other Redux middleware) give us a place to put those side effects.

It's common to have logic directly in components, such as making an async request in a click handler or a useEffect hook and then processing the results. However, it's often necessary to move as much of that logic as possible outside the UI layer. This may be done to improve testability of the logic, to keep the UI layer as thin and "presentational" as possible, or to improve code reuse and sharing.


In a sense, a thunk is a loophole where you can write any code that needs to interact with the Redux store, ahead of time, without needing to know which Redux store will be used. This keeps the logic from being bound to any specific Redux store instance and keeps it reusable.


# Thunk Use Cases
- Moving complex logic out of components
- Making async requests or other async logic
- Writing logic that needs to dispatch multiple actions in a row or over time
- Writing logic that needs access to getState to make decisions or include other state values in an action


Thunks are best used for complex synchronous logic, and simple to moderate async logic such as making a standard AJAX request and dispatching actions based on the request results.


# Redux Thunk Middleware
Dispatching thunk functions requires that the redux-thunk middleware has been added to the Redux store as part of its configuration.

The Redux Toolkit configureStore API automatically adds the thunk middleware during store creation, so it should typically be available with no extra configuration needed.


# How Does the Middleware Work?
Redux middleware are all written as a series of 3 nested functions:

- The outer function receives a "store API" object with {dispatch, getState}
- The middle function receives the next middleware in the chain (or the actual store.dispatch method)
- The inner function will be called with each action as it's passed through the middleware chain


standard middleware definition, with 3 nested functions:
1) Accepts `{dispatch, getState}`
2) Accepts `next`
3) Accepts `action`




# extraReducers:
In Redux Toolkit, extraReducers is an optional configuration object that allows you to define additional reducers that respond to actions generated by other parts of your application, such as thunks or other slices.

The keys in extraReducers are action types, and the values are reducer functions that should be executed in response to those actions. The syntax for defining an extra reducer is as follows:

<script>
extraReducers: {
  [actionType]: (state, action) => {
    // reducer logic goes here
  }
}
</script>

In this example, actionType is the type of the action that the reducer should respond to, and (state, action) => { ... } is the reducer function itself.


- when you create a thunk with createAsyncThunk, it generates three different action types: pending, fulfilled, and rejected. Each of these action types represents a different stage in the lifecycle of the asynchronous operation that the thunk is performing.


To handle these actions in your extraReducers section, you need to specify the action type and provide a reducer function that should be executed in response to that action. The syntax for defining a reducer that responds to a fulfilled action generated by a thunk is as follows:

<script>
extraReducers: {
  [myThunk.fulfilled]: (state, action) => {
    // reducer logic goes here
  }
}
</script>

myThunk is the name of the thunk that you're defining, and fulfilled is the action type that represents the successful completion of the asynchronous operation.


# createAsyncThunk
here’s the syntax for createAsyncThunk:

<script>
const myAsyncThunk = createAsyncThunk(
  typePrefix,
  payloadCreator,
  options?
);
</script>


# typePrefix:
- A string that will be used as a prefix for the action types that are generated by the thunk. For example, if you pass "todos" as the typePrefix, the generated action types will be "todos/pending", "todos/fulfilled", and "todos/rejected".

# payloadCreator:
- A function that should return a promise that resolves with the payload of the fulfilled action. This function can also accept an optional second argument, which is an object that contains some extra properties that are passed to the thunk by default. For example, you might pass an extra object that contains an API client, so that the thunk can use that client to make API requests.

# options:
- An optional object that can be used to configure various aspects of the thunk, such as how the pending and rejected actions are handled, or whether to overwrite existing state or merge it when the fulfilled action is handled.


Here’s an example of how you might use createAsyncThunk to define a thunk that fetches some data from an API:


<script>
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { extra }) => {
    //const { apiClient } = extra;
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  }
);

export default fetchUserData;
</script>

In this example, fetchUserData is the name of the thunk that we're defining. The payloadCreator function takes a userId argument and an extra argument that contains an API client. It uses the API client to fetch the user data, and returns the data property of the response as the payload of the fulfilled action.

here’s an example of how to use createAsyncThunk with an extra reducer:

<script>
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./thunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
</script>


we’re using createAsyncThunk to define the fetchUserData thunk, and we're using it in the extraReducers section of a slice definition for the user domain. The extraReducers section is a function that takes a builder object, which has methods like addCase and addMatcher that allow you to define how the slice should respond to different actions.

In this case, we’re using builder.addCase to define three cases: pending, fulfilled, and rejected. Each case takes two arguments: the action type, which is generated by the createAsyncThunk function, and a callback function that takes the state and action arguments.

In the pending case, we're setting the status property of the state to "loading". In the fulfilled case, we're setting the status property to "succeeded" and the data property to the payload of the action. In the rejected case, we're setting the status property to "failed" and the error property to the error message of the action.

When the fetchUserData thunk is dispatched, it will trigger the pending case first, then either the fulfilled or rejected case, depending on whether the promise is resolved or rejected.





# Extensions
Gitlens


# Folder Structure

src/
  |- app/
     |- App.js                # Main React component
     |- store.js              # Redux Toolkit store configuration
  |- features/
     |- feature1/
        |- feature1Slice.js  # Redux Toolkit Slice configuration for feature1
        |- Feature1.js       # Feature1 component
        |- feature1API.js     # API calls related to feature1
     |- feature2/
        |- feature2Slice.js  # Redux Toolkit Slice configuration for feature2
        |- Feature2.js       # Feature2 component
        |- feature2API.js     # API calls related to feature2
  |- components/
     |- CommonComponent.js    # Commonly used components
  |- pages/
     |- XxxPage.js            # Page component
  |- hooks/
     |- useLocalStorage.js    # Custom hook for storing data in localStorage
     |- useFetch.js           # Custom hook for fetching data from an API
  |- utils/
     |- utilityFunctions.js   # Helper functions
  |- API/
     |- index.js              # API exports
  |- config/
     |- config.js             # Application configuration file
  |- router/
     |- index.js              # React Router configuration
  |- .env                     # Environment variables
  |- index.js                 # Application entry file