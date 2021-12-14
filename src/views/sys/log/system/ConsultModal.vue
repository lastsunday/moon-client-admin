<template>
  <BasicModal v-bind="$attrs" @register="registerModal">
    <div class="preview">{{ logContent }}</div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: { BasicModal },
    setup() {
      const { t } = useI18n();
      const logContent = ref<string>();
      const [registerModal] = useModalInner((data) => {
        const record = toRaw(data.record);
        logContent.value = record.fileData;
      });

      return {
        t,
        logContent,
        registerModal,
      };
    },
  });
</script>
<style lang="less" scope>
  .preview {
    white-space: pre-wrap;
  }
  .row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
</style>
