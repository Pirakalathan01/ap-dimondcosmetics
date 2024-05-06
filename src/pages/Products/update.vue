<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import {useRoute, useRouter} from "vue-router";
import Loader from "../../components/Spinner/Loader.vue"
import useCategories from "../../composables/categories.js";
import useProducts from "../../composables/products.js";


const {errors, product, getProduct, updateProduct } = useProducts();
const {categories, getAllCategories } = useCategories();

const router = useRouter();
const route = useRoute();

const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);

const rules = {
  name: {
    required: helpers.withMessage("The name field is required", required),
  },
  category_id: {
    required: helpers.withMessage("The category field is required", required),
  },
  description: {
    required: helpers.withMessage("The description field is required", required),
  },
  directions: {
    required: helpers.withMessage("The directions field is required", required),
  },
  price: {
    required: helpers.withMessage("The price field is required", required),
  },
  in_stock: {
    required: helpers.withMessage("The stock field is required", required),
  },
};

const createData = reactive({
  name: "",
  category_id: "",
  description: "",
  directions: "",
  price: "",
  in_stock: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const handleUpdateProduct = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await updateProduct(route.params.id, data);
      if (errors) {
        Object.assign($externalResults, errors.value);
      }
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const handleGetProduct = async () => {
  try {
    isGetLoading.value = true;
    await getProduct(route.params.id)
    createData.name = product.value?.name;
    createData.category_id = product.value?.category_id;
    createData.description = product.value?.description;
    createData.directions = product.value?.directions;
    createData.price = product.value?.price;
    createData.in_stock = product.value?.in_stock;
    isGetLoading.value = false;
    console.log("createData",createData)
  } catch (err) {
    isGetLoading.value = false;
  }
}

const handleGetAllCategories = async () => {
  await getAllCategories();
}

onMounted(async () => {
  await handleGetProduct();
  await handleGetAllCategories();
});

</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Update Product</h1>
        <p class="mt-2 text-sm text-gray-700"> Update needed product</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'products'}">
          <button type="button"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Go Back
          </button>
        </router-link>
      </div>
    </div>
    <Loader v-if="isGetLoading"/>
    <Form
        v-else
        :data="createData"
        :categories="categories"
        :loading="isLoading"
        :validate="validate"
        @save-data="handleUpdateProduct"
    />
  </div>

</template>


