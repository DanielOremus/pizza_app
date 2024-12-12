<template>
  <v-container max-width="500px">
    <v-card
      color="rgb(10,10,10)"
      border="opacity-75 sm"
      class="px-10 pb-10 pt-5 border-background mx-auto rounded-lg"
    >
      <v-card-title class="text-h4 text-center mb-8">Sign up</v-card-title>
      <v-form
        @submit.prevent="onSubmit"
        validate-on="input"
        v-model="form"
        class="d-flex flex-column ga-3"
      >
        <v-text-field
          name="firstName"
          label="First Name"
          variant="outlined"
          v-model="firstName.value"
          :rules="firstName.rules"
        ></v-text-field>

        <v-text-field
          name="lastName"
          label="Last Name"
          variant="outlined"
          v-model="lastName.value"
          :rules="lastName.rules"
        ></v-text-field>

        <v-text-field
          name="email"
          ref="emailField"
          type="email"
          label="Email"
          variant="outlined"
          v-model="email.value"
          :rules="email.rules"
          :error-messages="email.errorMessages"
        ></v-text-field>

        <v-text-field
          name="password"
          label="Password"
          variant="outlined"
          v-model="password.value"
          :rules="password.rules"
        ></v-text-field>

        <v-text-field
          label="Confirm Password"
          variant="outlined"
          ref="confirmPasswordField"
          v-model="confirmPassword.value"
          :rules="confirmPassword.rules"
        ></v-text-field>

        <v-row>
          <v-col>
            <v-card-text @click="$router.push({ name: 'LoginPage' })">
              <span
                class="text-grey-darken-1 cursor-pointer text-decoration-underline"
              >
                Already have an account?
              </span>
            </v-card-text>
            <v-btn
              color="grey-lighten-2"
              class="w-100 font-weight-bold"
              type="submit"
              :disabled="!isDataValid"
              >Sign Up</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "SignUpForm",
  data() {
    return {
      form: false,
      firstName: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "First name is required"
            return true
          },
        ],
      },
      lastName: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "Last name is required"
            return true
          },
        ],
      },
      email: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "Email is required"
            return true
          },
          (value) => {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
              return "Oops! That doesn’t look like a valid email address"
            return true
          },
        ],
        errorMessages: [],
      },
      password: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "Password is required"
            return true
          },
          (value) => {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))
              return "Password must include 8+ characters, a letter, and a number"
            return true
          },
        ],
      },
      confirmPassword: {
        value: null,
        rules: [
          (value) => {
            if (value !== this.password.value)
              return "Your passwords don’t match"
            return true
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters("user", ["isAuthenticated"]),
    isDataValid() {
      return this.form
    },
  },
  methods: {
    ...mapActions("user", ["signup"]),
    async onSubmit() {
      try {
        const errors = await this.signup({
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,
          password: this.password.value,
        })
        if (errors?.length > 0) {
          for (const errObj of errors) {
            this[errObj.field].errorMessages = [errObj.message]
          }
          return
        }
        this.$router.push({ name: "HomePage" })
      } catch (error) {
        console.log(error)
      }
    },
  },
  watch: {
    "password.value"(newValue, oldValue) {
      if (newValue !== this.confirmPassword.value) {
        this.$refs.confirmPasswordField.validate()
      } else {
        this.$refs.confirmPasswordField.resetValidation()
      }
    },
    "email.value"(newValue, oldValue) {
      this.email.errorMessages = []
    },
  },
  beforeMount() {
    if (this.isAuthenticated) this.$router.push({ name: "HomePage" })
  },
}
</script>

<style lang="scss" scoped>
.card {
  color: rgb(26, 26, 26);
}
</style>
