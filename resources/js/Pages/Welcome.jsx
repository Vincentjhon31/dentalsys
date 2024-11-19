import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div
                className="min-h-screen flex flex-col bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/bgclinic.jpg')",
                }}
            >
                {/* Navigation Bar */}
                <header className="flex justify-between items-center bg-white/80 backdrop-blur-md shadow px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/assets/logo.png"
                            alt="Logo"
                            className="h-14 w-18" // Increased size of the logo
                        />
                        <span className="text-xl font-extrabold text-purple-700">
                            {" "}
                            {/* Made brand name bolder */}
                            ECSmile
                        </span>
                    </div>
                    <nav className="flex space-x-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-purple-700 ring-1 ring-transparent transition hover:bg-purple-100 focus:outline-none focus-visible:ring-purple-300"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-purple-700 ring-1 ring-transparent transition hover:bg-purple-100 focus:outline-none focus-visible:ring-purple-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-purple-700 ring-1 ring-transparent transition hover:bg-purple-100 focus:outline-none focus-visible:ring-purple-300"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Main Body */}
                <main className="flex-1 flex items-center justify-center">
                    <div className="bg-gray-500 bg-opacity-30 rounded-lg p-10 shadow-md max-w-2xl w-full text-center">
                        {" "}
                        {/* Increased width */}
                        <h1 className="text-4xl font-bold text-white mb-8">
                            Welcome to ECSmile!
                        </h1>
                        <p className="text-lg text-white mb-6">
                            Your trusted dental application for easy scheduling,
                            reminders, and personalized care. We’re here to make
                            your smile journey easy and enjoyable!
                        </p>
                        <div className="flex space-x-6 justify-center">
                            {" "}
                            {/* Added more space between buttons */}
                            <a
                                href={route("register")}
                                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                Get Started
                            </a>
                            <a
                                href="register"
                                className="px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-100 transition"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
