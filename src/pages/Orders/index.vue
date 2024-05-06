<script setup>
import useProducts from "../../composables/products.js";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import {onMounted, ref} from "vue";
import Loader from "../../components/Spinner/Loader.vue"
import useOrders from "../../composables/order.js";


const { meta, orders, getOrders} = useOrders();
const isLoading = ref(false);
const deleteLoading = ref(false)
const openDeleteModel =  ref(false);
const selectedId = ref('')

const paginationDetail = ref({
  per_page: 15,
  from: 0,
  to: 0,
  total: 0,
})
const page = ref(1)

const handleGetOrders = async (page, per_page) => {
  try {
    isLoading.value = true;
      await getOrders(page, per_page);
      if (meta) {
        paginationDetail.value.per_page = meta.value.per_page;
        paginationDetail.value.from = meta.value.from || 0;
        paginationDetail.value.to = meta.value.to || 0;
        paginationDetail.value.total = meta.value.total;
      }
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
  }
}

const openDelete = async (id) => {
  selectedId.value = id;
  openDeleteModel.value = true;
}


const onClickHandler = async (page) => {
  await handleGetOrders(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await handleGetOrders(page.value, paginationDetail.value.per_page);
});
</script>


<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Orders</h1>
        <p class="mt-2 text-sm text-gray-700">The Orders list provides an overview of available orders.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

      </div>
    </div>
    <Loader v-if="isLoading"/>
    <div v-else class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col"
                    class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                  Order Code
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Payment type
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Total amount
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th scope="col" class="relative py-3 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody v-if="orders.length !== 0" class="divide-y divide-gray-200 bg-white">
              <tr v-for="order in orders" :key="order.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6">
                  {{ order.identifier }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ order.email }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ order.payment_type }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ order.total_net_amount }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ order.status }}
                </td>
<!--                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ product.description }}</td>-->
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <router-link :to="{ name:'order-view', params: { id: order.id } }"
                               class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </router-link>
                </td>
              </tr>
              </tbody>
              <tbody v-else class="divide-y divide-gray-200 text-center">
              <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6" :colspan="6">
                   No details found.
                </td>
              </tr>
              </tbody>
            </table>
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing
                    {{ ' ' }}
                    <span class="font-medium">{{ paginationDetail?.from }}</span>
                    {{ ' ' }}
                    to
                    {{ ' ' }}
                    <span class="font-medium">{{ paginationDetail?.to }}</span>
                    {{ ' ' }}
                    of
                    {{ ' ' }}
                    <span class="font-medium">{{ paginationDetail?.total }}</span>
                    {{ ' ' }}
                    results
                  </p>
                </div>
                <div>
                  <vue-awesome-paginate
                      :total-items="paginationDetail.total"
                      :items-per-page="paginationDetail.per_page"
                      :max-pages-shown="3"
                      v-model="page"
                      :on-click="onClickHandler"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>

</template>
<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}

</style>

