type iconPropsType = {
  active?: boolean;
};

export const BarsIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12ZM40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24Zm176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z"
        />
      )}
    </svg>
  );
};

export const HouseIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M224 115.5V208a16.1 16.1 0 0 1-8.4 14.1a15.3 15.3 0 0 1-7.6 1.9h-48a8 8 0 0 1-8-8v-48a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v48a8 8 0 0 1-8 8H48a15.9 15.9 0 0 1-12-5.4a16.9 16.9 0 0 1-4-11v-92.1a16 16 0 0 1 5.2-11.8l80-72.7a16 16 0 0 1 21.6 0l80 72.7a16 16 0 0 1 5.2 11.8Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M208 224h-48a16 16 0 0 1-16-16v-48h-32v48a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-92.5a16 16 0 0 1 5.2-11.8l80-72.7a16 16 0 0 1 21.6 0l80 72.7a16 16 0 0 1 5.2 11.8V208a16 16 0 0 1-16 16Zm-96-80h32a16 16 0 0 1 16 16v48h48v-92.5l-80-72.7l-80 72.7V208h48v-48a16 16 0 0 1 16-16Z"
        />
      )}
    </svg>
  );
};

export const SearchIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M176 116a60 60 0 1 1-60-60a60 60 0 0 1 60 60Zm53.7 113.7a8.2 8.2 0 0 1-11.4 0l-43.2-43.3a92.2 92.2 0 1 1 11.3-11.3l43.3 43.2a8.1 8.1 0 0 1 0 11.4ZM116 192a76 76 0 1 0-76-76a76.1 76.1 0 0 0 76 76Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="m229.7 218.3l-43.3-43.2a92.2 92.2 0 1 0-11.3 11.3l43.2 43.3a8.2 8.2 0 0 0 11.4 0a8.1 8.1 0 0 0 0-11.4ZM40 116a76 76 0 1 1 76 76a76.1 76.1 0 0 1-76-76Z"
        />
      )}
    </svg>
  );
};

export const BellIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M220.8 175.9c-5.9-10.2-13-29.6-13-63.9v-7.1c0-44.3-35.5-80.6-79.2-80.9h-.6a79.9 79.9 0 0 0-79.8 80v8c0 34.3-7.1 53.7-13 63.9A16 16 0 0 0 49 200h39a40 40 0 0 0 80 0h39a15.9 15.9 0 0 0 13.9-8a16.2 16.2 0 0 0-.1-16.1ZM128 224a24.1 24.1 0 0 1-24-24h48a24.1 24.1 0 0 1-24 24Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M220.8 175.9c-5.9-10.2-13-29.6-13-63.9v-7.1c0-44.3-35.5-80.6-79.2-80.9h-.6a79.9 79.9 0 0 0-79.8 80v8c0 34.3-7.1 53.7-13 63.9A16 16 0 0 0 49 200h39a40 40 0 0 0 80 0h39a15.9 15.9 0 0 0 13.9-8a16.2 16.2 0 0 0-.1-16.1ZM128 224a24.1 24.1 0 0 1-24-24h48a24.1 24.1 0 0 1-24 24Zm-79-40c6.9-12 15.2-34.1 15.2-72v-8A63.8 63.8 0 0 1 128 40h.5c34.9.2 63.3 29.4 63.3 64.9v7.1c0 37.9 8.3 60 15.2 72Z"
        />
      )}
    </svg>
  );
};

export const AddIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"
        />
      )}
    </svg>
  );
};

export const SpeakerIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M160 32v192a8 8 0 0 1-12.91 6.31L77.25 176H32a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h45.25l69.84-54.31A8 8 0 0 1 160 32Zm32 64a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-48a8 8 0 0 0-8-8Zm32-16a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M184 152v-48a8 8 0 0 1 16 0v48a8 8 0 0 1-16 0Zm40-72a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8ZM53.92 34.62a8 8 0 1 0-11.84 10.76L73.55 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224v-48.91l42.08 46.29a8 8 0 1 0 11.84-10.76Zm92.16 77.59a8 8 0 0 0 13.92-5.38V32a8 8 0 0 0-12.91-6.31l-39.85 31a8 8 0 0 0-1 11.7Z"
        />
      )}
    </svg>
  );
};

export const UserIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M232 128a104 104 0 1 0-174.2 76.7l1.3 1.2a104 104 0 0 0 137.8 0l1.3-1.2A103.7 103.7 0 0 0 232 128Zm-192 0a88 88 0 1 1 153.8 58.4a79.2 79.2 0 0 0-36.1-28.7a48 48 0 1 0-59.4 0a79.2 79.2 0 0 0-36.1 28.7A87.6 87.6 0 0 1 40 128Zm56-8a32 32 0 1 1 32 32a32.1 32.1 0 0 1-32-32Zm-21.9 77.5a64 64 0 0 1 107.8 0a87.8 87.8 0 0 1-107.8 0Z"
        />
      )}
    </svg>
  );
};

