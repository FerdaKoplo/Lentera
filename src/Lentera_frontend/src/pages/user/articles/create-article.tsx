import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState } from 'react'
import ToolButton from '../../../components/article/misc-add-button'
import Placeholder from '@tiptap/extension-placeholder'
import EditorField from '../../../components/article/editor-field'
import useArticle from '../../../hooks/useArticle'
import { Principal } from "@dfinity/principal";
import SidebarProfile from '../../../components/profile/SidebarProfile'
import useAuth from '../../../hooks/useAuth'
import Image from '@tiptap/extension-image'

const CreateArticle = () => {

    const [activeEditor, setActiveEditor] = useState<'title' | 'content' | null>(null)
    const { principalId, user } = useAuth()
    const { articles, article, loading, error, createArticle } = useArticle()

    const titleEditor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Title'
            }),
            Image
        ],
        content: '',

    })

    const contentEditor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your story...'
            }),
            Image
        ],
        content: '',
    })

    const handleCreateArticle = async (event: React.FormEvent) => {
        event.preventDefault()

        let authorId
        if (principalId && principalId.trim() !== "") {
            try {
                authorId = Principal.fromText(principalId)
            } catch (error) {
                console.error("Invalid principalId from backend or auth hook:", principalId)
                authorId = Principal.fromText("aaaaa-aa")  
            }
        } else {
            console.warn("No principalId detected, using fallback.")
            authorId = Principal.anonymous()
        }
        const articleData = {
            id: BigInt(0),
            authorArticleId: authorId,
            articleTitle: titleEditor?.getText() || "",
            articleContent: contentEditor?.getHTML() || "",
            articleImage: "",
            createdAt: BigInt(Date.now()),
        }

        console.log("Sending data to backend:", articleData)
        const result = await createArticle(articleData)
        console.log("Result after creating article:", result)
    }

    return (
        <div className='flex h-screen overflow-hidden'>
            <SidebarProfile />
            <div className='px-10 py-10 '>
                <form onSubmit={handleCreateArticle} className='flex items-start flex-col gap-7'>
                    <div className='flex flex-col gap-6'>
                        <EditorField
                            editorId="title"
                            editor={titleEditor}
                            activeEditor={activeEditor}
                            setActiveEditor={setActiveEditor}
                        />

                        <EditorField
                            editorId="content"
                            editor={contentEditor}
                            activeEditor={activeEditor}
                            setActiveEditor={setActiveEditor}
                        />
                    </div>
                    <button type='submit' className=' bg-gradient-to-r font-bold text-white py-2 px-5 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                        Publish Article
                    </button>
                </form>

            </div >
        </div>
    )
}

export default CreateArticle