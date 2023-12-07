<template>
  <v-container fluid>
    <v-row align="center" justify="space-between">
        <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
            <v-text-field @update:modelValue="debounceSearch" :placeholder="t('search')" append-inner-icon="mdi-magnify" flat hide-details density="compact" variant="solo"></v-text-field>
        </v-col>
        <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
            <v-btn flat @click="drawer=!drawer" color="primary" size="43" width="100%">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-card flat>
                <v-card-title class="px-4 pt-3">{{ t("booking.title") }}</v-card-title>
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
                            :items="items"
                            :headers="localizedHeaders"
                            density="comfortable">
                            <template #bottom></template>
                            <template #item.client="{ item }">
                                <td :data-label="t('booking.client')">
                                    {{ item.client }}
                                </td>
                            </template>
                            <template #item.room="{ item }">
                                <td :data-label="t('rooms.room_no')">
                                    {{ item.room?.name }}
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
                            <template #item.address="{ item }">
                                <td :data-label="t('booking.address')">
                                    {{ item.address }}
                                </td>
                            </template>
                            <template #item.total_price="{ item }">
                                <td :data-label="t('booking.total_amount')">
                                    {{ item.total_price }}
                                </td>
                            </template>
                            <template #item.room_type="{ item }">
                                <td :data-label="t('rooms.room_type')">
                                    {{ item.room_type?.name }}
                                </td>
                            </template>
                            <template #item.check_in="{ item }">
                                <td :data-label="t('booking.check_in')">
                                    {{ item.check_in }}
                                </td>
                            </template>
                            <template #item.check_out="{ item }">
                                <td :data-label="t('booking.check_out')">
                                    {{ item.check_out }}
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
            <v-pagination v-model="page" :length="Math.ceil(totalCount / perpage)" @update:modelValue="loadItems" size="40" total-visible="3" variant="flat" active-color="primary"></v-pagination>
        </v-col>
    </v-row>
    <v-dialog transition="fade-transition" v-model="drawer" max-width="600">
        <v-card>
            <v-card-title class="px-4 d-flex justify-space-between align-center">
                <span>{{ t("booking.create_booking") }}</span>
                <v-btn @click="drawer=false" flat size="30" color="primary"><v-icon size="small">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text class="px-4 py-3">
                <v-form ref="form">
                    <v-row>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("rooms.room_type") }}</span>
                            <v-select :rules="namerules" :items="types" v-model="item.room_type" return-object item-title="name" @update:modelValue="getRooms" transition="fade-transition" class="mt-1" hide-details density="compact" flat variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("rooms.room_no") }}</span>
                            <v-select v-model="item.room" :items="rooms" item-title="name" return-object :rules="namerules" transition="fade-transition" class="mt-1" hide-details density="compact" flat variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.check_in_date") }}</span>
                            <v-text-field v-model="item.check_in" :rules="namerules" class="mt-1" type="date" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.check_in_date") }}</span>
                            <v-text-field v-model="item.check_out" :rules="namerules" class="mt-1" type="date" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <v-divider></v-divider>
                        </v-col>
                        <v-col cols="4" sm="4" class="pb-0 pr-0">
                            <span class="text-body-2 text-grey">{{ t("booking.total_days") }}</span>
                            <v-text-field :model-value="differenceDays" class="mt-1" readonly hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="4" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.rent") }}</span>
                            <v-text-field type="number" min="1" :disabled="!item.room?.price" @update:modelValue="e => {if(item.room?.price !== undefined) item.room.price = e}" :model-value="item.room?.price || 0" :rules="namerules" class="mt-1" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.total_amount") }}</span>
                            <v-text-field @input="(e: any) => item.total_price = e.target.value" :model-value="differenceDays * (item.room?.price || 0)" type="number" class="mt-1" readonly hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                            <v-divider></v-divider>
                        </v-col>
                    
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.client") }}</span>
                            <v-text-field v-model="item.client" :rules="namerules" class="mt-1" hide-details density="compact" placeholder="" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.phone") }}</span>
                            <v-text-field v-model="item.phone" :rules="namerules" class="mt-1" type="text" hide-details density="compact"  placeholder="998 00 000 00 00" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.email") }}</span>
                            <v-text-field v-model="item.email" :rules="namerules" class="mt-1" hide-details density="compact" placeholder="example@mail.com" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.address") }}</span>
                            <v-text-field v-model="item.address" :rules="namerules" class="mt-1" type="text" hide-details density="compact" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.card_exp") }}</span>
                            <v-text-field :rules="namerules" class="mt-1" hide-details density="compact"  placeholder="00/00" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="6" class="pb-0">
                            <span class="text-body-2 text-grey">{{ t("booking.card_num") }}</span>
                            <v-text-field :rules="namerules" class="mt-1" hide-details density="compact" placeholder="0000 0000 0000 0000" flat variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-btn height="40" class="mt-1" color="primary" block flat @click="validate">{{ t("save") }}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { items_per_page } from '../utils/items'
