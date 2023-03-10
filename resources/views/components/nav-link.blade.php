@props(['active'])

@php
$classes = ($active ?? false)
            ? 'inline-flex items-center px-1 pt-1 border-b-2 
                border-vert-400
            text-sm font-medium leading-5 
                text-vert-900 
            focus:outline-none 
                focus:border-vert-700 
            transition duration-150 ease-in-out'
            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 
                text-vert-500 hover:text-vert-700 hover:border-vert-300 
            focus:outline-none 
                focus:text-vert-700 focus:border-vert-300 
            transition duration-150 ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
