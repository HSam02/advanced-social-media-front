import scss from "./TextButton.module.scss";

type TextButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export const TextButton: React.FC<TextButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <div onClick={onClick} className={scss.textButton}>
      {children}
    </div>
  );
};
