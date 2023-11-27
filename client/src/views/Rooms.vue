<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
        <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
            <v-text-field @update:modelValue="debounceSearch" :placeholder="t('search')" append-inner-icon="mdi-magnify" hide-details flat density="compact" variant="solo"></v-text-field>
        </v-col>
        <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
            <v-menu transition="fade-transition">
                <template #activator="{ props }">
                    <v-btn v-bind="props" flat color="primary" size="43" width="100%">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <v-list elevation="2" density="compact">
                    <v-list-item link @click="dialog=true">
                        <template #prepend>
                            <v-icon style="margin-inline-end: 16px !important">mdi-package</v-icon>
                        </template>
                        <v-list-item-title class="text-caption">{{ t("rooms.add_room") }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="drawer=true">
                        <template #prepend>
                            <v-icon style="margin-inline-end: 16px !important">mdi-view-list</v-icon>
                        </template>
                        <v-list-item-title class="text-caption">{{ t("rooms.add_room_type") }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-col>
        <v-col cols="12">
            <v-card flat>
                <v-card-title class="px-4 pt-3">{{ t("rooms.title") }}</v-card-title>
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
                            <template #item.booked="{ item }">
                                <td :data-label="t('rooms.booking')">
                                    <v-chip label :color="item.booked?'red-accent-3':'green-accent-3'" variant="flat">
                                        {{ (item.booked?{en:'Booked',ru:"Бронировано",uz:"Egallangan"}:{en:'Empty',ru:"Пустой",uz:"Bo'sh"})[locale]}}
                                    </v-chip>
                                </td>
                            </template>
                            <template #item.name="{ item }">
                                <td :data-label="t('rooms.room_no')">
                                    {{ item.name }}
                                </td>
                            </template>
                            <template #item.type="{ item }">
                                <td :data-label="t('rooms.room_type')">
                                    {{ item.type?.name }}
                                </td>
                            </template>
                            <template #item.price="{ item }">
                                <td :data-label="t('price')">
                                    {{ item.price }}
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
    <v-dialog v-model="drawer" width="500" transition="fade-transition">
        <v-card elevation="1">
            <v-card-title class="px-5 d-flex justify-space-between align-center">
                <span>{{ t("rooms.room_type") }}</span>
                <v-btn flat @click="clearType(true)" size="32" color="primary"><v-icon size="small">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text class="px-5 py-4">
                <v-row>
                    <v-col cols="12" class="pb-0 pt-0">
                        <span class="text-body-2 text-grey">{{ t('rooms.room_type') }}</span>
                        <v-text-field @click:clear="clearType(false)" v-model="typeItem.name" clearable clear-icon="mdi-close" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn @click="saveType" :disabled="!typeItem.name?.trim()" height="40" class="mt-1" color="primary" block flat>{{ t("save") }}</v-btn>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                        <v-table height="100%" density="comfortable">
                            <thead>
                            <tr>
                                <th class="text-left text-caption">{{ t("rooms.room_type") }}</th>
                                <th class="text-right text-caption">{{ t("actions") }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item, i in types" :key="i">
                                <td class="text-body-2">{{ item.name }}</td>
                                <td class="d-flex align-center justify-end">
                                    <v-btn size="30" variant="flat" color="primary" @click="selectType(item)">
                                        <v-icon size="18">mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn size="30" variant="flat" color="primary" class="ml-1">
                                        <v-icon size="18" @click="deleteType(i, item.id)">mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="500" transition="fade-transition">
        <v-card elevation="1">
            <v-card-title class="px-5 d-flex justify-space-between align-center">
                <span>{{ t("rooms.title") }}</span>
                <v-btn flat @click="dialog=false" size="32" color="primary"><v-icon size="small">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text class="px-5 py-4">
                <v-form class="w-100" ref="form">
                    <v-row>
                        <v-col cols="12" class="pb-0 pt-0">
                            <span class="text-body-2 text-grey">{{ t("rooms.room_no") }}</span>
                            <v-text-field :rules="namerules" v-model="roomItem.name" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("rooms.room_type") }}</span>
                            <v-select :items="types" :rules="namerules" item-title="name" item-value="id" v-model="roomItem.type" transition="fade-transition" class="mt-1" hide-details density="compact" flat variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("price") }}</span>
                            <v-text-field :rules="namerules" v-model="roomItem.price" class="mt-1" type="number" min="0" hide-details density="compact" placeholder="0.00 $" flat variant="outlined"></v-text-field>
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
import * as roomTypeApi from '../api/roomtype'
import * as roomApi from '../api/room'
import { debounce } from 'lodash'
import { IRoom, IRoomType } from '../interfaces'

