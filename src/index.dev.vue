<template>
  <div class="app">
    <div>
      <select v-model="viewType" name="view" @change="onViewTypeChange">
        <option value="day">day</option>
        <option value="week">week</option>
        <option value="month">month</option>
      </select>
      <button @click="today">today</button>
      <button @click="prev">prev</button>
      <button @click="next">next</button>
    </div>
    <calendar
      :view-type="viewType"
      :start-date="startDate"
      :end-date="endDate"
      :events="events"
      @onEventClick="onEventClick"
    />
  </div>
</template>

<script>
import moment from 'moment'
import './style.scss'
import './style.dev.scss'
import Calendar from './Calendar.vue'
import CalendarMixin from './mixin.js'

moment.locale('ru')

export default {
  components: {
    Calendar,
  },
  mixins: [CalendarMixin],
  data() {
    return {
      viewType: 'month',
      events: [
        {
          startDate: moment(),
          endDate: moment().add(1, 'day'),
          startTime: moment(),
          endTime: moment().add(1, 'hour'),
          label: 'Do work',
          color: '#fafafa',
        }
      ],
      startDate: moment(),
      endDate: moment().add(1, 'month'),
    }
  },
  methods: {
    prev() {
      const { startDate, endDate } = this.getPreviousDateRange({
        date: this.startDate,
        period: this.viewType
      })
      this.startDate = startDate
      this.endDate = endDate
    },
    next() {
      const { startDate, endDate } = this.getNextDateRange({
        date: this.startDate,
        period: this.viewType
      })
      this.startDate = startDate
      this.endDate = endDate
    },
    today() {
      const { startDate, endDate } = this.getDateRangeForToday({
        period: this.viewType
      })
      this.startDate = startDate
      this.endDate = endDate
    },
    onViewTypeChange(event) {
      this.viewType = event.target.value
      this.today()
    },
    onEventClick(event) {
      alert(event.label)
    }
  }
}
</script>
