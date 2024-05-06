<script setup>
import Loader from "../../components/Spinner/Loader.vue"
import useOrders from "../../composables/order.js";
import {onMounted, reactive, ref, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const {errors, order, getOrder, updateOrder} = useOrders();

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const isUpdateLoading = ref(false);

const orderStatuses = ref([
  {id: 'Order_Placed', name: 'Order_Placed'},
  {id: 'Processing', name: 'Processing'},
  {id: 'Shipped', name: 'Shipped'},
  {id: 'Delivered', name: 'Delivered'},
  {id: 'Cancelled', name: 'Cancelled'}
])

const $externalResults = reactive({});

const rules = {
  order_status: {
    required : helpers.withMessage("The order status field is required", required),
  },
};

const handleGetOrder = async () => {
  try {
    isLoading.value = true;
    await getOrder(route.params.id)
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
  }
}

const createData = reactive({
  order_status: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const handleUpdateOrder = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isUpdateLoading.value = true;
      await updateOrder(data, route.params.id)
      createData.order_status = order.value?.status
      isUpdateLoading.value = false;
    } catch (err) {
      isUpdateLoading.value = false;
    }
  }
}

onMounted(async () => {
  await handleGetOrder();
});
</script>

<template>
  <div class="bg-gray-50">

    <main class="max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
        <div class="flex sm:items-baseline sm:space-x-4">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Orders</h1>
        </div>

      </div>
      <Loader v-if="isLoading"/>
      <!-- Products -->
      <section v-else aria-labelledby="products-heading" class="mt-6">
        <div v-if="!order">
          <h2>No Orders Available</h2>
        </div>
        <div v-else>
          <h2 id="products-heading" class="sr-only">Products purchased</h2>
          <div class="space-y-8">
            <div class="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
              <div class="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                <div class="sm:flex lg:col-span-7">
                  <div
                      class="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                    <img src="https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg"
                         alt="product.imageAlt" class="w-full h-full object-center object-cover sm:w-full sm:h-full"/>
                  </div>

                  <div class="mt-6 sm:mt-0 sm:ml-6">
                    <h3 class="text-base font-medium text-gray-900">
                      <a href="product.href">{{ order?.product?.name }}</a>
                      <p class=" text-sm text-gray-500">
                        {{ order?.product?.category?.name }}
                      </p>
                    </h3>
                    <p class="mt-2 text-sm font-medium text-gray-900">Rs.{{ order?.total_gross_amount }}</p>
                    <p class="text-sm font-medium text-gray-900">Cash on Delivery</p>
                    <span v-if="order?.status === 'Cancelled'"
                          class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"> Cancelled </span>
                    <span v-if="order?.status === 'Delivered'"
                          class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"> Delivered </span>
                    <span v-if="order?.status === 'Order_Placed'"
                          class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"> Order Placed </span>
                    <span v-if="order?.status === 'Shipped'"
                          class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> Shipped </span>
                    <span v-if="order?.status === 'Processing'"
                          class="inline-flex items-center px-3 mt-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> Processing </span>
                  </div>
                </div>

                <div class="mt-6 lg:mt-0 lg:col-span-5">
                  <dl class="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <dt class="font-medium text-gray-900">Delivery address</dt>
                      <dd class="mt-3 text-gray-500">
                        <span class="block">{{ order?.country }}</span>
                        <span class="block">{{ order?.city }}</span>
                        <span class="block">{{ order?.state }}</span>
                        <span class="block">{{ order?.address }}</span>
                        <span class="block">{{ order?.post_code }}</span>
                      </dd>
                    </div>
                    <div>
                      <dt class="font-medium text-gray-900">Customer updates</dt>
                      <dd class="mt-3 text-gray-500 space-y-3">
                        <p>
                          {{ order?.first_name }}
                        </p>
                        <p>
                          {{ order?.last_name }}
                        </p>
                        <p>
                          {{ order?.email }}
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div class="sm:grid sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="country" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Order
                    Status </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-10">
                    <select id="order_status" name="order_status"
                            v-model="createData.order_status"
                            class="max-w-lg h-8 block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md">
                      <option v-for="orderStatus in orderStatuses" :key="orderStatus.id" :value="orderStatus.id">
                        {{ orderStatus.name }}
                      </option>
                    </select>
                    <template v-if="validate.order_status.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.order_status.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <div class="pt-5">
                    <div class="flex justify-end">
                      <router-link :to="{ name: 'orders'}">
                        <button type="button"
                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Cancel
                        </button>
                      </router-link>
                      <button
                          type="button"
                          @click="handleUpdateOrder(createData, validate)"
                          :disabled="isUpdateLoading"
                          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <svg v-if="isUpdateLoading" class="w-4 h-5 text-gray-300 animate-spin" viewBox="0 0 64 64"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path
                              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                              stroke="currentColor" stroke-width="5" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                          <path
                              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                              stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                              class="text-gray-900">
                          </path>
                        </svg>
                        {{ ' ' }}{{ isUpdateLoading ? 'Saving...' : 'Save' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

  </div>
</template>


