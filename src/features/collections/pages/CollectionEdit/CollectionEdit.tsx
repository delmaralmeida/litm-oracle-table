import { useNavigate, useParams } from "react-router-dom";

import { FormPage, useFormState, PageHeader } from "@/shared";
import { collectionStorage } from "@/features/collections";
import type { FormFieldConfig } from "@/shared";

function CollectionEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const collection = id ? collectionStorage.getById(id) : undefined;

  const { fields, error, handleFieldChange, handleSubmit } = useFormState({
    initialFields: {
      name: collection?.name ?? "",
      description: collection?.description ?? "",
    },
    validate: (fields) => {
      if (!fields.name.trim()) {
        return "Name is required.";
      }
      return null;
    },
    onSubmit: (fields) => {
      if (collection) {
        collectionStorage.update({
          ...collection,
          name: fields.name.trim(),
          description: fields.description.trim(),
        });
        navigate(`/collections/${collection.id}`);
      }
    },
  });

  if (!collection) {
    return (
      <div className="space-y-8">
        <PageHeader title="Collection Not Found" backTo="/collections" backLabel="Collections" />
        <p className="empty-state text-center">The requested collection does not exist.</p>
      </div>
    );
  }

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

  return (
    <FormPage
      title="Edit Collection"
      fields={formFields}
      values={fields}
      error={error}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate(`/collections/${collection.id}`)}
      submitLabel="Save Changes"
      backTo={`/collections/${collection.id}`}
      backLabel={collection.name}
    />
  );
}

export default CollectionEdit;
