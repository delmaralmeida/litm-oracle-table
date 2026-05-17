import type { ICollection } from "@/features/collections/types";
import type { ITable } from "@/features/tables/types";

interface GridDisplayProps<T extends ITable | ICollection> {
  name: string;
  data: T[];
  renderDetails?: (item: T) => React.ReactNode;
}

function GridDisplay<T extends ITable | ICollection>({
  name,
  data,
  renderDetails,
}: GridDisplayProps<T>) {
  const pluralizedName = `${name}s`;

  const capitalize = (value: string) => {
    if (!value) return "";

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return (
    <div className="space-y-8">
      <h1>{capitalize(pluralizedName)}</h1>

      {data.length === 0 ? (
        <p className="empty-state text-center">
          No {pluralizedName} yet. Start by creating a new {name}.
        </p>
      ) : (
        <div className="grid-wrapper max-4-columns">
          {data.map((item: T) => (        
            <div key={item.id} className="card clickable">
              <h3 className="title">
                {item.name}
              </h3>
              <p className="description">{item.description}</p>
              {renderDetails && (
                <p className="details">
                  {renderDetails(item)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GridDisplay;
