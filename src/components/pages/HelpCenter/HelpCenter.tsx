import React from 'react';

import './helpCenter.scss';

const HelpCenter = () => (
  <article className="help-center-page">
    <header className="help-center-page__header">
      <p className="help-center-page__eyebrow">Help Center</p>
      <h1>Login / Signup description</h1>
    </header>

    <p className="help-center-page__lead">
      On the Mode screen, after selecting your configuration, tap the “?”
      icon to open a help window with the following information:
    </p>

    <p>On the Mode screen, you have three options:</p>

    <section className="help-center-page__option" id="create-group">
      <h2>1. Create a new group/family</h2>
      <p>This option is at the bottom of the Mode screen.</p>
      <p>
        We recommend selecting “Different devices” and tapping Next.
      </p>
      <p>
        Then, as the Admin, enter your email address and a 4-digit PIN. For
        the child, enter a login name (for example, childname1). The login
        name must be unique.
      </p>
    </section>

    <section className="help-center-page__option" id="join-group">
      <h2>2. Log in to (connect to) an existing group/family</h2>
      <p>
        For example, you are a grandmother and your daughter asks you to
        help manage your grandchild’s chores.
      </p>
      <p>You can connect to multiple different groups/families.</p>
    </section>

    <section className="help-center-page__option" id="this-device">
      <h2>3. Log in to a family created only on this device</h2>
      <p>
        If you previously created a family that is stored only on this
        device, you can log in to that family.
      </p>
      <p>
        However, we recommend selecting “Different devices”, as this option
        is more flexible and does not depend on a single device.
      </p>
    </section>

    <section className="help-center-page__contact">
      <p>If you have any additional questions, please contact us:</p>
      <p>
        <a href="mailto:tarecitas@gmail.com">tarecitas@gmail.com</a>
      </p>
    </section>
  </article>
);

export default HelpCenter;
