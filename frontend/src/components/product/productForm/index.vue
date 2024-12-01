<template>
  <v-card class="bg-black pa-10 w-50 mx-auto rounded-lg" variant="outlined">
    <v-form @submit.prevent="onSubmit" validate-on="input" v-model="form">
      <v-file-input
        label="Image"
        variant="outlined"
        accept="image/*"
        v-model="image.value"
      ></v-file-input>
      <v-text-field
        name="title"
        label="Title"
        variant="outlined"
        v-model="title.value"
        :rules="title.rules"
        :counter="20"
      ></v-text-field>

      <v-text-field
        name="price"
        label="Price"
        variant="outlined"
        v-model="price.value"
        :rules="price.rules"
      ></v-text-field>

      <v-text-field
        label="Description"
        name="description"
        variant="outlined"
        :rules="description.rules"
        textarea
        v-model="description.value"
      ></v-text-field>
      <v-select
        :items="categoryList"
        item-title="title"
        item-value="_id"
        variant="outlined"
        v-model="category.value"
        label="Category"
        :rules="category.rules"
      ></v-select>
      <v-row>
        <v-col>
          <v-btn
            color="success"
            class="w-100 font-weight-bold"
            type="submit"
            :disabled="!isDataValid"
            >{{ btnTitle }}</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            color="error"
            class="w-100 font-weight-bold"
            type="button"
            @click="onBackToMenu"
            >Back to Menu</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductForm",
  data() {
    return {
      productId: null,
      form: false,
      image: {
        value: null,
      },
      title: {
        value: null,
        rules: [
          (value) => {
            if (!value?.trim()) return "Title is required"
            return true
          },
        ],
      },
      price: {
        value: null,
        rules: [
          (val) => {
            if (isNaN(val)) return "Price must be a number"
            return true
          },
          (val) => {
            if (val <= 0) return "Price must be positive"
            return true
          },
        ],
      },
      description: {
        value: "",
        rules: [
          (val) => {
            if (val?.trim().length < 10)
              return "Description must be at least 10 characters long"
            return true
          },
        ],
      },
      category: {
        value: null,
        rules: [
          (val) => {
            if (!val) return "Category must be attached"
            return true
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters("categories", ["categoryList"]),

    isDataValid() {
      return this.form
    },
    btnTitle() {
      if (this.productId) return "Update"
      return "Create"
    },
  },
  methods: {
    ...mapActions("products", ["loadById", "addProduct", "updateProduct"]),
    ...mapActions("categories", ["loadList"]),
    async onSubmit() {
      const data = {
        image: this.image.value,
        title: this.title.value,
        price: this.price.value,
        description: this.description.value,
        category: this.category.value,
      }
      if (!this.productId) await this.addProduct(data)
      else
        await this.updateProduct({ newData: data, productId: this.productId })

      console.log(222)

      this.$router.push({ name: "MenuPage" })
    },
    async setProduct() {
      if (!this.productId) return
      try {
        const { meal } = await this.loadById(this.productId)
        console.log(meal)

        this.setInputValues(meal)
      } catch (error) {
        console.log(error)
      }
    },
    setInputValues(product) {
      this.title.value = product.title
      this.price.value = product.price
      this.description.value = product.description
      this.category.value = product.category?._id
    },
    onBackToMenu() {
      this.$router.push({ name: "MenuPage" })
    },
  },
  async mounted() {
    this.productId = this.$route.params.id ?? null

    await this.setProduct()
    await this.loadList()
  },
}
</script>

<style lang="scss" scoped></style>
