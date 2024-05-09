// Only contain two state for now
type Props = {
  type?: string;
  message?: string;
};
export function Toast({ type, message }: Props) {
  const isError = type === "error";
  return (
    <div className="position absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p
        className={`${isError ? "bg-red-300" : "bg-green-300"} p-1.5 rounded-md font-semibold`}
      >
        {message}
      </p>
    </div>
  );
}
