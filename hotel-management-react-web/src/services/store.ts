import { createStore } from "redux";
type actionTypes = "SET_CURRENT_USER" | ""; //action that describes what I want to do -- Set the current user

let initialState = {
  current_user: null,
};

try {
  const storeInState = localStorage.getItem("redux-state");
  if (storeInState) {
    const state = JSON.parse(storeInState);
    if (state) {
      initialState = state;
    }
  }
} catch (err) {}
//reducer that decribe how my actions transforms the state into the next state
function main(
  state = initialState,
  action: { type: actionTypes; payload: any }
) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        current_user: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(main);
//display the store
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("redux-state", JSON.stringify(state));
    console.log(JSON.stringify(state));
  } catch (err) {}
});
export default store;
