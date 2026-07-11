import { useState, useEffect } from "react";
import { handleKeyDown } from "../helpers";
import type { ITableHeadProps } from "../types";

export default function TableHead({
  name,
  onRename,
  onRemove,
  isRoll
}: ITableHeadProps) {
  const [value, setValue] = useState(name);

  useEffect(() => {
    setValue(name);
  }, [name]);

  const handleBlur = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== name) {
      onRename(trimmed);
    } else {
      setValue(name);
    }
  };

  if (isRoll) {
    return <th>roll</th>;
  }

  return (
    <th>
      <div className="header-cell-content">
        <input
          type="text"
          className="header-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="btn btn-ghost btn-icon btn-sm remove-col-btn"
          onClick={onRemove}
          aria-label={`Remove column ${name}`}
        >
          ✕
        </button>
      </div>
    </th>
  );
}
