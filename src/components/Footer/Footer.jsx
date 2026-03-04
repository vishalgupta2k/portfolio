import './Footer.styles.css';
export default function Footer() {
  return (
    <footer className="footer glass">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Vishal Gupta. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/vishalgupta2k" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ervishalg" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

    </footer>
  );
}
