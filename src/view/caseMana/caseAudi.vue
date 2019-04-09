<template>
  <div>
    <case-list :caseState="3"></case-list>
  </div>
</template>
<script>
import caseList from '@/view/caseMana/children/caseList'
export default {
  name: 'caseAudi',
  components: { caseList }
}
</script>
<style lang="scss" scoped>
</style>
