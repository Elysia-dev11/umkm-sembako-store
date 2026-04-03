export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-8">
              Kami dengan senang hati akan membantu Anda. Silakan hubungi kami melalui salah satu jalur di bawah ini.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">📍 Alamat</h3>
                <p className="text-green-700 text-sm">
                  Jl. Pasar Baru No. 123, Jakarta
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">📞 Telepon</h3>
                <p className="text-blue-700 text-sm">
                  +62 812-3456-7890
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-3">📧 Email</h3>
                <p className="text-yellow-700 text-sm">
                  info@sembakostore.id
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3">🕐 Jam Operasional</h3>
                <p className="text-purple-700 text-sm">
                  Senin - Minggu: 24 Jam
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-gray-600">
                Untuk pertanyaan bisnis atau kerja sama, silakan email kami di{' '}
                <a href="mailto:info@sembakostore.id" className="text-primary hover:text-primary-dark font-medium">
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