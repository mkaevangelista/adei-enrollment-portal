import EnrollmentForm from "./components/EnrollmentForm";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <h1>University Student Enrollment Portal</h1>
        <p>Office of the University Registrar</p>
      </header>

      <EnrollmentForm />

      <footer className="footer">
        © 2026 ADEi University
      </footer>
    </div>
  );
}