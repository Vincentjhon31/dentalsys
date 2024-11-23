import React from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";

import Share from "@/Components/Share";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth, shares }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("share.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                    Reviews
                </h2>
            }
        >
            <Head title="Share" />
            <h1 className="text-2xl font-bold text-start my-4 md:hidden">
                Reviews
            </h1>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="Write a review...  "
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("message", e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4 " disabled={processing}>
                        Post
                    </PrimaryButton>
                </form>
            </div>
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {shares.map((share) => (
                    <Share key={share.id} share={share} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
