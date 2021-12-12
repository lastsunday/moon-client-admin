<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="submitForm" @cancel="closeForm">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { RoleOptionsListResultModel } from '/@/api/sys/model/adminModel';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup() {
      const { t } = useI18n();
      const emailFormat = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      const roleIdList = ref<RoleOptionsListResultModel>([]);
      const isDisabledAccount = ref<boolean>(false);
      const isShowPassword = ref<boolean>(true);
      const confirmCallback = ref<Function>(() => {});
      const schemas: FormSchema[] = [
        {
          field: 'account',
          label: t('sys.admin.modal.columns.account'),
          component: 'Input',
          required: true,
          componentProps: {
            autocomplete: 'off',
            disabled: isDisabledAccount,
            placeholder: t('sys.admin.modal.promptFormat.promptAccountIsNull'),
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject(t('sys.admin.modal.promptFormat.promptAccountIsNull'));
                }
                return Promise.resolve();
              },
              trigger: 'change',
            },
          ],
        },
        {
          field: 'name',
          label: t('sys.admin.modal.columns.name'),
          component: 'Input',
          componentProps: {
            autocomplete: 'off',
            placeholder: t('sys.admin.modal.promptFormat.promptNameIsNull'),
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject(t('sys.admin.modal.promptFormat.promptNameIsNull'));
                }
                return Promise.resolve();
              },
              trigger: 'change',
            },
          ],
        },
        {
          field: 'password',
          label: t('sys.admin.modal.columns.password'),
          component: 'InputPassword',
          ifShow: () => {
            return isShowPassword.value;
          },
          componentProps: {
            placeholder: t('sys.admin.modal.promptFormat.promptPasswordIsNull'),
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject(t('sys.admin.modal.promptFormat.promptPasswordIsNull'));
                }
                return Promise.resolve();
              },
            },
          ],
        },
        {
          field: 'roleIds',
          label: t('sys.admin.modal.columns.roleIds'),
          component: 'Select',
          componentProps: {
            mode: 'multiple',
            filterOption: filterAdminRole,
            placeholder: t('sys.admin.modal.promptFormat.promptRoleIdsIsNull'),
            options: roleIdList,
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value || value.length === 0) {
                  return Promise.reject(t('sys.admin.modal.promptFormat.promptRoleIdsIsNull'));
                }
                return Promise.resolve();
              },
              trigger: 'change',
            },
          ],
        },
        {
          field: 'status',
          label: t('sys.admin.modal.columns.status'),
          component: 'RadioGroup',
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async () => {
                return Promise.resolve();
              },
            },
          ],
          componentProps: {
            defaultValue: 0,
            options: [
              {
                label: t('sys.admin.modal.status.startUsing'),
                value: 0,
              },
              {
                label: t('sys.admin.modal.status.forbidden'),
                value: 1,
              },
            ],
          },
        },
        {
          field: 'email',
          label: t('sys.admin.modal.columns.email'),
          component: 'Input',
          componentProps: {
            autocomplete: 'off',
            placeholder: 'name@example.com',
          },
          rules: [
            {
              // @ts-ignore
              validator: async (rule, value) => {
                if (!emailFormat.test(value) && value) {
                  return Promise.reject(t('sys.admin.modal.promptFormat.promptFormat'));
                }
                return Promise.resolve();
              },
              trigger: 'change',
            },
          ],
        },
        {
          field: 'phone',
          label: t('sys.admin.modal.columns.phone'),
          component: 'Input',
          componentProps: {
            autocomplete: 'off',
            maxLength: 11,
            placeholder: t('sys.admin.modal.promptFormat.promptPhoneIsNull'),
          },
        },
        {
          field: 'gender',
          label: t('sys.admin.modal.columns.gender'),
          component: 'RadioGroup',
          componentProps: {
            defaultValue: 2,
            options: [
              {
                label: t('sys.admin.modal.gender.secrecy'),
                value: 2,
              },
              {
                label: t('sys.admin.modal.gender.man'),
                value: 0,
              },
              {
                label: t('sys.admin.modal.gender.woman'),
                value: 1,
              },
            ],
          },
        },
        {
          field: 'remark',
          label: t('sys.admin.modal.columns.remark'),
          component: 'InputTextArea',
          componentProps: {
            autocomplete: 'off',
            placeholder: t('sys.admin.modal.promptFormat.promptRemarkIsNull'),
          },
        },
        {
          // 作用：便于表单在提交时获取用户id（无展示效果）
          field: 'id',
          label: '',
          component: 'Input',
          slot: 'customSlot',
        },
      ];

      const [registerModal, { closeModal }] = useModalInner((data) => {
        const formConfig = data.formConfig;
        const formData = data.formData;
        roleIdList.value = formConfig.initData.roleIds;
        isDisabledAccount.value = formConfig.initData.isDisabledAccount;
        isShowPassword.value = formConfig.initData.isShowPassword;
        confirmCallback.value = formConfig.confirmCallback;
        setFieldsValue(formData);
      });

      const [registerForm, { setFieldsValue, getFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 80,
        showActionButtonGroup: false,
        schemas: schemas,
      });

      function filterAdminRole(inputValue: any, option: any) {
        const label = option.label.toLowerCase();
        const inputLabel = inputValue.toLowerCase();
        return label.indexOf(inputLabel) != -1;
      }

      function submitForm() {
        validate().then(
          () => {
            confirmCallback.value(getFieldsValue(), closeForm);
          },
          () => {
            // skip
          },
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
      };
    },
  });
</script>
