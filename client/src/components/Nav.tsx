import { memo } from "react";
import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";

const Nav = memo(() => {
  return (
    <div className="flex gap-2">
    
    <nav className="p-4">
        <ul className="flex flex-col items-start gap-4">
            <li>
            <Button variant="link" ><Link to="/">Home</Link></Button>

            </li>
            <li>
            <Button variant="link" ><Link to="/cart">Cart</Link>
            </Button>
            </li>
            <li>
            <Button variant="link" ><Link to="/kitchen">Kitchen</Link>
            </Button>
            </li>
        </ul>

    </nav>
<Outlet />
    </div>

  );
});

export default Nav;