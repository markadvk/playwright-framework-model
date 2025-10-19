import { owner, severity, epic, feature, story } from 'allure-js-commons';

// individual wrappers
export const setAllureOwner = (name: string) => owner(name);
export const setAllureSeverity = (level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') => severity(level);
export const setAllureEpic = (epicName: string) => epic(epicName);
export const setAllureFeature = (featureName: string) => feature(featureName);
export const setAllureStory = (storyName: string) => story(storyName);

// helper for optional metadata
export const applyAllureMetadata = (metadata: {
  ownerName?: string;
  severityLevel?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  epicName?: string;
  featureName?: string;
  storyName?: string;
}) => {
  if (metadata.ownerName) setAllureOwner(metadata.ownerName);
  if (metadata.severityLevel) setAllureSeverity(metadata.severityLevel);
  if (metadata.epicName) setAllureEpic(metadata.epicName);
  if (metadata.featureName) setAllureFeature(metadata.featureName);
  if (metadata.storyName) setAllureStory(metadata.storyName);
};
