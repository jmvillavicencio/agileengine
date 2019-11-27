<template>
  <v-app>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-toolbar-title class="headline text-uppercase brand">
        <router-link :to="{ name: 'Home' }" class="blue-grey--text text--darken-4">
          <span>TRANSACTION</span>
          <span class="font-weight-light">APP</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-progress-linear
        v-if="loadingApp"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

moment.locale('en');

export default {
  name: 'App',
  async mounted() {
    this.startLoadingApp();
    await this.userInitialize();
    this.endLoadingApp();
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['loadingApp']),
  },
  methods: {
    ...mapActions(['startLoadingApp', 'endLoadingApp']),
    ...mapActions('user', {
      userInitialize: 'initialize',
    }),
  },
};
</script>
