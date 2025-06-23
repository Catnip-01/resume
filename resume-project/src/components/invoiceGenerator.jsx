// src/components/InvoiceGenerator.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Assuming resumeStyles.js ONLY contains PDF-specific styles and Font.register
import { styles } from "./resumeStyles"; // Only import 'styles' for PDF
import {
  Font, // Font is imported again here for Font.register, but it's redundant if resumeStyles.js handles it
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// IMPORTANT: Ensure these paths are correct relative to THIS file
// You might need to adjust these if your structure is different.
import lightSvg from '../svg/light.svg';
import darkSvg from '../svg/moon.svg';

// Define the PDF Document component (NO Tailwind or Framer Motion here, purely @react-pdf/renderer styles)
const InvoiceDocument = (resume) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Student Name Header */}
      <View style={styles.studentNameHeader}>
        <Text>{resume.studentName || "Your Name"}</Text>
      </View>

      {/* Location */}
      <View style={styles.location}>
        <Text>{resume.location || "City, Country"}</Text>
      </View>

      <Text>{"\n"}</Text>

      {/* Phone Number and Email Links */}
      <View style={styles.links}>
        <Text>{resume.phoneNumber || "+91-1234567890"}</Text>
        <Text>{resume.email || "your.email@example.com"}</Text>
        <Text>{resume.linkedin || "linkedin.com/in/yourprofile"}</Text>
      </View>

      <Text>{"\n"}</Text>

      {/* Education Section */}
      <View style={styles.topicNames}>
        <Text>Education</Text>
      </View>
      {/* <View style={{ borderBottom: "1px solid #000" }} /> - this is handled by topicNames style */}
      <Text>{"\n"}</Text>

      {/* College Name - uses robotoBold font family */}
      <View style={{ fontFamily: "robotoBold", fontSize: 12 }}>
        <Text>{resume.collegeName || "Your University Name"}</Text>
      </View>

      {/* Degree, Course, CGPA - uses robotoBold for CGPA */}
      <View
        style={{ display: "flex", flexDirection: "row", gap: 3, fontSize: 12 }}
      >
        <Text>
          {resume.degreeName || "Degree Name"},{" "}
          {resume.courseName || "Course Name"}
        </Text>
        <Text style={{ fontFamily: "robotoBold" }}>
          CGPA: {resume.cgpa || "0.0"}
        </Text>
      </View>

      {/* Second PUC - uses robotoBold font family */}
      <View>
        <Text style={{ fontFamily: "robotoBold", fontSize: 12 }}>
          {resume.secondPUC || "Your 12th/PUC School"}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            fontSize: 12,
          }}
        >
          <Text>Upper Secondary Graduation - Percentage: </Text>
          <Text style={{ fontFamily: "robotoBold" }}>
            {resume.secondPUPercentage ? `${resume.secondPUPercentage}%` : "0.0%"}
          </Text>
        </View>
      </View>

      <Text>{"\n"}</Text>

      {/* Projects */}
      <View style={styles.topicNames}>
        <Text>Projects</Text>
      </View>
      {/* <View style={{ borderBottom: "1px solid #000" }} /> - this is handled by topicNames style */}
      <Text>{"\n"}</Text>

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
            <Text>{project.techStack || "Tech Stack: React, Node.js"}</Text>
            <Text>{project.description || "Brief description of project."}</Text>
            <Text>{"\n"}</Text>
          </View>
        ))
      ) : (
        <Text>No projects listed</Text>
      )}

      {/* Skills */}
      <View style={styles.topicNames}>
        <Text>Skills</Text>
      </View>
      {/* <View style={{ borderBottom: "1px solid #000" }} /> - this is handled by topicNames style */}
      <Text>{"\n"}</Text>
      <View style={styles.skills}>
        <Text>
          Programming Languages:{" "}
          {resume.programmingLanguages || "JavaScript, Python, C++"}
        </Text>
        <Text>Services: {resume.services || "AWS, Docker, Git"}</Text>
      </View>
    </Page>
  </Document>
);

// Framer Motion variants for common animations
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
    scale: 1.005, // Slight scale on focus
  },
  transition: { duration: 0.2 },
};

const buttonHoverTapVariants = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

