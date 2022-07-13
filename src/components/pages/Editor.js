import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createEntry, fetchAllEntries } from "redux/entry";
// import Layout from "./layout";
import "./Editor.css";

export default function Editor() {
  const dispatch = useDispatch();

  const { data, isLoaded, hasErrors } = useSelector((state) => state.entry);

  useEffect(() => {
    // dispatch async thunks are promises
    // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
    // dispatch(createEntry({ title: "new title", content: "new content" })).then(
    //   () => {
    dispatch(fetchAllEntries());
    //   }
    // );
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { ref: titleRef, ...titleRest } = register("title", { required: true });
  const { ref: typeRef, ...typeRest } = register("content", { required: true });
  // const { ref: photoRef, ...photoRest } = register("photo", { required: true });

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

  return (
    // <Layout {...props}>
    <div className="d-flex flex-column align-items-center">
      <h1 className="my-3 text-center" style={{ color: "blue" }}>
        Editor
      </h1>
      <section>
        {!isLoaded && "Entries loading…"}
        {hasErrors && "Error Loading"}
        {isLoaded && (
          <div>
            <h4 className="my-3 text-center">Entries are Loaded!</h4>
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
                  {...typeRest}
                  innerRef={typeRef}
                  invalid={errors.type}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label for="photo">Widget Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  {...photoRest}
                  innerRef={photoRef}
                  invalid={errors.photo}
                />
              </FormGroup> */}
              <Button type="submit" color="primary">
                Save Entry
              </Button>
            </Form>
            {/* <pre style={{ width: "300px" }}>
              {JSON.stringify(data, null, 2)}
            </pre> */}
            <div className="entries">
              {data.map((entry) => {
                return (
                  <div className="entry">
                    <h3 className="entry-title">{entry.title}</h3>
                    <p className="entry-content">{entry.content}</p>
                    {/* <img src={datum.photo} style={{ height: "100px" }} /> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
    // </Layout>
  );
}
