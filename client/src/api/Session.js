const Session = {
  setSession(token) {
    sessionStorage.setItem("currentUser", JSON.stringify(token));
  },

  checkSession() {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  },

  deleteSession() {
    sessionStorage.removeItem("currentUser");
  }
};

export default Session;
