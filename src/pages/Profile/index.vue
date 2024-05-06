<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import {useRoute, useRouter} from "vue-router";
import Loader from "../../components/Spinner/Loader.vue"
import {useAdminStore} from "../../stores/admin.js";
import {useAuthStore} from "../../stores/auth.js";


const router = useRouter();
const route = useRoute();
const isAdmin = ref(false)
const adminStore = useAdminStore();
const authStore = useAuthStore();
const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);

const rules = {
  title: {
    required: helpers.withMessage("The title field is required", required),
  },
  first_name: {
    required: helpers.withMessage("The first name field is required", required),
  },
  last_name: {
    required: helpers.withMessage("The last name field is required", required),
  },
  email: {
    required: helpers.withMessage("The email field is required", required),
    email
  },
  gender: {
    required: helpers.withMessage("The gender field is required", required),
  },
  phone_number: {
    required: helpers.withMessage("The phone_number field is required", required),
  },
};

const createData = reactive({
  title: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  phone_number: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const updateUser = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
        await adminStore.updateAdmin(route.params.id, data);
        // await router.push({ name: 'dashboard' })
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const getAdmin = async () => {
  try {
    isGetLoading.value = true;
    await adminStore.getAdmin(route.params.id)
    createData.title = adminStore.admin?.title;
    createData.first_name = adminStore.admin?.first_name;
    createData.last_name = adminStore.admin?.last_name;
    createData.email = adminStore.admin?.email;
    createData.gender = adminStore.admin?.gender;
    createData.phone_number = adminStore.admin?.phone_number;

    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}



onMounted(async () => {
  await getAdmin()
});

</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Update Profile</h1>
        <p class="mt-2 text-sm text-gray-700"> Update profile</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'dashboard'}">
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
        @save-data="updateUser"
    />
  </div>

</template>


