import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/logo-ministere.png";

export default function Accueil() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Diagnostic de la Capacité d’Accueil</title>
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center p-4 space-y-8">
        <Image src={logo} alt="Logo Ministère" width={100} height={100} />
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Diagnostic de la Capacité d’Accueil
        </h1>

        <div className="space-x-4">
          <button className="add" onClick={() => router.push("/tda")}>
            Test de dépassement actuel
          </button>
          <button className="add" onClick={() => router.push("/tdp")}>
            Test de dépassement prévu
          </button>
        </div>

        <footer className="mt-8 text-sm text-gray-600">
          Version : <strong>V1.0</strong>
        </footer>
      </main>
    </>
  );
}