const headers = [
    { title: 'rooms.room_no', key: 'name', sortable: true },
    { title: 'rooms.room_type', key: 'type', sortable: false },
    { title: 'price', key: 'price', sortable: true },
    { title: 'rooms.booking', key: 'booked', sortable: false },
    { title: 'actions', key: 'actions', sortable: false, align: 'end' },
]

const { t, locale } = useI18n()

const drawer = ref(false)
const dialog = ref(false)
const form = ref<any>(null)
const items = ref<IRoom[]>([])
const types = ref<IRoomType[]>([])

const typeItem = ref({
    name: ""
})
const editedTypeId = ref<string|null>(null)

const roomItem = ref<IRoom|any>({
    name: "",
    type: null,
    price: 0,
})
const editedRoomId = ref<string|null>(null)

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

// Types

const init = async () => {
    const { data } = await roomTypeApi.get_types()
    if(data.status === "ok") types.value = data.types
}

const saveType = async () => {
    if(editedTypeId.value) {
        const { data } = await roomTypeApi.update_type(editedTypeId.value, typeItem.value)
        if(data.status !== "ok") return
        const index = types.value.findIndex(t => t.id === editedTypeId.value)
        Object.assign(types.value[index], data.result)
    }else{
        const { data } = await roomTypeApi.create_type(typeItem.value)
        if(data.status !== "ok") return
        types.value.push(data.result as IRoomType)
    }
    clearType(false)
}

const deleteType = async (i: number, id: string) => {
    if(!confirm(t("delete_confirm_text"))) return
    
    await roomTypeApi.delete_type(id)
    types.value.splice(i, 1)
}

const selectType = (item: IRoomType) => {
    editedTypeId.value = item.id
    typeItem.value = Object.assign({}, item)
}

const clearType = (close: boolean) => {
    if(close) drawer.value = false

    editedTypeId.value = null
    typeItem.value = Object.assign({}, { name: "" })
}

// Room

const validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
}

const loadItems = async () => {
    loading.value = true
    const { data } = await roomApi.get_rooms(qs.value)

    if(data.status === "ok") {
        items.value = data.result
        
        totalCount.value = data.totalCount
    }
    loading.value = false
}

const save = async () => {
    if(editedRoomId.value) {
        roomItem.value.type_id = roomItem.value.type.id
        const { data } = await roomApi.update_room(editedRoomId.value, roomItem.value)
        if(data.status !== "ok") return
        const index = items.value.findIndex(t => t.id === editedRoomId.value)
        Object.assign(items.value[index], data.result)
    }else {
        const { data } = await roomApi.create_room(roomItem.value)
        if(data.status !== "ok") return
        items.value.push(data.result)
    }

    close()
}

const editItem = (item: IRoom) => {
    editedRoomId.value = item.id;
    roomItem.value = Object.assign({}, item);
    dialog.value = true;
}

const deleteItem = async (i: number, id: string) => {
    if(!confirm("Ushbu malumotni o'chirmoqchimisiz?")) return

    await roomApi.delete_room(id)
    items.value.splice(i, 1);
}

const close = () => {
    dialog.value = false;
    nextTick(() => {
        roomItem.value = Object.assign({}, {
            name: "",
            type: null,
            price: 0,
        });
        editedRoomId.value = null;
        form.value?.reset()
    });
}

init()

watch(dialog, (v) => v || close())
</script>