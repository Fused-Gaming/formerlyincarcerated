import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

const CTAButton = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  target = '_self',
  icon = null,
  download = false,
  onClick = null,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 rounded-lg';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-hp-orange text-hp-black hover:bg-hp-orange-glow shadow-lg hover:shadow-hp-cinematic transform hover:scale-105',
    secondary: 'border-2 border-hp-orange text-hp-orange hover:bg-hp-orange/10',
    dark: 'bg-hp-dark text-hp-orange border-2 border-hp-orange hover:bg-hp-black',
    outline: 'border-2 border-hp-gray-light text-hp-white hover:border-hp-orange hover:text-hp-orange',
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : ''}>
        <a className={classes} download={download} {...props}>
          {children}
          {icon && <span className="ml-2">{icon}</span>}
          {!icon && variant === 'primary' && <ArrowRight className="ml-2" size={18} />}
        </a>
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
      {!icon && variant === 'primary' && <ArrowRight className="ml-2" size={18} />}
    </button>
  );
};

export const CTAButtonGroup = ({ children, layout = 'row' }) => {
  const layoutClass = layout === 'row' ? 'flex-row' : 'flex-col';
  return (
    <div className={`flex ${layoutClass} gap-4 flex-wrap justify-center md:justify-start`}>
      {children}
    </div>
  );
};

export const CTAPrimary = (props) => <CTAButton variant="primary" {...props} />;
export const CTASecondary = (props) => <CTAButton variant="secondary" {...props} />;
export const CTADark = (props) => <CTAButton variant="dark" {...props} />;
export const CTAOutline = (props) => <CTAButton variant="outline" {...props} />;
export const CTADownload = (props) => <CTAButton variant="primary" icon={<Download size={18} />} {...props} />;

export default CTAButton;
