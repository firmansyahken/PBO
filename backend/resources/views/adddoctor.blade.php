<x-layout title="Tambah Dokter">
    <div class="container">
        <h2>Tambah Psikiater</h1>
        <div class="mt-5 pb-5">
            @if (session()->has('success'))
                <div class="alert alert-success">
                    {{ session()->get('success') }}
                </div>
            @endif
            <form action="/register" method="POST" enctype="multipart/form-data">
                @CSRF
                @method('POST')
                <div class="mb-3">
                    <div class="row">
                        <div class="col-6">
                            <label for="input" class="form-label">Nama Lengkap</label>
                            <input type="text" value="{{ old('name') }}" name="name" class="form-control @error('name') is-invalid  @enderror">
                            @error('name')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>
                        <div class="col-6">
                            <label for="input" class="form-label">Email</label>
                            <input type="text" value="{{ old('email') }}" name="email" class="form-control @error('email') is-invalid  @enderror">
                            @error('email')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-6">
                            <label for="input" class="form-label">Password</label>
                            <input type="text" value="{{ old('password') }}" name="password" class="form-control @error('password') is-invalid @enderror">
                            @error('password')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>
                        <div class="col-6">
                            <label for="input" class="form-label">Jenis Kelamin</label>
                            <select type="text" value="{{ old('gender') }}" name="gender" class="form-control @error('gender') is-invalid @enderror">
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                            @error('gender')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror   
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-6">
                            <label for="input" class="form-label">Alamat</label>
                            <input type="text" value="{{ old('address') }}" name="address" class="form-control @error('address') is-invalid  @enderror">
                            @error('address')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>
                        <div class="col-6">
                            <label for="input" class="form-label">Photo</label>
                            <input type="file" value="{{ old('photo') }}" name="photo" class="form-control @error('photo') is-invalid  @enderror">
                            @error('photo')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>
                    </div>
                </div>
                <button class="btn btn-dark">Tambah</button>
            </form>
        </div>
    </div>
    <script>
        const formImage = document.getElementById('photo')
        const preview = document.getElementById('preview');

        formImage.addEventListener('input', function(e) {
            const img = URL.createObjectURL(e.target.files[0]);
            preview.innerHTML = `<img src="${img}" style="width: 100px; height: 80px; object-fit: cover;">`
        })
    </script>
</x-layout>