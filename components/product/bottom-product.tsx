import { Product } from '@lib/supabase/types-database';

type BottomProductProps = {
  product?: any;
};

export default function BottomProduct(props: BottomProductProps): JSX.Element {
  const { product } = props;

  return (
    <>
      {product && (
        <div className='flex gap-10'>
          <div className='product-overview-box w-full space-y-2 rounded-2xl'>
            <h5 className='sub-heading'>Beskrivelse</h5>
            <p className='paragraph'>{product.description}</p>
            <br />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              cupiditate nesciunt vel. Alias nihil, beatae, quibusdam
              perspiciatis, numquam dignissimos sequi cum quaerat maxime in
              deserunt cupiditate ullam minus enim pariatur?
            </p>
          </div>
          <div className='product-overview-box w-full space-y-5 rounded-2xl'>
            <div className='space-y-2'>
              <h5 className='sub-heading'>Garanti</h5>
              <p className='paragraph'>
                Vi kan ikke garantere at du kan lide vores krydderier, men vi
                kan garantere at kvaliteten er i top. På øvrige varer gælder
                garantien for dansk lovgivning.
              </p>
            </div>
            <div className='space-y-2'>
              <h5 className='sub-heading'>Levering</h5>
              <p className='paragraph'>
                Vi sender vare alle hverdage - du modtage 1-3 hverdage efter vi
                har modtaget din ordre
              </p>
              <ul className='list-disc space-y-2 px-8 marker:text-error'>
                <li>
                  Alle forsendelser sendes med PostNord - leveringstid 1-2 dage.
                </li>
                <li>
                  Forsendelser under kr. 300,- pålægges Post Nord portogebyr.
                </li>
                <li>Forsendelser over kr. 300,- sendes portofrit.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
