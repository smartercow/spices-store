export default function Footer(): JSX.Element {
  return (
    <footer className='main-extent w-full py-8 text-center'>
      <div></div>
      <p className='text-sm'>
        &copy; {new Date().getFullYear()}{' '}
        <span className='text-base font-bold'>spices</span>. Alle rettigheder
        forbeholdes.
      </p>
    </footer>
  );
}
