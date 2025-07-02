import { memo } from "react";
import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";
import { labels } from "@/static/labels";

function checkURL({ currentPage }: { currentPage: string }) {
  const currentURL = window.location.href.split("/")[3];
  if (currentURL === currentPage) {
    return "cursor-default bg-[#f1ce8e] hover:no-underline";
  }
}

const Nav = memo(() => {
  return (
    <div className="flex gap-2 items-start h-full">
      <nav className="p-4 sticky top-0">
        <ul className="flex flex-col items-start gap-4">
          <li>
            <Button variant="link" className={checkURL({ currentPage: "" })}>
              <Link
                reloadDocument
                to="/"
                className={checkURL({ currentPage: "" })}
              >
                {labels.nav.Home}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={checkURL({ currentPage: "cart" })}
            >
              <Link
                reloadDocument
                to="/cart"
                className={checkURL({ currentPage: "cart" })}
              >
                {labels.nav.Cart}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={checkURL({ currentPage: "kitchen" })}
            >
              <Link
                reloadDocument
                to="/kitchen"
                className={checkURL({ currentPage: "kitchen" })}
              >
                {labels.nav.Kitchen}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className={checkURL({ currentPage: "inventory" })}
            >
              <Link
                reloadDocument
                to="/inventory"
                className={checkURL({ currentPage: "inventory" })}
              >
                {labels.nav.Inventory}
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
});

export default Nav;
