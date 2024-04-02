// Libraries
import {Image} from '@shopify/hydrogen';

// Components
import {Button} from '~/components/ui';

// Assets
import LovevibeLogo from 'public/images/logos/lovevibe.png';
import {ArrowRight} from '~/icons';
import {Link} from '@remix-run/react';

interface HeaderProps {
  logo?: string;
}

export function Header(props: HeaderProps) {
  const {logo} = props;

  // const {shop, menu} = header;
  return (
    <header className="container flex items-center justify-between md:pt-8 md:pb-0 md:px-40 p-4">
      <Link to="https://lovevibe.co" prefetch="intent">
        <Image
          alt="lovevibe logo"
          sizes="(max-width: 768px) 50vw, 100vw  "
          className="w-[62px] md:w-[75px]"
          width={75}
          src={logo || LovevibeLogo}
        />
      </Link>
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
