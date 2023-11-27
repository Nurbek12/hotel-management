<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
            <v-text-field @update:modelValue="debounceSearch" :placeholder="t('search')" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="solo"></v-text-field>
        </v-col>
        <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
            <v-btn @click="dialog=true" flat color="primary" size="43" width="100%">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-card flat>
                <v-card-title class="px-4 pt-3">{{ t("users.title") }}</v-card-title>
                <v-card-text class="px-0">
                    <div class="responsive-datatable">
                        <v-data-table-server 
                            v-model:items-per-page="perpage"
                            :search="search"
                            :items-length="totalCount"
                            :loading="loading"
                            :no-data-text="t('nodata')"
                            :loading-text="t('load_data')"

                            @update:options="loadItems"
                            :items="items" item-value="id"
                            :headers="(localizedHeaders as any)"
                            density="comfortable">
                            <template #bottom></template>
                            <template #item.actions="{ item, index }">
                                <td :data-label="t('actions')" class="d-flex justify-space-between align-center">
                                    <span></span>
                                    <div>
                                        <v-btn @click="editItem(item)" color="light-blue-accent-4" size="30" flat class="mr-1"><v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn @click="deleteItem(index, item.id)" color="light-blue-accent-4" size="30" flat><v-icon>mdi-delete</v-icon></v-btn>
                                    </div>
                                </td>
                            </template>
                            <template #item.role="{ item }">
                                <td :data-label="t('users.role')">
                                    <v-chip label color="green-accent-3" variant="flat">
                                        {{ t('users.'+{ADMIN:"admin", STAFF:"employe"}[item.role as "ADMIN"|"STAFF"]) }}
                                    </v-chip>
                                </td>
                            </template>
                            <template #item.name="{ item }">
                                <td :data-label="t('users.name')">
                                    {{ item.name }}
                                </td>
                            </template>
                            <template #item.phone="{ item }">
                                <td :data-label="t('booking.phone')">
                                    {{ item.phone }}
                                </td>
                            </template>
                            <template #item.email="{ item }">
                                <td :data-label="t('booking.email')">
                                    {{ item.email }}
                                </td>
                            </template>
                            <template #item.image="{ item }">
                                <td :data-label="t('users.image')">
                                    <v-avatar rounded size="35">
                                        <v-img cover :src="item?.image || '/icons/noimg.jpg'"></v-img>
                                    </v-avatar>
                                </td>
                            </template>
                        </v-data-table-server>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pt-0 pb-1 d-flex align-center">
            <v-select v-model="perpage" transition="fade-transition" hide-details flat density="compact" variant="solo" :items="items_per_page"></v-select>
            <v-text-field class="ml-3" hide-details flat density="compact" variant="solo" :model-value="perpagetext" readonly></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="pt-0 pl-0 pb-1 pr-2 d-flex justify-end align-center">
            <v-pagination v-model="page" :length="Math.ceil(totalCount / perpage)" @update:modelValue="loadItems" active-color="primary" size="40" total-visible="3" variant="flat"></v-pagination>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500" transition="fade-transition">
        <v-card elevation="1">
            <v-card-title class="px-5 d-flex justify-space-between align-center">
                <span>{{ t("users.title") }}</span>
                <v-btn flat @click="dialog=false" size="32" color="primary"><v-icon size="small">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text class="px-5 py-4">
                <v-form class="w-100" ref="form">
                    <v-row>
                        <v-col cols="12" class="pb-0 pt-0">
                            <span class="text-body-2 text-grey">{{ t("users.name") }}</span>
                            <v-text-field :rules="namerules" v-model="userItem.name" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.phone") }}</span>
                            <v-text-field v-model="userItem.phone" :rules="namerules" class="mt-1" hide-details density="compact" placeholder="998 XX XXX XX XX" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.email") }}</span>
                            <v-text-field v-model="userItem.email" :rules="namerules" class="mt-1" hide-details density="compact" placeholder="example@mail.com" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t('login.password') }}</span>
                            <v-text-field v-model="userItem.password"  class="mt-1" hide-details density="compact" flat variant="outlined"
                                autocomplete="off" color="primary" dirty
                                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'" :rules="!!editedUserId?[]:namerules"
                                @click:append-inner="show = !show"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("users.role") }}</span>
                            <v-select :items="userRoles" :rules="namerules" item-title="title" item-value="value" v-model="userItem.role" transition="fade-transition" class="mt-1" hide-details density="compact" flat variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("users.image") }}</span>
                            <v-file-input prepend-icon v-model="image" class="mt-1" chips hide-details density="compact" flat variant="outlined">
                                <template #prepend>
                                    <v-avatar rounded size="45">
                                        <v-img :src="imagesrc" cover></v-img>
                                    </v-avatar>
                                </template>
                            </v-file-input>
                        </v-col>
                        <v-col cols="12">
                            <v-btn height="40" class="mt-1" color="primary" block flat @click="validate">{{ t('save') }}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { namerules } from '../utils/rules'
