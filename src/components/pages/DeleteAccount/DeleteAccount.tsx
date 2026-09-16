import React, { useEffect, useState } from 'react';

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
    ? `Delete your Tareitas group/family ${familyName}`
    : 'Delete your Tareitas account';

  return (
    <div className="delete-account-page">
      {step === 'credentials' ? (
        <>
          <h1>{familyTitle}</h1>
          <p className="delete-account-page__lead">
            Enter the email address associated with your Tareitas account
            and pin code.
          </p>

          <div className="delete-account-page__form">
            <TextInput
              label="Email"
              type="email"
              value={emailInput}
              onChange={setEmailInput}
              autoComplete="email"
              disabled={requestLoading}
            />

            <div className="delete-account-page__pin">
              <span className="delete-account-page__pin-label">PIN code</span>
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
                Send verification code
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {step === 'verify' ? (
        <>
          <h1>{familyTitle}</h1>
          <p className="delete-account-page__lead">
            Enter verification code
          </p>
          <p className="delete-account-page__info">
            We sent a verification code to {email}.
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
                Back
              </Button>
              <Button
                variant="primary"
                loading={verifyLoading}
                disabled={verifyLoading || verificationCode.length !== 6}
                onClick={handleVerifyCode}
              >
                Verify and continue
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {step === 'confirm' ? (
        <>
          <h1>Delete your Tareitas account?</h1>
          <div className="delete-account-page__warning">
            <p>
              This will permanently delete your Tareitas account and data
              (all children, parents, admin, associated images, users, tasks,
              rewards), including your child profiles, chores, rewards, images,
              and completion history.
            </p>
            <p>
              <strong>This action cannot be undone.</strong>
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
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={confirmLoading}
              disabled={confirmLoading}
              onClick={handleConfirmDeletion}
            >
              Delete my account
            </Button>
          </div>
        </>
      ) : null}

      {step === 'complete' ? (
        <>
          <h1>Account deletion requested</h1>
          <div className="delete-account-page__success">
            <p>
              Your Tareitas account and associated data have been deleted.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DeleteAccount;
