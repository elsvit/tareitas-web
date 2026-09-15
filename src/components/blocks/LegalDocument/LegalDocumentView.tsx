import React from 'react';

import type { LegalDocument } from '~/types';

import './legalDocumentView.scss';

type Props = {
  document: LegalDocument;
};

export const LegalDocumentView = ({ document }: Props) => (
  <article className="legal-document">
    <header className="legal-document__header">
      <h1>{document.title}</h1>
      <p className="legal-document__updated">
        {document.lastUpdatedLabel}: {document.lastUpdated}
      </p>
    </header>

    {document.intro.map(paragraph => (
      <p key={paragraph} className="legal-document__paragraph">
        {paragraph}
      </p>
    ))}

    {document.sections.map(section => (
      <section
        key={`${section.title}-${section.paragraphs[0] ?? ''}`}
        className="legal-document__section"
      >
        {section.title ? (
          <h2 className="legal-document__section-title">{section.title}</h2>
        ) : null}

        {section.paragraphs.map(paragraph => (
          <p key={paragraph} className="legal-document__paragraph">
            {paragraph}
          </p>
        ))}

        {section.list ? (
          <ul className="legal-document__list">
            {section.list.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </section>
    ))}

    <section className="legal-document__contact">
      <p>
        {document.contact.emailLabel}:{' '}
        <a href={`mailto:${document.contact.email}`}>
          {document.contact.email}
        </a>
      </p>
      <p>
        {document.contact.developerLabel}: {document.contact.developer}
      </p>
    </section>
  </article>
);

export default LegalDocumentView;
