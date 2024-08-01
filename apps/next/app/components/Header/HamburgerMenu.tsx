// for mobile only
export const HamburgerMenu = ({ expandMenu }: { expandMenu: () => void }) => {
  return (
    <button onClick={expandMenu}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 80"
        width="22"
        height="22"
        className="md:hidden"
        style={{ cursor: "pointer" }}
      >
        <rect width="100" height="13"></rect>
        <rect y="30" width="100" height="13"></rect>
        <rect y="60" width="100" height="13"></rect>
      </svg>
    </button>
  );
};
