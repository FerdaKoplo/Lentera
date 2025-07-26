const LogoutButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#A8E6CF] to-[#BCA7E8] hover:scale-105 text-white rounded-full transition-all duration-200"
  >
    <span className="text-base font-medium">Logout</span>
    <img src="/assets/logout.svg" alt="logout icon" className="w-6 h-6" />
  </button>
);

export default LogoutButton;
