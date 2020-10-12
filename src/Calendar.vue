<template>
  <div class="vcal">
    <day-view
      v-if="viewType === 'day'"
      :date="startDate"
      :events="getEventsForWeekDay(events, startDate)"
    />
    <week-view v-else-if="viewType === 'week'" :date="startDate" :events="events" />
    <month-view
      v-else-if="viewType === 'month'"
      :date="startDate"
      :events="events"
      @onEventClick="onEventClick"
    />
  </div>
</template>

<script>
// TODO: use moment-range https://github.com/rotaready/moment-range#examples
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
    viewType: {
      type: String,
      default: 'day',
      validator: (value) => {
        return ['day', 'week', 'month', 'year'].indexOf(value) !== -1
      }
    },
    events: {
      type: Array,
      default: () => [],
    },
    startDate: {
      type: Object,
      default: () => moment(),
      required: true,
    },
    endDate: {
      type: Object,
      default: () => moment().add(1, 'week'),
      required: true,
    },
    onEventClick: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    startDate: () => {},
    viewType: () => {},
    events: () => {},
  },
  methods: {
    getEventsForWeekDay(events, date) {
      return events.filter((event) => {
        return moment(event.startDateDate).isSame(date, 'day')
      })
    },
  },
}
</script>
