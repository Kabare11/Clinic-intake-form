const appointments = (state = [], action) => {
  switch (action.type) {
    case 'SET_APPOINTMENT_HISTORY':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default appointments;
