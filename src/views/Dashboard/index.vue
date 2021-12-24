<template>
  <Layout>
    <div class="dashboard">
      <img src="@/assets/icon/development-plan.png" class="icon" alt="" />
      <div class="text">{{ $t('dashboard.description') }}</div>
    </div>
  </Layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .icon {
    width: 256px;
  }
  .text {
    margin-top: 16px;
    font-size: 24px;
    font-family: $font-regular;
    color: $color-warning-4;
    font-style: italic;
  }
}
</style>