const InvoiceGenerator = () => {
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
  const [theme, setTheme] = useState("light"); // Default to light theme

  // State for projects
  const [projects, setProjects] = useState([
    { name: "", year: "", techStack: "", description: "" },
  ]);

  const [programmingLanguages, setProgrammingLanguages] = useState("");
  const [services, setServices] = useState("");

  // --- Functions must be defined inside the component scope to be accessible ---
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    if (projects.length < 5) {
      setProjects([
        ...projects,
        { name: "", year: "", techStack: "", description: "" },
      ]);
    }
  };
  // --- End of function definitions ---

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Dynamic Tailwind classes based on theme
  const containerClasses = theme === "light"
    ? "bg-neutral-100 text-neutral-800 shadow-xl"
    : "bg-neutral-950 text-neutral-200 shadow-xl-dark"; // Custom class for dark shadow

  const sectionBgClasses = theme === "light"
    ? "bg-white border-neutral-200"
    : "bg-neutral-900 border-neutral-800";

  const inputClasses = theme === "light"
    ? "bg-white text-neutral-800 border-neutral-300 placeholder-neutral-500"
    : "bg-neutral-800 text-neutral-200 border-neutral-700 placeholder-neutral-400";

  const hrBorderColor = theme === "light" ? "border-neutral-300" : "border-neutral-700";

  const themeIconSrc = theme === "light" ? lightSvg : darkSvg;
  const themeIconBorder = theme === "light" ? "border-neutral-500" : "border-neutral-500"; // Keep consistent border
  const themeIconBg = theme === "light" ? "bg-white" : "bg-neutral-700";
  const themeIconShadow = theme === "light" ? "shadow-md" : "shadow-lg";

  // Accent color for headings and focus rings (Tailwind classes)
  const accentColorClass = "text-purple-500";
  const focusRingColorClass = "focus:ring-purple-500";
  const downloadButtonAccent = "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500";
  const addButtonAccent = "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500";


  return (
    // Main container with Tailwind classes and Framer Motion
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className={`min-h-screen flex flex-col items-center p-8 md:p-12 lg:p-8 !max-w-6xl rounded-2xl mx-auto font-sans relative ${containerClasses}`}
      style={{ overflowX: 'hidden' }} // Prevent horizontal scroll on animations
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
              placeholder="Enter name"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
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
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter phone number"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Enter LinkedIn profile URL"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
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
              placeholder="Enter college name"
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
              placeholder="Enter course (e.g., Computer Science)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="Enter CGPA (e.g., 8.5)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
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
          PUC Details:
        </motion.h2>
        <div className="flex flex-col gap-4">
          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={secondPUC}
              onChange={(e) => setSecondPUC(e.target.value)}
              placeholder="Enter 12th/PUC equivalent name"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={secondPUPercentage}
              onChange={(e) => setSecondPUPercentage(e.target.value)}
              placeholder="Enter 12th/PUC percentage (e.g., 90)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>
        </div>
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
                    onChange={(e) =>
                      handleProjectChange(index, "year", e.target.value)
                    }
                    placeholder={`Project ${index + 1} Year (e.g., 2023)`}
                    className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
                    {...inputFocusVariants}
                  />
                </label>

                <label className="block w-full">
                  <motion.input
                    type="text"
                    value={project.techStack}
                    onChange={(e) =>
                      handleProjectChange(index, "techStack", e.target.value)
                    }
                    placeholder="Tech Stack (comma-separated: React, Node.js)"
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
                    placeholder="Project Description (key features, your role)"
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
              placeholder="Programming Languages (e.g., JavaScript, Python, C++)"
              className={`w-full p-3 border rounded-lg text-lg outline-none focus:ring-2 ${focusRingColorClass} ${inputClasses}`}
              {...inputFocusVariants}
            />
          </label>

          <label className="block w-full mb-2">
            <motion.input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Services (e.g., AWS, Azure, Google Cloud, Docker)"
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
            projects={projects}
            programmingLanguages={programmingLanguages}
            services={services}
          />
        }
        fileName={`${studentName || "resume"}_Resume.pdf`}
      >
        {({ loading }) => (
          <motion.a
            {...buttonHoverTapVariants}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg text-lg block text-center mt-10 mx-auto max-w-xs
              bg-gradient-to-r ${downloadButtonAccent} !text-white cursor-pointer
              transition-all duration-200`}
            role="button"
            aria-label={loading ? "Generating PDF..." : "Download Resume PDF"}
          >
            {loading ? "Generating PDF..." : "Download Resume PDF"}
          </motion.a>
        )}
      </PDFDownloadLink>
    </motion.div>
  );
};

export default InvoiceGenerator;