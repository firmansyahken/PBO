<x-layout title="Dashboard">
    <div class="row">
        <div class="col-md-4">
            <div class="card p-3 bg-success">
                <p>Jumlah Pengguna</p>
                <h1>{{ $pacient }}</h1>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3 bg-primary">
                <p>Jumlah Psikiater</p>
                <h1>{{ $doctor }}</h1>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3 bg-warning">
                <p>Jumlah Konsultasi</p>
                <h1>{{$consultation}}</h1>
            </div>
        </div>
    </div>

    <div class="container mt-5">
        <canvas id="myChart"></canvas>
    </div>

    <script>
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'line',
            data: {
            labels: @json($labels),
            datasets: [{
                data: @json($consultationMonth),
                borderWidth: 1,
                backgroundColor: 'green',
            }]
            },
            options: {
                plugins:{
                    legend: {
                        display: false
                    }
                },
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
    </script>
</x-layout>