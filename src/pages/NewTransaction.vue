<template>
  <v-container class="fill-height">
    <v-row class="justify-center">
      <custom-card width="400">
        <v-form @submit.prevent="submitTranscation">
          <h3 class="mb-6">
            {{ __('New Transaction') }}
          </h3>
          <v-text-field
            v-model="amount"
            :label="__('Amount')"
            name="amount"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="destinationAccount"
            :label="__('Destination Account')"
            name="destinationAccount"
            outlined
          ></v-text-field>
          <v-btn
            :loading="loading"
            color="primary"
            block
            rounded
            type="submit"
          >
            {{ __('Send') }}
          </v-btn>
        </v-form>
      </custom-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';
import Api from '../api';

export default {
  data() {
    return {
      amount: null,
      destinationAccount: null,
      loading: false,
      success: false,
      error: false,
    };
  },
  methods: {
    ...mapActions('user', {
      sendTransaction: 'sendTransaction',
    }),
    async submitTranscation() {
      this.error = false;
      this.success = false;
      this.loading = true;
      try {
        this.sendTransaction({
          amount: this.amount * -1,
          destinationAccount: this.destinationAccount,
        });
        this.success = true;
      } catch (e) {
        this.error = true;
      }
      this.loading = false;
    },
  },
};
</script>