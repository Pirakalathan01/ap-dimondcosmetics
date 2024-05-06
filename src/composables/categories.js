import {createApp, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useToast} from 'vue-toast-notification';


export default function useCategories() {
    const category = ref([]);
    const categories = ref([]);
    const meta = ref(null);
    const errors = ref([]);
    const router = useRouter();
    const $toast = useToast();

    const getCategories = async (page,per_page) => {
        page = page || 1;
        per_page = per_page || 15;
        try {
            const response = await axios.get(
                `/api/admin/categories?page=${page}&per_page=${per_page}`
            );
            categories.value = response.data.data;
            meta.value = response.data.meta;
        } catch (error) {

        }
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get(
                `/api/admin/categories/all`
            );
            categories.value = response.data.data;
        } catch (error) {

        }
    };

    const getCategory = async (id) => {
        try {
            const response = await axios.get(
                `api/admin/categories/${id}`
            );
            category.value = response.data.data;
        } catch (error) {

        }
    };

    const storeCategory = async (data) => {
        try {
            errors.value = [];
            await axios.post(`api/admin/categories`, data);
            await router.push({name: "categories"});
            $toast.success('Category created successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    };

    const updateCategory = async (id, data) => {
        try {
            errors.value = [];
            await axios.put(`api/admin/categories/${id}`, data);
            await router.push({name: "categories"});
            $toast.success('Category updated successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            // await authStore.clearAuthUser(error.response?.status);
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };


    const destroyCategory = async (id) => {
        try {
            await axios.delete(`api/admin/categories/${id}`);
            $toast.success('Category deleted successfully',
                {
                    position: 'top-right'
                });
        } catch (error) {
            // await authStore.clearAuthUser(error.response?.status);
            // if (error.response.status === 422) {
            //     const app = createApp(NotDeleteWaringComponentCat);
            //     const container = document.createElement("div");
            //     document.body.appendChild(container);
            //     app.mount(container);
            // }
        }
    };

    return {
        category,
        categories,
        getCategory,
        getCategories,
        getAllCategories,
        storeCategory,
        updateCategory,
        destroyCategory,
        meta,
        errors,
    };
}
