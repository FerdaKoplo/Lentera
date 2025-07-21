import React from 'react'

interface ModalProps {
  onClose: () => void
  onDelete: () => void
}

const CommunityModalAuthor: React.FC<ModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg min-w-[200px]">
        <div className="flex flex-col gap-4">
          <button onClick={onDelete} className="text-[#BCA7E8] font-semibold text-left">
            Delete
          </button>
          <button onClick={onClose} className="text-gray-400 text-sm  text-left">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityModalAuthor
