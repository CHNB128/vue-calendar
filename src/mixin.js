import moment from 'moment'

export default {
  methods: {
    getPreviousDateRange({ date, period }) {
      const _start = moment(date).startOf(period).subtract(1, period)
      const _end = moment(_start).add(1, period)
      return { startDate: _start, endDate: _end }
    },
    getNextDateRange({ date, period }) {
      const _start = moment(date).startOf(period).add(1, period)
      const _end = moment(_start).add(1, period)
      return { startDate: _start, endDate: _end }
    },
    getDateRangeForToday({ period }) {
      let _start = moment().startOf(period)
      let _end = moment(_start).add(1, period)
      return { startDate: _start, endDate: _end }
    },
  },
}
