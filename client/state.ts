const API_BASE_URL = "http://localhost:3003"

const state = {
  data:{

    messageForRegister  :"",
    userName1:"",
    userName2:"",
    idUser1:"",
    idUser2:"",
    userOnline1:false,
    userOnline2:false,
    startUser1:"",
    startUser2:"",
    roomId:"",
    rtdbRoomId:"",
    dataRtdb:{},

    currentGame:{
      userMove1:"",
      userMove2:"",
    },
    history:{
      user1:0,
      user2:0,

    }



  },
  listeners:[],

  getState(){
    return this.data
  },
  setState(newState){
    this.data = newState
    for (const cb of this.listeners) {
      cb()
      
    }
    console.log("el state cambio", this.data)


  },
  subscribe(callback:(any:any)=>any){
    state.listeners.push(callback)


  }
}

export {state}