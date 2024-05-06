<script setup>
import {onMounted, ref} from "vue";
import Loader from "../../components/Spinner/Loader.vue"
import useCustomers from "../../composables/customers.js";


const {meta, customers, getCustomers} = useCustomers();
const isLoading = ref(false);


const paginationDetail = ref({
  per_page: 15,
  from: 0,
  to: 0,
  total: 0,
})
const page = ref(1)

const handleGetCustomers = async (page, per_page) => {
  try {
    isLoading.value = true;
    await getCustomers(page, per_page);
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


const onClickHandler = async (page) => {
  await handleGetCustomers(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await handleGetCustomers(page.value, paginationDetail.value.per_page);
});
</script>


<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Customers</h1>
        <p class="mt-2 text-sm text-gray-700">The Customers list provides an overview of available customers.</p>
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
                  First Name
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Last Name
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Phone Number
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </th>
              </tr>
              </thead>
              <tbody v-if="customers.length !== 0" class="divide-y divide-gray-200 bg-white">
              <tr v-for="customer in customers" :key="customer.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ customer.first_name }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ customer.last_name }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ customer.email }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ customer.phone_number }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ customer.is_active }}
                </td>
                <!--                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ product.description }}</td>-->
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

