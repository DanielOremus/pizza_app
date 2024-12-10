<template>
  <v-container max-width="500px">
    <v-card
      color="rgb(10,10,10)"
      border="opacity-75 sm"
      class="px-10 pb-10 pt-5 border-background mx-auto rounded-lg"
    >
      <v-card-title class="text-h4 text-center mb-8">Log in</v-card-title>
      <v-form
        @submit.prevent="onSubmit"
        validate-on="input"
        v-model="form"
        class="d-flex flex-column ga-3"
      >
        <v-text-field
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          v-model="email.value"
          :rules="email.rules"
        ></v-text-field>

        <v-text-field
          name="password"
          label="Password"
          variant="outlined"
          v-model="password.value"
          :rules="password.rules"
        ></v-text-field>

        <v-row>
          <v-col>
            <v-btn
              color="success"
              class="w-100 font-weight-bold"
              type="submit"
              :disabled="!isDataValid"
              >Log in</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "LoginForm",
  data() {
    return {
      form: false,

      email: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "Email is required"
            return true
          },
        ],
      },
      password: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "Password is required"
            return true
          },
        ],
      },
    }
  },
  computed: {
    isDataValid() {
      return this.form
    },
  },
  methods: {
    ...mapActions("user", ["login"]),
    async onSubmit() {
      try {
        const successAuth = await this.login({
          email: this.email.value,
          password: this.password.value,
        })
        if (successAuth) this.$router.push({ name: "HomePage" })
      } catch (error) {
        console.log(error)
      }
    },
  },
  async mounted() {},
}
</script>

<style lang="scss" scoped>
.card {
  color: rgb(26, 26, 26);
}
</style>
