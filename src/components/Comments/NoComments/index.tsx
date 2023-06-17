import scss from "./NoComments.module.scss";

export const NoComments: React.FC = () => {
  return (
    <div className={scss.noComments}>
      <h6>No comments yet.</h6>
      <p>Start the conversation</p>
    </div>
  );
};
