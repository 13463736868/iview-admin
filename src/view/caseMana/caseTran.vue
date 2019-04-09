<template>
  <div>
    <case-list :caseState="2"></case-list>
  </div>
</template>
<script>
import caseList from '@/view/caseMana/children/caseList'
export default {
  name: 'caseTran',
  components: { caseList }
}
</script>
<style lang="scss" scoped>
</style>
