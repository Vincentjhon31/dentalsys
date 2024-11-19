import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faChartLine,
    faUserInjured,
    faCalendarCheck,
    faCalendarAlt,
    faCogs,
    faCircleQuestion,
    faHandSparkles, // New icon for Services (hand with gear alternative)
} from "@fortawesome/free-solid-svg-icons";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Access current route
    const { current_route } = usePage().props;
    console.log("Current route:", current_route);

    // Define breadcrumb structure dynamically based on current route
    const breadcrumbs = [
        ...(current_route !== "dashboard" // Avoid "Home" on the dashboard
            ? [{ name: "Home", href: route("dashboard") }]
            : []),
        ...(current_route === "patients"
            ? [{ name: "Patients", href: route("patients") }]
            : []),
        ...(current_route === "appointments"
            ? [{ name: "Appointments", href: route("appointments") }]
            : []),
        ...(current_route === "calendar"
            ? [{ name: "Calendar", href: route("calendar") }]
            : []),
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/assets/logo.png"
                                alt="Logo"
                                className="h-14 w-auto"
                            />
                            <span className="text-violet-600 font-bold text-2xl">
                                ECSmile
                            </span>{" "}
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="ml-6 text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                                Dashboard
                            </NavLink>
                            <div className="flex items-center space-x-2">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <span
                                        key={breadcrumb.name}
                                        className={`text-sm font-medium ${
                                            current_route === breadcrumb.href
                                                ? "text-violet-800 font-bold"
                                                : "text-gray-700 hover:text-gray-900"
                                        }`}
                                    >
                                        <Link
                                            href={breadcrumb.href}
                                            className="hover:text-violet-800"
                                        >
                                            {">"}
                                            {breadcrumb.name }
                                        </Link>
                                        {index < breadcrumbs.length - 1 && (
                                            <span className="mx-2">/</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a 1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar and Content */}
            <div className="flex flex-1">
                <aside className="w-64 bg-purple-200 text-black flex flex-col h-280">
                    <nav className="flex-1 p-6 space-y-4">
                        {[
                            { href: "dashboard", icon: faHome, label: "Home" },
                            {
                                href: "analytics",
                                icon: faChartLine,
                                label: "Analytics",
                            },
                            {
                                href: "patients",
                                icon: faUserInjured,
                                label: "Patients",
                            },
                            {
                                href: "appointments",
                                icon: faCalendarCheck,
                                label: "Appointments",
                            },
                            {
                                href: "calendar",
                                icon: faCalendarAlt,
                                label: "Calendar",
                            },
                            {
                                href: "services",
                                icon: faHandSparkles,
                                label: "Services",
                            }, // Updated Services link icon
                        ].map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`flex items-center p-3 rounded-xl border-l-2 border-gray-300 hover:border-lavender-500 hover:bg-purple-500 hover:text-white transition-all duration-300 ease-in-out ${
                                    current_route === link.href
                                        ? "bg-purple-500 text-white border-lavender-500"
                                        : ""
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className="mr-3 text-xl"
                                />
                                <span className="text-base">{link.label}</span>
                            </a>
                        ))}

                        <div className="mt-8"></div>

                        {/* Settings and Help Section */}
                        <div>
                            {[
                                {
                                    href: "#settings",
                                    icon: faCogs,
                                    label: "Settings",
                                },
                                {
                                    href: "#help-support",
                                    icon: faCircleQuestion,
                                    label: "Help & Support",
                                },
                            ].map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`flex items-center p-3 rounded-xl border-l-2 border-gray-300 hover:border-lavender-500 hover:bg-purple-500 hover:text-white transition-all duration-300 ease-in-out ${
                                        index !== 0 ? "mt-4" : ""
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={link.icon}
                                        className="mr-3 text-xl"
                                    />
                                    <span className="text-base">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100">
                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <main>{children}</main>
                </main>
            </div>
        </div>
    );
}
