import { Button } from "@chakra-ui/button";
import React from "react";
import { Controller, SubmitHandler } from "react-hook-form";

import { useEditVariableForm } from "../../forms/variable";
import {
  NewVariableEditProposalData,
  useNewVariableEditProposalMutation,
  VariableEditProposalSnippetFragment,
  VariableEditProposalSnippetFragmentDoc,
  VariableSnippetFragment,
} from "../../generated/graphql";
import TextField from "../Common/TextField";
import ErrorMessage from "../Common/ErrorMessage";

interface IEditVariable {
  variable: VariableSnippetFragment;
  onSuccess?: (variable: VariableEditProposalSnippetFragment) => void;
}

const EditVariable = ({ variable, onSuccess }: IEditVariable) => {
  const [generalError, setGeneralError] = React.useState<string>();

  const [newEditProposal] = useNewVariableEditProposalMutation();

  const { control, handleSubmit, watch } = useEditVariableForm();

  const variableType = watch("value.type");

  const submitHandler: SubmitHandler<NewVariableEditProposalData> = (value) => {
    newEditProposal({
      variables: {
        data: {
          ...value,
          variable: variable._id,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(variable),
          fields: {
            editProposals: (cachedEditProposals) => {
              if (data?.newVariableEditProposal) {
                const newProposalRef = cache.writeFragment({
                  data: data.newVariableEditProposal,
                  fragment: VariableEditProposalSnippetFragmentDoc,
                  fragmentName: "VariableEditProposalSnippet",
                });

                return [...cachedEditProposals, newProposalRef];
              } else return cachedEditProposals;
            },
          },
        });
      },
    })
      .then((res) => {
        if (res.data?.newVariableEditProposal) {
          if (onSuccess) onSuccess(res.data.newVariableEditProposal);
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
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Description"
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="value.sourceUrl"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Source URL"
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      {variableType === "number" && (
        <Controller
          control={control}
          name="value.number"
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

export default EditVariable;
