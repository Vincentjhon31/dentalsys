import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        setLoading(true); //start loading

        axios
            .get("/data")
            .then((response) => {
                setData(response.data);
                setLoading(false); //stop loading
            })
            .catch((error) => {
                console.error("Error Fetching Data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <span className="text-xl font-semibold leading-tight text-gray-1000">
                                You're logged in!{" "}
                            </span>
                            <br />
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Officia quis nam corporis amet ea molestias
                            optio quo consequat ur quasi nesciunt laborum,
                            incidunt vel, recusandae minima quidem facilis
                            quibusdam deleniti cupiditate?
                            <br /> Hello po! elloyyy mga user na nasa baba
                            <br />
                            <div className="py-12 text-xl leading-tight text-gray-1000">
                                {" "}
                                Users:
                                {loading ? (
                                    <p>loading...</p>
                                ) : (
                                    <ul>
                                        {data.map((item, index) => (
                                            <li key={index}>
                                                {item.id} - {item.name}
                                                <br /> and the email:{" "}
                                                {item.email}
                                                <br /> and the time that create:{" "}
                                                {item.created_at} <br /> <br />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img
                class="block h-10 w-auto m-auto"
                src="/logo-text.png"
                alt="Logo"
            />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <span className="text-xl font-semibold leading-tight text-gray-1000">
                                Welcome to our Site
                            </span>
                            <br />
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Officia quis nam corporis amet ea molestias
                            optio quo consequat ur quasi nesciunt laborum,
                            incidunt vel, recusandae minima quidem facilis
                            quibusdam deleniti cupiditate?
                            <br /> Hello po!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
