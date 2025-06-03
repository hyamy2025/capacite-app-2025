import Image from 'next/image';
import BoutonNavigation from '../components/BoutonNavigation';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="mb-6">
        <Image src="/logo-ministere.png" alt="Logo Ministère" width={120} height={120} />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
        Diagnostic de la Capacité d’Accueil
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <BoutonNavigation href="/tda" label="Test de dépassement actuel" couleur="blue" />
        <BoutonNavigation href="/tdp" label="Test de dépassement prévu" couleur="green" />
      </div>

      <p className="text-gray-600 mt-8">
        Version : <strong>V1.0</strong>
      </p>
    </div>
  );
}