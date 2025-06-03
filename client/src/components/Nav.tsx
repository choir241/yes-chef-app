import { memo } from "react";
import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";
import { labels } from "@/static/labels";

const Nav = memo(() => {
  return (
    <div className="flex gap-2">
      <nav className="p-4">
        <ul className="flex flex-col items-start gap-4">
          <li>
            <Button variant="link">
              <Link reloadDocument to="/">
                {labels.nav.Home}
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link reloadDocument to="/cart">
                {labels.nav.Cart}
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link reloadDocument to="/kitchen">
                {labels.nav.Kitchen}
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
