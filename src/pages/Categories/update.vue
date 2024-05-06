<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import {useRoute, useRouter} from "vue-router";
import Loader from "../../components/Spinner/Loader.vue"
import useCategories from "../../composables/categories.js";


const {errors, category, getCategory, updateCategory } = useCategories();

const router = useRouter();
const route = useRoute();

const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);

const rules = {
  name: {
    required: helpers.withMessage("The name field is required", required),
  },
  description: {
    required: helpers.withMessage("The description field is required", required),
  },
};

const createData = reactive({
  name: "",
  description: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const handleUpdateCategory = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await updateCategory(route.params.id, data);
      if (errors) {
        Object.assign($externalResults, errors.value);
      }
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const handleGetCategory = async () => {
  try {
    isGetLoading.value = true;
    await getCategory(route.params.id)
    createData.name = category.value?.name;
    createData.description = category.value?.description;
    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}

onMounted(async () => {
  await handleGetCategory()
});

</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Update Categories</h1>
        <p class="mt-2 text-sm text-gray-700"> Update needed categories</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'categories'}">
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
        :loading="isLoading"
        :validate="validate"
        @save-data="handleUpdateCategory"
    />
  </div>

</template>


