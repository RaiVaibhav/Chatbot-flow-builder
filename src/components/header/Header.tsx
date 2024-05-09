import { Button } from "../button/Button";
import "./header.css";

interface HeaderProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
  onSave: () => void;
}

/**
 * Primary UI component for header
 */
export const Header = ({
  onSave,
  backgroundColor = "#f1f1f1",
}: HeaderProps) => (
  <header style={{ backgroundColor }}>
    <div className="storybook-header">
      <div></div>
      <div>
        <Button size="medium" onClick={onSave} label="Save Changes" />
      </div>
    </div>
  </header>
);
