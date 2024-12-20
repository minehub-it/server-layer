import {required, maxLength, minLength} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import slugify from "slugify";

export const useServerAddStore = defineStore('server/add', () => {
    const fieldName = ref('')
    const fieldAddress = ref('')
    const fieldCategories = ref([])
    const fieldPlatform = ref(['je'])

    const href = computed(() => {
        return `https://github.com/minehub-it/server/new/main/list?filename=/${slugify(fieldName.value).toLowerCase()}.md&value=---%0Aname: "${fieldName.value}"%0Aaddress: "${fieldAddress.value.toLowerCase()}"%0Aplatform: [ "${fieldPlatform.value.join(', ')}" ]%0Acategories: [ "${fieldCategories.value.join('", "')}" ]%0A---`
    })

    const rules = {
        fieldName: {
            required,
            maxLength: maxLength(32)
        },
        fieldAddress: {
            required,
            maxLength: maxLength(128)
        },
        fieldCategories: {
            required,
        },
        fieldPlatform: {
            required,
        },
    }

    const $v = useVuelidate(rules, {
        fieldName,
        fieldAddress,
        fieldCategories,
        fieldPlatform,
    }, {
        $lazy: true
    })

    function reset() {
        fieldName.value = fieldAddress.value = ""
        fieldCategories.value = []
        fieldPlatform.value = ["je"]

        $v.value.$reset()
    }

    return {
        rules,
        $v,
        fieldName,
        fieldAddress,
        fieldCategories,
        fieldPlatform,
        href,
        reset,
    }
})

