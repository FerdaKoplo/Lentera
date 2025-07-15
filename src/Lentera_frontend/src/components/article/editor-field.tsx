import { EditorContent } from '@tiptap/react'
import React, { useState } from 'react'
import ToolButton from './misc-add-button'

type EditorFieldProps = {
    editorId: 'title' | 'content'
    editor: any
    activeEditor: string | null
    setActiveEditor: (id: 'title' | 'content' | null) => void
}

const EditorField: React.FC<EditorFieldProps> = ({ editorId, editor, activeEditor, setActiveEditor }) => {

    const [toolbarActive, setToolbarActive] = useState<boolean>(false)

    const handleBlur = () => {
        if (!toolbarActive) {
            setActiveEditor(null)
        }
    }


    return (
        <div className="flex items-center gap-7">
            {activeEditor === editorId && (
                <div
                    className="flex items-center"
                    onMouseDown={() => setToolbarActive(true)}
                    onMouseUp={() => setToolbarActive(false)}
                    onMouseLeave={() => setToolbarActive(false)}
                >
                    <ToolButton editor={editor} />
                </div>
            )}

            <EditorContent
                editor={editor}
                onFocus={() => setActiveEditor(editorId)}
                onBlur={handleBlur}
                className={`editor-no-outline ${editorId === 'title' ? 'text-4xl font-semibold' : ''}`}
            />
        </div>
    )
}

export default EditorField