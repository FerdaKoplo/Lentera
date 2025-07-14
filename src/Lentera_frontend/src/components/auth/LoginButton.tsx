import React from "react";

interface Props {
  onClick: () => void;
  isLoading?: boolean;
}

const LoginButton: React.FC<Props> = ({ onClick, isLoading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex items-center justify-center gap-3 
        px-8 py-3 
        bg-white 
        border-2 border-teal-400 
        text-teal-400 
        rounded-full 
        font-medium 
        text-lg
        hover:bg-teal-50 
        hover:border-teal-500 
        hover:text-teal-500
        active:bg-teal-100
        transition-all duration-200 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        min-w-[140px]
      `}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-400"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4z" />
            <path d="M12 12c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4z" />
          </svg>
          <span>Login</span>
        </>
      )}
    </button>
  );
};

export default LoginButton;
