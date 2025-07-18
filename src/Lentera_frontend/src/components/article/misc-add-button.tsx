import { Editor, useEditor } from '@tiptap/react'
import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx"
import { FaBold, FaItalic, FaPlus } from "react-icons/fa6"
import { IoMdImage } from 'react-icons/io'

interface ToolButtonProps {
    editor: Editor | null
}

const ToolButton: React.FC<ToolButtonProps> = ({ editor }) => {

    const [toolbar, setToolbar] = useState<boolean>(false)

    const handleToolButton = () => {
        setToolbar(!toolbar)
    }

    const handleImageUpload = (editor: Editor | null) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'

        input.onchange = () => {
            const file = input.files?.[0]
            if (!file) return

            const reader = new FileReader()
            reader.onload = () => {
                const base64 = reader.result as string
                editor?.chain().focus().setImage({ src: base64 }).run()
            }
            reader.readAsDataURL(file)
        }

        input.click()
    }


    return (
        <div className='flex   items-center gap-5'>
            <button type='button' className='font-bold flex bg-gradient-to-r text-white py-2 px-2 rounded-full from-[#BCA7E8] to-[#A8E6CF]' onClick={() => handleToolButton()}>
                {toolbar ? <RxCross1 /> : <FaPlus />}
            </button>
            {toolbar && (
                <div className='flex items-center gap-8'>
                    <button type='button' className='font-bold flex  text-[#A8E6CF] py-2 px-2 rounded-full border-2 border-[#A8E6CF]' onClick={() => editor?.chain().focus().toggleBold().run()}><FaBold /></button>
                    <button type='button' className='font-bold flex  text-[#A8E6CF] py-2 px-2 rounded-full border-2 border-[#A8E6CF]' onClick={() => editor?.chain().focus().toggleItalic().run()}><FaItalic /></button>
                    <button type='button' className='font-bold flex  text-[#A8E6CF] py-2 px-2 rounded-full border-2 border-[#A8E6CF]' onClick={() => handleImageUpload(editor)}>
                        <IoMdImage />
                    </button>
                </div>
            )}
        </div>

    )
}

export default ToolButton