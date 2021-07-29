<!DOCTYPE html>
<html>
   <body>
       <h1>Users:</h1>
       @foreach ($users as $user)
       <h2>User ID:  {{ $user['id'] }}</h2>
       <h2>colors: {{ $user['colors'] }}</h2>
       @endforeach
   </body>
</html>