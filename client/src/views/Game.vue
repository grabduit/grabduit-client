<template>
  <b-container fluid class="background-wallpaper">
    <div style="display: flex; height: 80vh; overflow-x: hidden; overflow-y: auto; width: 100%;">
      <draggable
        class="row grab"
        v-model="sandbox"
        @remove="send"
        :group="{name: 'money', pull: 'clone', put: false}"
        
      >
        <b-col sm="1" v-for="(item, index) in sandbox" :key="index" class="p-1">
          <b-img :src="require(`@/assets/duit/${item}.png`)" fluid/>
        </b-col>
      </draggable>
    </div>
    <div class="bawah"> <!-- style="display: flex; justify-content: center;" -->
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
            {{item.name}}<br>{{item.total}}
          </p>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import draggable from "vuedraggable";

export default {
  data() {
    return {
      moneyList: [0, 1, 5, 10, 20, 50, 100, 500],
      sandbox: [],
      bucket: [],
      total: 0,
      rivals: [
        {
          id: '2',
          name: 'doni',
          total: 20,
        }, {
          id: '3',
          name: 'yona',
          total: 10
        }, {
          id: '4',
          name: 'ucup',
          total: 30,
        }
      ]
    };
  },
  components: {
    draggable
  },
  methods: {
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
      console.log(this.sandbox)
      if(this.clearCheck()) {
        // ======================= kalo udah kosong ngapain ? =======================
        swal('finished')
      } else {
        // ======================== kalo masih isi ngapain ? ========================
      }
    },
    receive(event) {
      // console.log({event, dari: 'receive'});
      let { added, removed, moved } = event;
      let tempValue = added ? added.element : removed ? removed.element : 0;
      this.total += tempValue;

    },
    clearCheck() {
      let check = true
      this.sandbox.forEach(item => {
        if(item != 0) {
          check = false
        }
      });
      return check
    }
  },
  created() {
    
    for (let i = 0; i < 5; i++) {
      let rand = Math.round(Math.random() * (this.moneyList.length - 1));
      this.sandbox.push(this.moneyList[rand]);
    }
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