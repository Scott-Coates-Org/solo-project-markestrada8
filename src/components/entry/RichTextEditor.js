import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import "./RichTextEditor.css";
import "./react-draft-wysiwyg.css";

const RichTextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (props.editMode && props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(props.contentToEdit);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  // const onEditorStateChange = (newEditorState) => {
  //   setEditorState((prevState) => {
  //     return props.handleRichTextEditorChange(
  //       draftToHtml(convertToRaw(editorState.getCurrentContent()))
  //     );
  //   });
  // };
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    props.handleRichTextEditorChange;
    draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const getBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => {};
  };

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      this.getBase64(file, (data) => resolve({ data: { link: data } }));
    });
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={handleEditorChange}
        // onChange={onEditorStateChange}
        // toolbar={{
        //   inline: { inDropdown: true },
        //   list: { inDropdown: true },
        //   textAlign: { inDropdown: true },
        //   link: { inDropdown: true },
        //   history: { inDropdown: true },
        //   image: {
        //     uploadCallback: this.uploadFile,
        //     alt: { present: true, mandatory: false },
        //     previewImage: true,
        //     inputAccept:
        //       "image/gif,image/jpeg, image.jpg,image/png,image/svg",
        //   },
        // }}
        // toolbar={{
        //   image: {
        //     uploadCallback: this.uploadFile,
        //     alt: { present: true, mandatory: false },
        //     previewImage: true,
        //     inputAccept: "image/gif,image/jpeg, image.jpg,image/png,image/svg",
        //   },
        // }}
      />
    </div>
  );
};

export default RichTextEditor;
