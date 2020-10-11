<template>
  <div>
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
    />
  </div>
</template>

<script>
import moment from 'moment'
import './style.scss'
import Calendar from './Calendar.vue'
import CalendarMixin from './mixin.js'

export default {
  components: {
    Calendar,
  },
  mixins: [CalendarMixin],
  data() {
    return {
      viewType: 'week',
      startDate: moment(),
      endDate: moment().add(1, 'week'),
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
        date: this.startDate
      })
      this.startDate = startDate
      this.endDate = endDate
    },
    onViewTypeChange(event) {
      this.viewType = event.target.value
      this.today()
    }
  }
}
</script>
