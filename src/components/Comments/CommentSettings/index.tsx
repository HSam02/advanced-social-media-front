import { useState } from "react";
import { DotsIcon } from "../../icons";
import { CommentSettingsModal } from "./CommentSettingsModal";
import scss from "./CommentSettings.module.scss";

type CommentSettingsProps = {
  commentId: string;
};

export const CommentSettings: React.FC<CommentSettingsProps> = ({
  commentId,
}) => {
  console.log("CommentSettings");

  const [showSettings, setShowSettings] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);

  return (
    <>
      <div
        className={scss.dots}
        onClick={() => setShowSettings(true)}
        style={isSettingsLoading ? { pointerEvents: "none" } : undefined}
      >
        <DotsIcon />
      </div>
      {showSettings && (
        <CommentSettingsModal
          commentId={commentId}
          onClose={() => setShowSettings(false)}
          setLoading={setIsSettingsLoading}
        />
      )}
    </>
  );
};
