// src/components/InvoiceGenerator.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Only import 'styles' object. Font registration is handled in resumeStyles.js.
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import { styles } from "./resumeStyles"; // Import the styles for PDF generation

// IMPORTANT: Ensure these paths are correct relative to THIS file
import lightSvg from '../svg/light.svg';
import darkSvg from '../svg/moon.svg';

// --- PDF Document Component (Purely @react-pdf/renderer styles, NO Tailwind or Framer Motion) ---
const InvoiceDocument = (resume) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Student Name Header */}
      <View style={styles.studentNameHeader}>
        <Text>{resume.studentName || "YOUR NAME"}</Text>
      </View>

      {/* Location */}
      <View style={styles.location}>
        <Text>{resume.location || "City, State, Country"}</Text>
      </View>

      {/* Contact Links (Phone, Email, LinkedIn) */}
      <View style={styles.links}>
        <Text>{resume.phoneNumber || "Phone: +91-1234567890"}</Text>
        <Text> | </Text> {/* Separator */}
        <Text>{resume.email || "Email: your.email@example.com"}</Text>
        <Text> | </Text> {/* Separator */}
        <Text>{resume.linkedin || "LinkedIn: linkedin.com/in/yourprofile"}</Text>
      </View>

      {/* --- Education Section --- */}
      <View style={styles.topicNames}>
        <Text>Education</Text>
      </View>
      <View style={styles.educationEntry}>
        {/* College Name */}
        <Text style={styles.collegeName}>
          {resume.collegeName || "Your University Name"}
        </Text>

        {/* Degree, Course, CGPA */}
        <View style={styles.degreeCourseCGPA}>
          <Text style={styles.degreeCourse}>
            {resume.degreeName || "Degree Name"},{" "}
            {resume.courseName || "Course Name"}
          </Text>
          <Text style={styles.cgpa}>
            CGPA: {resume.cgpa || "0.0"}
          </Text>
        </View>
      </View>

      {/* Second PUC / High School */}
      <View style={styles.pucDetails}>
        <Text style={styles.pucName}>
          {resume.secondPUC || "Your High School/PUC Name"}
        </Text>
        <View style={styles.pucPercentage}>
          <Text>Upper Secondary Graduation - Percentage:</Text>
          <Text style={styles.percentageValue}>
            {resume.secondPUPercentage ? `${resume.secondPUPercentage}%` : "0.0%"}
          </Text>
        </View>
      </View>

      {/* --- Experience Section --- */}
      <View style={styles.topicNames}>
        <Text>Experience</Text>
      </View>
      {resume.experience && resume.experience.length > 0 ? (
        resume.experience.map((exp, index) => (
          <View key={index} style={styles.experienceEntry}>
            <Text style={styles.companyName}>
              {exp.companyName || "Company Name"}
            </Text>
            <View style={styles.jobTitleDuration}>
              <Text style={styles.jobTitle}>
                {exp.jobTitle || "Job Title"}
              </Text>
              <Text style={styles.jobDuration}>
                {exp.jobDuration || "Start Date - End Date"}
              </Text>
            </View>
            <Text style={styles.jobDescription}>
              {exp.jobDescription || "Key responsibilities and achievements."}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ marginTop: 10 }}>No experience listed</Text>
      )}


      {/* --- Projects Section --- */}
      <View style={styles.topicNames}>
        <Text>Projects</Text>
      </View>
      {resume.projects && resume.projects.length > 0 ? (
        resume.projects.map((project, index) => (
          <View key={index} style={styles.project}>
            <View style={styles.projectNameYear}>
              <Text style={styles.projectName}>
                {project.name || "Project Title"}
              </Text>
              <Text style={styles.projectYear}>
                {project.year || "Year"}
              </Text>
            </View>
            <Text style={styles.projectTechStack}>
              Tech Stack: {project.techStack || "e.g., React, Node.js, Express"}
            </Text>
            <Text style={styles.projectDescription}>
              {project.description || "Brief description of project, highlighting your role and key accomplishments."}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ marginTop: 10 }}>No projects listed</Text>
      )}

      {/* --- Skills Section (Updated with Soft Skills) --- */}
      <View style={styles.topicNames}>
        <Text>Skills</Text>
      </View>
      <View style={styles.skills}>
        <Text>
          <Text style={styles.skillCategory}>Programming Languages:</Text>{" "}
          <Text style={styles.skillList}>{resume.programmingLanguages || "JavaScript, Python, C++"}</Text>
        </Text>
        <Text>
          <Text style={styles.skillCategory}>Services/Tools:</Text>{" "}
          <Text style={styles.skillList}>{resume.services || "AWS, Docker, Git, VS Code"}</Text>
        </Text>
        {/* Soft Skills */}
        <Text>
          <Text style={styles.softSkillCategory}>Soft Skills:</Text>{" "}
          <Text style={styles.softSkillList}>{resume.softSkills || "Communication, Teamwork, Problem-solving"}</Text>
        </Text>
      </View>
    </Page>
  </Document>
);

