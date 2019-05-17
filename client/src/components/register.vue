<template>
  <b-col sm="5">
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-row style="height:100vh" align-v="center">
        <b-col>
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label-for="input-1">
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'register',
  computed: {
    ...mapState([
      'audio'
    ])
  },
  data () {
    return {
      form: {
        name: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit () {
      this.$store.commit('register', this.form.name);
      this.form.name = '';
      let audio = new Audio('./assets/hereMoney.mp3');
      this.audio.pause();
      this.$router.push('/rooms');
    }
  }
}
</script>
