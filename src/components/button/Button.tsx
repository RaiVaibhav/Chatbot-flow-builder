import "./button.css";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

// Hack to to tailwind to generate the css
// at the build time
const sizeClass = (size: string) => {
  switch (size) {
    case "large": {
      return "storybook-button--large";
    }
    case "small": {
      return "storybook-button--small";
    }
    default: {
      return "storybook-button--medium";
    }
  }
};

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  const sizeCls = sizeClass(size);
  return (
    <button
      type="button"
      className={`storybook-button ${sizeCls} ${mode}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
