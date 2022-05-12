import { Button } from "@chakra-ui/button";
import React from "react";
import { Controller, SubmitHandler } from "react-hook-form";

import { useEditVariableForm } from "../../forms/variable";
import {
  NewVariableEditProposalData,
  RestSsrVariableSnippetFragment,
  useNewVariableEditProposalMutation,
  VariableEditProposalSnippetFragment,
  VariableEditProposalSnippetFragmentDoc,
} from "../../generated/graphql";
import TextField from "../Common/TextField";
import ErrorMessage from "../Common/ErrorMessage";

interface IEditVariable {
  variableId: string;
  defaultValue: number;
  variableCache?: RestSsrVariableSnippetFragment;
  onSuccess?: (variable: VariableEditProposalSnippetFragment) => void;
}

const EditVariable = ({
  variableId,
  defaultValue,
  variableCache,
  onSuccess,
}: IEditVariable) => {
  const [generalError, setGeneralError] = React.useState<string>();

  const [newEditProposal] = useNewVariableEditProposalMutation();

  const { control, handleSubmit, watch } = useEditVariableForm({
    defaultValues: {
      value: {
        number: defaultValue,
      },
      variable: variableId,
    },
  });

  const variableType = watch("value.type");

  const submitHandler: SubmitHandler<NewVariableEditProposalData> = (value) => {
    newEditProposal({
      variables: {
        data: {
          ...value,
          variable: variableId,
        },
      },
      update: (cache, { data }) => {
        if (variableCache) {
          cache.modify({
            id: cache.identify(variableCache),
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
        }
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
      <Button mt={2} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default EditVariable;
