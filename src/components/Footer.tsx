
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 mt-10 bg-[#FCFBF8]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Data3DBlog</h3>
            <p className="text-muted-foreground">
              Exploring the intersection of data analytics and 3D printing technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/analytics" className="text-muted-foreground hover:text-primary transition-colors">Analytics</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Data3DBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
