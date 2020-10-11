<template>
  <div class="vcall__month">
    <div class="vcall__month__info">
      <span>{{ date.format('MMMM') }}</span>
      {{ ' ' }}
      <span>{{ date.format('YYYY') }}</span>
    </div>
    <div class="vcal__month__weekdays">
      <div
        class="vcal__month__weekday"
        v-for="(day, dayIndex) in days.slice(0, 7)"
        :key="dayIndex"
      >
        {{ day.format('ddd') }}
      </div>
    </div>
    <div class="vcall__month__days">
      <div
        v-for="(day, dayIndex) in days"
        :key="dayIndex"
        :class="dayClass(day)"
      >
        <div
          :id="moment().isSame(day, 'day') ? 'current' : ''"
          class="vcall__month__day__number"
        >
          {{ day.format('D') }}
        </div>
        <div class="vcall__month__day__events">
          <div
            v-for="(event, eventIndex) in getEventsForWeekDay(
              events,
              day
            ).slice(0, 5)"
            :key="eventIndex"
            class="vcall__month__day__event"
          >
            <div v-if="eventIndex < 4">
              <span>{{
                moment(event.startTime, 'hh:mm:ss').format('hh:mm')
              }}</span>
              <span>{{ event.label }}</span>
            </div>
            <span v-else>
              more
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import business from 'moment-business'

export default {
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
    dayClass(date) {
      const classes = ['vcall__month__day']
      if (!business.isWeekDay(moment(date))) {
        classes.push('vcall__month__day--weekend')
      }
      if (!moment(this.date).isSame(date, 'month')) {
        classes.push('vcall__month__day--month-out')
      }
      return classes.join(' ')
    },
    updateDays(date) {
      const start = moment(date).subtract(date.weekday(), 'day')
      const end = moment(start).add(5, 'week')
      const days = []
      for (let i = moment(start); i.isBefore(end); i.add(1, 'day')) {
        days.push(moment(i))
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
