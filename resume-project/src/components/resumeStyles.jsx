// src/components/resumeStyles.js
import { Font, StyleSheet } from '@react-pdf/renderer';

// IMPORTANT: Ensure these paths are correct relative to THIS file
import robotoRegular from '../fonts/Roboto-Regular.ttf';
import robotoBold from '../fonts/Roboto-Bold.ttf';

// Register fonts for @react-pdf/renderer
Font.register({
  family: 'roboto',
  src: robotoRegular,
});

Font.register({
  family: 'robotoBold',
  src: robotoBold,
});

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'roboto',
    paddingVertical: 30,
    paddingHorizontal: 40,
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
  },

  // --- Header Section ---
  studentNameHeader: {
    fontSize: 28,
    fontFamily: 'robotoBold',
    textAlign: 'center',
    marginBottom: 15, // Increased margin for better separation
    color: '#000000',
    textTransform: 'uppercase',
  },
  location: {
    fontSize: 11,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 8,
  },
  links: {
    fontSize: 9,
    textAlign: 'center',
    color: '#555555',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },

  // --- General Section Header Styling ---
  topicNames: {
    fontSize: 14,
    fontFamily: 'robotoBold',
    marginBottom: 5,
    marginTop: 15,
    borderBottom: '1.5px solid #222222',
    paddingBottom: 3,
    textTransform: 'uppercase',
    color: '#222222',
  },

  // --- Education Section Details ---
  educationEntry: {
    marginBottom: 10,
  },
  collegeName: {
    fontSize: 12,
    fontFamily: 'robotoBold',
    marginBottom: 3,
  },
  degreeCourseCGPA: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    marginBottom: 3,
  },
  degreeCourse: {
    fontFamily: 'roboto',
  },
  cgpa: {
    fontFamily: 'robotoBold',
  },
  pucDetails: {
    marginTop: 5,
  },
  pucName: {
    fontSize: 11,
    fontFamily: 'robotoBold',
    marginBottom: 3,
  },
  pucPercentage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  percentageValue: {
    fontFamily: 'robotoBold',
  },

  // --- Experience Section Details (NEW) ---
  experienceEntry: {
    marginBottom: 12, // Space between experience entries
  },
  companyName: {
    fontSize: 11,
    fontFamily: 'robotoBold',
    color: '#000000',
    marginBottom: 2,
  },
  jobTitleDuration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'robotoBold', // Make job title bold
  },
  jobDuration: {
    fontSize: 9,
    fontFamily: 'roboto',
    color: '#555555',
  },
  jobDescription: {
    fontSize: 9,
    fontFamily: 'roboto',
    // Consider using a list for descriptions if you parse them with newlines
  },

  // --- Projects Section Details ---
  project: {
    marginBottom: 12,
  },
  projectNameYear: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'robotoBold',
    color: '#000000',
  },
  projectYear: {
    fontSize: 9,
    fontFamily: 'roboto',
    color: '#555555',
  },
  projectTechStack: {
    fontSize: 9,
    color: '#777777',
    marginBottom: 3,
    fontFamily: 'roboto',
  },
  projectDescription: {
    fontSize: 9,
    fontFamily: 'roboto',
  },

  // --- Skills Section Details (Updated with Soft Skills) ---
  skills: {
    fontSize: 10,
    lineHeight: 1.6,
    flexDirection: 'column',
  },
  skillCategory: {
    fontFamily: 'robotoBold',
    marginRight: 5,
    color: '#000000',
  },
  skillList: {
    fontFamily: 'roboto',
    color: '#333333',
  },
  softSkillCategory: { // NEW for Soft Skills
    fontFamily: 'robotoBold',
    marginRight: 5,
    color: '#000000',
    marginTop: 8, // Space above soft skills sub-section
  },
  softSkillList: { // NEW for Soft Skills
    fontFamily: 'roboto',
    color: '#333333',
  },
});