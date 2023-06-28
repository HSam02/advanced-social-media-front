import { useState, useCallback, memo } from "react";
import { VerticalArrowIcon } from "../../../../../icons";
import { AppSlider } from "../../../../..";
import { postInfoType } from "../../../../types";
import scss from "./AdvancedSettings.module.scss";

type AdvancedSettingsProps = {
  postInfo: postInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<postInfoType>>;
};

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = memo(
  ({ postInfo, setPostInfo }) => {
    console.log("AdvancedSettings");

    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

    const handleChangeHideLikes = useCallback(() => {
      setPostInfo((prev) => ({
        ...prev,
        hideLikes: !prev.hideLikes,
      }));
    }, []);

    const handleChangeHideComments = useCallback(() => {
      setPostInfo((prev) => ({
        ...prev,
        hideComments: !prev.hideComments,
      }));
    }, []);

    return (
      <>
        <div
          className={scss.title}
          onClick={() => setShowAdvancedSettings((prev) => !prev)}
        >
          <h5>Advanced settings</h5>
          <div
            style={{
              transform: `rotate(${showAdvancedSettings ? 0 : 180}deg)`,
            }}
          >
            <VerticalArrowIcon />
          </div>
        </div>

        {showAdvancedSettings && (
          <ul className={scss.info}>
            <li>
              <div>
                <h6>Hide like and view counts on this post</h6>
                <AppSlider
                  active={postInfo.hideLikes}
                  handleClick={handleChangeHideLikes}
                />
              </div>
              <p>
                Only you will see the total number of likes and views on this
                post. You can change this later by going to the ··· menu at the
                top of the post. To hide like counts on other people's posts, go
                to your account settings.
              </p>
            </li>
            <li>
              <div>
                <h6>Turn off commenting</h6>
                <AppSlider
                  active={postInfo.hideComments}
                  handleClick={handleChangeHideComments}
                />
              </div>
              <p>
                You can change this later by going to the ··· menu at the top of
                your post.
              </p>
            </li>
          </ul>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.postInfo.hideComments !== nextProps.postInfo.hideComments ||
      prevProps.postInfo.hideLikes !== nextProps.postInfo.hideLikes
    ) {
      return false;
    }
    return true;
  }
);
