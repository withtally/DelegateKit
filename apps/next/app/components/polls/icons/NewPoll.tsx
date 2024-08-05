export default function NewPollIcon({ isActive }: { isActive: boolean }) {
  const fillColor = isActive ? "black" : "grey";
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="12" height="12" rx="6" fill={fillColor} />
      <path
        d="M5.99967 3.58398V9.41732M3.08301 6.50065H8.91634"
        stroke="#F7F6F6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
