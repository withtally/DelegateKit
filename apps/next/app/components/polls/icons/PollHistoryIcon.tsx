export default function PollHistoryIcon({ isActive }: { isActive: boolean }) {
  const fillColor = isActive ? "black" : "grey";
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4074_3579)">
        <path
          d="M0.501953 4C0.501953 4 0.501953 7.04738 0.501953 9V4Z"
          fill={fillColor}
        />
        <path d="M3.00195 3V10V3Z" fill={fillColor} />
        <path
          d="M10.502 2H6.50195C5.94967 2 5.50195 2.44772 5.50195 3V10C5.50195 10.5523 5.94967 11 6.50195 11H10.502C11.0542 11 11.502 10.5523 11.502 10V3C11.502 2.44772 11.0542 2 10.502 2Z"
          fill={fillColor}
        />
        <path
          d="M0.501953 4C0.501953 4 0.501953 7.04738 0.501953 9M3.00195 3V10M6.50195 2H10.502C11.0542 2 11.502 2.44772 11.502 3V10C11.502 10.5523 11.0542 11 10.502 11H6.50195C5.94967 11 5.50195 10.5523 5.50195 10V3C5.50195 2.44772 5.94967 2 6.50195 2Z"
          stroke={fillColor}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4074_3579">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
