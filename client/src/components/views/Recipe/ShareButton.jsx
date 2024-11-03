import React, { forwardRef } from 'react';
import ShareIcon from '@mui/icons-material/Share';

const ShareButton = forwardRef(({ isActive, ariaLabel, onClick, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      aria-label={ariaLabel || "Share Button"}
      aria-expanded={isActive}
      style={{
        background: '#242424',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center', // Center icon vertically
      }}
      onClick={onClick}
    >
      <ShareIcon style={{ marginRight: '5px' }} />
      <span style={{ fontSize: '14px' }}>Share</span>
    </button>
  );
});

export default ShareButton;