<script>
    export let cssClass = ''; // Applies to the outer wrapper
    export let colorClass = 'text-black'; // Applies to the spinner color
</script>

<div class={`flex items-center justify-center ${cssClass}`}>
    <div class={`loader ${colorClass}`}>
        <style>
            .loader {
                height: 15px;
                aspect-ratio: 5;
                display: grid;
                animation: l39-0 1s infinite linear;
            }
            .loader:before,
            .loader:after {
                content: "";
                width: calc(140% / 3);
                grid-area: 1 / 1;
                --_g: no-repeat radial-gradient(farthest-side, currentColor 94%, transparent);
                background: var(--_g) left, var(--_g) right;
                background-size: calc(300% / 7) 100%;
                animation: l39-1 1s infinite linear;
            }
            .loader:after {
                margin-left: auto;
                --s: -1;
            }
            @keyframes l39-0 {
                0%,
                30% {
                    transform: rotate(0);
                }
                50%,
                100% {
                    transform: rotate(0.5turn);
                }
            }
            @keyframes l39-1 {
                30%,
                70% {
                    transform: translate(calc(var(--s, 1) * 400% / 14));
                }
            }
        </style>
    </div>
</div>
