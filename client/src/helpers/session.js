const sessionName = "currentUser";
const Session = {
  setSession(token) {
    sessionStorage.setItem(sessionName, JSON.stringify(token));
  },

  checkSession() {
    return JSON.parse(sessionStorage.getItem(sessionName));
  },

  deleteSession() {
    sessionStorage.removeItem(sessionName);
  }
};

export default Session;
