<x-app-layout>
    <x-slot name="header">
        <h2>{{ __('Détail') }}</h2>
    </x-slot>

    <x-slot name="shop">
        <h1>Titre : {{$product->title}}</h1>
        <p>description : {{$product->content}}</p>
        <p>prix : {{$product->price}}€</p>
    </x-slot>

</x-app-layout>