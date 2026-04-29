interface IProps {
  onClick: () => void;
}

export default function RollAllTablesButton({
  onClick,
}: IProps) {
  return (
    <button className="roll-all-tables" onClick={onClick}>
      Roll All Tables
    </button>
  );
}
