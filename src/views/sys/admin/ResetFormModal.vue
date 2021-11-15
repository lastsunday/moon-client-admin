<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="submitForm" @cancel="closeForm">
    {{ promptMessage }}
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup() {
      const { t } = useI18n();
      const confirmCallback = ref<Function>(() => {});
      const promptMessage = ref<string>();

      const schemas: FormSchema[] = [
        {
          // 作用：便于表单在提交时获取用户id（无展示效果）
          field: 'userId',
          label: '',
          component: 'Input',
          slot: 'customSlot',
        },
        {
          field: 'newPassword',
          label: '',
          component: 'InputPassword',
          componentProps: {
            placeholder: ' ',
          },
          rules: [
            {
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject(promptMessage);
                }
                return Promise.resolve();
              },
            },
          ],
        },
      ];

      const [registerModal, { closeModal }] = useModalInner((data) => {
        const formConfig = data.formConfig;
        const formData = data.formData;
        confirmCallback.value = formConfig.confirmCallback;
        promptMessage.value = t('sys.admin.modal.promptFormat.promptNewPasswordIsNull', {
          account: formData.account,
        });
        setFieldsValue({ userId: formData.userId });
      });

      const [registerForm, { setFieldsValue, getFieldsValue, resetFields, validate }] = useForm({
        showActionButtonGroup: false,
        schemas: schemas,
      });

      function submitForm() {
        validate().then(
          () => {
            confirmCallback.value(getFieldsValue(), closeForm);
          },
          () => {
            // skip
          }
        );
      }

      function closeForm() {
        closeModal();
        resetFields();
      }

      return {
        registerModal,
        registerForm,
        submitForm,
        closeForm,
        promptMessage,
        t,
      };
    },
  });
</script>
