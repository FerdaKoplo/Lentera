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
        border-2 border-[#70D3B5]
        text-[#63C2A5] 
        rounded-full 
        font-bold 
        font-montserrat
        text-lg
        hover:bg-teal-50 
        hover:border-teal-500 
        hover:text-teal-500
        hover:scale-105
        active:bg-teal-100
        transition-all duration-200 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        min-w-[140px]
        shadow-lg
      `}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#70D3B5]"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          <img
            src="/assets/infinity.svg"
            alt="dfinity logo"
            className="w-10 h-10"
          />
          <span>Login</span>
        </>
      )}
    </button>
  );
};

export default LoginButton;
