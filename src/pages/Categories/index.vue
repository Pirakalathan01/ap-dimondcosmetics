<script setup>
import useCategories from "../../composables/categories.js";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import {onMounted, ref} from "vue";
import Loader from "../../components/Spinner/Loader.vue"


const { meta, categories, getCategories, destroyCategory} = useCategories();
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

const handleGetCategories = async (page, per_page) => {
  try {
    isLoading.value = true;
      await getCategories(page, per_page);
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

const handleDeleteCategory = async () => {
  try {
    deleteLoading.value = true;
    await destroyCategory(selectedId.value)
    openDeleteModel.value = false;
    deleteLoading.value = false;
    await handleGetCategories(page, paginationDetail.value.per_page);
  } catch (err) {
    isLoading.value = false;
  }
}

const onClickHandler = async (page) => {
  await handleGetCategories(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await handleGetCategories(page.value, paginationDetail.value.per_page);
});
</script>


<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Categories</h1>
        <p class="mt-2 text-sm text-gray-700">The Categories list provides an overview of available categories.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'category-create'}">
          <button type="button"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Add Category
          </button>
        </router-link>
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
                  Category Name
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Category Description
                </th>
                <th scope="col" class="relative py-3 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="relative py-3 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">delete</span>
                </th>
              </tr>
              </thead>
              <tbody v-if="categories.length > 0" class="divide-y divide-gray-200 bg-white">
              <tr v-for="category in categories" :key="category.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ category.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ category.description }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <router-link :to="{ name:'category-update', params: { id: category.id } }"
                               class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </router-link>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button class="text-red-600 hover:text-red-900" @click="() => openDelete(category.id)">
                    Delete
                  </button>
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
    <TransitionRoot as="template" :show="openDeleteModel">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="openDeleteModel = false">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Delete Category data </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to delete your Category data? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button"
                        @click="() => handleDeleteCategory()"
                        :disabled="deleteLoading"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >{{ deleteLoading ? 'Deleting...' : 'Delete' }}</button>
                <button type="button"
                        @click="openDeleteModel = false"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        ref="cancelButtonRef">Cancel</button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
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

