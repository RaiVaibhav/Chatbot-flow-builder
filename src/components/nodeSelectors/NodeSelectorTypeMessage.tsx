import { MessageIcon } from "../../assets";

type Props = {
  content?: string;
};

/**
 * Primary UI component for node text message selector
 */
export function NodeSelectorTypeMessage({ content = "Message" }: Props) {
  return (
    <div className="flex flex-col rounded-md border-2 items-center justify-center border-indigo-600 w-48 h-24">
      <div>
        <MessageIcon />
      </div>
      <div className="text-indigo-600">
        <p>{content}</p>
      </div>
    </div>
  );
}
