import {createApp, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useToast} from 'vue-toast-notification';


export default function useCustomers() {
    const customer = ref([]);
    const customers = ref([]);
    const meta = ref(null);
    const errors = ref([]);
    const router = useRouter();
    const $toast = useToast();

    const getCustomers = async (page,per_page) => {
        page = page || 1;
        per_page = per_page || 15;
        try {
            const response = await axios.get(
                `/api/admin/customers?page=${page}&per_page=${per_page}`
            );
            customers.value = response.data.data;
            meta.value = response.data.meta;
        } catch (error) {

        }
    };

    const getAllCustomers = async () => {
        try {
            const response = await axios.get(
                `/api/admin/customers/all`
            );
            customers.value = response.data.data;
        } catch (error) {

        }
    };

    const getCustomer = async (id) => {
        try {
            const response = await axios.get(
                `api/admin/customers/${id}`
            );
            customer.value = response.data.data;
        } catch (error) {

        }
    };



    return {
        customer,
        customers,
        getCustomer,
        getCustomers,
        getAllCustomers,
        meta,
        errors,
    };
}
