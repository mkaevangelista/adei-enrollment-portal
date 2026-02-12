import { useState } from "react";

export default function EnrollmentForm() {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Name fields should not accept numbers
    if (name.toLowerCase().includes("name") || name === "religion") {
      if (/[^a-zA-Z\s]/.test(value)) return; // block numbers
    }

    // Number-only fields
    if (name === "zip" || name.includes("year") || name === "gradeAvg" || name === "mobile") {
      if (/[^0-9]/.test(value)) return; // block letters
    }

    // Limit zip to 4 digits
    if (name === "zip" && value.length > 4) return;

    // Limit mobile to 11 digits
    if (name === "mobile" && value.length > 11) return;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enrollment Submitted Successfully!");
    console.log(data);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>

      {/* PERSONAL INFORMATION */}
      <section>
        <h2>Personal Information</h2>
        <div className="grid-4">
          <div>
            <label>First Name*</label>
            <input type="text" name="firstName" required onChange={handleChange} />
          </div>
          <div>
            <label>Middle Name</label>
            <input type="text" name="middleName" onChange={handleChange} />
          </div>
          <div>
            <label>Last Name*</label>
            <input type="text" name="lastName" required onChange={handleChange} />
          </div>
          <div>
            <label>Suffix</label>
            <input type="text" name="suffix" onChange={handleChange} />
          </div>
        </div>

        <div className="grid-4">
          <div>
            <label>Date of Birth*</label>
            <input type="date" name="dob" required onChange={handleChange} />
          </div>
          <div>
            <label>Gender*</label>
            <select name="gender" required onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
            </select>
          </div>
          <div>
            <label>Nationality*</label>
            <select name="nationality" required onChange={handleChange}>
              <option value="">Select</option>
              <option>Filipino</option>
              <option>American</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Religion</label>
            <input type="text" name="religion" onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section>
        <h2>Contact Details</h2>
        <div className="grid-3">
          <div>
            <label>Email Address*</label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>
          <div>
            <label>Mobile Number*</label>
            <input type="tel" name="mobile" required placeholder="11 digits" onChange={handleChange} />
          </div>
          <div>
            <label>Landline</label>
            <input type="tel" name="landline" onChange={handleChange} />
          </div>
        </div>

        <div className="grid-5">
          <div>
            <label>Street*</label>
            <input name="street" required onChange={handleChange} />
          </div>
          <div>
            <label>Barangay*</label>
            <input name="barangay" required onChange={handleChange} />
          </div>
          <div>
            <label>City*</label>
            <input name="city" required onChange={handleChange} />
          </div>
          <div>
            <label>Province*</label>
            <input name="province" required onChange={handleChange} />
          </div>
          <div>
            <label>Zip Code*</label>
            <input name="zip" required placeholder="4 digits" onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* ACADEMIC HISTORY */}
      <section>
        <h2>Academic History</h2>
        <h3>Grade School</h3>
        <div className="grid-3">
          <div>
            <label>School Name*</label>
            <input name="gsName" required onChange={handleChange} />
          </div>
          <div>
            <label>Year Graduated*</label>
            <input type="number" min="1900" max="2026" name="gsYear" required onChange={handleChange} />
          </div>
          <div>
            <label>School Address*</label>
            <input name="gsAddress" required onChange={handleChange} />
          </div>
        </div>

        <h3>Junior High School</h3>
        <div className="grid-3">
          <div>
            <label>School Name*</label>
            <input name="jhsName" required onChange={handleChange} />
          </div>
          <div>
            <label>Year Graduated*</label>
            <input type="number" min="1900" max="2026" name="jhsYear" required onChange={handleChange} />
          </div>
          <div>
            <label>School Address*</label>
            <input name="jhsAddress" required onChange={handleChange} />
          </div>
        </div>

        <h3>Senior High School</h3>
        <div className="grid-3">
          <div>
            <label>School Name*</label>
            <input name="shsName" required onChange={handleChange} />
          </div>
          <div>
            <label>Year Graduated*</label>
            <input type="number" min="1900" max="2026" name="shsYear" required onChange={handleChange} />
          </div>
          <div>
            <label>Grade Average*</label>
            <input type="number" step="0.01" name="gradeAvg" required onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>School Address*</label>
          <input name="shsAddress" required onChange={handleChange} />
        </div>
      </section>

      {/* ENROLLMENT CHOICES */}
      <section>
        <h2>Enrollment Choices</h2>
        <div className="radio-group">
          <label>Academic Level*</label>
          <label><input type="radio" name="level" value="Undergraduate" required onChange={handleChange} /> Undergraduate</label>
          <label><input type="radio" name="level" value="Graduate" required onChange={handleChange} /> Graduate</label>
        </div>

        <div className="radio-group">
          <label>Semester*</label>
          <label><input type="radio" name="semester" value="1st" required onChange={handleChange} /> 1st Semester</label>
          <label><input type="radio" name="semester" value="2nd" required onChange={handleChange} /> 2nd Semester</label>
        </div>

        <div className="radio-group">
          <label>Campus*</label>
          <label><input type="radio" name="campus" value="Manila" required onChange={handleChange} /> Manila</label>
          <label><input type="radio" name="campus" value="Quezon City" required onChange={handleChange} /> Quezon City</label>
        </div>

        <div className="grid-2">
          <div>
            <label>College Department*</label>
            <select name="college" required onChange={handleChange}>
              <option value="">Select College</option>
              <option>College of Engineering and Architecture</option>
              <option>College of Computer Studies</option>
              <option>College of Business Education</option>
              <option>College of Arts</option>
            </select>
          </div>

          <div>
            <label>Degree Program*</label>
            <select name="program" required onChange={handleChange}>
              <option value="">Select Program</option>
              <option>BS Architecture</option>
              <option>BS Chemical Engineering</option>
              <option>BS Civil Engineering</option>
              <option>BS Computer Engineering</option>
              <option>BS Electrical Engineering</option>
              <option>BS Electronics Engineering</option>
              <option>BS Industrial Engineering</option>
              <option>BS Mechanical Engineering</option>
              <option>BS Computer Science</option>
              <option>BS Data Science and Analytics</option>
              <option>BS Entertainment and Multimedia Computing</option>
              <option>BS Information Technology</option>
              <option>BS Accountancy</option>
              <option>BS Accounting Information System</option>
              <option>BS Business Administration</option>
              <option>Financial Management</option>
              <option>Human Resource Management</option>
              <option>Logistics and Supply Chain Management</option>
              <option>Marketing Management</option>
              <option>Bachelor of Arts in English Language</option>
              <option>Bachelor of Arts in Political Science</option>
              <option>Doctor in Information Technology</option>
              <option>Doctor of Engineering with Specialization in Computer Engineering</option>
              <option>Doctor of Philosophy in Computer Science</option>
              <option>Master in Information Systems</option>
              <option>Master in Information Technology</option>
              <option>Master in Logistics and Supply Chain Management</option>
              <option>Master of Engineering with Specialization in Civil Engineering</option>
              <option>Master of Engineering with Specialization in Computer Engineering</option>
              <option>Master of Engineering with Specialization in Electrical Engineering</option>
              <option>Master of Engineering with Specialization in Electronics Engineering</option>
              <option>Master of Engineering with Specialization in Industrial Engineering</option>
              <option>Master of Engineering with Specialization in Mechanical Engineering</option>
              <option>Master of Science in Computer Science</option>
            </select>
          </div>
        </div>
      </section>

      <button className="submit-btn">Submit Registration</button>
    </form>
  );
}