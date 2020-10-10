<template>
  <div class="vcal__hours">
    <div v-for="i in 24" :key="i">
      <span>{{ moment(i - 1, 'HH').format('HH:mm') }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      moment,
    }
  },
}
</script>
