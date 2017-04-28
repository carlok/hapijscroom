module.exports = {
  counter: (state = 0, action = {type: undefined}) => {

    if (action.type === undefined) {
      return state;
    }

    switch (action.type) {
      case 'DECREMENT':
        return state - 1;
      case 'INCREMENT':
        return state + 1;
      default:
        return state;
    }
  }
};
