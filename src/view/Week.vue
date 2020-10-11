<template>
  <div class="week-view">
    <div class="header">
      <div></div>
      <div class="days-numbers">
        <div v-for="(day, index) in days" :key="index">
          <div>{{ day.format('ddd') }}</div>
          <div>{{ day.format('D') }}</div>
        </div>
      </div>
    </div>
    <div class="body">
      <hours />
      <div ref="body" class="timeline">
        <div class="events-wrapper">
          <day-template
            v-for="(day, index) in days"
            :key="index"
            :date="day"
            :events="getEventsForWeekDay(events, day)"
          ></day-template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import Hours from '../components/Hours.vue'
import DayTemplate from '../components/DayTemplate.vue'

export default {
  components: {
    Hours,
    DayTemplate,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    date: {
      type: Object,
      default: () => moment(),
    },
  },
  data() {
    return {
      // mapping for use in template
      moment,
      days: this.updateDays(this.date),
    }
  },
  watch: {
    date(newValue) {
      this.days = this.updateDays(newValue)
    },
  },
  methods: {
    updateDays(date) {
      const days = []
      for (let i = 0; i < 7; i++) {
        days.push(moment(date).add(i, 'days'))
      }
      return days
    },
    getEventsForWeekDay(events, date) {
      return events.filter((event) => {
        return moment(event.startDate).isSame(date, 'day')
      })
    },
  },
}
</script>
