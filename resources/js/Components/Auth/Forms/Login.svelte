<script>
    // resources/js/Pages/Auth/Login.svelte
    
    import { Link } from "@inertiajs/svelte";
    import { t } from 'svelte-i18n';

    import { useForm } from "@inertiajs/svelte";

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

<ValidationErrors errors={Object.values($form.errors)} />

<form class="space-y-6" on:submit|preventDefault={submit}>
    <!-- <div class="relative">
    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
    <div class="mt-2">
        <input type="email" name="email" id="email" autocomplete="email" required class="input-solid-primary">
    </div>
    </div> -->

    <div class="relative">
        <FieldText
            form={$form}
            name="email"
            id="email"
            label="{$t('Email')}"
            placeholder="{$t('Email')}"
            fieldInputCss=""
            fieldWrapperCss="mb-4"
            autocomplete="email"
        />

        <FieldPassword
            form={$form}
            name="password"
            id="password"
            label="{$t('Password')}"
            class="mt-4"
        />

    </div>


    <div class="flex items-center justify-between">
    <div class="flex gap-3">
        <div class="flex h-6 shrink-0 items-center">
        <div class="group grid size-4 grid-cols-1">
            <input id="remember-me" name="remember-me" type="checkbox" class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto">
            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
            <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        </div>
        <label for="remember-me" class="block text-sm/6 text-gray-900">Remember me</label>
    </div>

    <div class="text-sm/6">
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
    </div>
    </div>

    <div>
    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
    </div>
</form>