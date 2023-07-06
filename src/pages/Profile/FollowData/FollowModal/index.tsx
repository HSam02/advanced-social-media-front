import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useScrollEnd } from "../../../../utils/hooks";
import { IUser } from "../../../../app/slices/user";
import appAxios from "../../../../appAxios";
import { ModalBackground, TextButton } from "../../../../components";
import { CloseIcon, LoadingIcon } from "../../../../components/icons";
import { FollowItem } from "../FollowItem";
import scss from "./FollowModal.module.scss";

type FollowersModalProps = {
  type: "followers" | "following";
  onClose: () => void;
};

export type followDataType = {
  follows: IUser[];
  followsCount: number;
};

export const FollowModal: React.FC<FollowersModalProps> = ({
  type,
  onClose,
}) => {
  console.log("FollowersModal");

  const [followData, setFollowData] = useState<followDataType | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const boxRef = useRef<HTMLDivElement>(null);
  const { username } = useParams();

  const getFollowData = async (retry?: boolean) => {
    if (status !== "idle" && !retry) {
      return;
    }
    try {
      if (!followData || followData.followsCount > followData.follows.length) {
        setStatus("loading");
        const lastId = followData?.follows.at(-1)?._id;
        const { data } = await appAxios.get<followDataType>(
          `/follow/${type}/${username}?limit=7${
            lastId ? `&lastId=${lastId}` : ""
          }`
        );
        data.follows.forEach((follow) => (follow.followData.status = "idle"));
        setFollowData((prev) =>
          prev ? { ...data, follows: [...prev.follows, ...data.follows] } : data
        );
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useScrollEnd(boxRef, 10, getFollowData);

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const { data } = await appAxios.get<followDataType>(
          `/follow/${type}/${username}?limit=7`
        );
        data.follows.forEach((follow) => (follow.followData.status = "idle"));
        setFollowData((prev) =>
          prev ? { ...data, follows: [...prev.follows, ...data.follows] } : data
        );
        setStatus("idle");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    })();
  }, [username, type]);

  return (
    <ModalBackground onClose={onClose}>
      <div className={scss.box}>
        <div className={scss.title}>
          <h2>{type}</h2>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </div>
        <div className={scss.content} ref={boxRef}>
          {followData &&
            (followData.follows.length ? (
              <ul>
                {followData.follows.map((follow) => (
                  <FollowItem
                    key={follow._id}
                    item={follow}
                    setFollowData={setFollowData}
                  />
                ))}
              </ul>
            ) : (
              <div className={scss.center} style={{ flex: 1 }}>
                No followers yet
              </div>
            ))}
          {status !== "idle" && (
            <div
              className={scss.center}
              style={followData ? undefined : { flex: 1 }}
            >
              {status === "loading" && <LoadingIcon />}
              {status === "error" && (
                <TextButton
                  onClick={() => {
                    getFollowData(true);
                  }}
                >
                  Retry
                </TextButton>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalBackground>
  );
};
