<template>
  <div>
    <case-list :caseState="0"></case-list>
  </div>
</template>
<script>
import caseList from '@/view/caseMana/children/caseList'
export default {
  name: 'caseAll',
  components: { caseList }
}
</script>
<style lang="scss" scoped>
</style>
