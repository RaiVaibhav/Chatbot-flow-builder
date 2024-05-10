import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  title: string;
  content: string;
  onChange: (c: { [key: string]: string }) => void;
  onExit: () => void;
};

/**
 * Primary UI component for Text Message Editor
 */
export default function TextMessageEditor({
  content,
  title = "Message",
  onChange,
  onExit,
}: Props) {
  const [value, setValue] = useState<string>(content || "");

  // No useDeferredValue, not a
  // great case, better to use debounce
  const [deboucnedValue] = useDebounce(value, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (deboucnedValue.length >= 10) {
      onChange({
        content: deboucnedValue,
      });
    }
  }, [deboucnedValue, onChange]);

  return (
    <div>
      <div className="flex justify-center items-center relative border-b-2 py-2 px-4">
        <button className="absolute left-2" onClick={onExit}>
          ←
        </button>
        <div className="text-xs font-semibold">{title}</div>
      </div>
      <div className="border-b-2 py-2 px-4">
        <form onSubmit={onFormSubmit}>
          <label>
            <span className="opacity-80">Text:</span>
            <br />
            <br />
            <textarea
              value={value}
              required
              name="name"
              rows={4}
              minLength={20}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md p-2"
            />
            {value.length < 10 && (
              <p className="text-xs text-red-400">Need atleast 10 characters</p>
            )}
          </label>
        </form>
      </div>
    </div>
  );
}
