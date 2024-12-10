<script>
    // resources/js/Pages/Auth/Login.svelte
    
    import { Link } from "@inertiajs/svelte";
    import { t } from 'svelte-i18n';

    import { useForm } from "@inertiajs/svelte";
    import GuestLayout from "@layouts/Guest.svelte";

    // Components > Branding
    import AuthenticationCard from '@components/Auth/Card.svelte';
    import AuthenticationLogo from '@components/Auth/Logo.svelte';
    import LoginForm from '@components/Auth/Forms/Login.svelte';

    // // Components > Fields
    // import Button from '@components/UI/Buttons/Button.svelte';
    // import FieldCheckbox from '@components/Fields/Checkbox.svelte';
    // import FieldSwitch from '@components/Fields/Switch.svelte';
    // import FieldText from '@components/Fields/Text.svelte';
    // import FieldPassword from '@components/Fields/Password.svelte';

    // // Components > Forms
    // import ValidationErrors from '@components/Forms/ValidationErrors.svelte';

    // export let canResetPassword;
    // export let status;

    // let form = useForm({
    //     email: '',
    //     password: ''
    // });

    // function submit() {
    //     $form.post('/login', {
    //         onSubmit: () => $form.reset('password'),
    //     });
    // }
</script>

<svelte:head>
    <title>{$t('Log In')}</title>
</svelte:head>

<GuestLayout>
    <AuthenticationCard>
        <AuthenticationLogo slot="logo" />
        <LoginForm />
    </AuthenticationCard>
</GuestLayout>
