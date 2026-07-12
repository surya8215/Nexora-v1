import React from 'react';

const BubbleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="bubble bubble-purple top-10 left-10"></div>
      <div className="bubble bubble-blue bottom-10 right-10"></div>
      <div className="bubble bubble-pink top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default BubbleBackground;
