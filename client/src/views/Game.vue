<template>
  <b-container fluid class="background-wallpaper">
    <div style="display: flex; height: 80vh; overflow-x: hidden; overflow-y: auto; width: 100%;">
      <draggable
        class="row grab"
        v-model="sandbox"
        @remove="send"
        @change="updateSandbox"
        :group="{name: 'money', pull: 'clone', put: false}"
      >
        <b-col sm="1" v-for="(item, index) in sandbox" :key="index" class="p-1">
          <b-img :src="require(`@/assets/duit/${item}.png`)" fluid/>
        </b-col>
      </draggable>
    </div>
    <div class="bawah">
      <!-- style="display: flex; justify-content: center;" -->
      <div class="big-bucket">
        <draggable
          v-model="bucket"
          @change="receive"
          :sortable="false"
          group="money"
          style="height: 20vh; overflow: hidden;"
        >
          <div class="bucket">
            <h1 class="counter">{{total}}</h1>
          </div>
        </draggable>
      </div>
      <div class="small-bucket">
        <div v-for="(item, index) in rivals" :key="index" class="sb-personal">
          <p class="counter">
            {{item.name}}
            <br>
            {{item.totalDuit}}
          </p>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import draggable from "vuedraggable";
import { db } from "@/main.js";
import { mapState } from 'vuex'

export default {
  data() {
    return {
      moneyList: [0, 1, 5, 10, 20, 50, 100, 500],
      sandbox: [],
      bucket: [],
      total: 0,
      rivals: [],
      tempData: {}
    };
  },
  computed: mapState(['audio'])
  ,
  components: {
    draggable
  },
  methods: {
    updateSandbox(event) {
      console.log(event);
      let { moved } = event;
      if (moved) {
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({ sandbox: this.sandbox });
      }
    },
    send(event) {
      // console.log({ event, dari: 'send' });
      // console.log(this.sandbox)
      let { added, removed, moved, oldIndex } = event;
      if (oldIndex >= 0) {
        this.sandbox[oldIndex] = 0;
        // console.log("success")
      } else {
        // console.log("catch error")
      }
      // console.log(this.sandbox)
      db.collection("rooms")
        .doc(this.$route.params.id)
        .update({ sandbox: this.sandbox });
      // if (this.clearCheck()) {
      //   // ======================= kalo udah kosong ngapain ? =======================

      //   swal("finished");
      // } else {
      //   // ======================== kalo masih isi ngapain ? ========================
      // }
    },
    receive(event) {
      this.audio.play();
      let { added, removed, moved } = event;
      let tempValue = added ? added.element : removed ? removed.element : 0;
      this.total += tempValue;
      let kirim = {
        playerId: localStorage.playerId,
        name: localStorage.name,
        totalDuit: this.total
      };
      // for (let rival of rivals) {
      //   kirim[rival.id] = rival;
      // }
      db.collection("rooms")
        .doc(this.$route.params.id)
        .update({ ["players." + localStorage.playerId]: kirim });
    },
    clearCheck() {
      // let check = true
      // this.sandbox.forEach(item => {
      //   if(item != 0) {
      //     check = false
      //   }
      // });
      // return check
    }
  },
  watch: {
    sandbox() {
      let check = true;
      this.sandbox.forEach(item => {
        if (item != 0) check = false;
      });
      if (check) {
        let highest = {
          playerId: "",
          totalDuit: 0
        };
        for (let key in this.tempData.players) {
          console.log(this.tempData.players[key]);
          if (this.tempData.players[key].totalDuit > highest.totalDuit) {
            highest.totalDuit = this.tempData.players[key].totalDuit;
            highest.playerId = this.tempData.players[key].playerId;
          }
        }
        console.log(`${highest.playerId} , ${localStorage.playerId}`);
        if (localStorage.playerId === this.tempData.creator) {
          if (highest.playerId == localStorage.playerId) {
            // swal("menang!", "uhuy~!", "success");
            swal({
              title: "Menang!",
              text: "Play again?",
              icon: "success",
              buttons: ["No!", true]
            }).then(clicked => {
              if (clicked) {
                // restart
                this.$router.push(`/games/${this.$router.params.id}`);
              } else {
                // berenti
                db.collection("rooms")
                  .doc(this.$router.params.id)
                  .update({
                    status: "ready"
                  });
              }
            });
          } else {
            // swal("Kalah... :(", "huhuhu~", "error");
            swal({
              title: "Kalah!",
              text: "Play again?",
              icon: "error",
              buttons: ["No!", true]
            }).then(clicked => {
              if (clicked) {
                // restart
                this.$router.push(`/games/${this.$router.params.id}`);
              } else {
                // berenti
                db.collection("rooms")
                  .doc(this.$router.params.id)
                  .update({
                    status: "ready"
                  });
              }
            });
          }
        } else {
          if (highest.playerId == localStorage.playerId) {
            swal("menang!", "uhuy~!", "success");
          } else {
            swal("Kalah... :(", "huhuhu~", "error");
          }
        }
      }
    }
  },
  created() {
    for (let i = 0; i < 84; i++) {
      let rand = Math.round(Math.random() * (this.moneyList.length - 1));
      this.sandbox.push(this.moneyList[rand]);
    }
    console.log(this.$route.params);
    db.collection("rooms")
      .doc(this.$route.params.id)
      .update({ sandbox: this.sandbox });

    let kirim = {
      playerId: localStorage.playerId,
      name: localStorage.name,
      totalDuit: 0
    };
    db.collection("rooms")
      .doc(this.$route.params.id)
      .update({ ["players." + localStorage.playerId]: kirim });

    db.collection("rooms")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        let data = doc.data();
        this.tempData = data;
        this.rivals = Object.values(data.players);
        this.rivals = this.rivals.filter(
          item => item.id != localStorage.playerId
        );
        this.sandbox = data.sandbox;
        if (data.status == "ready") {
          this.$router.push("/");
        }
      });
  }
};
</script>

<style>
.grab {
  cursor: grab;
}
.grab:active {
  cursor: grabbing;
}
.counter {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 10px;
  color: whitesmoke;
  width: fit-content;
}
.background-wallpaper {
  background-image: url("../assets/bg.jpg");
  background-size: cover;
}
.bucket {
  background-image: url("../assets/bucket.png");
  position: fixed;
  width: 300px;
  height: 20vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.small-bucket {
  margin: 0;
  text-align: center;
  display: flex;
}
.sb-personal {
  background-image: url("../assets/bucket.png");
  background-size: cover;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bawah {
  display: flex;
  justify-content: space-between;
}
.big-bucket {
  /* position: fixed; */
}
</style>