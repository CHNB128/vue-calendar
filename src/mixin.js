import moment from 'moment'

export default {
  methods: {
    getPreviousDateRange({ date, period }) {
      const _start = moment(date).subtract(1, period)
      const _end = moment(_start).startOf(period).add(1, period)
      return { startDate: _start, endDate: _end }
    },
    getNextDateRange({ date, period }) {
      const _start = moment(date).add(1, period)
      const _end = moment(_start).startOf(period).add(1, period)
      return { startDate: _start, endDate: _end }
    },
    getDateRangeForToday({ period }) {
      const _start = moment().startOf(period)
      const _end = moment(_start).startOf(period).add(1, period)
      return { startDate: _start, endDate: _end }
    },
  },
}
