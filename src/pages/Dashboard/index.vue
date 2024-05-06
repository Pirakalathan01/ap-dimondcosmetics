<script setup>
import {onMounted, ref} from 'vue'
import {
  CashIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  AtSymbolIcon,
} from '@heroicons/vue/solid'
import {useAuthStore} from "../../stores/auth.js";
import {useDashboardStore} from "../../stores/dashboard.js";
import OverviewWidget from "../../components/Dashboard/OverviewWidget.vue";
import Loader from "../../components/Spinner/Loader.vue"
import UserWidget from "../../components/Dashboard/UserWidget.vue";


const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const sidebarOpen = ref(false)
const isLoading = ref(false);

const paginationDetail = ref({
  per_page: 15,
  from: 0,
  to: 0,
  total: 0,
})

const page = ref(1)


const getOverviewWidget = async () => {
  await dashboardStore.getOverviewWidget();
}



onMounted(async () => {
  isLoading.value = true;
  await getOverviewWidget();
  isLoading.value = false;
});


</script>

<template>
  <div class="min-h-full">

    <main class="flex-1 pb-8">
      <!-- User widget -->
      <UserWidget
          :data="authStore.user"
      />

      <Loader v-if="isLoading"/>

      <div v-else class="mt-8">

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
          <div v-if="dashboardStore.overviewWidget" class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Card -->
            <div v-for="overviewWidget in dashboardStore.overviewWidget" :key="overviewWidget.label">
              <OverviewWidget
                  :data = overviewWidget
              />
            </div>
          </div>
        </div>

<!--        <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">Recent-->
<!--          Enrollment Request-->
<!--        </h2>-->
        <!-- Activity table (small breakpoint and up) -->
<!--        <div class="hidden sm:block">-->
<!--          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">-->
<!--            <div class="flex flex-col mt-2">-->
<!--              <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">-->
<!--                <table class="min-w-full divide-y divide-gray-200">-->
<!--                  <thead>-->
<!--                  <tr>-->
<!--                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">-->
<!--                      Course Code-->
<!--                    </th>-->
<!--                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">-->
<!--                      Course Name-->
<!--                    </th>-->
<!--                    <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">-->
<!--                      Student Email-->
<!--                    </th>-->
<!--                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">-->
<!--                      Student Name-->
<!--                    </th>-->
<!--                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">-->
<!--                      status-->
<!--                    </th>-->
<!--                    <th scope="col" class="relative py-3 pl-3 pr-4 sm:pr-6">-->
<!--                      <span class="sr-only">Edit</span>-->
<!--                    </th>-->
<!--                  </tr>-->
<!--                  </thead>-->
<!--                  <tbody v-if="dashboardStore.enrollments.length > 0" class="bg-white divide-y divide-gray-200">-->
<!--                  <tr v-for="enrollment in dashboardStore.enrollments" :key="enrollment.id" class="bg-white">-->
<!--                    <td class="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">-->
<!--                      <div class="flex">-->
<!--                        <p class="text-gray-500 truncate group-hover:text-gray-900">-->
<!--                           <span class="text-gray-900 font-medium">-->
<!--                          {{ enrollment.course.course_code }}-->
<!--                           </span>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </td>-->
<!--                    <td class="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">-->
<!--                      <div class="flex">-->
<!--                        <p class="text-gray-500 truncate group-hover:text-gray-900">-->
<!--                          {{ enrollment.course.course_name }}-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </td>-->
<!--                    <td class="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">-->
<!--                      <div class="flex">-->
<!--                        <p class="text-gray-500 truncate group-hover:text-gray-900">-->
<!--                          {{ enrollment.user.email }}-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </td>-->
<!--                    <td class="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">-->
<!--                      <div class="flex">-->
<!--                        <p class="text-gray-500 truncate group-hover:text-gray-900">-->
<!--                          {{ enrollment.user.first_name }}-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </td>-->
<!--                    <td class="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">-->
<!--                      <div class="flex">-->
<!--                        <p class="text-gray-500 truncate group-hover:text-gray-900">-->
<!--                          <span v-if="enrollment.status === 'Requested'" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> Requested </span>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </td>-->
<!--                    <td class="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">-->
<!--                      <router-link :to="{ name:'enrollment-update', params: { id: enrollment.id } }"-->
<!--                                   class="text-indigo-600 hover:text-indigo-900">-->
<!--                        Edit-->
<!--                      </router-link>-->
<!--                    </td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
<!--                </table>-->
<!--                &lt;!&ndash; Pagination &ndash;&gt;-->
<!--                <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"-->
<!--                     aria-label="Pagination">-->
<!--                  <div class="hidden sm:block">-->
<!--                    <p class="text-sm text-gray-700">-->
<!--                      Showing-->
<!--                      {{ ' ' }}-->
<!--                      <span class="font-medium">{{ paginationDetail?.from }}</span>-->
<!--                      {{ ' ' }}-->
<!--                      to-->
<!--                      {{ ' ' }}-->
<!--                      <span class="font-medium">{{ paginationDetail?.to }}</span>-->
<!--                      {{ ' ' }}-->
<!--                      of-->
<!--                      {{ ' ' }}-->
<!--                      <span class="font-medium">{{ paginationDetail?.total }}</span>-->
<!--                      {{ ' ' }}-->
<!--                      results-->
<!--                    </p>-->
<!--                  </div>-->
<!--                  <div>-->
<!--                    <vue-awesome-paginate-->
<!--                        :total-items="paginationDetail.total"-->
<!--                        :items-per-page="paginationDetail.per_page"-->
<!--                        :max-pages-shown="3"-->
<!--                        v-model="page"-->
<!--                        :on-click="onClickHandler"-->
<!--                    />-->
<!--                  </div>-->
<!--                </nav>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </main>
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
