<script setup>
import {ref, watchEffect, defineProps} from "vue";

// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append('image', file);
//
// };

const props = defineProps({
  data: {
    type: Object,
  },
  categories: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
  validate: {
    type: Object,
  },
});



// const handleImageUpload = (event) => {
//   const fileInput = event.target;
//   if (fileInput.files && fileInput.files.length > 0) {
//     const file = fileInput.files[0];
//     const imageUrl = URL.createObjectURL(file);
//
//     const formData = new FormData();
//     formData.append("image", file);
//     uploadedImages.value.push({ image: formData, url: imageUrl });
//
//     handleImageSave(); // Call handleImageSave after adding the image
//   }
// };
//
// async function handleImageSave() {
//   if (uploadedImages.value.length > 0) {
//     // Assuming props.data is accessible here
//     props.data.product_image = uploadedImages.value[0].image;
//
//   }
// }



const uploadedImages = ref([]);
const imageUrl = ref('');

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  imageUrl.value = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append("image", file);

  // Push the new image data to the uploadedImages array
  uploadedImages.value.push({ image: formData, url: imageUrl.value });

  // Assign the entire uploadedImages array to props.data.product_image
  props.data.product_image = uploadedImages.value;
};

const removeImage = () => {
  imageUrl.value = '';
  uploadedImages.value = [];
  props.data.product_image = null;
};

const emits = defineEmits(["saveData"]);


watchEffect(async () => {

});

</script>
<template>
  <div class="flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <form class="space-y-8 divide-y divide-gray-200">
          <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class=" space-y-6  sm:space-y-5">

              <div class="space-y-6 sm:space-y-5">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Product
                    name </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="course_name" id="course_name"
                           v-model="validate.name.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.name.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.name.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>

                <div class="space-y-6 sm:space-y-5">
                  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="course_id" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Category
                    </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                      <select id="course_id" name="course_id"
                              v-model="validate.category_id.$model"
                              class="max-w-lg h-8 block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md">
                        <option v-for="category in categories" :key="category.id" :value="category.id" >{{ category.name }}</option>
                      </select>
                      <template v-if="validate.category_id.$error" class="text-left">
                        <div
                            v-for="(error, index) in validate.category_id.$errors"
                            :key="index"
                            class="mt-2 text-red-600 text-sm"
                        >
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="about" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Product
                    Description </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea id="description" name="description" rows="3"
                                  v-model="validate.description.$model"
                                  class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"/>
                    <p class="mt-2 text-sm text-gray-500">Write a few sentences about products.</p>
                    <template v-if="validate.description.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.description.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="about" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Product
                    Directions </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea id="description" name="description" rows="3"
                                  v-model="validate.directions.$model"
                                  class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"/>
                    <p class="mt-2 text-sm text-gray-500">Write a few sentences about products.</p>
                    <template v-if="validate.directions.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.description.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Price
                     </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="number" name="course_fee" id="course_fee"
                           v-model="validate.price.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.price.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.price.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> In Stock
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="number" name="course_fee" id="course_fee"
                           v-model="validate.in_stock.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.in_stock.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.in_stock.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="cover-photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Product image</label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="mx-auto h-24 w-24 rounded-md object-cover" />
                        <svg v-else class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                class="sr-only"
                                @change="handleImageUpload"
                            />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <button v-if="imageUrl" @click="removeImage" type="button" class="text-red-600 hover:text-red-500 focus:outline-none focus:text-red-500">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span class="sr-only">Remove Image</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <router-link :to="{ name: 'products'}">
              <button type="button"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              </router-link>
              <button
                  type="button"
                  @click="emits('saveData', data, validate)"
                  :disabled="loading"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg v-if="loading" class="w-4 h-5 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                  </path>
                </svg>
                {{' '}}{{ loading? 'Saving...' : 'Save' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



