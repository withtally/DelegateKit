import Link from "next/link";
import { EthereumAddress } from "./EthereumAddress";

const Header = () => {
  return (
    <header className="bg-white shadow p-5 flex justify-between">
      <Link href="/">DelegateKit</Link>
      <div className="flex justify-end space-x-8">
        <Link href="/polls">Polls</Link>
        <Link href="/delegate">Delegate Frame</Link>
        <Link href="/proposal">Proposal Frame</Link>
        <Link href="/settings">
          <EthereumAddress />
        </Link>
      </div>
    </header>
  );
};
export default Header;
