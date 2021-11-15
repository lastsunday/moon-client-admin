<template>
  <BasicModal v-bind="$attrs" @register="registerModal">
    <div class="row bottom">
      <Text class="right">{{ t('sys.log.system.modal.logInfo.name', { name: name }) }}</Text>
      <Text class="right">{{ t('sys.log.system.modal.logInfo.size', { size: size }) }}</Text>
    </div>
    <textarea id="logContent" :value="logContent" class="textarea" :disabled="true"></textarea>
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
      const name = ref<string>();
      const size = ref<string>();
      const logContent = ref<string>();
      const [registerModal] = useModalInner((data) => {
        const record = toRaw(data.record);
        name.value = record.name;
        size.value = record.size;
        logContent.value = record.logContent;
        locateLogContent();
      });

      function locateLogContent() {
        const textareaId = document.getElementById('logContent');
        if (textareaId) {
          textareaId.scrollTop = 0;
        } else {
          // skip
        }
      }

      return {
        t,
        name,
        size,
        logContent,
        registerModal,
      };
    },
  });
</script>
<style lang="less">
  .row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
  }

  .textarea {
    width: 100%;
    height: 90%;
    border: solid 1px black;
    border-radius: 2px;
    resize: none;
  }

  .bottom {
    margin-bottom: 20px;
  }

  .right {
    margin-right: 30px;
  }
</style>
