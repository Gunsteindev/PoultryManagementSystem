import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormComponent, { FormFieldType } from '@/Components/ui/formComponent';
import { SelectItem } from '@/Components/ui/select';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // console.log(data)

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const roleOptions = [
        { value: '', label: 'Select your role' },
        { value: 'Production', label: 'Production' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Admin', label: 'Admin' },
    ];

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className=''>
                <div>
                    <InputLabel htmlFor="name" value="Name" className='dark:text-white'/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className='dark:text-white'/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className='dark:text-white'/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className='dark:text-white'
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <div className="mt-4">
                    {/* <InputLabel
                        htmlFor="role"
                        value="Role"
                        className='dark:text-white'
                    /> */}
                    {/* <label htmlFor="role">Role</label> */}

                    <FormComponent
                        name="role"
                        fieldType={FormFieldType.SELECT}
                        label="Role"
                        placeholder=""
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        // error={errorMessage == "pickup_code is required" ? errorMessage : errors.pickup_code}
                    >
                        <SelectItem value="Production">
                            <div className="flex cursor pointer items-center gap-2">
                                <p>Production</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="Commercial">
                            <div className="flex cursor pointer items-center gap-2">
                                <p>Commercial</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="Supervisor">
                            <div className="flex cursor pointer items-center gap-2">
                                <p>Supervisor</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="Admin">
                            <div className="flex cursor pointer items-center gap-2">
                                <p>Admin</p>
                            </div>
                        </SelectItem>
                    </FormComponent>
                    {/* <select
                        name="role"
                        id="role"
                        required
                        value={data.role}
                        className="mt-1 block w-full bg-transparent rounded-md border-white"
                        autoComplete="username"
                        onChange={(e) =>
                            setData('role', e.target.value)
                        }
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="Production">Production</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Admin">Admin</option>
                    </select> */}

                    <InputError message={errors.role} className="mt-2"/>
                </div>


                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="dark:text-white rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
