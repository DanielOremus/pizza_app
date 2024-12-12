<template>
  <tr class="text-center text-body-1">
    <td class="pa-3">
      <v-img
        :src="meal.image ? meal.image : '/no-image.jpg'"
        width="100px"
      ></v-img>
    </td>
    <td>{{ meal.title }}</td>
    <td>{{ meal.category.title }}</td>
    <td>
      {{
        !this.validateAmount(amountCounter.value || "")
          ? meal.price
          : meal.price * amountCounter.value
      }}
    </td>
    <td class="amount-controls">
      <div class="d-flex align-center ga-2">
        <v-btn color="grey-lighten-1" class="text-h6" @click="onAmountChange(1)"
          >+</v-btn
        >

        <v-text-field
          type="number"
          hide-spin-buttons
          max-width="80px"
          hide-details
          variant="outlined"
          class=""
          v-model="amountCounter.value"
          @keydown="preventNonNumeric"
          :rules="amountCounter.rules"
        ></v-text-field>

        <v-btn
          color="grey-lighten-1"
          class="text-h6"
          :disabled="isBtnDisabled"
          @click="onAmountChange(-1)"
        >
          -</v-btn
        >
      </div>
    </td>
    <td>
      <v-btn color="error" @click="onMealDelete()">Delete</v-btn>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "CartCard",
  data() {
    return {
      isWatcherEnabled: false,
      amountCounter: {
        value: null,
        rules: [
          (value) =>
            (value && value > 0 && value <= 100) || "Amount must be 1 - 100",
        ],
      },
    }
  },
  props: {
    meal: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isBtnDisabled() {
      return this.amountCounter.value <= 1
    },
  },
  methods: {
    ...mapActions("cart", ["deleteMealFromCart", "updateMealAmount"]),
    onAmountChange(deltaValue) {
      this.amountCounter.value =
        (parseInt(this.amountCounter.value) || 1) + deltaValue
    },
    onMealDelete() {
      this.deleteMealFromCart(this.meal._id)
    },
    preventNonNumeric(event) {
      if (event.key.length === 1 && !/[0-9]/.test(event.key))
        event.preventDefault()
    },
    validateAmount(value) {
      const strValue = value.toString()
      return strValue[0] !== "0" && isFinite(value) && value > 0 && value <= 100
    },
  },
  watch: {
    "amountCounter.value": {
      handler(newValue, oldValue) {
        if (!this.isWatcherEnabled) return

        const isValid = this.validateAmount(newValue)
        if (isValid) {
          this.updateMealAmount({ mealId: this.meal._id, amount: newValue })
        }
      },
    },
  },
  mounted() {
    this.amountCounter.value = this.amount
    this.$nextTick(() => {
      this.isWatcherEnabled = true
    })
  },
}
</script>

<style lang="scss" scoped>
td {
  padding-inline: 20px;
}
td.amount-controls {
  vertical-align: middle;
}
</style>
