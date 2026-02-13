import EnrollmentForm from "./components/EnrollmentForm";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <h1>ADEi University Student Enrollment Portal</h1>
      </header>

      <EnrollmentForm />

      <footer className="footer">
        © 2026 ADEi University
      </footer>
    </div>
  );
}