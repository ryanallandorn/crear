<script>

// resources/js/Frontend/Components/Forms/MainEnquiry/SuccessProgress.svelte

import { t } from 'svelte-i18n';

</script>



<nav aria-label="Progress">
    <ol role="list" class="overflow-hidden">
      <li class="relative pb-6">
        <div class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600" aria-hidden="true"></div>
        <!-- Complete Step -->
        <a href="#" class="group relative flex items-start">
          <span class="flex h-9 items-center">
            <span class="relative z-10 flex size-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
              <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
            </span>
          </span>
          <span class="ml-4 flex min-w-0 flex-col">
            <span class="text-sm font-medium">
                <strong>{$t('Éxitos!')}</strong> {$t('Recibimos tu consulta')}
            </span>
            <span class="text-sm text-gray-500">{$t('Gracias por tu interés!')}</span>
          </span>
        </a>
      </li>
      <li class="relative pb-6">
        <div class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true"></div>
        <!-- Current Step -->
        <a href="#" class="group relative flex items-start" aria-current="step">
          <span class="flex h-9 items-center" aria-hidden="true">
            <span class="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
              <span class="size-2.5 rounded-full bg-indigo-600"></span>
            </span>
          </span>
          <span class="ml-4 flex min-w-0 flex-col">
            <span class="text-sm font-medium text-indigo-600">
                {$t('Revisión de consulta')}
            </span>
            <span class="text-sm text-gray-500">{$t('Analizamos los detalles de tu consulta para determinar si encajamos bien.')}</span>
          </span>
        </a>
      </li>
      <li class="relative pb-6">
        <div class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true"></div>
        <!-- Upcoming Step -->
        <a href="#" class="group relative flex items-start">
          <span class="flex h-9 items-center" aria-hidden="true">
            <span class="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
              <span class="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
            </span>
          </span>
          <span class="ml-4 flex min-w-0 flex-col">
            <span class="text-sm font-medium text-gray-400">
                {$t('Respondemos')}
            </span>
            <span class="text-sm text-gray-600">
                {$t('Intentamos responder dentro de 1 a 3 días hábiles, pero depende de nuestro volumen de trabajo.')}
            </span>
          </span>
        </a>
      </li>
      <li class="relative pb-6">
        <!-- Upcoming Step -->
        <a href="#" class="group relative flex items-start">
          <span class="flex h-9 items-center" aria-hidden="true">
            <span class="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
              <span class="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
            </span>
          </span>
          <span class="ml-4 flex min-w-0 flex-col">
            <span class="text-sm font-medium text-gray-400">
                {$t('Evaluación inicial')}
            </span>
            <span class="text-sm text-gray-600"> 
                {$t('Avanzamos dándote acceso para juntar información y definir el alcance de tus necesidades.')}
            </span>
          </span>
        </a>
      </li>
    </ol>
  </nav>
  

<div class="relative my-4">
  <h3 class="text-2xl "> {$t('Tenés Detalles?')}</h3>
  <p class="text-lg leading-snug font-medium text-gray-700 dark:text-gray-300 mb-4">
    Brindando detalles concretos como tu presupuesto, expectativas, y objetivos nos ayuda avanzar de la forma más eficiente. Podrías contestar algunas preguntas?
  </p>
</div>


<button
  type="button"
  class="relative inline-flex justify-center items-center gap-x-2 rounded-md bg-indigo-600 px-10 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full text-center"
>
  Adelante!
</button>

<div class="p-3 mt-8 mb-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
  <h3 class="text-l text-gray-400 dark:text-gray-400 mb-2">
      Somos selectivos, no <em>"mala onda"</em>
  </h3>
  <ul class="text-gray-700 dark:text-gray-500 leading-snug list-disc pl-2 space-y-3 text-sm">
      <li>
          Protegemos nuestro tiempo mutuo para poder enfocarnos en crear los mejores resultados juntos.
      </li>
      <li>
          Siempre intentaremos responder, incluso si sentimos que no somos una buena combinación. En ese caso, te lo haremos saber de manera honesta y respetuosa.
      </li>
  </ul>
</div>