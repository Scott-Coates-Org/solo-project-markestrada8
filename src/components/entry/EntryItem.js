import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";
import EntryDetail from "./EntryDetail";
import "./EntryItem.css";

const EntryItem = (props) => {
  const {
    id,
    // blog_status,
    content,
    title,
    // featured_image_url
  } = props.entryItem;

  return (
    <div className="entry-item">
      <Link to={`/entry/${id}`}>
        <h1 className="entry-item-title">{title}</h1>
      </Link>
      <div>
        <Truncate
          lines={3}
          ellipsis={
            <span className="entry-item-content">
              . . . <Link to={`/entry/${id}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
        </Truncate>
      </div>
    </div>
  );
};

export default EntryItem;
