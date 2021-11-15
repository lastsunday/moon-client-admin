<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="submitForm" @cancel="closeForm">
    <BasicForm @register="registerForm">
      <template #tree="{ model, field }">
        <BasicTree
          :treeData="treeData"
          :checkable="true"
          :checkedKeys="setCheckedKeys"
          ref="treeRef"
          v-model:value="model[field]"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTree, TreeActionType } from '/@/components/Tree/index';
  import { TreeItem } from '/@/components/Tree/index';
  export default defineComponent({
    components: { BasicModal, BasicForm, BasicTree },
    setup() {
      const { t } = useI18n();
      const treeData = ref<TreeItem[]>();
      const confirmCallback = ref<Function>(() => {});
      const treeRef = ref<Nullable<TreeActionType>>();
      const setCheckedKeys = ref<Array<string>>();

      const schemas: FormSchema[] = [
        {
          field: 'name',
          label: t('sys.role.modal.columns.name'),
          component: 'Input',
          componentProps: {
            autocomplete: 'off',
            placeholder: t('sys.role.modal.promptFormat.promptNameIsNull'),
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject(t('sys.role.modal.promptFormat.promptNameIsNull'));
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
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async () => {
                return Promise.resolve();
              },
            },
          ],
        },
        {
          field: 'permissions',
          label: t('sys.role.modal.columns.permissions'),
          component: 'CheckboxGroup',
          slot: 'tree',
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value || value.length === 0) {
                  return Promise.reject(t('sys.role.modal.promptFormat.promptPermitssionsIsNull'));
                }
                return Promise.resolve();
              },
              trigger: 'change',
            },
          ],
        },
        {
          field: 'desc',
          label: t('sys.role.modal.columns.desc'),
          component: 'InputTextArea',
          componentProps: {
            autocomplete: 'off',
            placeholder: t('sys.role.modal.promptFormat.promptDescIsNull'),
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject(t('sys.role.modal.promptFormat.promptDescIsNull'));
                }
                return Promise.resolve();
              },
              trigger: 'change',
            },
          ],
        },
        {
          // 作用：便于表单在提交时获取角色id（无展示效果）
          field: 'id',
          label: '',
          component: 'Input',
          slot: 'customSlot',
        },
      ];

      const [registerModal, { closeModal }] = useModalInner((data) => {
        const formConfig = data.formConfig;
        const formData = data.formData;
        confirmCallback.value = formConfig.confirmCallback;
        treeData.value = formConfig.initData.permissions;
        setCheckedKeys.value = formData.permissions ? formData.permissions : [];
        setFieldsValue(formData);
      });

      const [registerForm, { setFieldsValue, getFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 90,
        showActionButtonGroup: false,
        schemas: schemas,
      });

      function setPermissionsExpanded() {
        const tree = unref(treeRef);
        if (tree) {
          tree.setExpandedKeys([]);
        } else {
          // skip
        }
      }

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
        setCheckedKeys.value = [];
        setPermissionsExpanded();
        closeModal();
        resetFields();
      }

      return {
        registerModal,
        registerForm,
        submitForm,
        closeForm,
        setCheckedKeys,
        treeData,
        treeRef,
      };
    },
  });
</script>
