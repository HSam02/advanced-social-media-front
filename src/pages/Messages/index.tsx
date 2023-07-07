import { Avatar } from "../../components";
import { GalleryIcon, HeartIcon, NoteIcon, SmileIcon, WarningIcon } from "../../components/icons";
import scss from "./Messages.module.scss";

export const Messages: React.FC = () => {
  return (
    <div className={scss.messages}>
      <div className={scss.box}>
        <div className={scss.chats__list}>
          <div className={scss.user__info}>
            <p>nickname</p>
            <span>
              <NoteIcon />
            </span>
          </div>
          <ul>
            {Array(16)
              .fill("")
              .map((el, i) => (
                <li key={i}>
                  <Avatar size={56} />
                  <div className={scss.chat__info}>
                    <p>nickname</p>
                    <span>last action &#183; 4h</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className={scss.chat}>
          <div className={scss.chat__title}>
            {/* <div>
              <Avatar size={24} />
              <p>nickname</p>
            </div> */}
            <p>Details</p>
            <WarningIcon active />
          </div>
          {/* <div className={scss.messages}>
            <ul>
              {Array(20)
                .fill("")
                .map((_, i) => (
                  <li key={i}>
                    {i % 2 === 0 ? (
                      <div className={scss.stranger__message}>
                        <Avatar size={24} />
                        <p>Stranger message</p>
                      </div>
                    ) : (
                      <div className={scss.user__message}>
                        <p>My message</p>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div> */}
          {/* <div className={scss.form}>
            <div>
              <SmileIcon />
              <textarea placeholder="Message..."></textarea> */}
          {/* <GalleryIcon />
              <HeartIcon /> */}
          {/* <a href="/">Send</a>
            </div>
          </div> */}
          <div className={scss.details}>
            <div className={scss.config}>
              <label>
                <input type="checkbox" />
                Mute messages
              </label>
            </div>
            <div className={scss.members}>
							<div>
								<h4>Members</h4>
								<a href="/">Add People</a>
							</div>
              <ul>
                {Array(15)
                  .fill("")
                  .map((_, i) => (
                    <li key={i}>
											<Avatar size={56} />
											<span>
												<p>nickname</p>
												<span>full name</span>
											</span>
										</li>
                  ))}
              </ul>
            </div>
            <div className={scss.settings}>
							<a href="/">Leave Chat</a>
							<p>You won't get messages from this group unless someone adds you back to the chat.</p>
							<a href="/">Delete Chat</a>
						</div>
          </div>
        </div>
      </div>
    </div>
  );
};
