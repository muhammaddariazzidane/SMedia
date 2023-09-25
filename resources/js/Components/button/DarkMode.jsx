import React, { useEffect, useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

export default function DarkMode() {
    const [theme, setTheme] = useState("");
    const myHtml = document.querySelector("html");

    const handleDarkMode = (e) => {
        if (e.target.checked) {
            myHtml.classList.add("dark");
            localStorage.theme = "dark";
            setTheme("dark");
        } else {
            myHtml.classList.remove("dark");
            localStorage.theme = "light";
            setTheme("light");
        }
    };
    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            myHtml.classList.add("dark");
            setTheme("dark");
        } else {
            myHtml.classList.remove("dark");
            setTheme("light");
        }
    }, []);
    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                onChange={handleDarkMode}
                checked={theme == "dark" ? true : false}
                className="hidden"
            />

            <BsSunFill className="swap-on fill-current w-9 text-yellow-300 h-9 p-2 rounded-full" />
            <BsMoonStarsFill className="swap-off fill-current w-9  rounded-full  text-black  h-9 p-2" />
        </label>
    );
}