export const LogoIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M128 80a48 48 0 1 0 48 48a48 48 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32a32.1 32.1 0 0 1-32 32Zm44-132H84a56 56 0 0 0-56 56v88a56 56 0 0 0 56 56h88a56 56 0 0 0 56-56V84a56 56 0 0 0-56-56Zm40 144a40 40 0 0 1-40 40H84a40 40 0 0 1-40-40V84a40 40 0 0 1 40-40h88a40 40 0 0 1 40 40Zm-20-96a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"
      />
    </svg>
  );
};

export const RightArrowCircleIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <polyline
        fill="none"
        points="8 3 17.004 12 8 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  );
};

export const LeftArrowCircleIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <polyline
        fill="none"
        points="16.502 3 7.498 12 16.502 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  );
};

export const LeftArrowIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M228 128a12 12 0 0 1-12 12H69l51.5 51.5a12 12 0 0 1 0 17a12.1 12.1 0 0 1-17 0l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12Z"
      />
    </svg>
  );
};

export const MediaGalleryIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const SquareIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"
      ></path>
    </svg>
  );
};

export const BottomArrowIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"
      ></path>
    </svg>
  );
};

export const VerticalRectangleIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"
      ></path>
    </svg>
  );
};

export const HorizontalRectangleIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19 20H5a4.004 4.004 0 0 1-4-4V8a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v8a4.004 4.004 0 0 1-4 4ZM5 6a2.002 2.002 0 0 0-2 2v8a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2Z"
      ></path>
    </svg>
  );
};

export const CheckCircleIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M172.24 99.76a6 6 0 0 1 0 8.48l-56 56a6 6 0 0 1-8.48 0l-24-24a6 6 0 0 1 8.48-8.48L112 151.51l51.76-51.75a6 6 0 0 1 8.48 0ZM230 128A102 102 0 1 1 128 26a102.12 102.12 0 0 1 102 102Zm-12 0a90 90 0 1 0-90 90a90.1 90.1 0 0 0 90-90Z"
      />
    </svg>
  );
};

export const PlayIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"
      />
    </svg>
  );
};

export const LoadingIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="12" cy="2" r="0" fill="currentColor">
        <animate
          attributeName="r"
          begin="0"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(45 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.125s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(90 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(135 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.375s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(180 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(225 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.625s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(270 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(315 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.875s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
    </svg>
  );
};

export const CommentIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M128 232a103.6 103.6 0 0 1-50-12.8l-30 8.5A15.9 15.9 0 0 1 28.3 208l8.5-30a104 104 0 1 1 91.2 54Zm-49-29.4a8.7 8.7 0 0 1 4.1 1.1a88 88 0 1 0-30.8-30.8a8.2 8.2 0 0 1 .8 6.3l-9.5 33.2l33.2-9.5a8.3 8.3 0 0 1 2.2-.3Z"
      />
    </svg>
  );
};

export const MessageIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M128 24a104 104 0 0 0-91.2 154l-8.5 30A15.9 15.9 0 0 0 48 227.7l30-8.5A104 104 0 1 0 128 24Zm53.7 93.7l-32 32a8.2 8.2 0 0 1-11.4 0L112 123.3l-26.3 26.4a8.1 8.1 0 0 1-11.4-11.4l32-32a8.1 8.1 0 0 1 11.4 0l26.3 26.4l26.3-26.4a8.1 8.1 0 0 1 11.4 11.4Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M128 24a104 104 0 0 0-91.2 154l-8.5 30A15.9 15.9 0 0 0 48 227.7l30-8.5A104 104 0 1 0 128 24Zm0 192a88.4 88.4 0 0 1-44.9-12.3a8.7 8.7 0 0 0-4.1-1.1a8.3 8.3 0 0 0-2.2.3l-33.2 9.5l9.5-33.2a8.2 8.2 0 0 0-.8-6.3A88 88 0 1 1 128 216Zm53.7-109.7a8.1 8.1 0 0 1 0 11.4l-32 32a8.2 8.2 0 0 1-11.4 0L112 123.3l-26.3 26.4a8.1 8.1 0 0 1-11.4-11.4l32-32a8.1 8.1 0 0 1 11.4 0l26.3 26.4l26.3-26.4a8.1 8.1 0 0 1 11.4 0Z"
        />
      )}
    </svg>
  );
};

