import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Select, Input, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { updatePost } from "../redux/actions/Post";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ history, post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });
  const classes = useStyles();

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post?._id,
      ...data,
      image: file,
    };

    dispatch(updatePost(post?._id, updatedPost));
    reset();
    setFile(null);
    closeEditMode();
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="title"
          label="Başlık"
          name="title"
          variant="outlined"
          className={classes.textField}
          size="small"
          //   inputRef={register}
          {...register("title", { required: true })}
          error={errors?.title ? true : false}
          fullWidth
          defaultValue={post?.title}
        ></TextField>
        <TextField
          id="subtitle"
          label="Alt Başlık"
          name="subtitle"
          variant="outlined"
          className={classes.textField}
          size="small"
          //   inputRef={register}
          {...register("subtitle", { required: true })}
          error={errors?.subtitle ? true : false}
          fullWidth
          defaultValue={post?.subtitle}
        ></TextField>
        <Controller
          name="tag"
          control={control}
          error={errors?.tag ? true : false}
          defaultValue={post?.tag}
          // as={
          //   <Select
          //     input={<Input />}
          //     className={classes.textField}
          //     fullWidth
          //   >
          //     {tags.map((tag, index) => (
          //       <MenuItem key={index} value={tag}>
          //         {tag}
          //       </MenuItem>
          //     ))}
          //   </Select>
          // }
          render={({}) => (
            <Select input={<Input />} className={classes.textField} fullWidth>
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          )}
        ></Controller>
        <TextField
          id="content"
          label="İçerik"
          name="content"
          multiline
          rows={4}
          variant="outlined"
          className={classes.textField}
          size="small"
          //   inputRef={register}
          {...register("content", { required: true })}
          error={errors?.content ? true : false}
          fullWidth
          defaultValue={post?.content}
        ></TextField>
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setFile(base64)}
        ></FileBase64>

        <div className={classes.buttons}>
          <Button color="secondary" variant="outlined" onClick={closeEditMode}>
            Vazgeç
          </Button>{" "}
          <Button color="primary" variant="outlined" type="submit">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
