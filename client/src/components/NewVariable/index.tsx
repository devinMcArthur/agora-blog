import { Button } from "@chakra-ui/button";
import React from "react";
import { Controller, SubmitHandler } from "react-hook-form";

import { useNewVariableForm } from "../../forms/variable";
import {
  NewVariableData,
  useNewVariableMutation,
  VariableSnippetFragment,
} from "../../generated/graphql";
import TextField from "../Common/TextField";
import ErrorMessage from "../Common/ErrorMessage";

interface INewVariable {
  onSuccess?: (variable: VariableSnippetFragment) => void;
}

const NewVariable = ({ onSuccess }: INewVariable) => {
  const [generalError, setGeneralError] = React.useState<string>();

  const [newVariable] = useNewVariableMutation();

  const { control, handleSubmit, watch } = useNewVariableForm();

  const variableType = watch("version.type");

  const submitHandler: SubmitHandler<NewVariableData> = (value) => {
    newVariable({
      variables: {
        data: value,
      },
    })
      .then((res) => {
        if (res.data?.newVariable) {
          if (onSuccess) onSuccess(res.data.newVariable);
        }
      })
      .catch((err) => {
        setGeneralError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {generalError && <ErrorMessage description={generalError} />}
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Title"
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="version.sourceUrl"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Source URL"
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      {/* <Controller
        name="version.type"
        control={control}
        render={({ field }) => (
          <RadioForm
            label="Variable Type"
            options={[
              { label: "Number", value: VariableVersionTypes[0] },
              { label: "Equation", value: VariableVersionTypes[1] },
            ]}
            {...field}
          />
        )}
      /> */}
      {variableType === "number" && (
        <Controller
          control={control}
          name="version.number"
          render={({ field, fieldState }) => (
            <TextField
              label="Value"
              type="number"
              errorMessage={fieldState.error?.message}
              {...field}
            />
          )}
        />
      )}
      <Button mt={2} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default NewVariable;
