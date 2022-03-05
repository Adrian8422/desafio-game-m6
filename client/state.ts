const API_BASE_URL = "http://localhost:3003";
import { rtdb } from "./rtdb";
import map from "lodash/map";

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
  signIn(callback) {
    const cs = this.getState();
    if (cs.userName1) {
      fetch(API_BASE_URL + "/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombre: cs.userName1,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.idUser1 = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("no hay nombre en el state");
      callback();
    }
  },
  signInUser2(callback) {
    const cs = this.getState();
    if (cs.userName2) {
      fetch(API_BASE_URL + "/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre: cs.userName2 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.messageForRegister = data.message;
          cs.idUser2 = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("no hay nombre2 en el state");
      callback();
    }
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.idUser1) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.idUser1 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          // tmb recibimos un callback porque queremos avisar que el newRoom está creado para que vaya otra vez a la APi a pedirle el id complejo
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("no hay idUser1");
    }
  },
  accessToRoom(callback?) {
    const cs = this.getState();
    const roomId = cs.roomId;
    const userId = cs.idUser1 || cs.idUser2;
    if (cs.roomId) {
      fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.rtdbRoomId = data.rtdbRoomId;
          this.setState(cs);
          this.listenRoom();
          // if (callback) callback();
        });
    }
  },

  listenRoom(callback) {
    const cs = this.getState();
    //seccion para escribir msg del backend
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);
    roomRef.on("value", (snapshot) => {
      const currentState = this.getState();
      const currentGameFromSv = snapshot.val();

      //treamos datos del currentGame para guardarlo en el state y poder sumar las cosas
      const currentList = map(currentGameFromSv.currentGame);
      cs.dataRtdb = currentList;
      this.setState(currentState);
      if (callback) callback();
    });
  },
  setValuesPlayer1Rtdb() {
    const cs = this.getState();
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame");
    if (cs.userName1 && cs.idUser1) {
      roomRef.update({
        user1: {
          name: cs.userName1,
          online: true,
          userId: cs.idUser1,
        },
      });
      cs.userOnline1 = true;
    }
    this.setState(cs);
  },

  setValuesPlayer2rtdb() {
    const cs = this.getState();
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame");
    if (cs.userName2 && cs.idUser2) {
      roomRef.update({
        user1: {
          name: cs.userName2,
          online: true,
          userId: cs.idUser2,
        },
      });
      cs.userOnline2 = true;
    }
    this.setState(cs);
  },
  setStartPlayer1(callback?) {
    const cs = this.getState();
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame");
    if (cs.userName1 && cs.idUser1) {
      roomRef.update({
        user1: {
          name: cs.userName1,
          online: true,
          userId: cs.idUser1,
          start: true,
        },
      });
      cs.startUser1 = true;
    }
    state.setState(cs);
    if (callback) callback();
  },
  setStartPlayer2(callback?) {
    const cs = this.getState();
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/currentGame");
    if (cs.userName2 && cs.idUser2) {
      roomRef.update({
        user2: {
          name: cs.userName2,
          online: true,
          userId: cs.idUser2,
          start: true,
        },
      });
      cs.startUser2 = true;
    }
    state.setState(cs);
    if (callback) callback();
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
  setNombreUser2(nombre: string) {
    const cs = this.getState();
    cs.userName2 = nombre;
    this.setState(cs);
  },
};

export { state };
