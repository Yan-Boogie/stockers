// @flow
/** @jsx jsx */

import { useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import isEmail from 'validator/lib/isEmail';
import {
  reduxForm,
  Field,
  Form,
} from 'redux-form';
import type { FormProps } from 'redux-form';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useGlobalMessage, useGlobalErrorMessage } from '../../helper/useGlobalMessage';
import { FORM_LOGIN } from '../../Constant/form';
import TextInput from '../../Form/TextInput';
import stockersLogo from '../../static/images/logo_stockers_text.png';
import facebookLogo from '../../static/images/facebook-logo.png';
import googleLogo from '../../static/images/google-logo.png';

const styles = {
  wrapper: css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  `,
  block: css`
    width: 306px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    padding: 20px;
    background-color: #262626;
  `,
  facebookBlock: css`
    width: 306px;
    height: 80px;
    background-color: #1877F2;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #FFF;
    font-size: 13px;
    fontWeight: 500;
    padding: 20px;
  `,
  title: css`
    width: 100px;
    font-size: 13px;
  `,
  fakeBlock: css`
    height: 20px;
  `,
  submitBtn: css`
    color: #FFF;
    font-size: 13px;
  `,
  submitBtnWrapper: css`
    width: 306px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  facebookLogoStlye: css`
    width: 40px;
    height: 40px;
    margin: 0 12px 0 20px;
    background-image: url(${facebookLogo});
    background-position: center;
    backgroun-sSize: contain;
    background-repeat: no-repeat;
  `,
  googleBlock: css`
    color: #000;
    width: 306px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    fontWeight: 500;
    padding: 20px;
    background-color: #FFF;
  `,
  googleCircle: css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    backgounr-color: #FFF;
    border: solid 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin: 0 12px 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  brandWrapper: css`
    display: flex;
    justify-content: center;
  `,
  logo: {
    width: 30,
    height: 30,
  },
  brandLogo: {
    width: 80,
    height: 78,
  },
  noAccountLink: {
    color: Colors.PRIMARY,
    fontSize: 12,
    display: 'block',
    width: '100%',
    textAlign: 'center',
    margin: '10px auto 0 auto',
  },
};

const LOGIN = gql`
  mutation LOGIN(
    $email: String!
    $password: String!
  ) {
    logIn(
      email: $email
      password: $password
    ) {
      token
      userID
    }
  }
`;

function LoginPage({
  handleSubmit,
}: FormProps) {
  const history = useHistory();

  const showMessage = useGlobalMessage();
  const showErrorMessage = useGlobalErrorMessage();

  const [logIn] = useMutation(LOGIN);

  const onSubmit = useCallback(async ({
    email,
    password,
  }) => {
    try {
      const { data: resData } = await logIn({
        variables: {
          email,
          password,
        },
      });

      if (resData) {
        localStorage.setItem('token', resData.logIn.token);
        localStorage.setItem('userId', resData.logIn.userID);
        localStorage.setItem('email', email);

        showMessage('登入成功');
        history.push('/');
      }
    } catch {
      showErrorMessage('登入失敗');
    }
  }, [history, logIn, showMessage, showErrorMessage]);

  return (
    <Form css={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.main}>
        <div css={styles.brandWrapper}>
          <img css={styles.brandLogo} src={stockersLogo} alt="logo" />
        </div>
        <div css={styles.fakeBlock} />
        <div css={styles.block}>
          <Field
            inline
            name="email"
            placeholder="電子郵件"
            component={TextInput} />
        </div>
        <div css={styles.fakeBlock} />
        <div css={styles.block}>
          <Field
            inline
            type="password"
            name="password"
            placeholder="密碼"
            component={TextInput} />
        </div>
        <div css={styles.submitBtnWrapper}>
          <button
            css={styles.submitBtn}
            type="submit">
            登入
          </button>
        </div>
        <button
          type="button"
          css={styles.facebookBlock}
          onClick={() => console.log('click')}>
          <div css={styles.facebookLogoStlye} />
          使用 Facebook 帳號登入
        </button>
        <div css={styles.fakeBlock} />
        <button
          type="button"
          css={styles.googleBlock}
          onClick={() => console.log('click')}>
          <div css={styles.googleCircle}>
            <img alt="google" src={googleLogo} css={styles.logo} />
          </div>
          使用 Google 帳號登入
        </button>
        <Link css={styles.noAccountLink} to="/register">
          沒有帳號？點此註冊
        </Link>
      </div>
    </Form>
  );
}

const formHook = reduxForm({
  form: FORM_LOGIN,
  validate: (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = '必填';
    }

    if (values.email && !isEmail(values.email)) {
      errors.email = '信箱格式不正確';
    }

    if (!values.password) {
      errors.password = '必填';
    }

    if (values.password) {
      if (values.password.length < 8) {
        errors.password = '請輸入至少八個字的密碼';
      }

      if (!values.password.match(/[A-Z]/)) {
        errors.password = '密碼須包含至少一個大寫字母';
      }

      if (!values.password.match(/[a-z]/)) {
        errors.password = '密碼須包含至少一個小寫字母';
      }

      if (!values.password.match(/[0-9]/)) {
        errors.password = '密碼須包含至少一個數字';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = '確認密碼不相符';
      }
    }
  },
});

export default formHook(LoginPage);
