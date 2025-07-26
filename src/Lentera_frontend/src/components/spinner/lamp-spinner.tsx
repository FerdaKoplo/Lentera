import React from 'react'

const LanternFlameSpinner: React.FC = () => {
  return (
    <div className="flex justify-center animate-pulse items-center min-h-screen">
      <div className="relative w-32 h-52">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-6">
          <div className="w-full h-1 bg-gradient-to-r from-[#BCA7E8] via-[#BCA7E8] to-[#BCA7E8] rounded-t-full"></div>
          <div className="absolute top-1 left-0 w-full h-4 border-t-4 border-[#BCA7E8] border-l-4 border-r-4 rounded-t-full"></div>
        </div>
        <div className="absolute top-0 w-full h-48 border-4 border-[#BCA7E8] rounded-lg bg-gradient-to-b from-[#BCA7E8]/20 to-[#BCA7E8]/10 shadow-lg">
          <div className="absolute inset-1 rounded-lg bg-white/5 backdrop-blur-sm border border-[#BCA7E8]/10"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-[#BCA7E8] via-[#BCA7E8] to-[#BCA7E8] rounded-b-full"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-24">
            <div
              className="absolute inset-0 bg-[#61B398]/30 rounded-full animate-pulse"
              style={{ filter: 'blur(12px)' }}
            ></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gradient-to-t from-[#61B398] via-[#A8E6CF] to-white rounded-t-full animate-flicker"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-white to-[#61B398] rounded-full animate-flicker2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanternFlameSpinner
