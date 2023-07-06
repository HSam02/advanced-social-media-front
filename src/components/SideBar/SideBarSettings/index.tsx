import { memo, useState } from "react";
import { BarsIcon } from "../../icons";
import { SideBarSettingsModal } from "./SideBarSettingsModal";
import scss from "./SideBarSettings.module.scss";

export const SideBarSettings = memo(() => {
  console.log("SideBarSettings");

  const [showSettings, setShowSettings] = useState<boolean>(false);

  return (
    <div
      className={scss.bars}
      onClick={() => setShowSettings((prev) => !prev)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <BarsIcon active={showSettings} />
      {showSettings && (
        <div className={scss.settings}>
          <SideBarSettingsModal onClose={() => setShowSettings(false)} />
        </div>
      )}
    </div>
  );
});
