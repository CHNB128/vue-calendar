<template>
  <div class="vcal__day-template">
    <div v-if="isSameDay" ref="ruller" class="vcal__day-template__ruller">
      <div class="vcal__day-template__ruller__pointer"></div>
      <div class="vcal__day-template__ruller__line"></div>
    </div>
    <div class="vcal__day-template__lines">
      <div v-for="i in 24" :key="i"></div>
    </div>
    <div class="vcal__day-template__events">
      <div
        v-for="(event, index) in events"
        :key="index"
        :style="eventStyle(event)"
      >
        {{ event.label }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

function getMinutes(date) {
  return date.getHours() * 60 + date.getMinutes()
}

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
      // height of view / 24 hours / 60 minutes
      heightIndex: 960 / 24 / 60,
      intervalRef: null,
    }
  },
  computed: {
    isSameDay() {
      return moment().isSame(this.date, 'day')
    },
  },
  updated() {
    if (this.isSameDay) {
      this.intervalRef = setInterval(() => {
        // TODO: remove this if, it's bug
        if (this.$refs.ruller) {
          const timeIndex = getMinutes(new Date())
          const offset = timeIndex * this.heightIndex
          this.$refs.ruller.style.top = `${offset}px`
        }
      }, 1000)
    } else {
      clearInterval(this.intervalRef)
    }
  },
  methods: {
    getDate({ date, time }) {
      return new Date(moment(date + time, 'YYYY-MM-DDhh:mm:ss'))
    },
    eventStyle({ startDate, startTime, endDate, endTime }) {
      const startIndex = getMinutes(
        this.getDate({ date: startDate, time: startTime })
      )
      const endIndex = getMinutes(
        this.getDate({ date: endDate, time: endTime })
      )
      const topOffset = startIndex * this.heightIndex
      const height = endIndex * this.heightIndex - topOffset
      return {
        color: 'red',
        height: `${height}px`,
        top: `${topOffset}px`,
      }
    },
  },
}
</script>
