<template>
</template>

<script>
  export default {
    asyncData(ctx) {
      return {name: 'world'}
    },
    data() {
      return {
        title: 'hahha'
      }
    },
    head() {
      return {
        title: this.title,
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
