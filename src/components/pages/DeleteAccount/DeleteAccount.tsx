import React, { useEffect, useState } from 'react';

import { interpolate, useUi } from '~/assets/translation';
import { Button, OTPInput, TextInput } from '~/components/ui';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
  confirmDeletion,
  requestDeletion,
  resetDeleteAccount,
  setStep,
  verifyDeletion,
} from '~/store/deleteAccount/slice';
import {
  selectDeleteAccountConfirmError,
  selectDeleteAccountConfirmLoading,
  selectDeleteAccountEmail,
  selectDeleteAccountFamilyName,
  selectDeleteAccountRequestError,
  selectDeleteAccountRequestLoading,
  selectDeleteAccountStep,
  selectDeleteAccountVerifyError,
  selectDeleteAccountVerifyLoading,
} from '~/store/deleteAccount/selectors';

import './deleteAccount.scss';

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const DeleteAccount = () => {
  const { ui } = useUi();
  const copy = ui.deleteAccount;
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectDeleteAccountStep);
  const email = useAppSelector(selectDeleteAccountEmail);
  const familyName = useAppSelector(selectDeleteAccountFamilyName);
  const requestLoading = useAppSelector(selectDeleteAccountRequestLoading);
  const verifyLoading = useAppSelector(selectDeleteAccountVerifyLoading);
  const confirmLoading = useAppSelector(selectDeleteAccountConfirmLoading);
  const requestError = useAppSelector(selectDeleteAccountRequestError);
  const verifyError = useAppSelector(selectDeleteAccountVerifyError);
  const confirmError = useAppSelector(selectDeleteAccountConfirmError);

  const [emailInput, setEmailInput] = useState('');
  const [pin, setPin] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    return () => {
      dispatch(resetDeleteAccount());
    };
  }, [dispatch]);

  useEffect(() => {
    if (step === 'verify') {
      setVerificationCode('');
    }
  }, [step]);

  const handleSendVerificationCode = () => {
    if (!isValidEmail(emailInput) || pin.length !== 4) {
      return;
    }

    dispatch(
      requestDeletion({
        email: emailInput.trim().toLowerCase(),
        pin,
      }),
    );
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      return;
    }

    dispatch(verifyDeletion({ code: verificationCode }));
  };

  const handleConfirmDeletion = () => {
    dispatch(confirmDeletion());
  };

  const handleCancel = () => {
    dispatch(resetDeleteAccount());
    setEmailInput('');
    setPin('');
    setVerificationCode('');
  };

  const handleBackToCredentials = () => {
    dispatch(setStep('credentials'));
    setVerificationCode('');
  };

  const familyTitle = familyName
    ? interpolate(copy.titleWithFamily, { familyName })
    : copy.title;

  return (
    <div className="delete-account-page">
      {step === 'credentials' ? (
        <>
          <h1>{familyTitle}</h1>
          <p className="delete-account-page__lead">{copy.lead}</p>

          <div className="delete-account-page__form">
            <TextInput
              label={copy.email}
              type="email"
              value={emailInput}
              onChange={setEmailInput}
              autoComplete="email"
              disabled={requestLoading}
            />

            <div className="delete-account-page__pin">
              <span className="delete-account-page__pin-label">{copy.pin}</span>
              <OTPInput
                length={4}
                value={pin}
                onChange={setPin}
                disabled={requestLoading}
              />
            </div>

            {requestError ? (
              <p className="delete-account-page__error" role="alert">
                {requestError.message}
              </p>
            ) : null}

            <div className="delete-account-page__actions">
              <Button
                variant="primary"
                loading={requestLoading}
                disabled={
                  requestLoading ||
                  !isValidEmail(emailInput) ||
                  pin.length !== 4
                }
                onClick={handleSendVerificationCode}
              >
                {copy.sendCode}
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {step === 'verify' ? (
        <>
          <h1>{familyTitle}</h1>
          <p className="delete-account-page__lead">{copy.enterCode}</p>
          <p className="delete-account-page__info">
            {interpolate(copy.codeSent, { email })}
          </p>

          <div className="delete-account-page__form">
            <OTPInput
              length={6}
              value={verificationCode}
              onChange={setVerificationCode}
              disabled={verifyLoading}
              autoFocus
            />

            {verifyError ? (
              <p className="delete-account-page__error" role="alert">
                {verifyError.message}
              </p>
            ) : null}

            <div className="delete-account-page__actions delete-account-page__actions--split">
              <Button
                variant="secondary"
                disabled={verifyLoading}
                onClick={handleBackToCredentials}
              >
                {copy.back}
              </Button>
              <Button
                variant="primary"
                loading={verifyLoading}
                disabled={verifyLoading || verificationCode.length !== 6}
                onClick={handleVerifyCode}
              >
                {copy.verify}
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {step === 'confirm' ? (
        <>
          <h1>{copy.confirmTitle}</h1>
          <div className="delete-account-page__warning">
            <p>{copy.warning}</p>
            <p>
              <strong>{copy.cannotUndo}</strong>
            </p>
          </div>

          {confirmError ? (
            <p className="delete-account-page__error" role="alert">
              {confirmError.message}
            </p>
          ) : null}

          <div className="delete-account-page__actions delete-account-page__actions--split">
            <Button
              variant="secondary"
              disabled={confirmLoading}
              onClick={handleCancel}
            >
              {copy.cancel}
            </Button>
            <Button
              variant="danger"
              loading={confirmLoading}
              disabled={confirmLoading}
              onClick={handleConfirmDeletion}
            >
              {copy.delete}
            </Button>
          </div>
        </>
      ) : null}

      {step === 'complete' ? (
        <>
          <h1>{copy.completeTitle}</h1>
          <div className="delete-account-page__success">
            <p>{copy.completeBody}</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DeleteAccount;
