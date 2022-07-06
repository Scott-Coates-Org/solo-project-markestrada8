import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import EntryFeaturedImage from "./EntryImage";
import EntryForm from "./EntryDetail";

export default function EntryDetail(props) {
  const dispatch = useDispatch();

  const { data, item, isLoaded, hasErrors } = useSelector(
    (state) => state.entry
  );

  const [currentId, setCurrentId] = useState(props.match.params.slug);
  const [entryItem, setEntryItem] = useState({});
  const [editMode, setEditMode] = useState(false);

  // this.state = {
  //   currentId: this.props.match.params.slug,
  //   entryItem: {},
  //   editMode: false,

  const handleUpdateFormSubmission = (entry) => {
    this.setState({
      entryItem: entry,
      editMode: false,
    });
  };

  const handleFeaturedImageDelete = () => {
    this.setState({
      entryItem: {
        featured_image_url: "",
      },
    });
  };

  const handleEditClick = () => {
    if (props.loggedInStatus === "LOGGED_IN") {
      this.setState({
        editMode: true,
      });
    }
  };

  const handleFetchClick = () => {
    console.log("clicked");
    dispatch(fetchEntry(currentId));
    console.log(item);
  };

  // useEffect(() => {
  //   dispatch(fetchEntry());
  // }, []);

  const { title, content, featured_image_url, entry_status } = entryItem;

  const contentManager = () => {
    if (editMode) {
      return (
        <EntryForm
          editMode={editMode}
          entry={entryItem}
          handleFeaturedImageDelete={handleFeaturedImageDelete}
          handleUpdateFormSubmission={handleUpdateFormSubmission}
        />
      );
    } else {
      return (
        <div className="content-container" style={{ height: "200px" }}>
          <h1 onClick={handleEditClick}>{title}</h1>
          {/* <EntryFeaturedImage featured_image_url={featured_image_url} /> */}
          <div className="content">{ReactHtmlParser(content)}</div>
        </div>
      );
    }
  };
  return (
    <div className="entry-container" style={{ height: "200px" }}>
      {contentManager()}
    </div>
  );
}
