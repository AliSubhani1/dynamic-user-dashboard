    import React, { FC } from 'react';
    import './index.scss';

    interface ButtonType {
        children: React.ReactNode;
        handleClick: () => void;
        className?: string;
    }

    const Button: FC<ButtonType> = ({ children, handleClick, className }) => (
      <button onClick={handleClick} className={`custom-button ${className}`}>
        {children}
      </button>
    );

    export default Button;
