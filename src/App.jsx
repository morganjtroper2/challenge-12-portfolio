import { useState } from 'react';
import './App.css';

function Header({ currentSection, setCurrentSection }) {
  const sections = ['About Me', 'Portfolio', 'Contact', 'Resume'];

  return (
    <header>
      <h1>Morgan Troper</h1>
      <nav>
        <ul>
          {sections.map((section) => (
            <li
              key={section}
              className={currentSection === section ? 'active' : ''}
              onClick={() => setCurrentSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function AboutMe() {
  return (
    <section>
      <h2>About Me</h2>
      <img src="https://www.koko.org/wp-content/uploads/2014/06/r_blog_2011-11-02_kittens_0-600x420.jpg" alt="Developer" />
      <p>My name is Morgan, and I'm an aspiring web developer currently enrolled in University of Oregon's coding bootcamp.</p>
    </section>
  );
}

function Portfolio() {
  const projects = [
    { repo: 'https://github.com/morganjtroper2' },
  ];

  return (
    <section>
      <h2>Portfolio</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            
            <a href={project.repo} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: 'This field is required' });
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formState.email)) {
      setErrors({ ...errors, email: 'Invalid email address' });
      return;
    }
    alert('Form submitted!');
  };

  return (
    <section>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <textarea
          name="message"
          placeholder="Message"
          value={formState.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.message && <p className="error">{errors.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

function Resume() {
  const proficiencies = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL'];

  return (
    <section>
      <h3>Proficiencies</h3>
      <ul>
        {proficiencies.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  const [currentSection, setCurrentSection] = useState('About Me');

  const renderSection = () => {
    switch (currentSection) {
      case 'About Me':
        return <AboutMe />;
      case 'Portfolio':
        return <Portfolio />;
      case 'Contact':
        return <Contact />;
      case 'Resume':
        return <Resume />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="app-container">
      <Header currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main>{renderSection()}</main>
      <footer>
        <p>Connect with me:</p>
        <a href="https://github.com/morganjtroper2" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
    </div>
  );
}

export default App;

