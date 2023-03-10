import scss from "./BoxModal.module.scss";

type BoxModalProps = {
  children: React.ReactNode;
};
 
export const BoxModal: React.FC<BoxModalProps> = ({ children }) => {
  return (
    <div className={scss.box} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
