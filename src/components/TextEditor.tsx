"use client"
import React, { useCallback } from 'react'
import {
    BubbleMenu,
    EditorContent,
    FloatingMenu,
    useEditor,
  } from '@tiptap/react'
  import Link from '@tiptap/extension-link'
  import StarterKit from '@tiptap/starter-kit'
  import Image from '@tiptap/extension-image'
  import Youtube from '@tiptap/extension-youtube'
  import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
  import { FaBold,FaItalic,FaImage,FaHeading,FaYoutube,FaCode,FaListOl,FaListUl  } from "react-icons/fa";
  import { AiOutlineMergeCells } from "react-icons/ai";
  import { LuHeading4,LuHeading5,LuHeading6 } from "react-icons/lu";
  import { BiLink } from "react-icons/bi";
  import { MdTitle } from "react-icons/md";
  import { FaQuoteLeft,FaTable,FaTableList } from "react-icons/fa6";
  import { MdLineWeight } from "react-icons/md";
  import { PiCodeBlockFill,PiSquareSplitHorizontalFill } from "react-icons/pi";
  import { GrTableAdd } from "react-icons/gr";
  import { RiInsertColumnRight,RiDeleteColumn,RiDeleteRow,RiInsertRowBottom } from "react-icons/ri";
  import { FcDeleteDatabase } from "react-icons/fc";
const TextEditor = () => {
    const editor = useEditor({
        extensions: [
          StarterKit,
          Image,
          Link.configure({
            openOnClick: false,
            autolink: true,
          }),
          Youtube.configure({
            controls: false,
          }),
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableHeader,
          TableCell,
        ],
        content: `
          <p>
            Try to select <em>this text</em> to see what we call the bubble menu.
          </p>
          <p>
            Neat, isn’t it? Add an empty paragraph to see the floating menu.
          </p>
        `,
      })

      if (!editor) {
        return null
      }
      const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
      }
      const addImage = () => {
        const url = window.prompt('URL')
    
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      };
      const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')
    
        if (url) {
          editor.commands.setYoutubeVideo({
            src: url,
            width:  640,
            height:  480,
          })
        }
      }
      const iconClass:string =  "text-white hover:text-gray-200"
      const isActive:string = "text-green-200"
      const menuStyle:string = "bg-[#333] flex gap-x-3 text text-xl px-3 py-2 rounded-md"
      const floatIcon = "bg-[#333] p-2 rounded-full justify-center items-center"
      return (
        <>
            <span className='bg-[#333] text-2xl flex justify-center gap-x-4 px-4 py-2 my-2 rounded-lg'>
    
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? isActive : iconClass}
                >
                    <LuHeading4 />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? isActive : iconClass}
                >
                    <LuHeading5 />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? isActive : iconClass}
                >
                    <LuHeading6 />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                    }
                    className={editor.isActive('code') ? isActive : iconClass}
                >
                    <FaCode />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? isActive : iconClass}
                >
                    <FaListOl />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? isActive : iconClass}
                >
                    <FaListUl />
                </button>
                <span className='border-x-1'></span>
                {/* table  */}
                <button
                    className={iconClass} 
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                    }
                >
                    <GrTableAdd />
                </button>
                <button className={iconClass} onClick={() => editor.chain().focus().addColumnAfter().run()}>
                    <RiInsertColumnRight />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().deleteColumn().run()}>
                    <RiDeleteColumn />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().addRowAfter().run()}>
                    <RiInsertRowBottom />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().deleteRow().run()}>
                    <RiDeleteRow />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().deleteTable().run()}>
                    <FcDeleteDatabase />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().mergeCells().run()}>
                    <AiOutlineMergeCells />
                    </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().splitCell().run()}>
                    <PiSquareSplitHorizontalFill />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                    <FaTable />
                </button>
                <button className={iconClass}  onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                    <FaTableList />
                </button>



            </span>
          {editor && <BubbleMenu className={menuStyle} tippyOptions={{ duration: 100 }} editor={editor}>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? isActive : iconClass}
            >
              <FaBold   />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? isActive : iconClass}
            >
              <FaItalic  />
            </button>
            <button onClick={setLink} className={editor.isActive('link') ? isActive : iconClass}>
            <BiLink />
            </button>
            <span className='border-r-1'></span>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? isActive : iconClass}
            >
              <FaHeading />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? isActive : iconClass}
            >
              <MdTitle />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? isActive : iconClass}
            >
                <FaQuoteLeft />
            </button>
          </BubbleMenu>}
    
          {editor && <FloatingMenu className="flex gap-x-2" tippyOptions={{ duration: 100 }} editor={editor}>
            <button onClick={addImage} className={`${iconClass} ${floatIcon} `}>
                <FaImage />
            </button>
            <button id="add" className={`${iconClass} ${floatIcon} `} onClick={addYoutubeVideo}>
                <FaYoutube />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`${iconClass} ${floatIcon} `}
            >
                <PiCodeBlockFill />
            </button>
            <button id="add" className={`${iconClass} ${floatIcon} `} onClick={() => editor.chain().focus().setHardBreak().run()}>
                <MdLineWeight />
            </button>

          </FloatingMenu>}
    
          <EditorContent editor={editor} />
          <button onClick={()=>console.log(editor.getHTML())}>
            get code
          </button>
        </>
      )
}

export default TextEditor
