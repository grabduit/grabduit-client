<template>
  <div class="home" >
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <audio autoplay> -->
      <!-- <source src="../assets/PriceTag.mp3" type="audio/mp3"> -->
      <!-- Your browser does not support the audio element. -->
    <!-- </audio> -->

    <b-container>
      <b-row class="justify-content-center">
        <register/>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
  div .home {
    background-image: url("https://www.publicdomainpictures.net/pictures/10000/velka/1-1270131779OPru.jpg");
    background-attachment: fixed;
    background-position: bottom;
  }
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import draggable from 'vuedraggable';
import register from '@/components/register.vue';
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    // draggable,
    // HelloWorld,
    register
  },
  computed: {
    ...mapState(['audio'])
  },
  created() {
    if (localStorage.getItem('name') && localStorage.getItem('playerId')) {
      this.$router.push('/rooms');
    } else {
      this.audio.play();
    }
  },
  data () {
    return {

    }
  },
  methods: {
    
  }
}
</script>
