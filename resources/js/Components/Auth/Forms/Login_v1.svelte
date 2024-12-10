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