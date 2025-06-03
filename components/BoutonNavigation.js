import Link from 'next/link';

export default function BoutonNavigation({ href, label, couleur = 'gray' }) {
  const classes = `bg-${couleur}-600 hover:bg-${couleur}-700 text-white px-4 py-2 rounded shadow`;
  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}