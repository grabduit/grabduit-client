<template>
  <div>
    <button>create Room</button>
    
  </div>
</template>

<script>
import { db } from "@/main.js";

export default {
  name: "Room",
  data(){
      return{
          rooms:[]
      }
  },
  created() {
    console.log(db)
    db
        .collection("rooms")
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.rooms.push(doc.data())
            });
        });
    }
};
</script>
