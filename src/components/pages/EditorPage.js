import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  fetchEntry,
  createEntry,
  fetchAllEntries,
  deleteEntry,
} from "redux/entry";

import EntryItem from "../entry/EntryItem";
import EntryModal from "../modals/EntryModal";
import EditorAPI from "../EditorAPI/EditorAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./EditorPage.css";

export default function EditorPage() {
  const dispatch = useDispatch();

  const { data, item, isLoaded, hasErrors } = useSelector(
    (state) => state.entry
  );
  const [entryItems, setEntryItems] = useState([]);
  // const [totalCount, setTotalCount] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [entryModalIsOpen, setEntryModalIsOpen] = useState(false);

  // window.addEventListener("scroll", this.onScroll, false);

  const handleDeleteClick = (entry) => {
    dispatch(deleteEntry(entry)).then(() => {
      reset();
      dispatch(fetchAllEntries());
    });
  };

  const handleNewEntryClick = () => {
    setEntryModalIsOpen(true);
  };

  const handleModalClose = () => {
    setEntryModalIsOpen(false);
  };

  // const onScroll = () => {
  //   if (isLoading || entryItems.length === totalCount) {
  //     return;
  //   }

  // console.log(document.documentElement.offsetHeight);
  // console.log(document.documentElement.scrollTop);
  // console.log(window.innerHeight);
  // console.log(window.innerHeight + document.documentElement.scrollTop + 1);
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >=
  //     document.documentElement.offsetHeight
  // window.innerHeight + window.pageYOffset >=
  // document.body.offsetHeight
  //   ) {
  // alert("scroll");
  //     getEntryItems();
  //   }
  // };

  // testScroll() {
  //   window.onscroll = function (ev) {
  //     if (
  //       window.innerHeight + window.pageYOffset >=
  //       document.body.offsetHeight
  //     ) {
  //       alert("you're at the bottom of the page");
  //     }
  //   };
  // }

  // useEffect(
  //   () => {
  //     dispatch async thunks are promises
  //     https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
  //     dispatch(createEntry({ title: "new title", content: "new content" })).then(
  //       () => {
  //     dispatch(fetchAllEntries());
  //   },
  //   );
  //   console.log(data);
  //   [dispatch]
  // );

  useEffect(() => {
    dispatch(fetchAllEntries());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { ref: titleRef, ...titleRest } = register("title", { required: true });
  const { ref: contentRef, ...contentRest } = register("content", {
    required: true,
  });

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert("Error saving entry: " + JSON.stringify(errors));
    } else {
      // dispatch(savePhoto({ file: data.photo[0] })).then((action) => {
      //   const photoUrl = action.payload;
      //   if (photoUrl) {
      dispatch(
        createEntry({
          title: data.title,
          content: data.content,
          // photo: photoUrl,
        })
      ).then(() => {
        reset();
        dispatch(fetchAllEntries());
      });
    }
  };

  // useEffect(() => {
  //   getEntryItems();
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {});

  // returned function will be called on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", () => {});
  //   };
  // }, []);

  // const componentWillUnmount = () => {
  //   window.removeEventListener("scroll", this.onScroll, false);
  // };

  // const entryRecords
  // {
  //   data.map((entryItem) => {
  // if (loggedInStatus === "LOGGED_IN") {
  //     return (
  //       <div key={entryItem.id} className="admin-blog-wrapper">
  //         <BlogItem entryItem={entryItem} />
  //         <a onClick={() => handleDeleteClick(entryItem)}>
  //           <FontAwesomeIcon icon={"circle-minus"} />
  //         </a>
  //       </div>
  //     );
  //   });
  // }

  // {
  //   data.map((entry) => {
  //     return (
  //       <div className="entry">
  //         <h3 className="entry-title">{entry.title}</h3>
  //         <p className="entry-content">{entry.content}</p>
  //         {/* <img src={datum.photo} style={{ height: "100px" }} /> */}
  //       </div>
  //     );
  //   });
  // }
  //   } else {
  //     return <EntryItem key={entryItem.id} entryItem={entryItem} />;
  //   }
  // });

  //     {loggedInStatus === "LOGGED_IN" ? (
  //   <div className="new-entry-link">
  //   <a onClick={handleNewEntryClick}>
  //     <FontAwesomeIcon icon={"plus-circle"} />
  //   </a>
  // </div>
  //  ) : null}

  return (
    // <div className="blog-container">
    //   <EntryModal
    //     modalIsOpen={entryModalIsOpen}
    //     handleModalClose={handleModalClose}
    //     handleSuccessfulEntrySubmission={handleSuccessfulEntrySubmission}
    //   />

    //   <div className="entries">
    //     {data.map((entry) => {
    //       return (
    //         <div className="entry">
    //           <h3 className="entry-title">{entry.title}</h3>
    //           <p className="entry-content">{entry.content}</p>
    //           {/* <img src={datum.photo} style={{ height: "100px" }} /> */}
    //         </div>
    //       );
    //     })}
    //   </div>

    //   {isLoading && (
    //     <div className="content-loader">
    //       <FontAwesomeIcon icon={"spinner"} spin />
    //     </div>
    //   )}
    // </div>
    <nav className="editor d-flex flex-column align-items-center">
      <h1 className="title my-3 text-center" style={{ color: "#000000" }}>
        Editor
      </h1>
      <section>
        {!isLoaded && "Entries loading…"}
        {hasErrors && "Error Loading"}
        {isLoaded && (
          <div>
            {/* <h4 className="my-3 text-center">Entries are Loaded!</h4>
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  {...titleRest}
                  innerRef={titleRef}
                  invalid={errors.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Content</Label>
                <Input
                  id="type"
                  type="textarea"
                  {...contentRest}
                  innerRef={contentRef}
                  invalid={errors.type}
                />
              </FormGroup>
              <FormGroup>
                <Label for="photo">Widget Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  {...photoRest}
                  innerRef={photoRef}
                  invalid={errors.photo}
                />
              </FormGroup>
              <Button type="submit" color="primary">
                Save Entry
              </Button>
            </Form> */}
            {/* <button onClick={handleFetchClick}>Get Entry</button> */}
            {/* <pre style={{ width: "300px" }}>
              {JSON.stringify(data, null, 2)}
            </pre> */}
            <EntryModal
              modalIsOpen={entryModalIsOpen}
              handleModalClose={handleModalClose}
              handleSuccessfulBlogSubmission={onSubmit}
            />
            {/* {this.props.loggedInStatus === "LOGGED_IN" ? ( */}
            <div className="new-entry-link">
              <a onClick={handleNewEntryClick}>
                <FontAwesomeIcon
                  className="new-entry-icon"
                  icon={"plus-circle"}
                />
              </a>
            </div>
            {/* ) : null} */}

            <div className="entry-container">
              {data.map((entryItem) => {
                // if (loggedInStatus === "LOGGED_IN") {
                return (
                  <div key={entryItem.id} className="admin-entry-wrapper">
                    <EntryItem entryItem={entryItem} />
                    <a onClick={() => handleDeleteClick(entryItem)}>
                      <FontAwesomeIcon
                        icon={"circle-minus"}
                        style={{ color: "#007bff" }}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
            <EditorAPI />
          </div>
        )}
      </section>
    </nav>
  );
}