// Framer Motion variants for common animations (remain unchanged)
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const sectionHeaderVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
};

const inputFocusVariants = {
  whileFocus: {
    scale: 1.005,
  },
  transition: { duration: 0.2 },
};

const buttonHoverTapVariants = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

const InvoiceGenerator = () => {
  // --- State Variables ---
  const [studentName, setStudentName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [secondPUC, setSecondPUC] = useState("");
  const [secondPUPercentage, setSecondPUPercentage] = useState("");
  const [theme, setTheme] = useState("light");

  // State for projects
  const [projects, setProjects] = useState([
    { name: "", year: "", techStack: "", description: "" },
  ]);

  // State for experience
  const [experience, setExperience] = useState([
    { companyName: "", jobTitle: "", jobDuration: "", jobDescription: "" },
  ]);

  const [programmingLanguages, setProgrammingLanguages] = useState("");
  const [services, setServices] = useState("");
  const [softSkills, setSoftSkills] = useState("");

  // --- Error States ---
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [cgpaError, setCgpaError] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const [projectYearErrors, setProjectYearErrors] = useState({});
  const [experienceDurationErrors, setExperienceDurationErrors] = useState({});

  // --- Validation Functions (NOW PURE - NO SETSTATE CALLS) ---
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || value === ""; // Allow empty string
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[\d\s\-\+]+$/;
    return phoneRegex.test(value) || value === ""; // Allow empty string
  };

  const validateLinkedin = (value) => {
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return linkedinRegex.test(value) || value === ""; // Allow empty string
  };

  const validateCgpa = (value) => {
    const cgpaRegex = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
    return cgpaRegex.test(value) || value === ""; // Allow empty string
  };

  const validatePercentage = (value) => {
    const percentageRegex = /^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/;
    return percentageRegex.test(value) || value === ""; // Allow empty string
  };

  const validateYear = (value) => {
    const yearRegex = /^\d{4}$/; // Four digits for year
    return yearRegex.test(value) || value === ""; // Allow empty string
  };

  const validateDuration = (value) => {
    const durationRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} - ((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}|Present)$/;
    return durationRegex.test(value) || value === ""; // Allow empty string
  };

  // --- Handler Functions ---
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);

    if (field === "year") {
      if (!validateYear(value)) {
        setProjectYearErrors((prevErrors) => ({
          ...prevErrors,
          [index]: "Invalid year (e.g., 2023)",
        }));
      } else {
        setProjectYearErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[index]; // Clear the error for this index
          return updatedErrors;
        });
      }
    }
  };

  const addProject = () => {
    if (projects.length < 5) {
      setProjects([
        ...projects,
        { name: "", year: "", techStack: "", description: "" },
      ]);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);

    if (field === "jobDuration") {
      if (!validateDuration(value)) {
        setExperienceDurationErrors((prevErrors) => ({
          ...prevErrors,
          [index]: "Invalid format (e.g., Jan 2022 - Dec 2023 or Present)",
        }));
      } else {
        setExperienceDurationErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[index]; // Clear the error for this index
          return updatedErrors;
        });
      }
    }
  };

  const addExperience = () => {
    if (experience.length < 3) {
      setExperience([
        ...experience,
        { companyName: "", jobTitle: "", jobDuration: "", jobDescription: "" },
      ]);
    }
  };

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Function to check if all current inputs are valid before allowing PDF download
  const isFormValid = () => {
    // Check general contact/education fields using their current error states
    const noPrimaryErrors = !emailError && !phoneError && !linkedinError && !cgpaError && !percentageError;

    // Check dynamic lists (projects, experience) by ensuring no errors are present in their error objects
    const noProjectEntryErrors = Object.values(projectYearErrors).every(error => error === "");
    const noExperienceEntryErrors = Object.values(experienceDurationErrors).every(error => error === "");

    // Additionally, perform pure validation on all current values, especially for fields that might be empty
    // and thus not have triggered an error yet but should still prevent download if invalid.
    const allFieldsPurelyValid =
      validateEmail(email) &&
      validatePhoneNumber(phoneNumber) &&
      validateLinkedin(linkedin) &&
      validateCgpa(cgpa) &&
      validatePercentage(secondPUPercentage) &&
      projects.every((p) => validateYear(p.year)) &&
      experience.every((exp) => validateDuration(exp.jobDuration));

    return noPrimaryErrors && noProjectEntryErrors && noExperienceEntryErrors && allFieldsPurelyValid;
  };

  // --- Dynamic Tailwind Classes based on Theme (remain unchanged) ---
  const containerClasses = theme === "light"
    ? "bg-neutral-100 text-neutral-800 shadow-xl"
    : "bg-neutral-950 text-neutral-200 shadow-xl-dark";

  const sectionBgClasses = theme === "light"
    ? "bg-white border-neutral-200"
    : "bg-neutral-900 border-neutral-800";

  const inputClasses = theme === "light"
    ? "bg-white text-neutral-800 border-neutral-300 placeholder-neutral-500"
    : "bg-neutral-800 text-neutral-200 border-neutral-700 placeholder-neutral-400";

  const hrBorderColor = theme === "light" ? "border-neutral-300" : "border-neutral-700";

  const themeIconSrc = theme === "light" ? lightSvg : darkSvg;
  const themeIconBorder = theme === "light" ? "border-neutral-500" : "border-neutral-500";
  const themeIconBg = theme === "light" ? "bg-white" : "bg-neutral-700";
  const themeIconShadow = theme === "light" ? "shadow-md" : "shadow-lg";

  const accentColorClass = "text-purple-500";
  const focusRingColorClass = "focus:ring-purple-500";
  const downloadButtonAccent = "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500";
  const addButtonAccent = "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500";

  const errorTextColor = "text-red-500";
  const errorBorderColor = "border-red-500";


  return (
    // Main container with Tailwind classes and Framer Motion
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className={`min-h-screen flex flex-col items-center p-8 md:p-12 lg:p-16 rounded-2xl mx-auto max-w-6xl font-sans relative ${containerClasses}`}
      style={{ overflowX: 'hidden' }}
    >
      {/* Theme Toggle Button */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={changeTheme}
          className={`bg-none border-none cursor-pointer p-0`}
        >
          <motion.img
            src={themeIconSrc}
            alt="Toggle Theme"
            className={`w-8 h-8 rounded-full p-2 ${themeIconBorder} ${themeIconBg} ${themeIconShadow}`}
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={`text-4xl md:text-5xl font-extrabold text-center mb-6 ${accentColorClass}`}
      >
        Generate Your Resume
      </motion.h1>

      <hr className={`w-full h-px ${hrBorderColor} my-4`} />

      {/* Personal Details Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          Personal Details:
        </motion.h2>
        <div className="flex flex-col gap-4">
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter name (e.g., Jane Doe)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Bengaluru, Karnataka, India)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>
        </div>
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* Contact Details Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          Contact Details:
        </motion.h2>
        <div className="flex flex-col gap-4">
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setNumber(value);
                if (!validatePhoneNumber(value)) {
                  setPhoneError("Invalid phone number format (use digits, +, -)");
                } else {
                  setPhoneError("");
                }
              }}
              placeholder="Enter phone number (e.g., +91-1234567890)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${phoneError ? errorBorderColor : ''}`}
              {...inputFocusVariants}
            />
            {phoneError && <p className={`text-sm mt-1 ${errorTextColor}`}>{phoneError}</p>}
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                if (!validateEmail(value)) {
                  setEmailError("Invalid email format");
                } else {
                  setEmailError("");
                }
              }}
              placeholder="Enter email (e.g., your.email@example.com)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${emailError ? errorBorderColor : ''}`}
              {...inputFocusVariants}
            />
            {emailError && <p className={`text-sm mt-1 ${errorTextColor}`}>{emailError}</p>}
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={linkedin}
              onChange={(e) => {
                const value = e.target.value;
                setLinkedin(value);
                if (!validateLinkedin(value)) {
                  setLinkedinError("Invalid LinkedIn URL (e.g., linkedin.com/in/yourprofile)");
                } else {
                  setLinkedinError("");
                }
              }}
              placeholder="Enter LinkedIn profile URL (e.g., linkedin.com/in/yourprofile)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${linkedinError ? errorBorderColor : ''}`}
              {...inputFocusVariants}
            />
            {linkedinError && <p className={`text-sm mt-1 ${errorTextColor}`}>{linkedinError}</p>}
          </label>
        </div>
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* College Details Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          College Details:
        </motion.h2>
        <div className="flex flex-col gap-4">
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="Enter college/university name"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={degreeName}
              onChange={(e) => setDegreeName(e.target.value)}
              placeholder="Enter degree (e.g., B.Tech)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course (e.g., Computer Science Engineering)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={cgpa}
              onChange={(e) => {
                const value = e.target.value;
                setCgpa(value);
                if (!validateCgpa(value)) {
                  setCgpaError("Invalid CGPA format (e.g., 8.5, 8.5/10.0)");
                } else {
                  setCgpaError("");
                }
              }}
              placeholder="Enter CGPA (e.g., 8.5/10.0)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${cgpaError ? errorBorderColor : ''}`}
              {...inputFocusVariants}
            />
            {cgpaError && <p className={`text-sm mt-1 ${errorTextColor}`}>{cgpaError}</p>}
          </label>
        </div>
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* PUC Details Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          High School / PUC Details:
        </motion.h2>
        <div className="flex flex-col gap-4">
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={secondPUC}
              onChange={(e) => setSecondPUC(e.target.value)}
              placeholder="Enter 12th/PUC equivalent name (e.g., XYZ Public School)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={secondPUPercentage}
              onChange={(e) => {
                const value = e.target.value;
                setSecondPUPercentage(value);
                if (!validatePercentage(value)) {
                  setPercentageError("Invalid percentage (0-100)");
                } else {
                  setPercentageError("");
                }
              }}
              placeholder="Enter 12th/PUC percentage (e.g., 90.5)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${percentageError ? errorBorderColor : ''}`}
              {...inputFocusVariants}
            />
            {percentageError && <p className={`text-sm mt-1 ${errorTextColor}`}>{percentageError}</p>}
          </label>
        </div>
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* Experience Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          Experience:
        </motion.h2>
        <AnimatePresence>
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`mb-4 p-4 rounded-lg shadow-inner ${theme === 'light' ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-800 border-neutral-700'}`}
            >
              <div className="flex flex-col gap-3">
                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={exp.companyName}
                    onChange={(e) =>
                      handleExperienceChange(index, "companyName", e.target.value)
                    }
                    placeholder={`Experience ${index + 1} Company Name`}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>
                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(index, "jobTitle", e.target.value)
                    }
                    placeholder={`Experience ${index + 1} Job Title`}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>
                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={exp.jobDuration}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleExperienceChange(index, "jobDuration", value); // This internally calls setExperienceDurationErrors
                    }}
                    placeholder={`Experience ${index + 1} Duration (e.g., Jan 2022 - Dec 2023 or Present)`}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${experienceDurationErrors[index] ? errorBorderColor : ''}`}
                    {...inputFocusVariants}
                  />
                  {experienceDurationErrors[index] && <p className={`text-sm mt-1 ${errorTextColor}`}>{experienceDurationErrors[index]}</p>}
                </label>
                <label className="block w-full">
                  <motion.textarea
                    value={exp.jobDescription}
                    onChange={(e) =>
                      handleExperienceChange(index, "jobDescription", e.target.value)
                    }
                    placeholder="Experience Description (key responsibilities and achievements)"
                    rows={4}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} resize-y ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {experience.length < 3 && ( // Limit to 3 experience entries
          <motion.button
            onClick={addExperience}
            {...buttonHoverTapVariants}
            className={`px-6 py-2 rounded-full font-semibold shadow-md mt-4
              bg-gradient-to-r ${addButtonAccent} text-white
              transition-all duration-200 block mx-auto`}
            type="button"
          >
            Add Another Experience
          </motion.button>
        )}
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* Projects Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          Projects:
        </motion.h2>
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`mb-4 p-4 rounded-lg shadow-inner ${theme === 'light' ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-800 border-neutral-700'}`}
            >
              <div className="flex flex-col gap-3">
                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      handleProjectChange(index, "name", e.target.value)
                    }
                    placeholder={`Project ${index + 1} Name`}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>

                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={project.year}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleProjectChange(index, "year", value); // This internally calls setProjectYearErrors
                    }}
                    placeholder={`Project ${index + 1} Year (e.g., 2023)`}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses} ${projectYearErrors[index] ? errorBorderColor : ''}`}
                    {...inputFocusVariants}
                  />
                  {projectYearErrors[index] && <p className={`text-sm mt-1 ${errorTextColor}`}>{projectYearErrors[index]}</p>}
                </label>

                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={project.techStack}
                    onChange={(e) =>
                      handleProjectChange(index, "techStack", e.target.value)
                    }
                    placeholder="Tech Stack (comma-separated: e.g., React, Node.js)"
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>

                <label className="block w-full">
                  <motion.textarea
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    placeholder="Project Description (key features, your role, achievements)"
                    rows={4}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} resize-y ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {projects.length < 5 && (
          <motion.button
            onClick={addProject}
            {...buttonHoverTapVariants}
            className={`px-6 py-2 rounded-full font-semibold shadow-md mt-4
              bg-gradient-to-r ${addButtonAccent} text-white
              transition-all duration-200 block mx-auto`}
            type="button"
          >
            Add Another Project
          </motion.button>
        )}
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* Skills Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md border ${sectionBgClasses}`}
      >
        <motion.h2
          {...sectionHeaderVariants}
          className={`text-2xl font-semibold mb-4 ${accentColorClass}`}
        >
          Skills:
        </motion.h2>
        <div className="flex flex-col gap-4">
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={programmingLanguages}
              onChange={(e) => setProgrammingLanguages(e.target.value)}
              placeholder="Programming Languages (comma-separated: e.g., JavaScript, Python)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Services/Tools (comma-separated: e.g., AWS, Docker, Git)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={softSkills}
              onChange={(e) => setSoftSkills(e.target.value)}
              placeholder="Soft Skills (comma-separated: e.g., Communication, Teamwork)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>
        </div>
      </motion.div>

      <hr className={`w-full h-px ${hrBorderColor} my-6`} />

      {/* PDF Download Button */}
      <PDFDownloadLink
        document={
          <InvoiceDocument
            studentName={studentName}
            location={location}
            phoneNumber={phoneNumber}
            email={email}
            linkedin={linkedin}
            collegeName={collegeName}
            degreeName={degreeName}
            courseName={courseName}
            cgpa={cgpa}
            secondPUC={secondPUC}
            secondPUPercentage={secondPUPercentage}
            experience={experience}
            projects={projects}
            programmingLanguages={programmingLanguages}
            services={services}
            softSkills={softSkills}
          />
        }
        fileName={`${studentName || "resume"}_Resume.pdf`}
      >
        {({ loading }) => (
          // IMPORTANT CHANGE HERE: Use motion.button instead of motion.a
          <motion.button
            {...buttonHoverTapVariants}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg text-lg block text-center mt-10 mx-auto max-w-xs
              bg-gradient-to-r ${downloadButtonAccent} !text-white
              transition-all duration-200 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={loading ? "Generating PDF..." : "Download Resume PDF"}
            type="button" // Specify type="button" to prevent accidental form submission
            disabled={!isFormValid()} // Disable the button based on validation
          >
            {loading ? "Generating PDF..." : "Download Resume PDF"}
          </motion.button>
        )}
      </PDFDownloadLink>
    </motion.div>
  );
};

export default InvoiceGenerator;