import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  size = 'md',
  title = '',
  showCloseButton = true,
  closeButtonPosition = 'header',
  zIndex = 'z-[100]',
  className = '',
  showBackdropClose = true,
  showEscapeClose = true,
  children
}) => {
  // Listen for Escape key to close the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showEscapeClose && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showEscapeClose, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Resolve size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-5xl',
    '4xl': 'max-w-6xl',
    full: 'max-w-full max-w-[calc(100vw-3rem)]',
  }[size] || 'max-w-md';

  const handleBackdropClick = () => {
    if (showBackdropClose && onClose) {
      onClose();
    }
  };

  const renderCloseButton = () => (
    <button
      type="button"
      onClick={onClose}
      className="p-2 rounded-full bg-slate-950/40 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10 transition-all duration-200"
      aria-label="Close modal"
    >
      <X className="h-5 w-5" />
    </button>
  );

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 ${zIndex} overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-4 sm:p-6 md:p-10 animate-fade-in cursor-pointer`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${sizeClasses} glass bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto transform transition-all max-h-none overflow-visible cursor-default ${className}`}
      >
        {/* Render close button in absolute position if requested */}
        {showCloseButton && closeButtonPosition === 'absolute' && (
          <div className="absolute top-4 right-4 z-20">
            {renderCloseButton()}
          </div>
        )}

        {/* Render header if title is provided */}
        {title && (
          <div className="flex justify-between items-center mb-6">
            {typeof title === 'string' ? (
              <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
                {title}
              </h2>
            ) : (
              title
            )}
            {showCloseButton && closeButtonPosition === 'header' && renderCloseButton()}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
