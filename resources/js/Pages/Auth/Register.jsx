import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            
            <Head title="Register" />
                   
                    
                    <h1 className="text-xl font-semibold text-purple-700 text-center mb-4">
                        Create Your Account
                    </h1>

                    <form onSubmit={submit} className="space-y-3">
                        <div>
                            <InputLabel htmlFor="name" value="Name" className="text-purple-600" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-purple-600" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-purple-600" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-purple-600" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600">Already have an account?</span>
                                <Link href={route('login')} className="text-sm text-purple-600 underline hover:text-purple-800 ml-1">
                                    Log in here
                                </Link>
                                </div>
                                <PrimaryButton className="bg-purple-600 hover:bg-purple-700 text-white ml-auto" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
            
        </GuestLayout>
    );
}
