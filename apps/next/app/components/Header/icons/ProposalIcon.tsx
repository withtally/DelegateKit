export function ProposalIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddd_4074_2581)">
        <path
          d="M3.5 4.88C3.5 3.87191 3.5 3.36786 3.68393 2.98282C3.84571 2.64413 4.10387 2.36876 4.42139 2.19619C4.78237 2 5.25491 2 6.2 2H9.8C10.7451 2 11.2176 2 11.5786 2.19619C11.8961 2.36876 12.1543 2.64413 12.3161 2.98282C12.5 3.36786 12.5 3.87191 12.5 4.88V11.12C12.5 12.1281 12.5 12.6321 12.3161 13.0172C12.1543 13.3559 11.8961 13.6312 11.5786 13.8038C11.2176 14 10.7451 14 9.8 14H6.2C5.25491 14 4.78237 14 4.42139 13.8038C4.10387 13.6312 3.84571 13.3559 3.68393 13.0172C3.5 12.6321 3.5 12.1281 3.5 11.12V4.88Z"
          fill="white"
        />
      </g>
      <rect x="4.5" y="4" width="6" height="1" rx="0.5" fill="#DC61F8" />
      <rect x="4.5" y="8" width="3" height="1" rx="0.5" fill="#DC61F8" />
      <rect x="4.5" y="6" width="7" height="1" rx="0.5" fill="#DC61F8" />
      <defs>
        <filter
          id="filter0_ddd_4074_2581"
          x="0.5"
          y="-5.96046e-08"
          width="15"
          height="18"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_4074_2581"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4074_2581"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4074_2581"
            result="effect2_dropShadow_4074_2581"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect3_dropShadow_4074_2581"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4074_2581"
            result="effect3_dropShadow_4074_2581"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_4074_2581"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
