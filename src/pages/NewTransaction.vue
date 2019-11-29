<template>
  <v-container class="fill-height pa-0 ma-0">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Your Transactions
          </v-list-item-title>
          <v-list-item-subtitle>
            Balance: {{ userBalance | currency }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list v-if="!selectedTransaction">
        <v-list-item
          v-if="!userTransactions || !userTransactions.length"
          class="text-center"
        >
          <v-list-item-content>
            <v-list-item-title><em>No transactions yet</em></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, index) in sortedUserTransactions">
          <v-list-item
            :key="item.title"
            link
          >
            <v-list-item-content>
              <v-list-item-title>Account: {{ item.destinationAccount }}</v-list-item-title>
              <v-list-item-subtitle>Amount: {{ item.amount | currency }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action @click.stop.prevent="selectTransaction(item)">
              <v-btn icon>
                <v-icon color="grey lighten-1">
                  mdi-information
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            :key="`divider-${index}`"
          ></v-divider>
        </template>
      </v-list>
      <v-list-item v-if="selectedTransaction">
        <v-list-item-content>
          <v-list-item-title class="subtitle-1">
            Amount: {{ selectedTransaction.amount |currency }}
          </v-list-item-title>
          <v-list-item-title class="subtitle-1">
            Destination Account: {{ selectedTransaction.destinationAccount }}
          </v-list-item-title>
          <v-list-item-title class="subtitle-1">
            Date: {{ selectedTransaction.date | formatDateTime }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template
        v-if="selectedTransaction"
        v-slot:append
      >
        <div class="pa-2">
          <v-btn
            block
            color="primary"
            @click="selectedTransaction = null"
          >
            Go Back
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-row class="justify-center">
      <custom-card width="400">
        <v-form
          ref="form"
          @submit.prevent="submitTranscation"
        >
          <h3 class="mb-6">
            {{ __('New Transaction') }}
          </h3>
          <v-alert
            v-if="success"
            dense
            text
            type="success"
          >
            Transaction was made succesfully.
          </v-alert>
          <v-alert
            v-if="error"
            dense
            text
            type="error"
          >
            {{ error || 'Oops! Something went wrong. Please, try again later' }}.
          </v-alert>
          <v-text-field
            v-model="amount"
            :label="__('Amount')"
            :rules="amountRules"
            name="amount"
            type="number"
            outlined
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="destinationAccount"
            :label="__('Destination Account')"
            :rules="destinationAccountRules"
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
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import { DEBIT_TRANSACTION } from '../constants';

export default {
  data() {
    return {
      amount: null,
      amountRules: [
        (v) => (!v || Number.isNaN(v) || v < 0) && 'Bad amount',
      ],
      destinationAccount: null,
      destinationAccountRules: [
        (v) => (!v) && 'Bad destination account',
      ],
      loading: false,
      success: false,
      error: false,
      selectedTransaction: null,
    };
  },
  computed: {
    ...mapGetters('user', [
      'userTransactions',
      'userBalance',
    ]),
    sortedUserTransactions() {
      return [...this.userTransactions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
  filters: {
    formatDateTime(value) {
      return moment(value).format('MM/DD/YYYY hh:mm');
    },
  },
  methods: {
    ...mapActions('user', {
      sendTransaction: 'sendTransaction',
    }),
    selectTransaction(transaction) {
      this.selectedTransaction = transaction;
    },
    async submitTranscation() {
      this.error = false;
      this.success = false;
      this.loading = true;
      if (this.$refs.form.validate()) {
        try {
          await this.sendTransaction({
            amount: this.amount,
            destinationAccount: this.destinationAccount,
            type: DEBIT_TRANSACTION,
          });
          this.$refs.form.reset();
          this.setSuccess();
        } catch (e) {
          this.error = this.handleAPIError(e.response.data.error);
        }
      }
      this.loading = false;
    },
    setSuccess() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 4000);
    },
  },
};
</script>
