import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useCallback, useMemo, useRef, useState } from "react";


export default function TextEditor({content, setContent}){


    // Editor ref
    const quill = useRef();

    const imageHandler = useCallback(() => {
        // Create an input element of type 'file'
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        // When a file is selected
        input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();

            // Read the selected file as a data URL
            reader.onload = () => {
                const imageUrl = reader.result;
                const quillEditor = quill.current.getEditor();

                // Get the current selection range and insert the image at that index
                const range = quillEditor.getSelection(true);
                quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
            };

            reader.readAsDataURL(file);
        };
    }, []);

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
                    ["link", "image"],
                    ["clean"],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            clipboard: {
                matchVisual: true,
            },
        }),
        [imageHandler]
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

                    formats={formats}
                    modules={modules}
                    value={content}
                    onChange={(c) => setContent(c)}
                    placeholder="Write a description..."
                    theme="snow"
                    defaultValue={''}

                />


        </div>
    );
}