import { items_per_page } from '../utils/items'
import { debounce } from 'lodash'
import * as userApi from '../api/user'
// import vMask from '@titou10/v-mask'
import { IUser } from '../interfaces'

const headers = [
    { title: 'users.image', key: 'image', sortable: true },
    { title: 'users.name', key: 'name', sortable: true },
    { title: 'booking.phone', key: 'phone', sortable: false },
    { title: 'booking.email', key: 'email', sortable: false },
    { title: 'users.role', key: 'role', sortable: false },
    { title: 'actions', key: 'actions', sortable: false, align: 'end' },
]

const { t } = useI18n()

const dialog = ref(false)
const show = ref(false)
const form = ref<any>(null)
const items = ref<IUser[]>([])
const userRoles = computed(() => [
    { title: t('users.admin'), value: "ADMIN" },
    { title: t('users.employe'), value: "STAFF" },
])

const userItem = ref<IUser|any>({
    name: "",
    email: "",
    phone: "",
    role: null
})
const image = ref<File[]>([])
const editedUserId = ref<string|null>(null)

const loading = ref(false)
const page = ref(1)
const perpage = ref(25)
const totalCount = ref(0)
const search = ref("")
const qs = computed(() => {
    const params = new URLSearchParams();

    if (page.value) 
        params.append('page', page.value as any)

    if (perpage.value) 
        params.append('perpage', perpage.value as any)

    if (search.value.trim())
        params.append('search', search.value)
    
    params.append('broadcast', "1")

    return params.toString()
})
const perpagetext = computed(() => {
    const page_1 = (page.value - 1) * perpage.value;
    return `${page_1 + 1}-${page_1 + items.value.length} / ${totalCount.value}`
})
const debounceSearch = debounce((e: string) => {
    search.value = e
    page.value = 1
}, 500)
const localizedHeaders = computed(() => {
    return headers.map(h => ({...h, title: t(h.title)}))
})
const imagesrc = computed(() => {
    if(image.value?.[0]) return URL.createObjectURL(image.value[0])
    if(userItem.value?.image) return userItem.value.image
    else return '/icons/noimg.jpg'
})

const validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
}

const loadItems = async () => {
    loading.value = true
    const { data } = await userApi.get_users(qs.value)

    if(data.status === "ok") {
        items.value = data.users
        totalCount.value = data.totalCount
    }
    loading.value = false
}

const save = async () => {
    const formdata = new FormData()
    if(image.value?.[0]) formdata.append('file',  image.value[0])
    if(userItem.value.password?.trim()) formdata.append('password',  userItem.value.password)
    formdata.append('email', userItem.value.email)
    formdata.append('name', userItem.value.name)
    formdata.append('phone', userItem.value.phone)
    formdata.append('role', userItem.value.role)
    if(!!editedUserId.value) {
        const { data } = await userApi.update_user(editedUserId.value, formdata)
        if(data.status !== "ok") return
        const index = items.value.findIndex(t => t.id === editedUserId.value)
        Object.assign(items.value[index], data.result)
    }else {
        const { data } = await userApi.create_user(formdata)
        if(data.status !== "ok") return
        items.value.push(data.user)
    }

    close()
}

const editItem = (item: IUser) => {
    editedUserId.value = item.id;
    userItem.value = Object.assign({}, item);
    dialog.value = true;
}

const deleteItem = async (i: number, id: string) => {
    if(!confirm("Ushbu malumotni o'chirmoqchimisiz?")) return

    await userApi.delete_user(id)
    items.value.splice(i, 1);
}

const close = () => {
    dialog.value = false;
    nextTick(() => {
        userItem.value = Object.assign({}, {
            name: "",
            email: "",
            phone: "",
            role: null
        });
        editedUserId.value = null;
        form.value?.reset()
    });
}

watch(dialog, (v) => v || close())
</script>