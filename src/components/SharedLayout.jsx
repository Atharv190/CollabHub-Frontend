// src/components/SharedLayout.jsx
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SharedLayout = ({ 
  children, 
  showHero = false, 
  heroBadge = null,
  heroTitle = null,
  heroSubtitle = null,
  className = ''
}) => {
  return (
    <div className={`page-container ${className}`}>
      {showHero && (
        <div className="page-hero">
          <Container>
            <div className="text-center">
              {heroBadge && (
                <div className="mb-3">
                  <span className="page-hero-badge">
                    {heroBadge}
                  </span>
                </div>
              )}
              {heroTitle && (
                <h1 className="page-title">
                  {heroTitle}
                </h1>
              )}
              {heroSubtitle && (
                <p className="lead text-muted">{heroSubtitle}</p>
              )}
              <div className="page-title-divider"></div>
            </div>
          </Container>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default SharedLayout;