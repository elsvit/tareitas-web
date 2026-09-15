export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  title: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  contact: {
    emailLabel: string;
    email: string;
    developerLabel: string;
    developer: string;
  };
};
