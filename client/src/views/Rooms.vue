<template>
<div>
    <button v-if='available' @click='createRoom'>create Room</button>
  <div class='row'>
    <Room v-for='room in rooms' :room="room" :available='available' class='col-sm-4' >
    </Room>
  </div>
  </div>
</template>

<script>
import { db } from "@/main.js";
import Room from "@/components/roomcard.vue"

export default {
  name: "RoomPage",
  data() {
    return {
      rooms: [],
      playerId: '',
      available: true
    };
  },
  components:{Room},
  methods:{
      createRoom(){
          db
            .collection('rooms')
            .add({
                title:'kuy main',
                players:{
                  [this.playerId]:
                    {
                      totalDuit: 0,
                      playerId: this.playerId,
                    }
                },
                creator:this.playerId,
                status:'pending'
            })
      }
  },
  created() {
    console.log(db);
    db.collection("rooms").onSnapshot(querySnapshot => {
      this.rooms=[]
      querySnapshot.forEach(doc => {
        let data = doc.data()
        data.id = doc.id
        if(Object.keys(data.players).includes(this.playerId)){
          this.available = false
        }else{
          this.available = true
        }
        if(data.status === 'playing'){
            if(Object.keys(data.players).includes(this.playerId)){
                // this.$router.push(`/games/${data.id}`)
                console.log(data.id)
            }
        }
        console.log(data)
        this.rooms.push(data);
      });
    });
    this.playerId = localStorage.getItem('playerId')
    console.log(this.rooms)
  }
};
</script>
