import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCallback, useMemo, useRef, useState } from "react";

interface TextEditorProps {
    content: string;
    setContent: (content: string) => void;
}
const TextEditor: React.FC<TextEditorProps> = ({ content, setContent }) => {


    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [2, 3, 4, false] }],
                    ["bold", "italic", "underline", "blockquote"],
                    [{ color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                    ],
                    ["link","image"],
                    ["clean"],
                ],
            },
            clipboard: {
                matchVisual: true,
            },
        }),
        []
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
    ];


    return (
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="title" className="sr-only">
                Title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0 focus:outline-none py-3"
                placeholder="Title"
            />

                <ReactQuill
                    theme="snow"
                    className={"block bg-white w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6focus:outline-none"}
                    style={{ height: '500px', width:'100%'}}
                    formats={formats}
                    modules={modules}
                    value={content}
                    onChange={(c) => setContent(c)}
                    placeholder="Write a description..."
                    defaultValue={''}

                />



        </div>
    );
}
export default TextEditor;