export const HeartIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="m220.3 136.5l-81 81a15.9 15.9 0 0 1-22.6 0l-83.1-83.1a59.9 59.9 0 0 1 2.3-87c23.3-21.1 61.3-19.1 84.6 4.3l7.5 7.4l9.6-9.5A60.4 60.4 0 0 1 181.5 32a59.8 59.8 0 0 1 43.1 19.9c21 23.3 19.1 61.3-4.3 84.6Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M128 222.2a15.6 15.6 0 0 1-11.3-4.7l-83.1-83.1a59.9 59.9 0 0 1 2.3-87A57.7 57.7 0 0 1 79 32.8a64.3 64.3 0 0 1 41.5 18.9l7.5 7.4l9.6-9.5a59.9 59.9 0 0 1 87 2.3A57.7 57.7 0 0 1 239.2 95a64.3 64.3 0 0 1-18.9 41.5l-81 81a15.6 15.6 0 0 1-11.3 4.7ZM75 48.7a42.5 42.5 0 0 0-28.4 10.5a44 44 0 0 0-1.7 63.9l88.8 88.8l-5.7-5.7l81-81c17.5-17.4 19.1-45.5 3.8-62.6a44 44 0 0 0-63.9-1.7l-15.2 15.2a8.1 8.1 0 0 1-11.4 0L109.2 63A48.4 48.4 0 0 0 75 48.7Z"
        />
      )}
    </svg>
  );
};

export const PlaneIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M223.7 32.3a15.9 15.9 0 0 0-15.6-4.1L21.8 80.7a16.1 16.1 0 0 0-2.6 29.9l85.7 40.5l40.5 85.7a16 16 0 0 0 14.4 9.1h1.4a15.9 15.9 0 0 0 14.1-11.6l52.5-186.4a15.9 15.9 0 0 0-4.1-15.6Zm-63.8 197.6l-39.4-83.1l41.3-41.3a8 8 0 1 0-11.3-11.3l-41.3 41.3l-83.1-39.4l186.3-52.5Z"
      />
    </svg>
  );
};

export const GalleryIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M232 184V56a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16v-16ZM216 56v108.7L187.3 136a16.1 16.1 0 0 0-22.6 0L144 156.7L99.3 112a16.1 16.1 0 0 0-22.6 0L40 148.7V56Zm0 144H40v-28.7l48-48l44.7 44.7a15.9 15.9 0 0 0 22.6 0l20.7-20.7l40 40V200Zm-68.5-91.5a11.9 11.9 0 0 1-3.5-8.5a12 12 0 0 1 24 0a12 12 0 0 1-12 12a12.3 12.3 0 0 1-8.5-3.5Z"
      />
    </svg>
  );
};

export const NoteIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="m229.7 58.3l-32-32a8.1 8.1 0 0 0-11.4 0l-96 96A8.1 8.1 0 0 0 88 128v32a8 8 0 0 0 8 8h32a8.1 8.1 0 0 0 5.7-2.3l96-96a8.1 8.1 0 0 0 0-11.4Zm-105 93.7H104v-20.7l64-64L188.7 88ZM200 76.7L179.3 56L192 43.3L212.7 64Zm24 43.3v88a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h88a8 8 0 0 1 0 16H48v160h160v-88a8 8 0 0 1 16 0Z"
      />
    </svg>
  );
};

export const CheckIcon: React.FC = () => {
  return (
    <svg
      color="#A9ABAE"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M177.8 98.5a8 8 0 0 1-.3 11.3l-58.6 56a8.1 8.1 0 0 1-5.6 2.2a7.9 7.9 0 0 1-5.5-2.2l-29.3-28a8 8 0 1 1 11-11.6l23.8 22.7l53.2-50.7a8 8 0 0 1 11.3.3ZM232 128A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Z"
      />
    </svg>
  );
};

export const XIcon: React.FC = () => {
  return (
    <svg
      color="#EF3D4C"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm37.7-61.7a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-26.3 26.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l26.4-26.3l-26.4-26.3a8.1 8.1 0 0 1 11.4-11.4l26.3 26.4l26.3-26.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
      />
    </svg>
  );
};

export const ThemeIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 16 16">
      <path
        fill="currentColor"
        d="M8.05 16C3.61 16 0 12.39 0 7.95 0 3.99 2.83.65 6.72 0c.49-.03.87.22.99.6.11.38-.05.78-.41 1-1.7.93-2.75 2.69-2.75 4.61 0 2.89 2.35 5.25 5.25 5.25a5.25 5.25 0 0 0 4.61-2.74c.19-.37.61-.54 1.01-.4.42.14.66.56.58 1.01A8.044 8.044 0 0 1 8.05 16zM5.8 1.32c-2.78.93-4.73 3.56-4.73 6.63 0 3.85 3.13 6.99 6.99 6.99 3.04 0 5.66-1.93 6.61-4.72a6.301 6.301 0 0 1-4.87 2.31c-3.48 0-6.31-2.83-6.31-6.31-.01-1.93.86-3.71 2.31-4.9zm9.54 7.89s0 .01 0 0c0 .01 0 0 0 0z"
      ></path>
    </svg>
  );
};

