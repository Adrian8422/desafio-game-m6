const API_BASE_URL = "http://localhost:3003";

const state = {
  data: {
    messageForRegister: "",
    userName1: "",
    userName2: "",
    idUser1: "",
    idUser2: "",
    userOnline1: false,
    userOnline2: false,
    startUser1: "",
    startUser2: "",
    roomId: "",
    rtdbRoomId: "",
    dataRtdb: {},

    currentGame: {
      userMove1: "",
      userMove2: "",
    },
    history: {
      user1: 0,
      user2: 0,
    },
  },
  listeners: [],

  getState() {
    return this.data;
  },

  signUp(name: string) {
    const cs = this.getState();
    const userName1 = cs.userName1;
    fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ nombre: userName1 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.idUser1 = data.id;
        cs.messageForRegister = data.message;
        console.log("data del signup", data);
        this.setState(cs);
      });
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("el state cambio", this.data);
  },
  subscribe(callback: (any: any) => any) {
    state.listeners.push(callback);
  },
  setNombre(nombre) {
    const cs = this.getState();
    cs.userName1 = nombre;
    this.setState(cs);
  },
};

export { state };
