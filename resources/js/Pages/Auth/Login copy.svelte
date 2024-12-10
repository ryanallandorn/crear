<script>
    // resources/js/Pages/Auth/Login.svelte
    
    import { Link } from "@inertiajs/svelte";
    import { t } from 'svelte-i18n';

    import { useForm } from "@inertiajs/svelte";
    import GuestLayout from "@layouts/Guest.svelte";

    // Components > Branding
    import AuthenticationCard from '@components/Auth/Card.svelte';
    import AuthenticationLogo from '@components/Auth/Logo.svelte';

    // Components > Fields
    import Button from '@components/UI/Buttons/Button.svelte';
    import FieldCheckbox from '@components/Fields/Checkbox.svelte';
    import FieldSwitch from '@components/Fields/Switch.svelte';
    import FieldText from '@components/Fields/Text.svelte';
    import FieldPassword from '@components/Fields/Password.svelte';

    // Components > Forms
    import ValidationErrors from '@components/Forms/ValidationErrors.svelte';

    export let canResetPassword;
    export let status;

    let form = useForm({
        email: '',
        password: ''
    });

    function submit() {
        $form.post('/login', {
            onSubmit: () => $form.reset('password'),
        });
    }
</script>

<svelte:head>
    <title>{$t('Log In')}</title>
</svelte:head>

<GuestLayout>
    <AuthenticationCard>
        <AuthenticationLogo slot="logo" />

        <ValidationErrors errors={Object.values($form.errors)} />

        <form on:submit|preventDefault={submit} class="space-y-6">
            <FieldText
                form={$form}
                name="email"
                id="email"
                label="{$t('Email')}"
                class="mt-4"
            />
            <FieldPassword
                form={$form}
                name="password"
                id="password"
                label="{$t('Password')}"
                class="mt-4"
            />
            <div class="flex items-center justify-between mt-4">
                <FieldSwitch
                    form={$form}
                    id="remember"
                    name="remember"
                    checked={true}
                    class="inline-flex items-center"
                    required={true}
                >
                    <span class="ml-2 text-sm text-gray-700">
                        {$t('Remember me')}
                    </span>
                </FieldSwitch>
                {#if canResetPassword}
                    <Link href={route('password.request')} class="text-sm text-blue-500 hover:underline">
                        {$t('Forgot password?')}
                    </Link>
                {/if}
            </div>
            <div>
                <Button
                    type="submit"
                    disabled={form.processing}
                    class="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    {$t('Log In')}
                </Button>
            </div>
        </form>
    </AuthenticationCard>
</GuestLayout>
