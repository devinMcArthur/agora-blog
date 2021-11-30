import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  VariableEquationOperatorTypes,
  VariableEquationTypes,
  VariableVersionTypes,
} from "../constants/variable";

const VariableVersionSchema = yup
  .object()
  .required()
  .shape({
    type: yup.string().oneOf(VariableVersionTypes).required(),
    sourceUrl: yup.string().url("must be a valid url"),
    number: yup.number(),
    equation: yup.array().of(
      yup.object().shape({
        type: yup.string().required().oneOf(VariableEquationTypes),
        operator: yup.string().oneOf(VariableEquationOperatorTypes),
        number: yup.number(),
        variable: yup.string().optional(),
      })
    ),
  });

const NewVariableSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    version: VariableVersionSchema,
  })
  .required();

export const useNewVariableForm = () => {
  const form = useForm({
    resolver: yupResolver(NewVariableSchema),
    defaultValues: {
      title: "",
      version: {
        type: "number",
        sourceUrl: "",
        number: 0,
        equation: [],
      },
    },
  });

  return { ...form };
};

const EditVariableSchema = yup.object().required().shape({
  description: yup.string().required(),
  value: VariableVersionSchema,
});

export const useEditVariableForm = () => {
  const form = useForm({
    resolver: yupResolver(EditVariableSchema),
    defaultValues: {
      description: "",
      value: {
        type: "number",
        sourceUrl: "",
        number: 0,
        equation: [],
      },
    },
  });

  return { ...form };
};
