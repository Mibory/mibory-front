import { useState } from "react";
import { Burger } from "../components/Burger/Burger";
import { Menu } from "./Menu/Menu";
import { Outlet, useLocation } from "react-router-dom";

export function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="layout-container">
            <header>
                {!isHomePage && (
                    <>
                        <Burger
                            isOpen={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="fixed top-6 right-8"
                        />
                        <Menu isMenuOpen={isMenuOpen} />
                    </>
                )}
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}