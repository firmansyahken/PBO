<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Dashboard</title>
    <link rel="stylesheet" href="{{asset('authentication')}}/style.css">
</head>
<body>
   
    <div class="wrapper">
        <form action="/admin" method="POST">
            @csrf
            <div class="login">
                <h2>Login Admin</h2>
                @if(session('fail'))
                    <p style="padding-bottom: 1rem;">{{session('fail')}}</p>
                @endif
                <div class="input">
                    <input type="email" name="email" placeholder="Email">
                </div>
                <div class="input">
                    <input type="password" name="password" placeholder="Password">
                </div>
                <button>Login</button>
            </div>
        </form>
    </div>

</body>
</html>