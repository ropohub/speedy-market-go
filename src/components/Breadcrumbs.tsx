
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  crumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <Link to={crumb.path} className="flex items-center hover:text-gray-900">
              <Home className="w-4 h-4 mr-1" />
              {crumb.label}
            </Link>
          ) : crumb.path ? (
            <Link to={crumb.path} className="hover:text-gray-900">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
