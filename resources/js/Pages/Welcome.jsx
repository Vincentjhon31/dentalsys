import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50  text-black/50 dark:gray-100 dark:text-white/50">
                <img
                    id="background"
                    className=" bg-gradient-to-r from-violet-400 to-pink-500  absolute left-40 bottom-0 max-w-[1000px]"
                    src={
                        new URL(
                            "../../../assets/images/bg.png",
                            import.meta.url
                        ).href
                    }
                    onError={handleImageError}
                />

                <div className="relative flex min-h-screen flex-col items-center justify-start selection:bg-[blue] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <div className="text-xl font-semibold leading-tight text-gray-800">
                            <header className="flex items-center justify-between py-4 px-6">
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-xl font-bold text-black">
                                        ECSmile
                                    </h1>
                                </div>

                                <nav className="hidden sm:flex space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-lg px-5 py-2 text-black ring-1 ring-violet-300  bg-violet-900 transition hover:text-black/70 hover:bg-violet-950 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-violet-800 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-lg px-5 py-2 text-black ring-1 ring-violet-300  bg-violet-900 transition hover:text-black/70 hover:bg-violet-950 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white dark:focus-visible:ring-white"
                                            >
                                                Get Started!
                                            </Link>
                                        </>
                                    )}
                                </nav>

                                <div className="flex sm:hidden">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                !showingNavigationDropdown
                                            )
                                        }
                                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? "hidden"
                                                        : "block"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? "block"
                                                        : "hidden"
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </header>

                            <div
                                className={`${
                                    showingNavigationDropdown
                                        ? "block"
                                        : "hidden"
                                } sm:hidden`}
                            >
                                <div className="space-y-1 pb-3 pt-2">
                                    <ResponsiveNavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Home
                                    </ResponsiveNavLink>
                                </div>
                                <div className="border-t border-gray-200 pb-3 pt-4">
                                    {auth.user ? (
                                        <>
                                            <ResponsiveNavLink
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                method="post"
                                                href={route("logout")}
                                                as="button"
                                            >
                                                Log Out
                                            </ResponsiveNavLink>
                                        </>
                                    ) : (
                                        <>
                                            <ResponsiveNavLink
                                                href={route("login")}
                                            >
                                                Log In
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("register")}
                                            >
                                                Get Started
                                            </ResponsiveNavLink>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                {/* Placeholder for left content */}
                                <div className="bg-gray-100 p-6 rounded-lg  bg-transparent ">
                                    {/* Left side content can go here, if any */}
                                </div>

                                {/* Appointment Page Preview on the Right */}
                                <div className="bg-current  shadow-lg rounded-lg p-6">
                                    <div className="rounded-lg p-6 bg-transparent ">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                                            Renew your Smile!
                                        </h2>

                                        <p className="mt-4 text-gray-600">
                                            Your trusted partner in achieving
                                            optimal dental health and a radiant
                                            smile.Whether you're seeking
                                            preventive care, orthodontic
                                            solutions, or emergency dental
                                            services, we aim to enhance your
                                            experience with modern treatments
                                            and personalized care.
                                        </p>
                                        <p className="mt-4 text-gray-600">
                                            Explore our comprehensive range of
                                            services and let us be part of your
                                            journey to a healthier smile.
                                        </p>
                                        <button
                                            className="mt-6 px-6 py-3 text-white bg-violet-800 rounded-full hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                                            onClick={() => {
                                                window.location.href =
                                                    route("appointment.page"); // Update the route as needed
                                            }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