export const ActivityIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 1.505a10.5 10.5 0 11-7.424 17.924"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <polyline
        fill="none"
        points="8.893 15.108 12 12 12.012 12.012 12.012 5.793"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
      <circle cx="7.24" cy="2.651" r="1.125"></circle>
      <circle cx="3.515" cy="5.83" r="1.125"></circle>
      <circle cx="1.636" cy="10.353" r="1.125"></circle>
      <circle cx="2.01" cy="15.235" r="1.125"></circle>
    </svg>
  );
};

export const ReportIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"
      ></path>
    </svg>
  );
};

export const BookMarkIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M200 48v176a8 8 0 0 1-12.2 6.8L128 193.4l-59.8 37.4A7.6 7.6 0 0 1 64 232a7.8 7.8 0 0 1-3.9-1a8.1 8.1 0 0 1-4.1-7V48a16 16 0 0 1 16-16h112a16 16 0 0 1 16 16Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M184 32H72a16 16 0 0 0-16 16v176a8.1 8.1 0 0 0 4.1 7a7.8 7.8 0 0 0 3.9 1a7.6 7.6 0 0 0 4.2-1.2l59.8-37.4l59.8 37.4A8 8 0 0 0 200 224V48a16 16 0 0 0-16-16Zm0 177.6l-51.8-32.4a8 8 0 0 0-8.4 0L72 209.6V48h112Z"
        />
      )}
    </svg>
  );
};

export const DotsIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M76 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm116-12a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm-64 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z"
      />
    </svg>
  );
};

export const PlusIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
    </svg>
  );
};

export const CropIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path>
    </svg>
  );
};

export const ZoomIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z"></path>
    </svg>
  );
};

export const ImageIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M208 56h-27.7l-13.6-20.4A7.9 7.9 0 0 0 160 32H96a7.9 7.9 0 0 0-6.7 3.6L75.7 56H48a24.1 24.1 0 0 0-24 24v112a24.1 24.1 0 0 0 24 24h160a24.1 24.1 0 0 0 24-24V80a24.1 24.1 0 0 0-24-24Zm8 136a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V80a8 8 0 0 1 8-8h32a7.9 7.9 0 0 0 6.7-3.6L100.3 48h55.4l13.6 20.4A7.9 7.9 0 0 0 176 72h32a8 8 0 0 1 8 8ZM128 88a44 44 0 1 0 44 44a44 44 0 0 0-44-44Zm0 72a28 28 0 1 1 28-28a28.1 28.1 0 0 1-28 28Z"
      />
    </svg>
  );
};

// export const VideoIcon: React.FC<iconPropsType> = ({ fill }) => {
//   return (
//     <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
//       <path fill="currentColor" d="M208 40H48a24.1 24.1 0 0 0-24 24v112a24.1 24.1 0 0 0 24 24h160a24.1 24.1 0 0 0 24-24V64a24.1 24.1 0 0 0-24-24Zm8 136a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V64a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8Zm-48 48a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-3.6-110.7l-48-32a8.3 8.3 0 0 0-8.2-.4A8 8 0 0 0 104 88v64a8 8 0 0 0 4.2 7.1a8.5 8.5 0 0 0 3.8.9a8.4 8.4 0 0 0 4.4-1.3l48-32a8 8 0 0 0 0-13.4ZM120 137.1v-34.2l25.6 17.1Z" />
//     </svg>
//   );
// };

export const ImageVideoIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.6 77.3">
      <path
        fill="currentColor"
        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
      ></path>
      <path
        fill="currentColor"
        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
      ></path>
      <path
        fill="currentColor"
        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
      ></path>
    </svg>
  );
};

export const CloseIcon: React.FC = () => {
  return (
    <svg color="#ffffff" fill="#ffffff" viewBox="0 0 24 24">
      <polyline
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></polyline>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      ></line>
    </svg>
  );
};

export const SettingsIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="8.635"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
      <path
        d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};

export const WarningIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm-8 56a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"
        />
      )}
    </svg>
  );
};

export const SmileIcon: React.FC<iconPropsType> = ({ active }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {active ? (
        <path
          fill="currentColor"
          d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm36 72a12 12 0 1 1-12 12a12 12 0 0 1 12-12Zm-72 0a12 12 0 1 1-12 12a12 12 0 0 1 12-12Zm84.5 60a56 56 0 0 1-97 0a8 8 0 1 1 13.8-8a40.1 40.1 0 0 0 69.4 0a8 8 0 0 1 13.8 8Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88ZM80 108a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm72 0a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm24.5 48a56 56 0 0 1-97 0a8 8 0 1 1 13.8-8a40.1 40.1 0 0 0 69.4 0a8 8 0 0 1 13.8 8Z"
        />
      )}
    </svg>
  );
};
