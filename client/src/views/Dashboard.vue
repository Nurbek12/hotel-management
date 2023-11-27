<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="card, i in cards" :key="i">
        <v-card class="mx-auto" style="overflow: unset;" flat>
          <v-sheet style="position: absolute; top: -10px; left: 10px" :color="card.color || 'primary'" height="75" width="75" 
            rounded elevation="0" class="d-flex align-center justify-center">
            <v-icon size="x-large" color="white">{{ card.icon }}</v-icon>
          </v-sheet>
          <v-card-text style="text-align: right">
            <div>{{ t('dashboard.'+card.title) }}</div>
            <p class="text-h4 text--primary">{{ cards_info[card.value] || 0}} <span v-if="card.unity" class="text-body-2">{{t(card.unity)}}</span></p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-for="clock, i in clocks" :key="i">
        <v-card class="mx-auto" style="overflow: unset;" flat>
          <v-sheet border style="position: absolute; top: -10px; left: 10px" height="75" width="100" 
            rounded elevation="0" class="d-flex align-center justify-center">
            <v-avatar rounded size="100%">
              <v-img cover :src="clock.image"></v-img>
            </v-avatar>
          </v-sheet>
          <v-card-text style="text-align: right">
            <div>{{ t('dashboard.'+clock.title) }}</div>
            <p class="text-h4 text--primary">{{ times['time'+(i+1)] }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card flat>
          <v-card-title>{{ t("dashboard.chart_title_1") }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <BarChart :chartData="line_data" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card flat>
          <v-card-title class="d-flex justify-space-between align-center">
            {{ t("dashboard.chart_title_2") }}
          </v-card-title>
          <v-card-text>
            <DoughnutChart :chartData="chart_data" :options="chart_data_options" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card flat height="100%">
          <v-card-title class="d-flex justify-space-between align-center">
            {{ t("dashboard.chart_title_3") }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select v-model="currency" :items="currencys" variant="outlined" flat density="compact" transition="fade-transition" hide-details></v-select>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-table height="290" class="oveflow-auto" density="comfortable">
                  <thead>
                    <tr>
                      <th class="text-left text-caption">{{ t("dashboard.flag") }}</th>
                      <th class="text-left text-caption">{{ t("dashboard.currency") }}</th>
                      <th class="text-right text-caption">{{ t("dashboard.rate") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item, i in currencys" :key="i">
                      <td>
                        <v-img :src="flags[item]" width="40" height="30" cover></v-img>
                      </td>
                      <td class="text-body-2">{{ item }}</td>
                      <td class="d-flex align-center justify-end">
                        {{ convertCurrency(currencyData[item]) }}
                        <!-- <v-icon size="small" :color="'green'">mdi-menu-up</v-icon> -->
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DoughnutChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from "chart.js"
import { get_info } from '../api/dashboard'
import { get_currency } from '../api/others'
import { currencys, flags } from '../utils/items'

Chart.register(...registerables);

const { locale, t } = useI18n()
const cards_info = ref<any>({})
const chart_1 = ref([])
const chart_2 = ref([])
const currency = ref("EUR")
const currencyData = ref<any>({})
const times = ref<any>({
  time1: "",
  time2: "",
  time3: "",
  time4: "",
})

const cards: any = [
  { title: 'card_1', value: 'allRooms', icon: 'mdi-room-service', color: '' },
  { title: 'card_2', value: 'bookedRooms', icon: 'mdi-bed', color: '' },
  { title: 'card_3', value: 'emptyRooms', icon: 'mdi-bed-empty', color: '' },
  { title: 'card_4', value: 'users', icon: 'mdi-account-group', color: '' },
  { title: 'card_5', value: 'dailyBookings', icon: 'mdi-calendar-today', color: '' },
  { title: 'card_6', value: 'weeklyBookings', icon: 'mdi-calendar-week', color: '' },
  { title: 'card_7', value: 'monthlyBookings', icon: 'mdi-calendar-month', color: '' },
  { title: 'card_8', value: 'totalPayment', unity: "sum", icon: 'mdi-currency-usd', color: '' },
]

const clocks: any[] = [
  { title: "clock_1", image: "/icons/flags/gb-eng.svg", timezone: "Europe/London" },
  { title: "clock_2", image: "/icons/flags/kr.svg", timezone: "Asia/Seoul" },
  { title: "clock_3", image: "/icons/flags/tr.svg", timezone: "Turkey" },
  { title: "clock_4", image: "/icons/flags/ru.svg", timezone: "Europe/Moscow" },
]

const updateTimeClocks = () => {
  clocks.map(({timezone}, i) => {
    times.value['time'+(i+1)] = new Date().toLocaleString("en-US", { 
      timeZone: timezone, 
      hour12: false, 
      hour: "numeric", 
      minute: "numeric",
    })
  })

  setInterval(() => updateTimeClocks(), 60*1000)
}
const chart_data = computed(() => ({
  labels: chart_2.value.map((c: any) => c.name),
  datasets: [
    {
      data: chart_2.value.map((c: any) => c?._count?.booking || 0),
      backgroundColor: ['#FF1744', '#2962FF', '#00E676', '#FDD835', '#9C27B0', '#3F51B5', '#FFFF00', '#009688', '#FF9800', '#795548', '#607D8B'],
    },
  ],
}));

const chart_data_options = {
  scales: {
    myScale: {
      type: "logarithmic",
      position: "right",
    },
  },
  height: 100,
  plugins: {
    legend: {
      position: "bottom",
    },
  }
}

const line_data = computed(() => {
  const currentMonthDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  return {
    labels: new Array(currentMonthDays).fill(0).map((_, i) => i + 1),
    datasets: [
      {
        label: new Date().toLocaleString(locale.value, { month: 'long', }),
        backgroundColor: '#0091EA',
        data: chart_1.value,
      },
    ],
  }
})

const init = async () => {
  const { data: { status, countRoomsByType, bookingCounts, ...infoDashboard } } = await get_info()

  if(status === "ok") {
    chart_2.value = countRoomsByType;
    chart_1.value = bookingCounts
    Object.assign(cards_info.value, infoDashboard)
  }
}

const getCurrency = async () => {
  const { data } = await get_currency()

  currencyData.value = data.rates
}

const convertCurrency = (value: any) => {
  const rate = currencyData.value[currency.value];
  const convert = (value / rate) || 0
  return (convert).toFixed(convert>=1?1:5);
}

init()
getCurrency()

updateTimeClocks()
</script>