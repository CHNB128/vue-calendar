<template>
  <div class="day-view">
    <div class="header">
      <div>{{ date.format('dddd') }}</div>
      <div>{{ date.format('D') }}</div>
    </div>
    <div class="body">
      <hours />
      <day-template :date="date" :events="events" />
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
    date: {
      type: Object,
      default: () => moment(),
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      moment,
    }
  },
}
</script>
