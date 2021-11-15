<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <ARow v-if="captchaEnable" class="captcha-row">
      <ACol flex="1">
        <FormItem>
          <Input
            size="large"
            v-model:value="formData.verifyCode"
            :placeholder="t('sys.login.placeholder.verifyCode')"
          />
        </FormItem>
      </ACol>
      <ACol flex="none" class="captcha-col-img">
        <FormItem>
          <img :src="codeUrlRef" @click="getCaptcha" />
        </FormItem>
      </ACol>
    </ARow>

    <!-- <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow> -->

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="formState.loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>
    <!-- <ARow class="enter-x">
      <ACol :span="7">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow> -->

    <!-- <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';

  import { Form, Input, Row, Col, Button } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGlobSetting } from '/@/hooks/setting';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getCaptcha } from '/@/api/sys/captcha';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      LoginFormTitle,
      InputPassword: Input.Password,
    },
    setup() {
      const { t } = useI18n();
      const { notification } = useMessage();
      const { prefixCls } = useDesign('login');
      const userStore = useUserStore();

      const { setLoginState, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref<any>(null);
      const globSetting = useGlobSetting();
      const loading = ref(false);
      const rememberMe = ref(false);
      const captchaEnable = globSetting.loginCaptchaCheckingEnable;
      let codeUrlRef = ref<string>('');
      if (captchaEnable) {
        handleCaptcha();
      } else {
        //skip
      }
      const formData = reactive({
        account: globSetting.defaultAdminAccount,
        password: globSetting.defaultAdminPassword,
        verifyCode: '',
        uuid: '',
      });

      const formState = reactive({
        loading: false,
      });

      const { validForm } = useFormValid(formRef);

      //onKeyStroke('Enter', handleLogin);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        formState.loading = true;
        try {
          const form = unref(formRef);
          if (!form) return;
          const data = await form.validate();
          const userInfo = await userStore.login(
            toRaw({
              password: data.password,
              account: data.account,
              verifyCode: formData.verifyCode,
              uuid: formData.uuid,
            })
          );
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
              duration: 3,
            });
          } else {
            if (captchaEnable) {
              // userStore.login如果出现异常，userInfo返回null。这边需要刷新验证码
              handleCaptcha();
            } else {
              //skip
            }
          }
        } catch (error) {
          // skip
          console.error(error);
        } finally {
          formState.loading = false;
        }
      }

      async function handleCaptcha() {
        const data = await getCaptcha();
        codeUrlRef.value = 'data:image/gif;base64,' + data.img;
        formData.uuid = data.uuid;
      }

      return {
        t,
        prefixCls,
        formRef,
        codeUrlRef,
        formData,
        formState,
        getFormRules,
        rememberMe,
        handleLogin,
        getCaptcha: handleCaptcha,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
        captchaEnable,
      };
    },
  });
</script>
<style lang="less" scoped>
  .captcha-row {
    flex-flow: nowrap;

    input:not([type='checkbox']) {
      min-width: auto;
    }
  }

  .captcha-col-img {
    width: auto;
    margin-left: 10px;
    align-content: center;
  }
</style>
