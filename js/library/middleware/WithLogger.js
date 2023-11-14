const withLogger = (reducer) => {
  return (prevState, action, args) => {
    console.group(action);
    console.log("previous state:", prevState);
    console.log("action argument:", args);
    const nextState = reducer(prevState, action, args);
    console.log("next state:", nextState);
    console.groupEnd();
    return nextState;
  };
};
export default withLogger;
