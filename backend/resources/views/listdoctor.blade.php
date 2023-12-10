<x-layout>
    <ul class="list-group">
        <div class="row">
            @foreach($doctors as $doctor)
                <div class="col-sm-6">
                    <li class="list-group-item">{{ $doctor->name }}</li>
                </div>
            @endforeach
        </div>
    </ul>

</x-layout>