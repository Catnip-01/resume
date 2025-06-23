// src/components/resumeStyles.js
import { Font, StyleSheet } from '@react-pdf/renderer';

// IMPORTANT: Ensure these paths are correct relative to THIS file
import roboto from '../fonts/Roboto-Regular.ttf';
import robotoBold from '../fonts/Roboto-Bold.ttf';

// Register fonts for @react-pdf/renderer
Font.register({
  family: 'roboto',
  src: roboto,
});

Font.register({
  family: 'robotoBold',
  src: robotoBold,
});

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'roboto',
    padding: 20,
  },
  studentNameHeader: {
    fontSize: 24,
    fontFamily: 'robotoBold',
    textAlign: 'center',
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  links: {
    fontSize: 10,
    textAlign: 'center',
    color: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  topicNames: {
    fontSize: 16,
    fontFamily: 'robotoBold',
    marginBottom: 5,
    borderBottom: '1px solid #000',
    paddingBottom: 2,
  },
  sectionHeader: { // This style might not be directly used, but kept for reference
    fontSize: 14,
    fontFamily: 'robotoBold',
    marginBottom: 8,
  },
  project: {
    marginBottom: 10,
  },
  projectNameYear: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  projectName: {
    fontSize: 12,
    fontFamily: 'robotoBold',
  },
  projectYear: {
    fontSize: 10,
    color: '#555',
  },
  skills: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});