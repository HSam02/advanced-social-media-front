import { useState, useRef, useCallback, useEffect } from "react";
import EmojiPicker, {
  EmojiStyle,
  SuggestionMode,
  EmojiClickData,
} from "emoji-picker-react";
import TextareaAutosize from "react-textarea-autosize";
import { useClickOutside } from "../../../utils/hooks";
import { CloseIcon, EmojiIcon } from "../../icons";
import scss from "./CommentInput.module.scss";
import appAxios from "../../../appAxios";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  IComment,
  IReply,
  addReply,
  clearReply,
  selectReply,
} from "../../../app/slices/comments";
import { addPostComment } from "../../../app/thunks";

type CommentInputProps = {
  postId: string;
  setInputRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLTextAreaElement> | null>
  >;
};

export const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  setInputRef,
}) => {
  console.log("CommentInput");

  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emojisRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();
  const reply = useAppSelector(selectReply);

  useEffect(() => {
    setInputRef(textareaRef);

    return () => setInputRef(null);
  }, [textareaRef, setInputRef]);

  // useEffect(() => {
  //   dispatch(setFocusTextarea(() => textareaRef.current?.focus()));

  //   return () => {
  //     dispatch(setFocusTextarea(null));
  //   };
  // }, [textareaRef, dispatch]);

  useEffect(() => {
    setText("");
    dispatch(clearReply());
  }, [postId, dispatch]);

  const closeEmojis = useCallback(() => {
    setShowEmojis(false);
  }, []);

  const handleClickEmoji = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const addEmoji = useCallback((event: EmojiClickData) => {
    if (!textareaRef.current) {
      return;
    }
    const { selectionStart, selectionEnd } = textareaRef.current;

    setText(
      (prev) =>
        prev.slice(0, selectionStart) +
        event.emoji +
        prev.slice(selectionStart, selectionEnd) +
        prev.slice(selectionEnd)
    );

    const newCursorPosition = selectionStart + event.emoji.length;
    setTimeout(() => {
      textareaRef.current?.setSelectionRange(
        newCursorPosition,
        newCursorPosition
      );
    }, 0);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
      setShowEmojis(false);
    }
  };

  const handleSubmit = async () => {
    try {
      textareaRef.current?.blur();
      setIsLoading(true);
      if (reply) {
        const { data } = await appAxios.post<IReply>("/reply/" + reply._id, {
          text: text.trim(),
        });
        dispatch(addReply(data));
      } else {
        const { data } = await appAxios.post<IComment>("/comment/" + postId, {
          text: text.trim(),
        });
        data.replies = [];
        dispatch(addPostComment(data));
      }
      setIsLoading(false);
      setText("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useClickOutside(emojisRef, closeEmojis);

  useEffect(() => {
    setText((prev) =>
      prev.trim() && !prev.trim().match(/^@\b\w+\b$/)
        ? prev
        : reply
        ? `@${reply?.user.username} `
        : ""
    );
  }, [reply]);

  return (
    <>
      {reply && (
        <div className={scss.reply}>
          <p>
            Replying to <span>{reply.user.username}</span>
          </p>
          <pre>{reply.text}</pre>
          <span onClick={() => dispatch(clearReply())}>
            <CloseIcon />
          </span>
        </div>
      )}
      <div className={scss.box}>
        {showEmojis && (
          <div
            className={scss.emojis}
            ref={emojisRef}
            onClick={handleClickEmoji}
          >
            <EmojiPicker
              height={300}
              onEmojiClick={addEmoji}
              searchDisabled
              skinTonesDisabled
              lazyLoadEmojis
              previewConfig={{ showPreview: false }}
              emojiStyle={EmojiStyle.NATIVE}
              suggestedEmojisMode={SuggestionMode.FREQUENT}
              emojiVersion={"1.0"}
            />
          </div>
        )}
        <div
          onClick={() => {
            setShowEmojis((prev) => !prev);
            handleClickEmoji();
          }}
          className={scss.emoji}
        >
          <EmojiIcon />
        </div>
        <TextareaAutosize
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={isLoading ? scss.disabled : ""}
          value={text}
          ref={textareaRef}
          maxRows={4.5}
          placeholder="Add a comment..."
        />
        <button
          onClick={handleSubmit}
          className={
            text.trim().length
              ? isLoading
                ? scss.disabled
                : ""
              : scss.disabled
          }
        >
          Post
        </button>
      </div>
    </>
  );
};