import * as bookingApi from '../api/booking'
import { debounce } from 'lodash'
import { namerules } from '../utils/rules'
import { get_rooms_by_type } from '../api/room'
import { get_types } from '../api/roomtype'
// import vMask from '@titou10/v-mask'
import { IBooking } from '../interfaces'

const { t } = useI18n()

const headers = [
    { title: 'booking.client', key: 'client', sortable: true },
    { title: 'rooms.room_no', key: 'room', sortable: false },
    { title: 'rooms.room_type', key: 'room_type', sortable: false },
    // { title: 'booking.phone', key: 'phone', sortable: false },
    { title: 'booking.email', key: 'email', sortable: false },
    // { title: 'booking.address', key: 'address', sortable: false },
    { title: 'booking.check_in', key: 'check_in', sortable: false },
    { title: 'booking.check_out', key: 'check_out', sortable: false },
    { title: 'booking.total_amount', key: 'total_price', sortable: false },
]

const item = ref<IBooking|any>({
    room: null,
    room_type: null,
    check_in: null,
    check_out: null,

    total_price: 0,

    client: "",
    phone: "",
    email: "",
    address: "",
})

const drawer = ref(false)
const loading = ref(false)
const page = ref(1)
const perpage = ref(25)
const totalCount = ref(0)
const search = ref("")
const form = ref<any>(null)

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
const differenceDays = computed(() => {
    const start = new Date(item.value.check_in!);
    const end = new Date(item.value.check_out!);

    if (start && end) {
        const timeDifference = end.getTime() - start.getTime();
        

        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if(timeDifference <= 0) return 0
        return daysDifference
    } else {
        return 0
    }
})

const items = ref<any[]>([])
const types = ref([])
const rooms = ref([])

const init = async () => {
    const { data } = await get_types()
    if(data.status === "ok") types.value = data.types
}

const validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
}

const getRooms = async (item: any) => {
    if(!item?.id) return 
    const { data } = await get_rooms_by_type(item.id)

    if(data.status === "ok") rooms.value = data.result
}

const loadItems = async () => {
    loading.value = true
    const { data } = await bookingApi.get_bookings(qs.value)

    if(data.status === "ok") {
        items.value = data.result
        totalCount.value = data.totalCount
    }
    loading.value = false
}

const save = async () => {
    item.value.total_price = differenceDays.value * item.value.room.price
    item.value.room_type_id = item.value.room_type.id;
    item.value.room_id = item.value.room.id;

    const { data } = await bookingApi.create_booking(item.value)
    if(data.status !== "ok") return
    items.value.push(data.result as any)
    close()
}

const close = () => {
    drawer.value = false;
    nextTick(() => {
        item.value = Object.assign({}, {
            room: null,
            room_type: null,
            check_in: null,
            check_out: null,

            total_price: 0,

            client: "",
            phone: "",
            email: "",
            address: "",
        });
        form.value?.reset()
    });
}

init()

watch(drawer, (v) => v || close())
</script>
