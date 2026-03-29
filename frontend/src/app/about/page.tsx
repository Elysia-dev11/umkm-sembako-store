export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Tentang Sembako Store</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Sembako Store adalah platform e-commerce yang didedikasikan untuk membantu UMKM toko sembako 
              di Indonesia. Kami percaya bahwa kebutuhan pokok adalah hal yang fundamental, dan setiap 
              keluarga berhak mendapat akses mudah terhadap produk sembako berkualitas dengan harga terjangkau.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Misi Kami</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Menyediakan platform penjualan online yang mudah digunakan untuk UMKM sembako</li>
              <li>Menghubungkan pelanggan dengan toko sembako terpercaya di sekitar mereka</li>
              <li>Memberikan pengalaman belanja kebutuhan pokok yang praktis dan efisien</li>
              <li>Mendukung perekonomian lokal melalui digitalisasi UMKM</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Mengapa Memilih Kami?</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Produk Segar</h3>
                <p className="text-green-700 text-sm">Kami memastikan semua produk yang dijual adalah produk berkualitas dan segar</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Harga Terjangkau</h3>
                <p className="text-blue-700 text-sm">Harga kompetitif langsung dari pedagang lokal</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Pengiriman Cepat</h3>
                <p className="text-yellow-700 text-sm">Layanan pengiriman same-day untuk area tertentu</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Transaksi Aman</h3>
                <p className="text-purple-700 text-sm">Sistem pembayaran yang aman dan terpercaya</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Tim Kami</h2>
            <p className="text-gray-600">
              Sembako Store dikembangkan oleh tim yang terdiri dari developer dan pengusaha lokal 
              yang berkomitmen untuk memajukan UMKM Indonesia di era digital. Kami bekerja sama dengan 
              berbagai pihak untuk memberikan layanan terbaik.
            </p>

            <div className="mt-8 pt-6 border-t">
              <p className="text-gray-500 text-sm">
                Punya pertanyaan atau ingin bekerja sama? Hubungi kami di{' '}
                <a href="mailto:info@sembakostore.id" className="text-primary hover:text-primary-dark">
                  info@sembakostore.id
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
