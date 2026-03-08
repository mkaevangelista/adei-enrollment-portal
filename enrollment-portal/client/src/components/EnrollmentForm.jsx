import { useState } from "react";
import "../index.css";

// ================= ENROLLMENT FORM COMPONENT =================
function EnrollmentForm({ level, setLevel, semester, setSemester, campus, setCampus }) {
  return (
    <fieldset>
      <h2>Enrollment Choices</h2>

      {/* Academic Level */}
      <fieldset>
        <h3>Academic Level</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="level"
              value="Undergraduate"
              checked={level === "Undergraduate"}
              onChange={(e) => setLevel(e.target.value)}
            />
            Undergraduate
          </label>

          <label>
            <input
              type="radio"
              name="level"
              value="Graduate"
              checked={level === "Graduate"}
              onChange={(e) => setLevel(e.target.value)}
            />
            Graduate
          </label>
        </div>
      </fieldset>

      {/* Semester */}
      <fieldset>
        <h3>Semester</h3>
        <div className="radio-group">
          {["1st Semester", "2nd Semester", "Summer"].map((sem) => (
            <label key={sem}>
              <input
                type="radio"
                name="semester"
                value={sem}
                checked={semester === sem}
                onChange={(e) => setSemester(e.target.value)}
              />
              {sem}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Campus */}
      <fieldset>
        <h3>Campus</h3>
        <div className="radio-group">
          {["Manila", "Quezon City"].map((camp) => (
            <label key={camp}>
              <input
                type="radio"
                name="campus"
                value={camp}
                checked={campus === camp}
                onChange={(e) => setCampus(e.target.value)}
              />
              {camp}
            </label>
          ))}
        </div>
      </fieldset>
    </fieldset>
  );
}

// ================= MAIN APP =================
function App() {
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [errors, setErrors] = useState({});

  const degreePrograms = {
    Undergraduate: {
      "College of Engineering and Architecture": [
        "BS Architecture",
        "BS Chemical Engineering",
        "BS Civil Engineering",
        "BS Computer Engineering",
        "BS Electrical Engineering",
        "BS Electronics Engineering",
        "BS Industrial Engineering",
        "BS Mechanical Engineering",
      ],
      "College of Computer Studies": [
        "BS Computer Science",
        "BS Data Science and Analytics",
        "BS Entertainment and Multimedia Computing",
        "BS Information Technology",
      ],
      "College of Business Education": [
        "BS Accountancy",
        "BS Accounting Information System",
        "BS Business Administration - Financial Management",
        "BS Business Administration - Human Resource Management",
        "BS Business Administration - Logistics and Supply Chain Management",
        "BS Business Administration - Marketing Management",
      ],
      "College of Arts": [
        "Bachelor of Arts in English Language",
        "Bachelor of Arts in Political Science",
      ],
    },

    Graduate: {
      "Doctorate Degrees": [
        "Doctor in Information Technology",
        "Doctor of Engineering (Computer Engineering)",
        "Doctor of Philosophy in Computer Science",
      ],
      "Master's Degrees": [
        "Master in Information Systems",
        "Master in Information Technology",
        "Master in Logistics and Supply Chain Management",
        "Master of Engineering (Civil Engineering)",
        "Master of Engineering (Computer Engineering)",
        "Master of Engineering (Electrical Engineering)",
        "Master of Engineering (Electronics Engineering)",
        "Master of Engineering (Industrial Engineering)",
        "Master of Engineering (Mechanical Engineering)",
        "Master of Science in Computer Science",
      ],
    },
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setDegree("");
  };

  const handleBlur = (e) => {
    const { name, value, required } = e.target;

    // Restrict input for number fields and grade average
    if (["mobile", "zip", "elemYear", "jhsYear", "landline", "shsYear", "shsAverage"].includes(name)) {
      const onlyDigits = /^\d+$/;
      let valid = onlyDigits.test(value);
      let customMsg = "";
      if (value.trim() === "") {
        valid = false;
        customMsg = "This field is required.";
      }
      if (name === "mobile") {
        if (value.length !== 11) {
          valid = false;
          customMsg = "Mobile number must be exactly 11 digits.";
        }
      }
      if (name === "landline") {
        if (value.length !== 8) {
          valid = false;
          customMsg = "Landline must be exactly 8 digits.";
        }
      }
      if (name === "zip") {
        if (value.length < 4 || value.length > 5) {
          valid = false;
          customMsg = "Zip code must be 4 to 5 digits.";
        }
      }
      if (name === "shsAverage") {
        if (/\D/.test(value)) {
          valid = false;
          customMsg = "Grade average must only contain numbers.";
        } else if (value.trim() === "") {
          valid = false;
          customMsg = "This field is required.";
        } else {
          const num = Number(value);
          if (isNaN(num) || num < 0 || num > 100) {
            valid = false;
            customMsg = "Grade average must be between 0 and 100.";
          }
        }
      }
      if (!valid) {
        e.target.setCustomValidity(customMsg || "Only digits are allowed.");
      } else {
        e.target.setCustomValidity("");
      }
      setErrors((prev) => ({
        ...prev,
        [name]: !valid,
      }));
      return;
    }

    // Restrict input for name, school name, religion, city, and province fields
    if (["firstName", "middleName", "lastName", "elemName", "jhsName", "shsName", "religion", "city", "province"].includes(name)) {
      const hasNumber = /\d/.test(value);
      let valid = !hasNumber && value.trim() !== "";
      let customMsg = "";
      if (hasNumber) {
        customMsg = "This field must not contain numbers.";
      } else if (value.trim() === "") {
        customMsg = "This field is required.";
      }
      if (!valid) {
        e.target.setCustomValidity(customMsg);
      } else {
        e.target.setCustomValidity("");
      }
      setErrors((prev) => ({
        ...prev,
        [name]: !valid,
      }));
      return;
    }

    if (required) {
      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() === "" ? true : false,
      }));
    }
    e.target.setCustomValidity("");
  };

  // Real-time input restriction for number fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (["mobile", "zip", "elemYear", "jhsYear", "landline", "shsYear"].includes(name)) {
      // Remove non-digit characters
      let newValue = value.replace(/[^\d]/g, "");
      if (name === "landline") {
        newValue = newValue.slice(0, 8); // Restrict to 8 digits
      }
      e.target.value = newValue;
    }
    if (["firstName", "middleName", "lastName", "elemName", "jhsName", "shsName", "religion", "city", "province"].includes(name)) {
      // Remove digits from name, school name, religion, city, and province fields
      e.target.value = value.replace(/[\d]/g, "");
    }
    if (["shsAverage"].includes(name)) {
      // Remove all non-digit characters and restrict to 0-100
      let numeric = value.replace(/\D/g, "");
      let num = Number(numeric);
      if (num > 100) num = 100;
      if (num < 0) num = 0;
      e.target.value = num ? String(num) : "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newErrors = {};

    Array.from(form.elements).forEach((el) => {
      if (el.required && !el.value) {
        newErrors[el.name] = true;
      }
    });

    if (!level) newErrors.level = true;
    if (!semester) newErrors.semester = true;
    if (!campus) newErrors.campus = true;
    if (!department) newErrors.department = true;
    if (!degree) newErrors.degree = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  const availableDepartments = level
    ? Object.keys(degreePrograms[level])
    : [];

  const availableDegrees =
    level && department ? degreePrograms[level][department] || [] : [];

  return (
    <div className="container">
      <h1>ADEi University Digital Registration</h1>

      <form onSubmit={handleSubmit}>
        {/* ================= PERSONAL INFORMATION ================= */}
        <h2>Personal Information</h2>
        <fieldset>
          <div className="grid-4">
            <input type="text" name="firstName" placeholder="First Name" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="middleName" placeholder="Middle Name" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="lastName" placeholder="Last Name" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="suffix" placeholder="Suffix" />
          </div>

          <div className="grid-3">
            <input type="date" name="dob" required onBlur={handleBlur} />
            <select name="gender" required onBlur={handleBlur}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
            </select>
            <select name="nationality" required onBlur={handleBlur}>
              <option value="">Nationality</option>
              <option>Filipino</option>
              <option>American</option>
              <option>Other</option>
            </select>
          </div>

          <input type="text" name="religion" placeholder="Religion" required onBlur={handleBlur} onInput={handleInput} />
        </fieldset>

        {/* ================= CONTACT DETAILS ================= */}
        <h2>Contact Details</h2>
        <fieldset>
          <div className="grid-3">
            <input type="email" name="email" placeholder="Email" required onBlur={handleBlur} />
            <input type="number" name="mobile" placeholder="Mobile" required onBlur={handleBlur} onInput={handleInput} />
            <input type="number" name="landline" placeholder="Landline" onInput={handleInput} onBlur={handleBlur} />
          </div>

          <div className="grid-4">
            <input type="text" name="street" placeholder="Street" required onBlur={handleBlur} />
            <input type="text" name="barangay" placeholder="Barangay" required onBlur={handleBlur} />
            <input type="text" name="city" placeholder="City" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="province" placeholder="Province" required onBlur={handleBlur} onInput={handleInput} />
          </div>

          <div className="grid-2">
            <input type="number" name="zip" placeholder="Zip Code" required onBlur={handleBlur} onInput={handleInput} />
            <input type="time" name="time" min="08:00" max="17:00" required onBlur={handleBlur} />
          </div>
        </fieldset>

        {/* ================= ACADEMIC HISTORY ================= */}
        <h2>Academic History</h2>
        <fieldset>
          <legend>Elementary</legend>
          <div className="grid-3">
            <input type="text" name="elemName" placeholder="School Name" required onBlur={handleBlur} onInput={handleInput} />
            <input type="number" name="elemYear" placeholder="Year Graduated" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="elemAddress" placeholder="Address" required onBlur={handleBlur} />
          </div>
        </fieldset>

        <fieldset>
          <legend>Junior High</legend>
          <div className="grid-3">
            <input type="text" name="jhsName" placeholder="School Name" required onBlur={handleBlur} onInput={handleInput} />
            <input type="number" name="jhsYear" placeholder="Year Graduated" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="jhsAddress" placeholder="Address" required onBlur={handleBlur} />
          </div>
        </fieldset>

        <fieldset>
          <legend>Senior High</legend>
          <div className="grid-4">
            <input type="text" name="shsName" placeholder="School Name" required onBlur={handleBlur} onInput={handleInput} />
            <input type="number" name="shsYear" placeholder="Year Graduated" required onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="shsAverage" placeholder="Grade Average" required min="0" max="100" onBlur={handleBlur} onInput={handleInput} />
            <input type="text" name="shsAddress" placeholder="Address" required onBlur={handleBlur} />
          </div>
        </fieldset>

        {/* ================= ENROLLMENT CHOICES (REPLACED) ================= */}
        <EnrollmentForm
          level={level}
          setLevel={setLevel}
          semester={semester}
          setSemester={setSemester}
          campus={campus}
          setCampus={setCampus}
        />

        {/* ================= DEPARTMENT & DEGREE ================= */}
        <h3>Department</h3>
        <select value={department} onChange={handleDepartmentChange}>
          <option value="">Select Department</option>
          {availableDepartments.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <h3>Degree</h3>
        <select value={degree} onChange={(e) => setDegree(e.target.value)}>
          <option value="">Select Degree</option>
          {availableDegrees.map((deg) => (
            <option key={deg} value={deg}>{deg}</option>
          ))}
        </select>

        {/* ================= SUBMIT BUTTON ================= */}
        <button type="submit" className="submit-btn">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default App;
