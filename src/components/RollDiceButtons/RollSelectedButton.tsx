interface IProps {
  onClick: () => void;
}

export default function RollSelectedButton({
  onClick,
}: IProps) {
  return (
    <button className="roll-selected-table" onClick={onClick}>
      Roll Selected Table
    </button>
  );
}
