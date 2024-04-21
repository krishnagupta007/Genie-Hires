import React, {useState} from 'react';
import "quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

function TextEditor(){
    const [value, setvalue] = useState("");

    var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    ['clean']                                         // remove formatting button
    ];
    const modules = {
        toolbar : toolbarOptions,
    }

    return <ReactQuill id="TextEditor" modules={modules} theme="bubble" value={value} onChange={setvalue}/>;
};

export default TextEditor;