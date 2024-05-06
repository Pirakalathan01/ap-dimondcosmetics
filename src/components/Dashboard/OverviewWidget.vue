<script setup>
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  ClipboardCheckIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UsersIcon,
  ArrowRightIcon,
  CheckIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/vue/outline'

const props = defineProps({
  data: {
    type: Object,
  },
});

</script>


<template>
  <!-- Card -->
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <component v-if=" data.label === 'Requested'" :is="ArrowRightIcon" class="h-6 w-6 text-gray-400" aria-hidden="true"/>
          <component v-if=" data.label === 'Enrolled'" :is="ClipboardCheckIcon" class="h-6 w-6 text-gray-400" aria-hidden="true"/>
          <component v-if=" data.label === 'Completed'" :is="BadgeCheckIcon" class="h-6 w-6 text-gray-400" aria-hidden="true"/>
          <component v-if=" data.label === 'Students'" :is="UsersIcon" class="h-6 w-6 text-gray-400" aria-hidden="true"/>
          <component v-if=" data.label === 'Courses'" :is="ScaleIcon" class="h-6 w-6 text-gray-400" aria-hidden="true"/>
          <component v-if=" data.label === 'Enrollments'" :is="BadgeCheckIcon" class="h-6 w-6 text-gray-400" aria-hidden="true"/>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ data.label }}
            </dt>
            <dd>
              <div class="text-lg font-medium text-gray-900">
                {{ data.count }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-5 py-3">
      <div class="text-sm">
<!--        <a href="" class="font-medium text-cyan-700 hover:text-cyan-900"> View all </a>-->
      </div>
    </div>
  </div>
</template>


