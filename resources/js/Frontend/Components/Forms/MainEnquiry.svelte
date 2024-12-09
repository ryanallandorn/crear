<script>
    import { t } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';
    import { useForm } from "@inertiajs/svelte";
    import { Send } from 'lucide-svelte';

    import TextInput from "@frontend-components/Forms/Inputs/Text.svelte";
    import EmailInput from "@frontend-components/Forms/Inputs/Email.svelte";
    import TextArea from "@frontend-components/Forms/Inputs/TextArea.svelte";
    import DotSpinner from "@components/UI/Spinners/Dot.svelte";

    import SuccessProgress from '@frontend-components/Forms/MainEnquiry/SuccessProgress.svelte';

    export let formElementCss = '';
    export let delay = 0; // Delay in milliseconds

    const dispatch = createEventDispatcher();

    let form = useForm({
        name: '',
        email: '',
        message: '',
    });

    let isSubmitting = false; // Tracks form submission
    let formSubmitted = false; // Tracks whether the form is submitted
    let isWaitingToClose = false; // Tracks the spinner during the delay
    let countdown = 0; // Countdown timer

    const startCountdown = () => {
        countdown = delay / 1000; // Convert milliseconds to seconds
        const interval = setInterval(() => {
            countdown -= 1;
            if (countdown <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    const submit = () => {
        isSubmitting = true;
        $form.post(route('leads.store'), {
            onFinish: () => {
                isSubmitting = false;
                formSubmitted = true;

                // Show spinner during delay before closing
                if (delay > 0) {
                    isWaitingToClose = true;
                    startCountdown(); // Start the countdown
                    dispatch('formSubmitted');
                    setTimeout(() => {
                        isWaitingToClose = false;
                    }, delay);
                } else {
                    dispatch('formSubmitted');
                }
            },
            onError: (errors) => {
                isSubmitting = false;
                console.error('Form submission errors:', errors);
            }
        });
    };
</script>

{#if !formSubmitted}
    <p class="text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300 mb-4">
        This is a lead paragraph that stands out from regular text, providing emphasis and drawing.
    </p>

    <form 
        on:submit|preventDefault={submit} 
        class={formElementCss}
    >
        <div class="-space-y-px form-shared-borders">
            <TextInput
                name="name"
                label="Name"
                placeholder="Enter your name"
                required={true}
                inputCssClass="input-outlined peer"
                bind:value={$form.name}
            />
            <EmailInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                required={true}
                inputCssClass="input-outlined peer"
                bind:value={$form.email}
            />
            <TextArea
                name="message"
                label="Message"
                placeholder="Write your message"
                required={true}
                inputCssClass="input-outlined peer"
                bind:value={$form.message}
            />
        </div>
        <div class="flex items-center justify-end gap-x-6 pt-6 border-t dark:border-gray-800">
            <button 
                type="submit" 
                class="relative inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-10 pr-16 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isSubmitting}
            >
                {$t('Enviar')}
                <Send class="absolute right-4 top-1/2 transform -translate-y-1/2 size-5" />
            </button>
        </div>
    </form>
{:else}
    <div class="relative">
        <SuccessProgress />
        {#if isWaitingToClose}
            <div class="my-4 text-center">
                <p class="text-gray-700 dark:text-gray-600">
                    Cerrando en <strong>{countdown}</strong> segundos...
                </p>
                <!-- <div role="status" class="relative inline-flex items-center gap-2 text-gray-500">
                    <DotSpinner cssClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" colorClass="text-indigo-600" />
                </div> -->
            </div>
        {/if}
    </div>
{/if}
