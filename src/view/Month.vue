<template>
  <div class="vcall__month">
    <div class="vcall__month__info">
      <span>{{ date.format('MMMM') }}</span>
    </div>
    <div class="vcall__month__days">
      <div
        v-for="(day, dayIndex) in days"
        :key="dayIndex"
        class="vcall__month__day"
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
    date(newValue, oldValue) {
      this.days = this.updateDays(newValue)
    },
  },
  methods: {
    updateDays(date) {
      const days = []
      for (let i = 0; i < 30; i++) {
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
