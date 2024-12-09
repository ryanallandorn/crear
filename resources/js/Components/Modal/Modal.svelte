<script>
    import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/html";
    import { writable } from "svelte/store";

    // State to track dialog visibility
    const open = writable(false);

    // Function to toggle the dialog
    const handleOpen = () => {
        open.update((value) => !value);
    };
</script>

<Button on:click={handleOpen} variant="gradient">
    Open Modal
</Button>

<Dialog bind:open={$open} handler={handleOpen}>
    <DialogHeader>It's a simple modal.</DialogHeader>
    <DialogBody>
        The key to more success is to have a lot of pillows. Put it this way,
        it took me twenty-five years to get these plants, twenty-five years of
        blood, sweat, and tears, and I&apos;m never giving up, I&apos;m just
        getting started. I&apos;m up to something. Fan luv.
    </DialogBody>
    <DialogFooter>
        <Button
            variant="text"
            color="red"
            on:click={handleOpen}
            class="mr-1"
        >
            <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" on:click={handleOpen}>
            <span>Confirm</span>
        </Button>
    </DialogFooter>
</Dialog>
