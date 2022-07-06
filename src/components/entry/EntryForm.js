import React, { Component, useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import DropzoneComponent from "react-dropzone-component";
import "./EntryForm.css";

import axios from "axios";

const EntryForm = (props) => {
  const [entryItem, setEntryItem] = useState({
    id: "",
    title: "",
    // blog_status: "",
    content: "",
    // featured_image: "",
    // apiUrl: "https://markestrada.devcamp.space/portfolio/portfolio_blogs",
    // apiAction: "post",
  });

  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  // this.handleRichTextEditorChange =
  //   this.handleRichTextEditorChange.bind(this);

  // this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
  // this.deleteImage = this.deleteImage.bind(this);

  // this.componentConfig = this.componentConfig.bind(this);
  // this.djsConfig = this.djsConfig.bind(this);

  // this.featuredImageRef = React.createRef();

  // const deleteImage = (imageType) => {
  //   axios
  //     .delete(
  //       `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       this.props.handleFeaturedImageDelete();
  //     })
  //     .catch((error) => {
  //       console.log("deleteImage error", error);
  //     });
  // }

  useEffect(() => {
    if (props.editMode) {
      setEntryItem({
        id: props.blog.id,
        title: props.blog.title,
        // blog_status: props.blog.blog_status,
        content: props.blog.content,
        // apiUrl: `https://markestrada.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
        // apiAction: "patch",
      });
    }
  }, []);

  // handleFeaturedImageDrop() {
  //   return {
  //     addedfile: (file) => this.setState({ featured_image: file }),
  //   };
  // }

  const componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  };

  const djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  };

  const handleRichTextEditorChange = (content) => {
    setEntryItem({
      content: content,
    });
  };

  const buildForm = () => {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    // formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    // if (this.state.featured_image) {
    //   formData.append(
    //     "portfolio_blog[featured_image]",
    //     this.state.featured_image
    //   );
    // }

    return formData;
  };

  const handleSubmit = (event) => {
    axios({
      method: state.apiAction,
      url: state.apiUrl,
      data: buildForm(),
      withCredentials: true,
    })
      .then((response) => {
        // if (this.state.featured_image) {
        //   this.featuredImageRef.current.dropzone.removeAllFiles();
        // }
        setEntryItem({
          title: "",
          // blog_status: "",
          content: "",
          // featured_image: "",
        });
        if (props.editMode) {
          props.handleUpdateFormSubmission(response.data.portfolio_blog);
        } else {
          props.handleSuccessfulFormSubmission(response.data.portfolio_blog);
        }
      })
      .catch((error) => {
        console.log("handleSubmit for blog error: ", error);
      });
    event.preventDefault();
  };

  const handleChange = (event) => {
    setEntryItem({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="entry-form-container" onSubmit={handleSubmit}>
      <div className="two-column">
        <input
          type="text"
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={entryItem.title}
        />
        <h1>{entryItem.title}</h1>

        {/* <input
          type="text"
          onChange={this.handleChange}
          name="blog_status"
          placeholder="Blog Status"
          value={this.state.blog_status}
        /> */}
      </div>
      <div className="one-column">
        <RichTextEditor
          handleRichTextEditorChange={handleRichTextEditorChange}
          editMode={props.editMode}
          contentToEdit={
            props.editMode && props.entry.content ? props.entry.content : null
          }
        />
      </div>

      {/* <div className="image-uploaders">
        {this.props.editMode && this.props.blog.featured_image_url ? (
          <div className="edit-mode-image-wrapper">
            <img src={this.props.blog.featured_image_url} />
            <div className="image-removal-link">
              <a onClick={() => this.deleteImage("featured_image")}>
                Remove File
              </a>
            </div>
          </div>
        ) : (
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFeaturedImageDrop()}
          >
            <div className="dz-message">Drag & Drop Image (optional)</div>
          </DropzoneComponent>
        )}
      </div> */}

      <button className="btn">Submit</button>
    </form>
  );
};
export default EntryForm;
