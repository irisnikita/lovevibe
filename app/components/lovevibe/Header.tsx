// Libraries
import {Image} from '@shopify/hydrogen';

// Components
import {Button} from '~/components/ui';

// Assets
import LovevibeLogo from 'public/images/logos/lovevibe.png';
import {ArrowRight} from '~/icons';

export function Header() {
  // const {shop, menu} = header;
  return (
    <header className="container flex items-center justify-between pt-8">
      <Image
        alt="lovevibe logo"
        sizes="(min-width: 768px) 50vw, 100vw"
        width={75}
        src={LovevibeLogo}
      />
      <Button
        type="link"
        href="https://lovevibe.co/pages/all-ideas"
        className="!flex items-center gap-1 underline !font-bold"
      >
        Discover More Product
        <ArrowRight />
      </Button>
    </header>
  );
}

// export const StyledHeader = styled.header`
//   display: flex;
//   align-items: center;

// `;
