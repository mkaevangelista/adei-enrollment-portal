import { useState } from "react";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({});
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);

  const undergraduatePrograms = {
    "College of Engineering and Architecture": [
      "BS Architecture",
      "BS Chemical Engineering",
      "BS Civil Engineering",
      "BS Computer Engineering",
      "BS Electrical Engineering",
      "BS Electronics Engineering",
      "BS Industrial Engineering",
      "BS Mechanical Engineering"
    ],
    "College of Computer Studies": [
      "BS Computer Science",
      "BS Data Science and Analytics",
      "BS Entertainment and Multimedia Computing",
      "BS Information Technology"
    ],
    "College of Business Education": [
      "BS Accountancy",
      "BS Accounting Information System",
      "BS Business Administration",
      "Financial Management",
      "Human Resource Management",
      "Logistics and Supply Chain Management",
      "Marketing Management"
    ],
    "College of Arts": [
      "Bachelor of Arts in English Language",
      "Bachelor of Arts in Political Science"
    ]
  };

  const graduatePrograms = {
    "Doctorate Degrees": [
      "Doctor in Information Technology",
      "Doctor of Engineering with Specialization in Computer Engineering",
      "Doctor of Philosophy in Computer Science"
    ],
    "Master's Degrees": [
      "Master in Information Systems",
      "Master in Information Technology",
      "Master in Logistics and Supply Chain Management",
      "Master of Engineering with Specialization in Civil Engineering",
      "Master of Engineering with Specialization in Computer Engineering",
      "Master of Engineering with Specialization in Electrical Engineering",
      "Master of Engineering with Specialization in Electronics Engineering",
      "Master of Engineering with Specialization in Industrial Engineering",
      "Master of Engineering with Specialization in Mechanical Engineering",
      "Master of Science in Computer Science"
    ]
  };

  const nameRegex = /^[A-Za-z\s]*$/;
  const numberRegex = /^[0-9]*$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      ["firstName","middleName","lastName","suffix","shsName","jhsName","gsName"].includes(name)
    ) {
      if (!nameRegex.test(value)) return;
    }

    if (
      ["mobile","landline","zip","shsYear","jhsYear","gsYear","gradeAvg"].includes(name)
    ) {
      if (!numberRegex.test(value)) return;
    }

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === "academicLevel") {
      const colleges =
        value === "Undergraduate"
          ? Object.keys(undergraduatePrograms)
          : Object.keys(graduatePrograms);

      setCollegeOptions(colleges);
      setDegreeOptions([]);
      setFormData({ ...updatedData, college: "", degreeProgram: "" });
    }

    if (name === "college") {
      if (updatedData.academicLevel === "Undergraduate") {
        setDegreeOptions(undergraduatePrograms[value] || []);
      } else if (updatedData.academicLevel === "Graduate") {
        setDegreeOptions(graduatePrograms[value] || []);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName", "lastName", "dob", "gender",
      "email", "mobile", "street", "city",
      "academicLevel", "semester", "campus", "college", "degreeProgram"
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert("Please fill all required fields.");
        return;
      }
    }

    if (formData.mobile && formData.mobile.length !== 11) {
      alert("Mobile number must be 11 digits.");
      return;
    }

    if (formData.zip && formData.zip.length !== 4) {
      alert("Zip code must be 4 digits.");
      return;
    }

    alert("Enrollment Submitted Successfully!");
    console.log(formData);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>

      {/* Enrollment Choices */}
      <section>
        <h2>Enrollment Choices *</h2>

        {/* Academic Level */}
        <div className="form-group">
          <p className="group-title">Academic Level *</p>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="academicLevel"
                value="Undergraduate"
                onChange={handleChange}
              />
              Undergraduate School
            </label>

            <label>
              <input
                type="radio"
                name="academicLevel"
                value="Graduate"
                onChange={handleChange}
              />
              Graduate School
            </label>
          </div>
        </div>

        {/* College */}
        <div className="form-group">
          <label>College Department *</label>
          <select
            name="college"
            value={formData.college || ""}
            required
            onChange={handleChange}
          >
            <option value="">Select College</option>
            {collegeOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Degree */}
        <div className="form-group">
          <label>Degree Program *</label>
          <select
            name="degreeProgram"
            value={formData.degreeProgram || ""}
            required
            onChange={handleChange}
          >
            <option value="">Select Program</option>
            {degreeOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div className="form-group">
          <p className="group-title">Semester *</p>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="semester"
                value="1st Semester"
                onChange={handleChange}
              />
              1st Semester
            </label>

            <label>
              <input
                type="radio"
                name="semester"
                value="2nd Semester"
                onChange={handleChange}
              />
              2nd Semester
            </label>

            <label>
              <input
                type="radio"
                name="semester"
                value="Summer"
                onChange={handleChange}
              />
              Summer
            </label>
          </div>
        </div>

        {/* Campus */}
        <div className="form-group">
          <p className="group-title">Campus *</p>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="campus"
                value="Manila"
                onChange={handleChange}
              />
              Manila
            </label>

            <label>
              <input
                type="radio"
                name="campus"
                value="Quezon City"
                onChange={handleChange}
              />
              Quezon City
            </label>
          </div>
        </div>
      </section>

      <button className="submit-btn" type="submit">
        Submit Registration
      </button>
    </form>
  );
}
