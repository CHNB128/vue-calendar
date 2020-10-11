<template>
  <div class="vcal">
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
    <day-view
      v-if="viewType === 'day'"
      :date="start"
      :events="getEventsForWeekDay(events, start)"
    />
    <week-view v-else-if="viewType === 'week'" :date="start" :events="events" />
    <month-view
      v-else-if="viewType === 'month'"
      :date="start"
      :events="events"
    />
  </div>
</template>

<script>
import moment from 'moment'

import DayView from './view/Day.vue'
import WeekView from './view/Week.vue'
import MonthView from './view/Month.vue'

export default {
  components: {
    DayView,
    WeekView,
    MonthView,
  },
  props: {
    type: {
      type: String,
      default: () => 'day',
    },
    events: {
      type: Array,
      default: () => [],
    },
    startDate: {
      type: Object,
      default: () => moment(),
    },
    endDate: {
      type: Object,
      default: () => moment().add(1, 'week'),
    },
  },
  data() {
    return {
      viewType: this.type,
      start: moment(this.startDate),
      end: moment(this.endDate),
    }
  },
  methods: {
    onViewTypeChange(event) {
      this.start = moment(this.start).startOf(event.target.value)
      this.end = moment(this.start)
        .startOf(event.target.value)
        .add(1, event.target.value)
      this.$emit('dateRangeChange', {
        startDate: this.start,
        endDate: this.end,
      })
    },
    // should use assignation to update children components
    prev() {
      this.start = moment(this.start).subtract(1, this.viewType)
      this.end = moment(this.start).startOf(this.viewType).add(1, this.viewType)
      this.$emit('dateRangeChange', {
        startDate: this.start,
        endDate: this.end,
      })
    },
    next() {
      this.start = moment(this.start).add(1, this.viewType)
      this.end = moment(this.start).startOf(this.viewType).add(1, this.viewType)
      this.$emit('dateRangeChange', {
        startDate: this.start,
        endDate: this.end,
      })
    },
    today() {
      this.start = moment().startOf(this.viewType)
      this.end = moment(this.start).startOf(this.viewType).add(1, this.viewType)
      this.$emit('dateRangeChange', {
        startDate: this.start,
        endDate: this.end,
      })
    },
    getEventsForWeekDay(events, date) {
      return events.filter((event) => {
        return moment(event.startDate).isSame(date, 'day')
      })
    },
  },
}
</script>
