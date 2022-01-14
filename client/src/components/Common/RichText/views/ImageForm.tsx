import React from "react";
import { Input } from "@chakra-ui/react";

interface IImageForm {
  imageUploaded: (image: { buffer: string; contentType: string }) => void;
}

const ImageForm = ({ imageUploaded }: IImageForm) => {
  const onFileChange = React.useCallback(
    (files: FileList | null) => {
      if (files && files[0]) {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target && event.target.result) {
            imageUploaded({
              buffer: event.target.result.toString(),
              contentType: files[0].type,
            });
          }
        };

        reader.onerror = (error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
        };

        reader.readAsDataURL(files[0]);
      }
    },
    [imageUploaded]
  );

  return (
    <Input
      m="auto"
      type="file"
      onChange={(e) => onFileChange(e.target.files)}
    />
  );
};

export default ImageForm;
