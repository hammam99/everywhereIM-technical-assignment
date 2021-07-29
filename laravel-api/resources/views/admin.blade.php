<!DOCTYPE html>
<html>

<head>
    <script src="admin.js"></script>
    <link rel="stylesheet" href="admin.css">
</head>

<body>
    <div class="users-container">
        <h1>Gebruikers</h1>
        @foreach ($users as $user)
        <div>

            <div class="user-item">
                <div class="user-id">{{ $user['id'] }}</div>
                @if (count($user['colors']) > 0)
                <div class="color-block" style="background: {{ $user['colors'][0]['color'] }};" onclick="showPicker( {{ $user['id'] }}, {{ $user['colors'][0]['id'] }})"></div>
                <div class="push"></div>
                <img class="toggle-list" src="chevron-down-solid.svg" onclick="toggleList(event)">
                @else
                <div class="push"></div>
                @endif
                <img class="add-color" src="plus-solid.svg" onclick="showPicker( {{ $user['id'] }} )">
            </div>

            @if (count($user['colors']) > 1)
            <div class="colors-list">
                @foreach ($user['colors']->slice(1) as $color)
                <div class="color-block" style="background: {{ $color['color'] }};" onclick="showPicker( {{ $user['id'] }}, {{ $color['id'] }})"></div>
                @endforeach
            </div>
            @endif
        </div>
        @endforeach
    </div>

    <div id="color-picker">
        @foreach ($colors as $c)
        <div class="color-square" style="background: {{ $c['color'] }}" onclick="insertColor( {{ $c['id'] }} )"></div>
        @endforeach
    </div>
    <img id="trash" src="trash-alt-solid.svg" onclick="deleteColor()">
</body>

</html>