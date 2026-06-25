import { useNavigate } from "react-router-dom";

import { FormPage, useFormState } from "@/shared";
import { collectionStorage } from "@/features/collections";
import { TablePicker } from "@/features/tables";
import type { FormFieldConfig } from "@/shared";

function CollectionCreate() {
  const navigate = useNavigate();

  const { fields, error, handleFieldChange, handleSubmit } = useFormState({
    initialFields: {
      name: "",
      description: "",
      tableIds: [] as string[],
    },
    validate: (fields) => {
      if (!fields.name.trim()) {
        return "Name is required.";
      }
      return null;
    },
    onSubmit: (fields) => {
      collectionStorage.add({
        id: crypto.randomUUID(),
        name: fields.name.trim(),
        description: fields.description.trim(),
        tableIds: fields.tableIds as string[],
      });
      navigate("/collections");
    },
  });

  const formFields: FormFieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Enter collection name",
      htmlFor: "collection-name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Optional description",
      rows: 3,
      htmlFor: "collection-description",
    },
  ];

  const customSections = [
    {
      render: (values: Record<string, unknown>, onChange: (name: string, value: unknown) => void) => (
        <TablePicker
          selectedIds={values.tableIds as string[]}
          onChange={(ids) => onChange("tableIds", ids)}
        />
      ),
    },
  ];

  return (
    <FormPage
      title="New Collection"
      fields={formFields}
      values={fields}
      error={error}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/collections")}
      submitLabel="Create Collection"
      backTo="/collections"
      backLabel="Collections"
      customSections={customSections}
    />
  );
}

export default CollectionCreate;
