<template>
  <div>
    <case-list :caseState="1"></case-list>
  </div>
</template>
<script>
import caseList from '@/view/caseMana/children/caseList'
export default {
  name: 'casePend',
  components: { caseList }
}
</script>
<style lang="scss" scoped>
</style>
